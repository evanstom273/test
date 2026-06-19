import { useState, useRef } from 'react';
import { useStore, totalDefeated, totalAttempts } from '../store/context';
import { ALL_BOSSES } from '../data/bosses';
import type { JourneyStore, BossState } from '../store/types';
import type { View } from '../App';

type Format = 'json' | 'markdown' | 'pdf';

// ── Helpers shared by MD + PDF ────────────────────────────────────────────────

function ngLabel(cycle: number) {
  return cycle > 1 ? `NG+${cycle - 1}` : 'NG';
}

function buildWeapons(rh: string[], lh: string[]) {
  const r = (rh ?? []).filter(Boolean).join(' / ') || '—';
  const l = (lh ?? []).filter(Boolean).join(' / ') || '—';
  return { r, l };
}

function buildTalismans(t1: string, t2: string, t3: string, t4: string) {
  return [t1, t2, t3, t4].filter(t => t && t !== '—').join(', ') || '—';
}

// ── Markdown export ───────────────────────────────────────────────────────────

function toMarkdown(state: ReturnType<typeof useStore>['state']): string {
  const char = state.character;
  if (!char) return '# No character found';

  const defeated = ALL_BOSSES.filter(b => state.bossData[b.id]?.status === 'defeated');
  const attempted = ALL_BOSSES.filter(b => state.bossData[b.id]?.status === 'attempted');
  const pending   = ALL_BOSSES.filter(b => (state.bossData[b.id]?.status ?? 'pending') === 'pending');
  const totalAttemptCount = Object.values(state.bossData).reduce((s, b) => s + b.attempts, 0);

  const lines: string[] = [];

  lines.push(`# ${char.name}'s Elden Ring Journey`);
  lines.push(`**Class:** ${char.class} | **Platform:** ${char.platform} | **Run:** ${char.runType} | **NG:** ${ngLabel(char.ngCycle)}`);
  lines.push(`**Started:** ${char.startDate} | **Hours played:** ${state.totalHours}`);
  lines.push('');

  lines.push('## Progress Summary');
  lines.push(`- **Bosses defeated:** ${defeated.length} / ${ALL_BOSSES.length} (${Math.round(defeated.length / ALL_BOSSES.length * 100)}%)`);
  lines.push(`- **In progress:** ${attempted.length}`);
  lines.push(`- **Total attempts:** ${totalAttemptCount}`);
  lines.push(`- **Build snapshots:** ${state.builds.length}`);
  lines.push(`- **Journal entries:** ${state.journal.length}`);
  lines.push('');

  if (state.timeline.length > 0) {
    lines.push('## Timeline');
    for (const e of [...state.timeline].sort((a, b) => a.timestamp.localeCompare(b.timestamp))) {
      lines.push(`### [${e.timestamp}] ${e.title}`);
      if (e.location) lines.push(`*${e.location}*`);
      if (e.body) lines.push(e.body);
      lines.push('');
    }
  }

  lines.push('## Bosses Defeated');
  for (const b of defeated) {
    const bd = state.bossData[b.id];
    const tier = bd.tier !== 'Unranked' ? ` — **${bd.tier}**` : '';
    lines.push(`- **${b.name}** (${b.location}) — ${bd.attempts} attempt${bd.attempts !== 1 ? 's' : ''}${tier}`);
    if (bd.notes) lines.push(`  > ${bd.notes}`);
  }
  lines.push('');

  if (attempted.length > 0) {
    lines.push('## Still in Progress');
    for (const b of attempted) {
      const bd = state.bossData[b.id];
      const tier = bd.tier !== 'Unranked' ? ` — **${bd.tier}**` : '';
      lines.push(`- **${b.name}** (${b.location}) — ${bd.attempts} attempt${bd.attempts !== 1 ? 's' : ''}${tier}`);
      if (bd.notes) lines.push(`  > ${bd.notes}`);
    }
    lines.push('');
  }

  if (pending.length > 0) {
    lines.push('## Not Yet Encountered');
    lines.push(pending.map(b => b.name).join(', '));
    lines.push('');
  }

  if (state.builds.length > 0) {
    lines.push('## Build History');
    for (const build of state.builds) {
      const { r, l } = buildWeapons(build.rightHand, build.leftHand);
      const s = build.stats;
      lines.push(`### ${build.label} (${build.date}) — Lv ${s.level}`);
      lines.push(`**Weapons:** R: ${r} | L: ${l}`);
      lines.push(`**Stats:** VIG ${s.vigor} MND ${s.mind} END ${s.endurance} STR ${s.strength} DEX ${s.dexterity} INT ${s.intelligence} FAI ${s.faith} ARC ${s.arcane}`);
      lines.push(`**Armour:** ${build.helm || '—'} / ${build.chest || '—'} / ${build.gauntlets || '—'} / ${build.legs || '—'}`);
      lines.push(`**Talismans:** ${buildTalismans(build.talisman1, build.talisman2, build.talisman3, build.talisman4)}`);
      lines.push(`**Flasks:** ${build.cracked} Crimson / ${build.cerulean} Cerulean`);
      if ((build.spells?.length ?? 0) > 0) lines.push(`**Spells:** ${build.spells!.join(', ')}`);
      if (build.note) lines.push(`*${build.note}*`);
      lines.push('');
    }
  }

  if (state.journal.length > 0) {
    lines.push('## Journal');
    for (const entry of [...state.journal].sort((a, b) => a.date.localeCompare(b.date))) {
      lines.push(`### ${entry.title} — ${entry.date}${entry.mood ? ` *(${entry.mood})*` : ''}`);
      lines.push(entry.body);
      if (entry.tags.length > 0) lines.push(`*Tags: ${entry.tags.join(', ')}*`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

// ── PDF (print-ready HTML) ────────────────────────────────────────────────────

function toPdfHtml(state: ReturnType<typeof useStore>['state']): string {
  const char = state.character;
  if (!char) return '<p>No character found.</p>';

  const defeated = ALL_BOSSES.filter(b => state.bossData[b.id]?.status === 'defeated');
  const attempted = ALL_BOSSES.filter(b => state.bossData[b.id]?.status === 'attempted');
  const pending   = ALL_BOSSES.filter(b => (state.bossData[b.id]?.status ?? 'pending') === 'pending');
  const totalAttemptCount = Object.values(state.bossData).reduce((s, b) => s + b.attempts, 0);

  function esc(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function bossRows(bosses: typeof ALL_BOSSES) {
    return bosses.map(b => {
      const bd = state.bossData[b.id];
      const tierColor: Record<string, string> = {
        Loved: '#8a6800', Liked: '#3a6830', Neutral: '#555', Disliked: '#7a3010', 'Never Again': '#7a1010',
      };
      const tierHtml = bd.tier !== 'Unranked'
        ? `<span style="color:${tierColor[bd.tier] ?? '#555'};font-weight:600">${esc(bd.tier)}</span>`
        : '';
      return `
        <tr>
          <td><strong>${esc(b.name)}</strong>${bd.notes ? `<br><em style="color:#666;font-size:0.85em">${esc(bd.notes)}</em>` : ''}</td>
          <td style="color:#555">${esc(b.location)}</td>
          <td style="text-align:center">${bd.attempts}</td>
          <td>${tierHtml}</td>
        </tr>`;
    }).join('');
  }

  function statCell(label: string, val: number) {
    return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-val">${val}</div></div>`;
  }

  const timelineHtml = [...state.timeline]
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    .map(e => `
      <div class="timeline-item">
        <div class="tl-date">${esc(e.timestamp)}</div>
        <div class="tl-title">${esc(e.title)}</div>
        ${e.location ? `<div class="tl-loc">${esc(e.location)}</div>` : ''}
        ${e.body ? `<div class="tl-body">${esc(e.body)}</div>` : ''}
      </div>`).join('');

  const buildsHtml = state.builds.map(build => {
    const { r, l } = buildWeapons(build.rightHand, build.leftHand);
    const s = build.stats;
    const tals = buildTalismans(build.talisman1, build.talisman2, build.talisman3, build.talisman4);
    return `
      <div class="build-card">
        <div class="build-header">
          <span class="build-label">${esc(build.label)}</span>
          <span class="build-meta">${esc(build.date)} — Level ${s.level}</span>
        </div>
        <div class="stat-grid">
          ${statCell('VIG', s.vigor)}${statCell('MND', s.mind)}${statCell('END', s.endurance)}
          ${statCell('STR', s.strength)}${statCell('DEX', s.dexterity)}${statCell('INT', s.intelligence)}
          ${statCell('FAI', s.faith)}${statCell('ARC', s.arcane)}
        </div>
        <table class="eq-table">
          <tr><th>Right Hand</th><td>${esc(r)}</td><th>Left Hand</th><td>${esc(l)}</td></tr>
          <tr><th>Helm</th><td>${esc(build.helm || '—')}</td><th>Chest</th><td>${esc(build.chest || '—')}</td></tr>
          <tr><th>Gauntlets</th><td>${esc(build.gauntlets || '—')}</td><th>Legs</th><td>${esc(build.legs || '—')}</td></tr>
          <tr><th>Talismans</th><td colspan="3">${esc(tals)}</td></tr>
          <tr><th>Flasks</th><td colspan="3">${build.cracked} Crimson / ${build.cerulean} Cerulean</td></tr>
          ${(build.spells?.length ?? 0) > 0 ? `<tr><th>Spells</th><td colspan="3">${esc(build.spells!.join(', '))}</td></tr>` : ''}
        </table>
        ${build.note ? `<div class="build-note">${esc(build.note)}</div>` : ''}
      </div>`;
  }).join('');

  const journalHtml = [...state.journal]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(entry => `
      <div class="journal-entry">
        <div class="j-header">
          <span class="j-title">${esc(entry.title)}</span>
          <span class="j-meta">${esc(entry.date)}${entry.mood ? ` · ${esc(entry.mood)}` : ''}</span>
        </div>
        <div class="j-body">${esc(entry.body).replace(/\n/g, '<br>')}</div>
        ${entry.tags.length > 0 ? `<div class="j-tags">Tags: ${entry.tags.map(esc).join(', ')}</div>` : ''}
      </div>`).join('');

  const pendingList = pending.length > 0
    ? `<section><h2>Not Yet Encountered (${pending.length})</h2>
       <p class="pending-list">${pending.map(b => esc(b.name)).join(', ')}</p></section>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${esc(char.name)}'s Elden Ring Journey</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; margin: 0; padding: 1.5cm 2cm; font-size: 10pt; line-height: 1.55; }
  h1 { font-size: 2em; margin: 0 0 0.15em; letter-spacing: -0.02em; }
  h2 { font-size: 1.15em; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1.5px solid #bbb; padding-bottom: 3px; margin: 1.6em 0 0.7em; color: #333; }
  h3 { font-size: 1em; margin: 0.8em 0 0.2em; }
  .char-meta { color: #555; font-size: 0.88em; margin: 0.3em 0 1.5em; }
  .summary-grid { display: grid; grid-template-columns: repeat(5, auto); gap: 0 2em; margin-bottom: 0.3em; }
  .summary-grid span { font-size: 0.88em; color: #444; }
  .summary-grid strong { display: block; font-size: 1.3em; color: #111; }

  /* Boss table */
  table.boss-table { width: 100%; border-collapse: collapse; font-size: 0.88em; margin-bottom: 0.5em; }
  .boss-table th { text-align: left; font-family: Arial, sans-serif; font-size: 0.78em; text-transform: uppercase; letter-spacing: 0.06em; color: #666; padding: 3px 6px; border-bottom: 1px solid #ccc; }
  .boss-table td { padding: 4px 6px; border-bottom: 1px solid #eee; vertical-align: top; }
  .boss-table td:nth-child(3) { text-align: center; color: #555; }

  /* Pending bosses */
  .pending-list { font-size: 0.85em; color: #666; line-height: 1.7; }

  /* Timeline */
  .timeline-item { margin-bottom: 0.7em; padding-left: 1em; border-left: 2px solid #ddd; }
  .tl-date { font-family: Arial, sans-serif; font-size: 0.78em; color: #888; }
  .tl-title { font-weight: bold; }
  .tl-loc { font-size: 0.85em; color: #666; font-style: italic; }
  .tl-body { font-size: 0.88em; color: #444; margin-top: 0.2em; }

  /* Builds */
  .build-card { margin-bottom: 1.2em; padding: 0.7em; border: 1px solid #ddd; page-break-inside: avoid; }
  .build-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5em; }
  .build-label { font-weight: bold; font-size: 1.05em; }
  .build-meta { font-size: 0.82em; color: #666; }
  .stat-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; margin-bottom: 0.5em; }
  .stat { text-align: center; background: #f5f5f5; padding: 3px 2px; }
  .stat-label { font-family: Arial, sans-serif; font-size: 0.65em; text-transform: uppercase; color: #888; }
  .stat-val { font-weight: bold; font-size: 1em; }
  table.eq-table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
  .eq-table th { text-align: left; width: 80px; color: #666; padding: 2px 6px 2px 0; font-weight: normal; font-style: italic; }
  .eq-table td { padding: 2px 6px 2px 0; }
  .build-note { font-style: italic; color: #555; font-size: 0.88em; margin-top: 0.4em; }

  /* Journal */
  .journal-entry { margin-bottom: 1.2em; page-break-inside: avoid; }
  .j-header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #eee; padding-bottom: 3px; margin-bottom: 0.4em; }
  .j-title { font-weight: bold; }
  .j-meta { font-size: 0.82em; color: #888; }
  .j-body { font-size: 0.92em; color: #333; }
  .j-tags { font-size: 0.78em; color: #999; margin-top: 0.4em; font-style: italic; }

  section { page-break-inside: auto; }
  @page { margin: 1.8cm 2cm; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>

<h1>${esc(char.name)}'s Elden Ring Journey</h1>
<p class="char-meta">
  ${esc(char.class)} · ${esc(char.platform)} · ${esc(char.runType)} · ${ngLabel(char.ngCycle)} · Started ${esc(char.startDate)} · ${state.totalHours} hours
</p>

<section>
  <h2>Progress Summary</h2>
  <div class="summary-grid">
    <span><strong>${defeated.length} / ${ALL_BOSSES.length}</strong>Bosses Defeated</span>
    <span><strong>${Math.round(defeated.length / ALL_BOSSES.length * 100)}%</strong>Completion</span>
    <span><strong>${attempted.length}</strong>In Progress</span>
    <span><strong>${totalAttemptCount}</strong>Total Attempts</span>
    <span><strong>${state.builds.length}</strong>Build Snapshots</span>
  </div>
</section>

${state.timeline.length > 0 ? `<section><h2>Timeline</h2>${timelineHtml}</section>` : ''}

<section>
  <h2>Bosses Defeated (${defeated.length})</h2>
  <table class="boss-table">
    <thead><tr><th>Boss</th><th>Location</th><th>Attempts</th><th>Tier</th></tr></thead>
    <tbody>${bossRows(defeated)}</tbody>
  </table>
</section>

${attempted.length > 0 ? `
<section>
  <h2>Still in Progress (${attempted.length})</h2>
  <table class="boss-table">
    <thead><tr><th>Boss</th><th>Location</th><th>Attempts</th><th>Tier</th></tr></thead>
    <tbody>${bossRows(attempted)}</tbody>
  </table>
</section>` : ''}

${pendingList}

${state.builds.length > 0 ? `<section><h2>Build History</h2>${buildsHtml}</section>` : ''}

${state.journal.length > 0 ? `<section><h2>Journal</h2>${journalHtml}</section>` : ''}

</body>
</html>`;
}

// ── Import helper ─────────────────────────────────────────────────────────────

function parseImport(raw: string): JourneyStore {
  const data = JSON.parse(raw);

  const bossData: Record<string, BossState> = {};
  if (Array.isArray(data.bosses)) {
    for (const b of data.bosses) {
      if (b.id) {
        bossData[b.id] = {
          status: b.status ?? 'pending',
          attempts: b.attempts ?? 0,
          tier: b.tier ?? 'Unranked',
          notes: b.notes ?? '',
        };
      }
    }
  } else if (data.bossData && typeof data.bossData === 'object') {
    Object.assign(bossData, data.bossData);
  }

  return {
    character: data.character ?? null,
    totalHours: data.totalHours ?? 0,
    bossData,
    builds: data.builds ?? [],
    journal: data.journal ?? [],
    timeline: data.timeline ?? [],
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Export({ onNavigate }: { onNavigate?: (v: View) => void }) {
  const store = useStore();
  const { state, importJourney, clearJourney } = store;
  const [format, setFormat] = useState<Format>('json');
  const [copied, setCopied] = useState(false);
  const [importState, setImportState] = useState<'idle' | 'confirm' | 'error'>('idle');
  const [importError, setImportError] = useState('');
  const [pendingImport, setPendingImport] = useState<JourneyStore | null>(null);
  const [deleteState, setDeleteState] = useState<'idle' | 'confirm'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const char = state.character;
  const defeated = totalDefeated(state.bossData);
  const attempts = totalAttempts(state.bossData);

  function getExportContent(): string {
    if (format === 'json') {
      return JSON.stringify({
        character: char,
        totalHours: state.totalHours,
        exported: new Date().toISOString(),
        stats: { defeated, totalAttempts: attempts, builds: state.builds.length, journalEntries: state.journal.length },
        bosses: ALL_BOSSES.map(b => ({ ...b, ...state.bossData[b.id] })),
        builds: state.builds,
        journal: state.journal,
        timeline: state.timeline,
      }, null, 2);
    }
    return toMarkdown(state);
  }

  function handleExport() {
    if (format === 'pdf') {
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(toPdfHtml(state));
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 400);
      }
      return;
    }
    const content = getExportContent();
    const ext = format === 'markdown' ? 'md' : 'json';
    const mime = format === 'json' ? 'application/json' : 'text/plain';
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char?.name ?? 'journey'}-elden-ring.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopy() {
    navigator.clipboard.writeText(getExportContent()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = parseImport(ev.target?.result as string);
        setPendingImport(parsed);
        setImportState('confirm');
        setImportError('');
      } catch {
        setImportState('error');
        setImportError("Could not parse the file. Make sure it's a JSON export from this app.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function confirmImport() {
    if (pendingImport) {
      importJourney(pendingImport);
      setPendingImport(null);
      setImportState('idle');
    }
  }

  function cancelImport() {
    setPendingImport(null);
    setImportState('idle');
    setImportError('');
  }

  const formats: { id: Format; label: string; ext: string; desc: string; icon: string }[] = [
    { id: 'json',     label: 'JSON',     ext: '.json', icon: '{ }', desc: 'Full structured data — everything in machine-readable form. Use for backups and importing on another device.' },
    { id: 'markdown', label: 'Markdown', ext: '.md',   icon: '# —', desc: 'Full narrative document: timeline, all bosses with tier and notes, complete build loadouts, journal.' },
    { id: 'pdf',      label: 'PDF',      ext: '.pdf',  icon: '⬜',  desc: 'Print-ready layout — opens a formatted page in a new tab. Use the browser\'s "Save as PDF" option to download.' },
  ];

  const isPdf = format === 'pdf';

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>Data</p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold mb-3" style={{ color: '#E8E3D8' }}>Archive</h1>
          {char ? (
            <p className="font-body text-sm leading-relaxed" style={{ color: '#5A5650' }}>
              Your journey belongs to you. Export the full record of{' '}
              <span style={{ color: '#C9A876' }}>{char.name}</span>'s{' '}
              {state.totalHours}-hour playthrough as a permanent artifact.
            </p>
          ) : (
            <p className="font-body text-sm" style={{ color: '#5A5650' }}>Create a character to export your journey.</p>
          )}
        </div>

        {/* Journey summary */}
        <div className="mb-8 rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
          <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>What's included</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Timeline events',  value: state.timeline.length },
              { label: 'Bosses tracked',   value: Object.values(state.bossData).filter(b => b.status !== 'pending').length },
              { label: 'Build snapshots',  value: state.builds.length },
              { label: 'Journal entries',  value: state.journal.length },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-display text-2xl font-semibold" style={{ color: '#C9A876' }}>{value}</p>
                <p className="font-body text-xs" style={{ color: '#5A5650' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Format */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>Format</h2>
          <div className="space-y-3">
            {formats.map(fmt => (
              <label key={fmt.id}
                className="flex items-start gap-4 p-4 rounded-sm border cursor-pointer transition-colors hover:border-[#3A3835]"
                style={{ background: '#1A1A1A', borderColor: format === fmt.id ? '#C9A876' : '#2A2925' }}>
                <input type="radio" name="format" value={fmt.id} checked={format === fmt.id} onChange={() => setFormat(fmt.id)}
                  className="mt-1 accent-[#C9A876]" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-body text-xs font-semibold tracking-widest" style={{ color: '#5A5650' }}>{fmt.icon}</span>
                    <span className="font-display text-lg font-semibold" style={{ color: '#E8E3D8' }}>{fmt.label}</span>
                    <span className="font-body text-xs" style={{ color: '#5A5650' }}>{fmt.ext}</span>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#5A5650' }}>{fmt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={handleExport} disabled={!char}
            className="flex-1 py-3.5 rounded-sm border font-display text-lg font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-[#C9A876] hover:enabled:text-[#121212] hover:enabled:border-[#C9A876]"
            style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
            {isPdf ? 'Open Print View' : 'Download'}
          </button>
          {!isPdf && (
            <button onClick={handleCopy} disabled={!char}
              className="px-5 py-3.5 rounded-sm border font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-[#5A5650]"
              style={{ borderColor: '#2A2925', color: copied ? '#C9A876' : '#5A5650', background: '#1A1A1A' }}>
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          )}
        </div>

        <p className="text-center font-body text-xs mt-3" style={{ color: '#3A3835' }}>Your data is stored locally and never leaves your device</p>

        {/* Import */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: '#2A2925' }}>
          <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: '#E8E3D8' }}>Import</h2>
          <p className="font-body text-sm mb-5 leading-relaxed" style={{ color: '#5A5650' }}>
            Restore a journey from a previously exported JSON file. This will <span style={{ color: '#C9A876' }}>replace</span> all current data — export first if you want to keep it.
          </p>

          <input ref={fileRef} type="file" accept=".json,application/json" onChange={handleFileChange} className="hidden" />

          {importState === 'idle' && (
            <button onClick={() => fileRef.current?.click()}
              className="px-5 py-3 rounded-sm border font-body text-sm transition-colors hover:border-[#5A5650] hover:text-[#E8E3D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
              style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
              Choose JSON file…
            </button>
          )}

          {importState === 'confirm' && pendingImport && (
            <div className="rounded-sm border p-4 space-y-4" style={{ background: '#1A1A1A', borderColor: '#C9A876' }}>
              <div>
                <p className="font-body text-sm font-semibold mb-1" style={{ color: '#E8E3D8' }}>
                  Import "{pendingImport.character?.name ?? 'Unknown'}"?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  {[
                    { label: 'Bosses tracked',  value: Object.values(pendingImport.bossData).filter(b => b.status !== 'pending').length },
                    { label: 'Build snapshots', value: pendingImport.builds.length },
                    { label: 'Journal entries', value: pendingImport.journal.length },
                    { label: 'Timeline events', value: pendingImport.timeline.length },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-display text-xl font-semibold" style={{ color: '#C9A876' }}>{value}</p>
                      <p className="font-body text-xs" style={{ color: '#5A5650' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-body text-xs" style={{ color: '#5A5650' }}>
                Your current journey will be overwritten. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={confirmImport}
                  className="flex-1 py-2.5 rounded-sm border font-display text-base font-semibold tracking-wide transition-all hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                  style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
                  Import & Replace
                </button>
                <button onClick={cancelImport}
                  className="px-5 py-2.5 rounded-sm border font-body text-sm transition-colors hover:border-[#5A5650] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                  style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {importState === 'error' && (
            <div className="rounded-sm border p-4 space-y-3" style={{ background: '#1A1A1A', borderColor: '#8B2E2E' }}>
              <p className="font-body text-sm" style={{ color: '#8B2E2E' }}>{importError}</p>
              <button onClick={cancelImport}
                className="px-4 py-2 rounded-sm border font-body text-sm transition-colors hover:border-[#5A5650] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                style={{ borderColor: '#2A2925', color: '#5A5650', background: '#121212' }}>
                Try again
              </button>
            </div>
          )}
        </div>

        {/* Delete character */}
        <div className="mt-8 pt-8 border-t" style={{ borderColor: '#2A2925' }}>
          <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: '#E8E3D8' }}>Delete Character</h2>
          <p className="font-body text-sm mb-5 leading-relaxed" style={{ color: '#5A5650' }}>
            Permanently delete {char ? <span style={{ color: '#C9A876' }}>{char.name}</span> : 'this character'} and all journey data.
            Export first if you want to keep a copy — this cannot be undone.
          </p>

          {deleteState === 'idle' ? (
            <button onClick={() => setDeleteState('confirm')} disabled={!char}
              className="px-5 py-3 rounded-sm border font-body text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E2E]"
              style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}
              onMouseEnter={e => { if (char) { e.currentTarget.style.borderColor = '#8B2E2E'; e.currentTarget.style.color = '#8B2E2E'; } }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2925'; e.currentTarget.style.color = '#5A5650'; }}>
              Delete character…
            </button>
          ) : (
            <div className="rounded-sm border p-4 space-y-3" style={{ background: '#1A1A1A', borderColor: '#8B2E2E' }}>
              <p className="font-body text-sm font-semibold" style={{ color: '#E8E3D8' }}>
                Delete {char?.name} and all journey data?
              </p>
              <p className="font-body text-xs" style={{ color: '#5A5650' }}>
                All bosses, builds, journal entries, and timeline events will be permanently erased.
              </p>
              <div className="flex gap-3">
                <button onClick={() => { clearJourney(); onNavigate?.('character'); }}
                  className="flex-1 py-2.5 rounded-sm border font-display text-base font-semibold tracking-wide transition-all hover:bg-[#8B2E2E] hover:text-white hover:border-[#8B2E2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E2E]"
                  style={{ borderColor: '#8B2E2E', color: '#8B2E2E', background: 'transparent' }}>
                  Delete Forever
                </button>
                <button onClick={() => setDeleteState('idle')}
                  className="px-5 py-2.5 rounded-sm border font-body text-sm transition-colors hover:border-[#5A5650] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                  style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { useStore, totalDefeated, totalAttempts } from '../store/context';
import { ALL_BOSSES } from '../data/bosses';
import type { JourneyStore, BossState } from '../store/types';

type Format = 'json' | 'markdown' | 'pdf';

function toMarkdown(state: ReturnType<typeof useStore>['state']): string {
  const char = state.character;
  if (!char) return '# No character found';

  const defeated = ALL_BOSSES.filter(b => state.bossData[b.id]?.status === 'defeated');
  const attempted = ALL_BOSSES.filter(b => state.bossData[b.id]?.status === 'attempted');

  const lines: string[] = [];
  lines.push(`# ${char.name}'s Elden Ring Journey`);
  lines.push(`**Class:** ${char.class} | **Platform:** ${char.platform} | **Run:** ${char.runType} | **NG:** NG${char.ngCycle > 1 ? `+${char.ngCycle - 1}` : ''}`);
  lines.push(`**Started:** ${char.startDate} | **Hours:** ${state.totalHours}`);
  lines.push('');

  lines.push('## Timeline');
  for (const e of [...state.timeline].sort((a, b) => a.timestamp.localeCompare(b.timestamp))) {
    lines.push(`### [${e.timestamp}] ${e.title}`);
    if (e.location) lines.push(`*${e.location}*`);
    if (e.body) lines.push(e.body);
    lines.push('');
  }

  lines.push('## Bosses Defeated');
  for (const b of defeated) {
    const bd = state.bossData[b.id];
    lines.push(`- **${b.name}** (${b.location}) — ${bd.attempts} attempt${bd.attempts !== 1 ? 's' : ''}${bd.tier !== 'Unranked' ? ` — Tier: ${bd.tier}` : ''}${bd.notes ? `\n  > ${bd.notes}` : ''}`);
  }
  lines.push('');

  if (attempted.length > 0) {
    lines.push('## Still in Progress');
    for (const b of attempted) {
      const bd = state.bossData[b.id];
      lines.push(`- **${b.name}** — ${bd.attempts} attempt${bd.attempts !== 1 ? 's' : ''}`);
    }
    lines.push('');
  }

  if (state.builds.length > 0) {
    lines.push('## Build History');
    for (const build of state.builds) {
      lines.push(`### ${build.label} (${build.date}) — Lv ${build.stats.level}`);
      const rh = (build.rightHand ?? []).filter(Boolean).join(' / ') || '—';
      const lh = (build.leftHand ?? []).filter(Boolean).join(' / ') || '—';
      lines.push(`**Weapons:** R: ${rh} | L: ${lh}`);
      lines.push(`**Stats:** VIG ${build.stats.vigor} MND ${build.stats.mind} END ${build.stats.endurance} STR ${build.stats.strength} DEX ${build.stats.dexterity} INT ${build.stats.intelligence} FAI ${build.stats.faith} ARC ${build.stats.arcane}`);
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

function parseImport(raw: string): JourneyStore {
  const data = JSON.parse(raw);

  // Reconstruct bossData from the flat bosses array in the export
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

export default function Export() {
  const store = useStore();
  const { state, importJourney } = store;
  const [format, setFormat] = useState<Format>('json');
  const [copied, setCopied] = useState(false);
  const [importState, setImportState] = useState<'idle' | 'confirm' | 'error'>('idle');
  const [importError, setImportError] = useState('');
  const [pendingImport, setPendingImport] = useState<JourneyStore | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const char = state.character;
  const defeated = totalDefeated(state.bossData);
  const attempts = totalAttempts(state.bossData);

  function getExportContent(): string {
    if (format === 'json') {
      const exportData = {
        character: char,
        totalHours: state.totalHours,
        exported: new Date().toISOString(),
        stats: { defeated, totalAttempts: attempts, builds: state.builds.length, journalEntries: state.journal.length },
        bosses: ALL_BOSSES.map(b => ({ ...b, ...state.bossData[b.id] })),
        builds: state.builds,
        journal: state.journal,
        timeline: state.timeline,
      };
      return JSON.stringify(exportData, null, 2);
    }
    if (format === 'markdown') return toMarkdown(state);
    return '(PDF export not yet implemented)';
  }

  function handleExport() {
    const content = getExportContent();
    const ext = format === 'markdown' ? 'md' : format;
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
        setImportError('Could not parse the file. Make sure it\'s a JSON export from this app.');
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
    { id: 'json', label: 'JSON', ext: '.json', icon: '{ }', desc: 'Full structured data — everything in machine-readable form. Import into other tools or back up your journey.' },
    { id: 'markdown', label: 'Markdown', ext: '.md', icon: '# —', desc: 'A readable document: timeline, boss log, build snapshots, and journal entries formatted as narrative text.' },
    { id: 'pdf', label: 'PDF', ext: '.pdf', icon: '⬜', desc: 'Print-ready layout. (Coming soon — export as Markdown and convert with Pandoc for now.)' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>Archive</p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold mb-3" style={{ color: '#E8E3D8' }}>Export</h1>
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
              { label: 'Timeline events', value: state.timeline.length },
              { label: 'Bosses tracked', value: Object.values(state.bossData).filter(b => b.status !== 'pending').length },
              { label: 'Build snapshots', value: state.builds.length },
              { label: 'Journal entries', value: state.journal.length },
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
          <button onClick={handleExport} disabled={!char || format === 'pdf'}
            className="flex-1 py-3.5 rounded-sm border font-display text-lg font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-[#C9A876] hover:enabled:text-[#121212] hover:enabled:border-[#C9A876]"
            style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
            Download
          </button>
          <button onClick={handleCopy} disabled={!char || format === 'pdf'}
            className="px-5 py-3.5 rounded-sm border font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:border-[#5A5650]"
            style={{ borderColor: '#2A2925', color: copied ? '#C9A876' : '#5A5650', background: '#1A1A1A' }}>
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
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
                    { label: 'Bosses tracked', value: Object.values(pendingImport.bossData).filter(b => b.status !== 'pending').length },
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
      </div>
    </div>
  );
}

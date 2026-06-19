import { useState } from 'react';
import { useStore, totalDefeated, totalAttempts } from '../store/context';
import { ALL_BOSSES } from '../data/bosses';

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
      lines.push(`**Weapons:** ${build.mainhand || '—'} / ${build.offhand || '—'}`);
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

export default function Export() {
  const store = useStore();
  const { state } = store;
  const [format, setFormat] = useState<Format>('json');
  const [copied, setCopied] = useState(false);

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
      </div>
    </div>
  );
}

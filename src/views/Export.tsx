import { character } from '../data/seed';

interface ExportFormat {
  id: string;
  label: string;
  ext: string;
  description: string;
  icon: string;
}

const formats: ExportFormat[] = [
  {
    id: 'json',
    label: 'JSON',
    ext: '.json',
    description: 'Full structured data — boss log, build history, journal, timeline. Import into other tools or back up your journey.',
    icon: '{ }',
  },
  {
    id: 'markdown',
    label: 'Markdown',
    ext: '.md',
    description: 'A readable document: timeline of events, boss log, build snapshots, and journal entries formatted as narrative text.',
    icon: '# —',
  },
  {
    id: 'pdf',
    label: 'PDF',
    ext: '.pdf',
    description: 'Print-ready layout: a formatted record of your full playthrough, suitable for keeping or sharing.',
    icon: '⬜',
  },
];

const fieldGroups = [
  {
    label: 'Journey',
    fields: [
      { id: 'timeline', label: 'Timeline events' },
      { id: 'milestones', label: 'Milestones' },
    ],
  },
  {
    label: 'Combat',
    fields: [
      { id: 'bosses', label: 'Boss log & attempts' },
      { id: 'tierlist', label: 'Tier list ranking' },
    ],
  },
  {
    label: 'Character',
    fields: [
      { id: 'build', label: 'Current build' },
      { id: 'build_history', label: 'Build history' },
    ],
  },
  {
    label: 'Writing',
    fields: [
      { id: 'journal', label: 'Journal entries' },
    ],
  },
];

export default function Export() {
  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>
            Archive
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold mb-3" style={{ color: '#E8E3D8' }}>
            Export
          </h1>
          <p className="font-body text-sm leading-relaxed" style={{ color: '#5A5650' }}>
            Your journey belongs to you. Export the full record of{' '}
            <span style={{ color: '#C9A876' }}>{character.name}</span>'s{' '}
            {character.totalHours}-hour playthrough as a permanent artifact.
          </p>
        </div>

        {/* Format selection */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>
            Format
          </h2>
          <div className="space-y-3">
            {formats.map((fmt, i) => (
              <label
                key={fmt.id}
                className="flex items-start gap-4 p-4 rounded-sm border cursor-pointer transition-colors hover:border-[#3A3835] group focus-within:border-[#C9A876]"
                style={{
                  background: '#1A1A1A',
                  borderColor: i === 0 ? '#C9A876' : '#2A2925',
                }}
              >
                <input
                  type="radio"
                  name="format"
                  value={fmt.id}
                  defaultChecked={i === 0}
                  className="mt-1 accent-[#C9A876] focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-body text-xs font-semibold tracking-widest"
                      style={{ color: '#5A5650' }}
                    >
                      {fmt.icon}
                    </span>
                    <span className="font-display text-lg font-semibold" style={{ color: '#E8E3D8' }}>
                      {fmt.label}
                    </span>
                    <span className="font-body text-xs" style={{ color: '#5A5650' }}>
                      {fmt.ext}
                    </span>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#5A5650' }}>
                    {fmt.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Field selection */}
        <div
          className="mb-8 rounded-sm border p-5"
          style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
        >
          <h2 className="font-display text-2xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>
            Include
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {fieldGroups.map(group => (
              <div key={group.label}>
                <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: '#5A5650' }}>
                  {group.label}
                </p>
                <div className="space-y-2">
                  {group.fields.map(field => (
                    <label key={field.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="accent-[#C9A876]"
                      />
                      <span className="font-body text-sm transition-colors group-hover:text-[#E8E3D8]" style={{ color: '#9A9590' }}>
                        {field.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey summary */}
        <div
          className="mb-8 rounded-sm border p-5"
          style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
        >
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: '#E8E3D8' }}>
            What's included
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Timeline events', value: '10' },
              { label: 'Bosses logged', value: '15' },
              { label: 'Build snapshots', value: '4' },
              { label: 'Journal entries', value: '4' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-display text-2xl font-semibold" style={{ color: '#C9A876' }}>{value}</p>
                <p className="font-body text-xs" style={{ color: '#5A5650' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export button */}
        <button
          className="w-full py-3.5 rounded-sm border font-display text-lg font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876]"
          style={{
            borderColor: '#C9A876',
            color: '#C9A876',
            background: 'transparent',
          }}
        >
          Export Journey
        </button>

        <p className="text-center font-body text-xs mt-3" style={{ color: '#3A3835' }}>
          Your data never leaves your device
        </p>
      </div>
    </div>
  );
}

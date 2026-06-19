import { journalEntries } from '../data/seed';

const moodColors: Record<string, string> = {
  wonder: '#C9A876',
  dread: '#8B2E2E',
  resolute: '#7A9CB8',
  awe: '#9DB88A',
};

export default function Journal() {
  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>
            Personal Record
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>
            Journal
          </h1>
          <p className="font-body text-sm mt-2" style={{ color: '#5A5650' }}>
            {journalEntries.length} entries · Notes from the Lands Between
          </p>
        </div>

        {/* Filter bar */}
        <div
          className="flex items-center gap-2 flex-wrap mb-8 pb-6 border-b"
          style={{ borderColor: '#2A2925' }}
        >
          {['All', 'Exploration', 'Bosses', 'Build', 'DLC'].map((filter, i) => (
            <button
              key={filter}
              className="px-3 py-1.5 rounded-sm text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
              style={{
                borderColor: i === 0 ? '#C9A876' : '#2A2925',
                color: i === 0 ? '#C9A876' : '#5A5650',
                background: i === 0 ? 'rgba(201,168,118,0.06)' : 'transparent',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Entries */}
        <div className="space-y-8">
          {journalEntries.map((entry, i) => {
            const mood = entry.mood;
            const moodColor = mood ? (moodColors[mood] ?? '#5A5650') : '#5A5650';

            return (
              <article
                key={entry.id}
                className="group"
              >
                <div className="flex items-start gap-4">
                  {/* Date column */}
                  <div className="flex-shrink-0 w-12 text-right pt-1">
                    <p className="font-body text-xs leading-tight" style={{ color: '#5A5650' }}>
                      {entry.date.split('-')[1]}/{entry.date.split('-')[2]}
                    </p>
                    <p className="font-body text-xs" style={{ color: '#3A3835' }}>
                      {entry.date.split('-')[0]}
                    </p>
                  </div>

                  {/* Spine line + node */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                      className="w-2.5 h-2.5 rounded-full mt-1.5 border transition-colors group-hover:border-[#C9A876]"
                      style={{
                        borderColor: mood ? moodColor : '#3A3835',
                        background: '#121212',
                        boxShadow: mood ? `0 0 6px ${moodColor}44` : 'none',
                      }}
                    />
                    {i < journalEntries.length - 1 && (
                      <div
                        className="w-px flex-1 mt-2"
                        style={{
                          minHeight: '80px',
                          background: 'linear-gradient(to bottom, #2A2925, transparent)',
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2
                        className="font-display text-2xl font-semibold leading-snug"
                        style={{ color: '#E8E3D8' }}
                      >
                        {entry.title}
                      </h2>
                      {mood && (
                        <span
                          className="flex-shrink-0 mt-1 text-xs font-body px-2 py-0.5 rounded"
                          style={{
                            color: moodColor,
                            background: `${moodColor}18`,
                          }}
                        >
                          {mood}
                        </span>
                      )}
                    </div>

                    <div
                      className="font-body text-sm leading-relaxed space-y-3 mb-4"
                      style={{ color: '#9A9590' }}
                    >
                      {entry.body.split('\n\n').map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>

                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs font-body cursor-pointer transition-colors hover:text-[#E8E3D8]"
                            style={{ background: '#1A1A1A', color: '#5A5650', border: '1px solid #2A2925' }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* New entry prompt */}
        <div
          className="mt-4 rounded-sm border border-dashed p-6 text-center"
          style={{ borderColor: '#2A2925' }}
        >
          <p className="font-display text-2xl mb-1" style={{ color: '#3A3835' }}>
            Record what happened
          </p>
          <p className="font-body text-sm" style={{ color: '#3A3835' }}>
            Your next session's notes will appear here
          </p>
        </div>
      </div>
    </div>
  );
}

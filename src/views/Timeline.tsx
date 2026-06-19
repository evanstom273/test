import { timelineEvents, type TimelineEvent, type EventType } from '../data/seed';

const eventStyles: Record<EventType, { icon: string; color: string; label: string }> = {
  start:     { icon: '◈', color: '#C9A876', label: 'Start' },
  boss:      { icon: '☠', color: '#C9A876', label: 'Boss' },
  build:     { icon: '⚙', color: '#7A9CB8', label: 'Build' },
  journal:   { icon: '✦', color: '#9B8A6E', label: 'Journal' },
  milestone: { icon: '◇', color: '#9DB88A', label: 'Milestone' },
};

function isDefeated(e: TimelineEvent) {
  return e.type === 'boss' && e.tags?.includes('defeated');
}

function TimelineNode({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) {
  const style = eventStyles[event.type];
  const defeated = isDefeated(event);

  return (
    <div
      className={`relative flex items-start gap-4 mb-12 w-full md:w-[calc(50%-2rem)] ${
        side === 'left' ? 'md:mr-auto md:pr-8 md:flex-row-reverse md:text-right' : 'md:ml-auto md:pl-8'
      }`}
    >
      {/* Node dot — sits on the spine */}
      <div
        className="hidden md:flex absolute top-1 items-center justify-center w-5 h-5 rounded-full border flex-shrink-0 z-10"
        style={{
          [side === 'left' ? 'right' : 'left']: '-2.7rem',
          borderColor: style.color,
          background: '#121212',
          boxShadow: `0 0 8px ${style.color}55`,
        }}
      >
        <span className="text-[8px]" style={{ color: style.color }}>●</span>
      </div>

      {/* Mobile dot */}
      <div
        className="md:hidden flex-shrink-0 w-4 h-4 rounded-full border mt-1"
        style={{
          borderColor: style.color,
          background: '#121212',
          boxShadow: `0 0 6px ${style.color}55`,
        }}
      />

      {/* Card */}
      <div
        className="flex-1 rounded-sm border p-4 transition-colors hover:border-[#3A3835]"
        style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
      >
        <div className={`flex items-center gap-2 mb-2 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
          <span className="text-xs" style={{ color: style.color }}>{style.icon}</span>
          <span className="font-body text-xs tracking-wider uppercase" style={{ color: '#5A5650' }}>
            {style.label}
          </span>
          <span className="font-body text-xs ml-auto" style={{ color: '#5A5650' }}>
            {event.timestamp}
          </span>
        </div>

        <h3
          className="font-display text-lg font-semibold leading-snug mb-1"
          style={{ color: defeated ? '#C9A876' : '#E8E3D8' }}
        >
          {event.title}
        </h3>

        {event.location && (
          <p className="font-body text-xs mb-2" style={{ color: '#5A5650' }}>
            {event.location}
          </p>
        )}

        {event.body && (
          <p className="font-body text-sm leading-relaxed" style={{ color: '#9A9590' }}>
            {event.body}
          </p>
        )}

        {event.tags && event.tags.length > 0 && (
          <div className={`flex flex-wrap gap-1.5 mt-3 ${side === 'left' ? 'md:justify-end' : ''}`}>
            {event.tags.filter(t => t !== 'defeated').map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs font-body"
                style={{ background: '#121212', color: '#5A5650' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#5A5650' }}>
            The Path
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>
            Journey Timeline
          </h1>
          <p className="font-body text-sm mt-3" style={{ color: '#5A5650' }}>
            87 hours · 10 events recorded · Malenia awaits
          </p>
        </div>

        {/* Spine + events */}
        <div className="relative">
          {/* The spine line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #C9A876 4%, #3A3835 30%, #3A3835 70%, #C9A876 96%, transparent 100%)',
            }}
          />

          {/* Top grace site marker */}
          <div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-3 w-3 h-3 rounded-full items-center justify-center z-10"
            style={{ background: '#C9A876', boxShadow: '0 0 12px #C9A876' }}
          />

          {/* Events */}
          <div className="flex flex-col gap-0 md:block">
            {timelineEvents.map((event, i) => (
              <TimelineNode
                key={event.id}
                event={event}
                side={i % 2 === 0 ? 'right' : 'left'}
              />
            ))}
          </div>

          {/* Bottom grace site marker (pending) */}
          <div className="hidden md:flex justify-center mt-8">
            <div
              className="w-3 h-3 rounded-full opacity-30"
              style={{ background: '#C9A876', boxShadow: '0 0 8px #C9A876' }}
            />
          </div>
        </div>

        {/* Add event hint */}
        <div
          className="mt-16 mx-auto max-w-sm rounded-sm border border-dashed p-4 text-center"
          style={{ borderColor: '#2A2925' }}
        >
          <p className="font-body text-sm" style={{ color: '#5A5650' }}>
            Your next event will appear here
          </p>
        </div>
      </div>
    </div>
  );
}

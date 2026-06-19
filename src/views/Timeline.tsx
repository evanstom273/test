import { useState } from 'react';
import { useStore, todayISO } from '../store/context';
import type { TimelineEvent, EventType } from '../store/types';

const eventStyles: Record<EventType, { icon: string; color: string; label: string }> = {
  start:     { icon: '◈', color: '#C9A876', label: 'Start' },
  boss:      { icon: '☠', color: '#C9A876', label: 'Boss' },
  build:     { icon: '⚙', color: '#7A9CB8', label: 'Build' },
  journal:   { icon: '✦', color: '#9B8A6E', label: 'Journal' },
  milestone: { icon: '◇', color: '#9DB88A', label: 'Milestone' },
};

function TimelineNode({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) {
  const style = eventStyles[event.type];
  const defeated = event.tags.includes('defeated');

  return (
    <div className={`relative flex items-start gap-4 mb-10 w-full md:w-[calc(50%-2.5rem)] ${
      side === 'left' ? 'md:mr-auto md:pr-8 md:flex-row-reverse md:text-right' : 'md:ml-auto md:pl-8'
    }`}>
      <div className="hidden md:flex absolute top-2 items-center justify-center w-4 h-4 rounded-full border flex-shrink-0 z-10"
        style={{ [side === 'left' ? 'right' : 'left']: '-2.3rem', borderColor: style.color, background: '#121212', boxShadow: `0 0 8px ${style.color}55` }}>
        <span className="text-[7px]" style={{ color: style.color }}>●</span>
      </div>
      <div className="md:hidden flex-shrink-0 w-3.5 h-3.5 rounded-full border mt-1.5"
        style={{ borderColor: style.color, background: '#121212', boxShadow: `0 0 6px ${style.color}55` }} />
      <div className="flex-1 rounded-sm border p-4 transition-colors hover:border-[#3A3835]"
        style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
        <div className={`flex items-center gap-2 mb-2 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
          <span className="text-xs" style={{ color: style.color }}>{style.icon}</span>
          <span className="font-body text-xs tracking-wider uppercase" style={{ color: '#5A5650' }}>{style.label}</span>
          <span className="font-body text-xs ml-auto" style={{ color: '#5A5650' }}>{event.timestamp}</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug mb-1" style={{ color: defeated ? '#C9A876' : '#E8E3D8' }}>
          {event.title}
        </h3>
        {event.location && (
          <p className="font-body text-xs mb-2" style={{ color: '#5A5650' }}>{event.location}</p>
        )}
        {event.body && (
          <p className="font-body text-sm leading-relaxed" style={{ color: '#9A9590' }}>{event.body}</p>
        )}
        {event.tags.filter(t => t !== 'defeated' && t !== 'attempted' && t !== 'boss').length > 0 && (
          <div className={`flex flex-wrap gap-1.5 mt-3 ${side === 'left' ? 'md:justify-end' : ''}`}>
            {event.tags.filter(t => t !== 'defeated' && t !== 'attempted' && t !== 'boss').map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs font-body" style={{ background: '#121212', color: '#5A5650' }}>
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
  const { state, addTimeline } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'milestone' as EventType, title: '', body: '', location: '', tags: '' });

  const sorted = [...state.timeline].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    addTimeline({
      type: form.type,
      timestamp: todayISO(),
      title: form.title.trim(),
      body: form.body.trim(),
      location: form.location.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setForm({ type: 'milestone', title: '', body: '', location: '', tags: '' });
    setShowForm(false);
  }

  const defeated = Object.values(state.bossData).filter(b => b.status === 'defeated').length;
  const attempted = Object.values(state.bossData).filter(b => b.status === 'attempted').length;

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#5A5650' }}>The Path</p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>Journey Timeline</h1>
          <p className="font-body text-sm mt-3" style={{ color: '#5A5650' }}>
            {state.totalHours} hrs · {sorted.length} events · {defeated} defeated · {attempted} in progress
          </p>
        </div>

        {/* Add event */}
        <div className="flex justify-center mb-12">
          {!showForm ? (
            <button onClick={() => setShowForm(true)}
              className="px-5 py-2 rounded-sm border font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:border-[#C9A876] hover:text-[#C9A876]"
              style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
              + Record Event
            </button>
          ) : (
            <form onSubmit={handleAdd} className="w-full max-w-lg rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#C9A876' }}>
              <p className="font-body text-xs tracking-wide uppercase mb-3" style={{ color: '#5A5650' }}>New Event</p>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {(Object.keys(eventStyles) as EventType[]).filter(t => t !== 'start').map(t => (
                    <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                      className="px-2.5 py-1 rounded-sm text-xs font-body border transition-colors"
                      style={{ borderColor: form.type === t ? eventStyles[t].color : '#2A2925', color: form.type === t ? eventStyles[t].color : '#5A5650', background: '#121212' }}>
                      {eventStyles[t].icon} {eventStyles[t].label}
                    </button>
                  ))}
                </div>
                <input type="text" placeholder="Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                  style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                <textarea placeholder="What happened?" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={3}
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876] resize-none"
                  style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                  <input type="text" placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                </div>
                <div className="flex gap-2">
                  <button type="submit"
                    className="flex-1 py-2 rounded-sm border font-display text-sm font-semibold transition-all hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                    style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
                    Save Event
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-sm border font-body text-sm transition-colors hover:border-[#5A5650]"
                    style={{ borderColor: '#2A2925', color: '#5A5650', background: 'transparent' }}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Spine + events */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #C9A876 4%, #3A3835 30%, #3A3835 70%, #C9A876 96%, transparent 100%)' }} />
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-2 w-2.5 h-2.5 rounded-full items-center justify-center z-10"
            style={{ background: '#C9A876', boxShadow: '0 0 12px #C9A876' }} />

          <div className="flex flex-col gap-0 md:block">
            {sorted.map((event, i) => (
              <TimelineNode key={event.id} event={event} side={i % 2 === 0 ? 'right' : 'left'} />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display text-2xl mb-2" style={{ color: '#3A3835' }}>The journey has not yet begun</p>
              <p className="font-body text-sm" style={{ color: '#3A3835' }}>Record your first event above</p>
            </div>
          )}

          <div className="hidden md:flex justify-center mt-6">
            <div className="w-2.5 h-2.5 rounded-full opacity-25" style={{ background: '#C9A876', boxShadow: '0 0 8px #C9A876' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

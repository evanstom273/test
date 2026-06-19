import { useState } from 'react';
import { useStore, todayISO } from '../store/context';

const moodColors: Record<string, string> = {
  wonder: '#C9A876', dread: '#8B2E2E', resolute: '#7A9CB8',
  awe: '#9DB88A', frustrated: '#A05C3B', joy: '#D4B87A',
};

const MOODS = ['wonder', 'awe', 'resolute', 'frustrated', 'dread', 'joy'];

export default function Journal() {
  const { state, addJournal } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '', tags: '', mood: '' });
  const [activeTag, setActiveTag] = useState('');

  const allTags = [...new Set(state.journal.flatMap(e => e.tags))].sort();

  const filtered = state.journal.filter(e =>
    !activeTag || e.tags.includes(activeTag)
  );

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    addJournal({
      date: todayISO(),
      title: form.title.trim(),
      body: form.body.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      mood: form.mood,
    });
    setForm({ title: '', body: '', tags: '', mood: '' });
    setShowForm(false);
  }

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>Personal Record</p>
            <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>Journal</h1>
            <p className="font-body text-sm mt-2" style={{ color: '#5A5650' }}>
              {state.journal.length} {state.journal.length === 1 ? 'entry' : 'entries'} · Notes from the Lands Between
            </p>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-sm border font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:border-[#C9A876] hover:text-[#C9A876]"
            style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
            {showForm ? 'Cancel' : '+ New Entry'}
          </button>
        </div>

        {/* New entry form */}
        {showForm && (
          <form onSubmit={handleAdd} className="mb-10 rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#C9A876' }}>
            <p className="font-body text-xs tracking-wide uppercase mb-4" style={{ color: '#5A5650' }}>New Journal Entry</p>
            <div className="space-y-3">
              <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Title *"
                className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
              <textarea required value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={8}
                placeholder="What happened? What did you feel? What did you learn?..."
                className="w-full px-3 py-3 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876] resize-none leading-relaxed"
                style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Tags (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    placeholder="e.g. malenia, exploration"
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                </div>
                <div>
                  <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Mood</label>
                  <div className="flex flex-wrap gap-1.5">
                    {MOODS.map(m => (
                      <button key={m} type="button" onClick={() => setForm(f => ({ ...f, mood: f.mood === m ? '' : m }))}
                        className="px-2 py-1 rounded text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
                        style={{ borderColor: form.mood === m ? (moodColors[m] ?? '#5A5650') : '#2A2925', color: form.mood === m ? (moodColors[m] ?? '#5A5650') : '#5A5650', background: '#121212' }}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit"
                className="w-full py-2.5 rounded-sm border font-display text-base font-semibold tracking-wide transition-all hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
                Record Entry
              </button>
            </div>
          </form>
        )}

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-8 pb-6 border-b" style={{ borderColor: '#2A2925' }}>
            <button onClick={() => setActiveTag('')}
              className="px-3 py-1.5 rounded-sm text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
              style={{ borderColor: !activeTag ? '#C9A876' : '#2A2925', color: !activeTag ? '#C9A876' : '#5A5650', background: !activeTag ? 'rgba(201,168,118,0.06)' : 'transparent' }}>
              All
            </button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag === activeTag ? '' : tag)}
                className="px-3 py-1.5 rounded-sm text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
                style={{ borderColor: activeTag === tag ? '#C9A876' : '#2A2925', color: activeTag === tag ? '#C9A876' : '#5A5650', background: activeTag === tag ? 'rgba(201,168,118,0.06)' : 'transparent' }}>
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Entries */}
        {filtered.length === 0 ? (
          <div className="rounded-sm border border-dashed p-12 text-center" style={{ borderColor: '#2A2925' }}>
            <p className="font-display text-2xl mb-2" style={{ color: '#3A3835' }}>
              {state.journal.length === 0 ? 'The pages are blank' : 'No entries match this tag'}
            </p>
            <p className="font-body text-sm" style={{ color: '#3A3835' }}>
              {state.journal.length === 0 ? 'Write your first entry above' : 'Try a different filter'}
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {filtered.map((entry, i) => {
              const moodColor = entry.mood ? (moodColors[entry.mood] ?? '#5A5650') : '#5A5650';
              return (
                <article key={entry.id} className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 text-right pt-1">
                      <p className="font-body text-xs leading-tight" style={{ color: '#5A5650' }}>
                        {entry.date.split('-').slice(1).join('/')}
                      </p>
                      <p className="font-body text-xs" style={{ color: '#3A3835' }}>{entry.date.split('-')[0]}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full mt-1.5 border transition-colors"
                        style={{ borderColor: entry.mood ? moodColor : '#3A3835', background: '#121212', boxShadow: entry.mood ? `0 0 6px ${moodColor}44` : 'none' }} />
                      {i < filtered.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ minHeight: '80px', background: 'linear-gradient(to bottom, #2A2925, transparent)' }} />
                      )}
                    </div>
                    <div className="flex-1 pb-10">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="font-display text-2xl font-semibold leading-snug" style={{ color: '#E8E3D8' }}>{entry.title}</h2>
                        {entry.mood && (
                          <span className="flex-shrink-0 mt-1 text-xs font-body px-2 py-0.5 rounded"
                            style={{ color: moodColor, background: `${moodColor}18` }}>
                            {entry.mood}
                          </span>
                        )}
                      </div>
                      <div className="font-body text-sm leading-relaxed space-y-3 mb-4" style={{ color: '#9A9590' }}>
                        {entry.body.split('\n\n').map((para, j) => <p key={j}>{para}</p>)}
                      </div>
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.tags.map(tag => (
                            <button key={tag} onClick={() => setActiveTag(tag)}
                              className="px-2 py-0.5 rounded text-xs font-body cursor-pointer transition-colors hover:text-[#E8E3D8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
                              style={{ background: '#1A1A1A', color: '#5A5650', border: '1px solid #2A2925' }}>
                              #{tag}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

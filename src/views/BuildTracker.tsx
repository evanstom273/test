import { useState } from 'react';
import { useStore, todayISO } from '../store/context';
import type { BuildSnapshot, StatBlock } from '../store/types';

const STAT_DEFS = [
  { key: 'vigor',        label: 'VIG', color: '#8B2E2E' },
  { key: 'mind',         label: 'MND', color: '#7A9CB8' },
  { key: 'endurance',    label: 'END', color: '#9DB88A' },
  { key: 'strength',     label: 'STR', color: '#C9A876' },
  { key: 'dexterity',    label: 'DEX', color: '#9B8A6E' },
  { key: 'intelligence', label: 'INT', color: '#A08AB8' },
  { key: 'faith',        label: 'FAI', color: '#D4B87A' },
  { key: 'arcane',       label: 'ARC', color: '#8BA88B' },
] as const;

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs w-8 flex-shrink-0 tracking-wider" style={{ color: '#5A5650' }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#2A2925' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(value / 99) * 100}%`, background: color, boxShadow: `0 0 6px ${color}66` }} />
      </div>
      <span className="font-body text-sm font-semibold w-7 text-right flex-shrink-0" style={{ color: '#E8E3D8' }}>{value}</span>
    </div>
  );
}

function EquipSlot({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-sm border" style={{ background: '#121212', borderColor: '#2A2925' }}>
      <p className="font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#5A5650' }}>{label}</p>
      <p className="font-body text-xs" style={{ color: value === '—' ? '#3A3835' : '#E8E3D8' }}>{value}</p>
    </div>
  );
}

const BLANK_BUILD: Omit<BuildSnapshot, 'id'> = {
  date: '', label: '',
  stats: { level: 1, vigor: 10, mind: 10, endurance: 10, strength: 10, dexterity: 10, intelligence: 10, faith: 10, arcane: 10 },
  mainhand: '', offhand: '', helm: '', chest: '', gauntlets: '', legs: '',
  talisman1: '—', talisman2: '—', talisman3: '—', talisman4: '—',
  cracked: 4, cerulean: 0, note: '',
};

export default function BuildTracker() {
  const { state, saveBuild } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<BuildSnapshot, 'id'>>({ ...BLANK_BUILD, date: todayISO() });

  const currentBuild = state.builds.length > 0 ? state.builds[state.builds.length - 1] : null;

  function setStats(key: keyof StatBlock, value: number) {
    setForm(f => ({ ...f, stats: { ...f.stats, [key]: Math.max(1, Math.min(99, value)) } }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.label.trim()) return;
    saveBuild(form);
    setShowForm(false);
    setForm({ ...BLANK_BUILD, date: todayISO() });
  }

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>Character Build</p>
            <div className="flex items-end gap-4 flex-wrap">
              <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>Build Tracker</h1>
              {currentBuild && (
                <span className="pb-2 font-display text-xl" style={{ color: '#C9A876' }}>Lv {currentBuild.stats.level}</span>
              )}
            </div>
          </div>
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-sm border font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:border-[#C9A876] hover:text-[#C9A876]"
            style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
            {showForm ? 'Cancel' : '+ Save Snapshot'}
          </button>
        </div>

        {/* Save build form */}
        {showForm && (
          <form onSubmit={handleSave} className="mb-8 rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#C9A876' }}>
            <p className="font-body text-xs tracking-wide uppercase mb-4" style={{ color: '#5A5650' }}>New Build Snapshot</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Snapshot Label *</label>
                  <input type="text" required value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                    placeholder="e.g. Faith/Strength pivot"
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                </div>
                <div>
                  <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Date</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                </div>
              </div>

              {/* Stats */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <label className="font-body text-xs tracking-wide uppercase" style={{ color: '#5A5650' }}>Attributes</label>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs" style={{ color: '#5A5650' }}>Level</span>
                    <input type="number" min={1} max={713} value={form.stats.level} onChange={e => setStats('level', parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 rounded-sm text-sm font-body border outline-none text-center focus:border-[#C9A876]"
                      style={{ background: '#121212', borderColor: '#2A2925', color: '#C9A876' }} />
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {STAT_DEFS.map(({ key, label, color }) => (
                    <div key={key} className="text-center">
                      <p className="font-body text-[10px] mb-1" style={{ color: '#5A5650' }}>{label}</p>
                      <input type="number" min={1} max={99} value={form.stats[key]}
                        onChange={e => setStats(key, parseInt(e.target.value) || 1)}
                        className="w-full px-1 py-1.5 rounded-sm text-sm font-body border outline-none text-center focus:border-[#C9A876]"
                        style={{ background: '#121212', borderColor: '#2A2925', color }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="grid grid-cols-2 gap-2">
                {(['mainhand', 'offhand', 'helm', 'chest', 'gauntlets', 'legs'] as const).map(slot => (
                  <div key={slot}>
                    <label className="block font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#5A5650' }}>
                      {slot === 'mainhand' ? 'Right Hand' : slot === 'offhand' ? 'Left Hand' : slot.charAt(0).toUpperCase() + slot.slice(1)}
                    </label>
                    <input type="text" value={form[slot]} onChange={e => setForm(f => ({ ...f, [slot]: e.target.value }))}
                      placeholder="—"
                      className="w-full px-2 py-1.5 rounded-sm text-xs font-body border outline-none focus:border-[#C9A876]"
                      style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                  </div>
                ))}
              </div>

              {/* Talismans */}
              <div className="grid grid-cols-2 gap-2">
                {(['talisman1', 'talisman2', 'talisman3', 'talisman4'] as const).map((t, i) => (
                  <div key={t}>
                    <label className="block font-body text-[10px] uppercase mb-1" style={{ color: '#5A5650' }}>Talisman {i + 1}</label>
                    <input type="text" value={form[t]} onChange={e => setForm(f => ({ ...f, [t]: e.target.value }))} placeholder="—"
                      className="w-full px-2 py-1.5 rounded-sm text-xs font-body border outline-none focus:border-[#C9A876]"
                      style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                  </div>
                ))}
              </div>

              {/* Flasks + note */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Crimson Flasks</label>
                  <input type="number" min={0} max={14} value={form.cracked} onChange={e => setForm(f => ({ ...f, cracked: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                </div>
                <div>
                  <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Cerulean Flasks</label>
                  <input type="number" min={0} max={14} value={form.cerulean} onChange={e => setForm(f => ({ ...f, cerulean: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876]"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Build Note</label>
                <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} rows={2}
                  placeholder="What changed and why?"
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none focus:border-[#C9A876] resize-none"
                  style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }} />
              </div>

              <button type="submit"
                className="w-full py-2.5 rounded-sm border font-display text-base font-semibold tracking-wide transition-all hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
                Save Snapshot
              </button>
            </div>
          </form>
        )}

        {/* Current build */}
        {currentBuild ? (
          <div className="grid lg:grid-cols-5 gap-6 mb-10">
            <div className="lg:col-span-2 rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
              <h2 className="font-display text-xl font-semibold mb-1" style={{ color: '#E8E3D8' }}>Attributes</h2>
              <p className="font-body text-xs mb-4" style={{ color: '#5A5650' }}>{currentBuild.label}</p>
              <div className="space-y-3">
                {STAT_DEFS.map(({ key, label, color }) => (
                  <StatBar key={key} label={label} value={currentBuild.stats[key]} color={color} />
                ))}
              </div>
              <div className="mt-6 pt-5 border-t flex gap-6" style={{ borderColor: '#2A2925' }}>
                <div>
                  <p className="font-body text-xs mb-1" style={{ color: '#5A5650' }}>Crimson</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#8B2E2E' }} />
                    <span className="font-body text-sm font-semibold" style={{ color: '#E8E3D8' }}>{currentBuild.cracked} flasks</span>
                  </div>
                </div>
                <div>
                  <p className="font-body text-xs mb-1" style={{ color: '#5A5650' }}>Cerulean</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#7A9CB8' }} />
                    <span className="font-body text-sm font-semibold" style={{ color: '#E8E3D8' }}>{currentBuild.cerulean} flasks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
                <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>Equipment</h2>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <EquipSlot label="Right Hand" value={currentBuild.mainhand || '—'} />
                  <EquipSlot label="Left Hand" value={currentBuild.offhand || '—'} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <EquipSlot label="Helm" value={currentBuild.helm || '—'} />
                  <EquipSlot label="Chest" value={currentBuild.chest || '—'} />
                  <EquipSlot label="Gauntlets" value={currentBuild.gauntlets || '—'} />
                  <EquipSlot label="Legs" value={currentBuild.legs || '—'} />
                </div>
              </div>
              <div className="rounded-sm border p-4" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
                <h2 className="font-display text-lg font-semibold mb-3" style={{ color: '#E8E3D8' }}>Talismans</h2>
                <div className="grid grid-cols-2 gap-2">
                  {[currentBuild.talisman1, currentBuild.talisman2, currentBuild.talisman3, currentBuild.talisman4].map((t, i) => (
                    <EquipSlot key={i} label={`Talisman ${i + 1}`} value={t} />
                  ))}
                </div>
              </div>
              {currentBuild.note && (
                <div className="rounded-sm border-l-2 px-4 py-3" style={{ borderColor: '#C9A876', background: 'rgba(201,168,118,0.05)' }}>
                  <p className="font-body text-xs mb-1" style={{ color: '#C9A876' }}>Build note</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#9A9590' }}>{currentBuild.note}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-sm border border-dashed p-12 text-center mb-10" style={{ borderColor: '#2A2925' }}>
            <p className="font-display text-2xl mb-2" style={{ color: '#3A3835' }}>No build saved yet</p>
            <p className="font-body text-sm" style={{ color: '#3A3835' }}>Click "+ Save Snapshot" to record your current loadout</p>
          </div>
        )}

        {/* Build history */}
        {state.builds.length > 1 && (
          <div>
            <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: '#E8E3D8' }}>Build History</h2>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(to bottom, #C9A876, #2A2925)' }} />
              <div className="space-y-4 pl-10">
                {[...state.builds].reverse().map((snapshot, i) => (
                  <div key={snapshot.id} className="relative">
                    <div className="absolute -left-[1.65rem] top-4 w-3 h-3 rounded-full border-2"
                      style={{ borderColor: i === 0 ? '#C9A876' : '#3A3835', background: i === 0 ? '#C9A876' : '#121212', boxShadow: i === 0 ? '0 0 8px #C9A876' : 'none' }} />
                    <div className="rounded-sm border p-4 transition-colors"
                      style={{ background: '#1A1A1A', borderColor: i === 0 ? '#C9A876' : '#2A2925' }}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-body text-xs mb-0.5" style={{ color: '#5A5650' }}>{snapshot.date}</p>
                          <h3 className="font-display text-lg font-semibold" style={{ color: i === 0 ? '#C9A876' : '#E8E3D8' }}>
                            {snapshot.label}
                            {i === 0 && <span className="ml-2 text-xs font-body font-normal" style={{ color: '#5A5650' }}>current</span>}
                          </h3>
                        </div>
                        <span className="font-body text-sm" style={{ color: '#5A5650' }}>Lv {snapshot.stats.level}</span>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
                        {STAT_DEFS.map(({ key, label, color }) => (
                          <div key={key} className="text-center">
                            <p className="font-body text-[10px] mb-0.5" style={{ color: '#5A5650' }}>{label}</p>
                            <p className="font-body text-sm font-semibold" style={{ color }}>{snapshot.stats[key]}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 flex-wrap text-xs font-body">
                        {snapshot.mainhand && <span style={{ color: '#5A5650' }}>R: <span style={{ color: '#E8E3D8' }}>{snapshot.mainhand}</span></span>}
                        {snapshot.mainhand && snapshot.offhand && <span style={{ color: '#3A3835' }}>·</span>}
                        {snapshot.offhand && <span style={{ color: '#5A5650' }}>L: <span style={{ color: '#E8E3D8' }}>{snapshot.offhand}</span></span>}
                      </div>
                      {snapshot.note && <p className="font-body text-xs mt-3 leading-relaxed" style={{ color: '#5A5650' }}>{snapshot.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

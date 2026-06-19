import { useState, useMemo } from 'react';
import { useStore, todayISO } from '../store/context';
import type { BuildSnapshot, StatBlock } from '../store/types';
import { WEAPONS, TALISMANS, ALL_SPELLS, calcMemorySlots, isMoonOfNokstella, isWeaponSomber, getMaxUpgrade, MAX_MEMORY_STONES, HELMS, CHESTS, GAUNTLETS_PIECES, LEGS_PIECES } from '../data/items';

type StatKey = 'vigor' | 'mind' | 'endurance' | 'strength' | 'dexterity' | 'intelligence' | 'faith' | 'arcane';

const CLASS_BASES: Record<string, { level: number } & Record<StatKey, number>> = {
  'Vagabond':   { level: 9,  vigor: 15, mind: 10, endurance: 11, strength: 14, dexterity: 13, intelligence: 9,  faith: 9,  arcane: 7  },
  'Warrior':    { level: 8,  vigor: 11, mind: 12, endurance: 11, strength: 10, dexterity: 16, intelligence: 10, faith: 8,  arcane: 9  },
  'Hero':       { level: 7,  vigor: 14, mind: 9,  endurance: 12, strength: 16, dexterity: 9,  intelligence: 7,  faith: 8,  arcane: 11 },
  'Bandit':     { level: 5,  vigor: 10, mind: 11, endurance: 10, strength: 9,  dexterity: 13, intelligence: 9,  faith: 8,  arcane: 14 },
  'Astrologer': { level: 6,  vigor: 9,  mind: 15, endurance: 9,  strength: 8,  dexterity: 12, intelligence: 16, faith: 7,  arcane: 9  },
  'Prophet':    { level: 7,  vigor: 10, mind: 14, endurance: 8,  strength: 11, dexterity: 10, intelligence: 7,  faith: 16, arcane: 10 },
  'Samurai':    { level: 9,  vigor: 12, mind: 11, endurance: 13, strength: 12, dexterity: 15, intelligence: 9,  faith: 8,  arcane: 8  },
  'Prisoner':   { level: 9,  vigor: 11, mind: 12, endurance: 11, strength: 11, dexterity: 14, intelligence: 14, faith: 6,  arcane: 9  },
  'Confessor':  { level: 10, vigor: 10, mind: 13, endurance: 10, strength: 12, dexterity: 12, intelligence: 9,  faith: 14, arcane: 9  },
  'Wretch':     { level: 1,  vigor: 10, mind: 10, endurance: 10, strength: 10, dexterity: 10, intelligence: 10, faith: 10, arcane: 10 },
};

const STAT_KEYS: StatKey[] = ['vigor', 'mind', 'endurance', 'strength', 'dexterity', 'intelligence', 'faith', 'arcane'];

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

const inputCls = 'w-full px-2 py-1.5 rounded-sm text-xs font-body border outline-none focus:border-[#C9A876]';
const inputStyle = { background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' };

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
      <p className="font-body text-xs" style={{ color: (!value || value === '—') ? '#3A3835' : '#E8E3D8' }}>{value || '—'}</p>
    </div>
  );
}

function WeaponInput({
  slot, label, value, onChange,
}: {
  slot: string; label: string;
  value: string; onChange: (v: string) => void;
}) {
  const parsed = useMemo(() => {
    const m = value.match(/^(.+?)(?:\s+\+(\d+))?$/);
    if (!m) return { name: value, upgrade: 0 };
    return { name: m[1].trim(), upgrade: m[2] ? parseInt(m[2]) : 0 };
  }, [value]);

  const isSomber = isWeaponSomber(parsed.name);
  const maxUpgrade = getMaxUpgrade(isSomber);

  function setName(n: string) {
    const upgrade = parsed.upgrade > 0 ? ` +${parsed.upgrade}` : '';
    onChange(n + upgrade);
  }
  function setUpgrade(u: number) {
    const clamped = Math.max(0, Math.min(maxUpgrade, u));
    onChange(parsed.name + (clamped > 0 ? ` +${clamped}` : ''));
  }

  return (
    <div>
      <label className="block font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#5A5650' }}>{label}</label>
      <div className="flex gap-1.5">
        <input list={`wl-${slot}`} value={parsed.name} onChange={e => setName(e.target.value)} placeholder="Weapon name"
          className={`${inputCls} flex-1`} style={inputStyle} />
        <datalist id={`wl-${slot}`}>
          {WEAPONS.map(w => <option key={w.name} value={w.name} />)}
        </datalist>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button type="button" onClick={() => setUpgrade(parsed.upgrade - 1)}
            className="w-5 h-7 rounded-sm text-xs border hover:border-[#5A5650] transition-colors"
            style={{ background: '#121212', borderColor: '#2A2925', color: '#5A5650' }}>−</button>
          <span className="w-10 text-center font-body text-xs" style={{ color: isSomber ? '#A08AB8' : '#C9A876' }}>
            +{parsed.upgrade}
          </span>
          <button type="button" onClick={() => setUpgrade(parsed.upgrade + 1)}
            className="w-5 h-7 rounded-sm text-xs border hover:border-[#5A5650] transition-colors"
            style={{ background: '#121212', borderColor: '#2A2925', color: '#5A5650' }}>+</button>
        </div>
        {parsed.name && (
          <span className="flex-shrink-0 self-center font-body text-[10px] px-1" style={{ color: isSomber ? '#A08AB8' : '#5A5650' }}>
            {isSomber ? 'S' : `/${maxUpgrade}`}
          </span>
        )}
      </div>
    </div>
  );
}

const BLANK_BUILD: Omit<BuildSnapshot, 'id'> = {
  date: '', label: '',
  stats: { level: 1, vigor: 10, mind: 10, endurance: 10, strength: 10, dexterity: 10, intelligence: 10, faith: 10, arcane: 10 },
  rightHand: ['', '', ''], leftHand: ['', '', ''],
  helm: '', chest: '', gauntlets: '', legs: '',
  talisman1: '—', talisman2: '—', talisman3: '—', talisman4: '—',
  cracked: 4, cerulean: 0,
  memoryStonesHeld: 0,
  spells: [],
  note: '',
};

const ARMOR_DATALISTS = [
  { slot: 'helm',      id: 'dl-helm',   items: HELMS },
  { slot: 'chest',     id: 'dl-chest',  items: CHESTS },
  { slot: 'gauntlets', id: 'dl-gaunt',  items: GAUNTLETS_PIECES },
  { slot: 'legs',      id: 'dl-legs',   items: LEGS_PIECES },
] as const;

export default function BuildTracker() {
  const { state, saveBuild, updateBuild } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<BuildSnapshot, 'id'>>({ ...BLANK_BUILD, date: todayISO() });
  const [spellSearch, setSpellSearch] = useState('');
  const [statDraft, setStatDraft] = useState<Partial<Record<StatKey, string>>>({});

  const currentBuild = state.builds.length > 0 ? state.builds[state.builds.length - 1] : null;

  const moonEquipped = [form.talisman1, form.talisman2, form.talisman3, form.talisman4].some(isMoonOfNokstella);
  const totalMemorySlots = calcMemorySlots(form.memoryStonesHeld, moonEquipped);
  const slotsUsed = form.spells.reduce((acc, s) => {
    const spell = ALL_SPELLS.find(sp => sp.name === s);
    return acc + (spell?.slots ?? 1);
  }, 0);
  const slotsRemaining = totalMemorySlots - slotsUsed;

  // Auto-calculate level from class base stats
  const charClass = state.character?.class ?? 'Wretch';
  const bases = CLASS_BASES[charClass] ?? CLASS_BASES['Wretch'];
  const autoLevel = bases.level + STAT_KEYS.reduce((sum, k) => sum + Math.max(0, form.stats[k] - bases[k]), 0);

  function startEdit(snapshot: BuildSnapshot) {
    const { id, ...rest } = snapshot;
    setForm({
      ...rest,
      rightHand: (rest.rightHand ?? ['', '', '']).concat(['', '', '']).slice(0, 3),
      leftHand:  (rest.leftHand  ?? ['', '', '']).concat(['', '', '']).slice(0, 3),
    });
    setEditId(id);
    setShowForm(true);
    setStatDraft({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelForm() {
    setShowForm(false);
    setEditId(null);
    setForm({ ...BLANK_BUILD, date: todayISO() });
    setStatDraft({});
  }

  function onStatChange(key: StatKey, raw: string) {
    setStatDraft(d => ({ ...d, [key]: raw }));
    const n = parseInt(raw, 10);
    if (!isNaN(n)) setForm(f => ({ ...f, stats: { ...f.stats, [key]: n } }));
  }

  function onStatBlur(key: StatKey) {
    const raw = statDraft[key];
    if (raw !== undefined) {
      const n = parseInt(raw, 10);
      const clamped = isNaN(n) ? bases[key] : Math.max(1, Math.min(99, n));
      setForm(f => ({ ...f, stats: { ...f.stats, [key]: clamped } }));
      setStatDraft(d => { const next = { ...d }; delete next[key]; return next; });
    }
  }

  const filteredSpells = useMemo(() =>
    ALL_SPELLS.filter(s =>
      !form.spells.includes(s.name) &&
      s.name.toLowerCase().includes(spellSearch.toLowerCase())
    ).slice(0, 30),
    [form.spells, spellSearch]
  );

  function addSpell(name: string) {
    const spell = ALL_SPELLS.find(s => s.name === name);
    if (!spell) return;
    if (slotsRemaining < spell.slots) return;
    setForm(f => ({ ...f, spells: [...f.spells, name] }));
    setSpellSearch('');
  }

  function removeSpell(name: string) {
    setForm(f => ({ ...f, spells: f.spells.filter(s => s !== name) }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.label.trim()) return;
    const built = { ...form, stats: { ...form.stats, level: autoLevel } };
    if (editId) {
      updateBuild(editId, built);
    } else {
      saveBuild(built);
    }
    cancelForm();
  }

  function getBuildMoonEquipped(build: BuildSnapshot) {
    return [build.talisman1, build.talisman2, build.talisman3, build.talisman4].some(isMoonOfNokstella);
  }
  function getBuildTotalSlots(build: BuildSnapshot) {
    return calcMemorySlots(build.memoryStonesHeld ?? 0, getBuildMoonEquipped(build));
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
          <button onClick={() => showForm ? cancelForm() : setShowForm(true)}
            className="px-4 py-2 rounded-sm border font-body text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:border-[#C9A876] hover:text-[#C9A876]"
            style={{ borderColor: '#2A2925', color: '#5A5650', background: '#1A1A1A' }}>
            {showForm ? 'Cancel' : '+ Save Snapshot'}
          </button>
        </div>

        {/* ── SAVE FORM ─────────────────────────────────────────── */}
        {showForm && (
          <form onSubmit={handleSave} className="mb-8 rounded-sm border p-5 space-y-5" style={{ background: '#1A1A1A', borderColor: '#C9A876' }}>
            <p className="font-body text-xs tracking-wide uppercase" style={{ color: '#5A5650' }}>{editId ? 'Edit Build Snapshot' : 'New Build Snapshot'}</p>

            {/* Label + Date */}
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
              <div className="flex items-center justify-between mb-2">
                <label className="font-body text-xs tracking-wide uppercase" style={{ color: '#5A5650' }}>Attributes</label>
                <div className="flex items-center gap-1.5">
                  <span className="font-body text-xs" style={{ color: '#5A5650' }}>Level</span>
                  <span className="font-display text-lg font-semibold" style={{ color: '#C9A876' }}>{autoLevel}</span>
                  <span className="font-body text-[10px]" style={{ color: '#3A3835' }}>(auto)</span>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {STAT_DEFS.map(({ key, label, color }) => (
                  <div key={key} className="text-center">
                    <p className="font-body text-[10px] mb-1" style={{ color: '#5A5650' }}>{label}</p>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={statDraft[key] ?? String(form.stats[key])}
                      onChange={e => onStatChange(key, e.target.value)}
                      onBlur={() => onStatBlur(key)}
                      className="w-full px-1 py-1.5 rounded-sm text-sm font-body border outline-none text-center focus:border-[#C9A876]"
                      style={{ background: '#121212', borderColor: '#2A2925', color }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Weapons */}
            <div>
              <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: '#5A5650' }}>Weapons</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-body text-[10px] tracking-wide uppercase" style={{ color: '#C9A876' }}>Right Hand</p>
                  {[0, 1, 2].map(i => (
                    <WeaponInput key={`rh-${i}`} slot={`rh${i}`} label={`Slot ${i + 1}`}
                      value={form.rightHand[i] ?? ''}
                      onChange={v => setForm(f => { const a = [...f.rightHand]; a[i] = v; return { ...f, rightHand: a }; })} />
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="font-body text-[10px] tracking-wide uppercase" style={{ color: '#9DB88A' }}>Left Hand</p>
                  {[0, 1, 2].map(i => (
                    <WeaponInput key={`lh-${i}`} slot={`lh${i}`} label={`Slot ${i + 1}`}
                      value={form.leftHand[i] ?? ''}
                      onChange={v => setForm(f => { const a = [...f.leftHand]; a[i] = v; return { ...f, leftHand: a }; })} />
                  ))}
                </div>
              </div>
              <p className="font-body text-[10px] mt-1" style={{ color: '#3A3835' }}>
                S = Somber (max +10) · Normal max +25 · Up to 3 weapons per hand
              </p>
            </div>

            {/* Armour */}
            <div>
              <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: '#5A5650' }}>Armour</p>
              {ARMOR_DATALISTS.map(({ slot, id, items }) => (
                <datalist key={id} id={id}>
                  {items.map(p => <option key={p} value={p} />)}
                </datalist>
              ))}
              <div className="grid grid-cols-2 gap-2">
                {ARMOR_DATALISTS.map(({ slot, id }) => (
                  <div key={slot}>
                    <label className="block font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#5A5650' }}>{slot}</label>
                    <input type="text" list={id} value={form[slot]} onChange={e => setForm(f => ({ ...f, [slot]: e.target.value }))}
                      placeholder="—"
                      className={inputCls} style={inputStyle} />
                  </div>
                ))}
              </div>
            </div>

            {/* Talismans */}
            <div>
              <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: '#5A5650' }}>Talismans</p>
              <div className="grid grid-cols-2 gap-2">
                {(['talisman1', 'talisman2', 'talisman3', 'talisman4'] as const).map((t, i) => (
                  <div key={t}>
                    <label className="block font-body text-[10px] uppercase mb-1" style={{ color: '#5A5650' }}>Talisman {i + 1}</label>
                    <select value={form[t]} onChange={e => setForm(f => ({ ...f, [t]: e.target.value }))}
                      className={`${inputCls} appearance-none`} style={inputStyle}>
                      {TALISMANS.map(tal => <option key={tal} value={tal}>{tal}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Slots + Spells */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-body text-xs tracking-wide uppercase" style={{ color: '#5A5650' }}>Memory & Spells</p>
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs" style={{ color: '#5A5650' }}>
                    Memory Stones:
                  </span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setForm(f => ({ ...f, memoryStonesHeld: Math.max(0, f.memoryStonesHeld - 1) }))}
                      className="w-5 h-5 rounded text-xs border hover:border-[#5A5650]"
                      style={{ background: '#121212', borderColor: '#2A2925', color: '#5A5650' }}>−</button>
                    <span className="w-6 text-center font-body text-sm" style={{ color: '#C9A876' }}>{form.memoryStonesHeld}</span>
                    <button type="button" onClick={() => setForm(f => ({ ...f, memoryStonesHeld: Math.min(MAX_MEMORY_STONES, f.memoryStonesHeld + 1) }))}
                      className="w-5 h-5 rounded text-xs border hover:border-[#5A5650]"
                      style={{ background: '#121212', borderColor: '#2A2925', color: '#5A5650' }}>+</button>
                  </div>
                </div>
              </div>

              {/* Slot summary */}
              <div className="flex items-center gap-3 mb-3 px-3 py-2 rounded-sm border" style={{ background: '#121212', borderColor: '#2A2925' }}>
                <span className="font-body text-xs" style={{ color: '#5A5650' }}>2 base</span>
                {form.memoryStonesHeld > 0 && <><span style={{ color: '#3A3835' }}>+</span><span className="font-body text-xs" style={{ color: '#5A5650' }}>{form.memoryStonesHeld} stone{form.memoryStonesHeld !== 1 ? 's' : ''}</span></>}
                {moonEquipped && <><span style={{ color: '#3A3835' }}>+</span><span className="font-body text-xs" style={{ color: '#A08AB8' }}>2 Moon of Nokstella</span></>}
                <span style={{ color: '#3A3835' }}>=</span>
                <span className="font-body text-sm font-semibold" style={{ color: '#C9A876' }}>{totalMemorySlots} slots</span>
                <span className="ml-auto font-body text-xs" style={{ color: slotsRemaining < 0 ? '#8B2E2E' : '#5A5650' }}>
                  {slotsUsed} used · {slotsRemaining} free
                </span>
              </div>

              {/* Equipped spells */}
              {form.spells.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {form.spells.map(s => {
                    const spell = ALL_SPELLS.find(sp => sp.name === s);
                    return (
                      <div key={s} className="flex items-center gap-1.5 px-2 py-1 rounded-sm border text-xs font-body"
                        style={{ background: '#121212', borderColor: spell?.type === 'sorcery' ? '#A08AB8' : '#D4B87A', color: '#E8E3D8' }}>
                        <span style={{ color: spell?.type === 'sorcery' ? '#A08AB8' : '#D4B87A', fontSize: '10px' }}>
                          {spell?.slots ?? 1}▪
                        </span>
                        {s}
                        {spell?.fp && <span style={{ color: '#7A9CB8', fontSize: '10px' }}>{spell.fp}fp</span>}
                        <button type="button" onClick={() => removeSpell(s)} style={{ color: '#5A5650' }} className="hover:text-[#8B2E2E]">×</button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add spell */}
              {slotsRemaining > 0 && (
                <div>
                  <input type="text" placeholder="Search spells to add..." value={spellSearch} onChange={e => setSpellSearch(e.target.value)}
                    className={`${inputCls} w-full mb-1.5`} style={inputStyle} />
                  {spellSearch && (
                    <div className="rounded-sm border max-h-48 overflow-y-auto" style={{ background: '#0D0D0D', borderColor: '#2A2925' }}>
                      {filteredSpells.length === 0 ? (
                        <p className="px-3 py-2 font-body text-xs" style={{ color: '#3A3835' }}>No spells found</p>
                      ) : filteredSpells.map(spell => {
                        const canAdd = slotsRemaining >= spell.slots;
                        return (
                          <button key={spell.name} type="button"
                            disabled={!canAdd}
                            onClick={() => addSpell(spell.name)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#1F1F1F] transition-colors disabled:opacity-40"
                            style={{ color: '#E8E3D8' }}>
                            <span className="w-4 text-[10px] text-right flex-shrink-0"
                              style={{ color: spell.type === 'sorcery' ? '#A08AB8' : '#D4B87A' }}>{spell.slots}▪</span>
                            <span className="font-body text-xs flex-1">{spell.name}</span>
                            <span className="font-body text-[10px]"
                              style={{ color: spell.type === 'sorcery' ? '#A08AB8' : '#D4B87A' }}>{spell.type}</span>
                            {spell.fp && <span className="font-body text-[10px]" style={{ color: '#7A9CB8' }}>{spell.fp}fp</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Flasks */}
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
              {editId ? 'Update Snapshot' : 'Save Snapshot'}
            </button>
          </form>
        )}

        {/* ── CURRENT BUILD DISPLAY ─────────────────────────────── */}
        {currentBuild ? (
          <div className="grid lg:grid-cols-5 gap-6 mb-10">
            {/* Stats panel */}
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

            {/* Equipment + spells */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
                <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>Equipment</h2>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-3 rounded-sm border" style={{ background: '#121212', borderColor: '#2A2925' }}>
                    <p className="font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#C9A876' }}>Right Hand</p>
                    {(currentBuild.rightHand ?? []).filter(Boolean).map((w, i) => (
                      <p key={i} className="font-body text-xs leading-relaxed" style={{ color: '#E8E3D8' }}>{w}</p>
                    ))}
                    {!(currentBuild.rightHand ?? []).some(Boolean) && <p className="font-body text-xs" style={{ color: '#3A3835' }}>—</p>}
                  </div>
                  <div className="p-3 rounded-sm border" style={{ background: '#121212', borderColor: '#2A2925' }}>
                    <p className="font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#9DB88A' }}>Left Hand</p>
                    {(currentBuild.leftHand ?? []).filter(Boolean).map((w, i) => (
                      <p key={i} className="font-body text-xs leading-relaxed" style={{ color: '#E8E3D8' }}>{w}</p>
                    ))}
                    {!(currentBuild.leftHand ?? []).some(Boolean) && <p className="font-body text-xs" style={{ color: '#3A3835' }}>—</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <EquipSlot label="Helm" value={currentBuild.helm} />
                  <EquipSlot label="Chest" value={currentBuild.chest} />
                  <EquipSlot label="Gauntlets" value={currentBuild.gauntlets} />
                  <EquipSlot label="Legs" value={currentBuild.legs} />
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

              {/* Spells panel */}
              {((currentBuild.spells?.length ?? 0) > 0 || (currentBuild.memoryStonesHeld ?? 0) > 0) && (
                <div className="rounded-sm border p-4" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display text-lg font-semibold" style={{ color: '#E8E3D8' }}>Spells</h2>
                    <span className="font-body text-xs" style={{ color: '#5A5650' }}>
                      {getBuildTotalSlots(currentBuild)} memory slots
                      {getBuildMoonEquipped(currentBuild) && <span style={{ color: '#A08AB8' }}> (Moon)</span>}
                    </span>
                  </div>
                  {(currentBuild.spells?.length ?? 0) > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {currentBuild.spells!.map(s => {
                        const spell = ALL_SPELLS.find(sp => sp.name === s);
                        return (
                          <div key={s} className="flex items-center gap-1.5 px-2 py-1 rounded-sm border text-xs font-body"
                            style={{ background: '#121212', borderColor: spell?.type === 'sorcery' ? '#A08AB8' : '#D4B87A', color: '#E8E3D8' }}>
                            <span style={{ color: spell?.type === 'sorcery' ? '#A08AB8' : '#D4B87A', fontSize: '10px' }}>{spell?.slots ?? 1}▪</span>
                            {s}
                            {spell?.fp && <span style={{ color: '#7A9CB8', fontSize: '10px' }}>{spell.fp}fp</span>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="font-body text-xs" style={{ color: '#3A3835' }}>No spells equipped</p>
                  )}
                </div>
              )}

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

        {/* ── BUILD HISTORY ─────────────────────────────────────── */}
        {state.builds.length > 0 && (
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
                        <div className="flex items-center gap-2">
                          <span className="font-body text-sm" style={{ color: '#5A5650' }}>Lv {snapshot.stats.level}</span>
                          <button onClick={() => startEdit(snapshot)}
                            className="px-2 py-0.5 rounded-sm border font-body text-xs transition-colors hover:border-[#C9A876] hover:text-[#C9A876]"
                            style={{ borderColor: '#2A2925', color: '#5A5650', background: '#121212' }}>
                            Edit
                          </button>
                        </div>
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
                        {(snapshot.rightHand ?? []).filter(Boolean).length > 0 && (
                          <span style={{ color: '#5A5650' }}>R: <span style={{ color: '#E8E3D8' }}>{(snapshot.rightHand ?? []).filter(Boolean).join(', ')}</span></span>
                        )}
                        {(snapshot.rightHand ?? []).filter(Boolean).length > 0 && (snapshot.leftHand ?? []).filter(Boolean).length > 0 && <span style={{ color: '#3A3835' }}>·</span>}
                        {(snapshot.leftHand ?? []).filter(Boolean).length > 0 && (
                          <span style={{ color: '#5A5650' }}>L: <span style={{ color: '#E8E3D8' }}>{(snapshot.leftHand ?? []).filter(Boolean).join(', ')}</span></span>
                        )}
                        {(snapshot.spells?.length ?? 0) > 0 && (
                          <span style={{ color: '#5A5650' }} className="ml-1">
                            · <span style={{ color: '#D4B87A' }}>{snapshot.spells!.length} spell{snapshot.spells!.length !== 1 ? 's' : ''}</span>
                          </span>
                        )}
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

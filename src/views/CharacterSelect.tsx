import { useState } from 'react';
import { useStore } from '../store/context';
import type { Character } from '../store/types';

interface Props {
  onEnter: () => void;
}

const CLASSES = ['Vagabond', 'Warrior', 'Hero', 'Astrologer', 'Prophet', 'Samurai', 'Prisoner', 'Confessor', 'Wretch', 'Bandit'];
const PLATFORMS = ['PC', 'PS5', 'PS4', 'Xbox Series', 'Xbox One'];
const RUN_TYPES = ['First Playthrough', 'Quality Build', 'Pure STR', 'Pure DEX', 'Pure INT', 'Pure FAI', 'Bleed', 'Arcane', 'All Bosses', 'No Hit', 'Speedrun'];

export default function CharacterSelect({ onEnter }: Props) {
  const { state, setCharacter } = useStore();
  const [name, setName] = useState('');
  const [cls, setCls] = useState('Vagabond');
  const [platform, setPlatform] = useState('PC');
  const [runType, setRunType] = useState('First Playthrough');
  const [ng, setNg] = useState(1);
  const [error, setError] = useState('');

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError('Name your Tarnished before you begin.'); return; }
    const char: Character = { name: name.trim(), class: cls, platform, runType, ngCycle: ng, startDate: new Date().toISOString().slice(0, 10) };
    setCharacter(char);
    onEnter();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 scanline-bg" style={{ background: '#121212' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,118,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 w-full max-w-lg">
        <p className="text-center font-body text-xs tracking-[0.3em] uppercase mb-6" style={{ color: '#5A5650' }}>
          Elden Ring Journey Tracker
        </p>
        <h1 className="font-display text-center text-5xl sm:text-6xl font-semibold leading-tight mb-2" style={{ color: '#E8E3D8' }}>
          Begin Your<br /><span style={{ color: '#C9A876' }}>Journey</span>
        </h1>

        <div className="flex items-center gap-4 my-8">
          <hr style={{ flex: 1, borderColor: '#2A2925' }} />
          <span style={{ color: '#C9A876', fontSize: '18px' }}>✦</span>
          <hr style={{ flex: 1, borderColor: '#2A2925' }} />
        </div>

        {/* Existing character */}
        {state.character && (
          <button onClick={onEnter}
            className="w-full group rounded-sm border p-5 mb-6 text-left transition-colors hover:border-[#C9A876] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
            style={{ background: '#1A1A1A', borderColor: '#C9A876' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#5A5650' }}>Continue Journey</p>
                <h2 className="font-display text-3xl font-semibold" style={{ color: '#E8E3D8' }}>{state.character.name}</h2>
              </div>
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-display text-lg font-semibold flex-shrink-0 mt-1"
                style={{ borderColor: '#C9A876', color: '#C9A876' }}>
                {state.character.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs font-body mb-4">
              {[
                ['Class', state.character.class],
                ['Platform', state.character.platform],
                ['Run Type', state.character.runType],
                ['NG Cycle', `NG${state.character.ngCycle > 1 ? `+${state.character.ngCycle - 1}` : ''}`],
                ['Hours', `${state.totalHours} hrs`],
                ['Started', state.character.startDate],
              ].map(([label, value]) => (
                <div key={label}>
                  <p style={{ color: '#5A5650' }} className="mb-0.5">{label}</p>
                  <p style={{ color: '#E8E3D8' }}>{value}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 flex items-center justify-end border-t" style={{ borderColor: '#2A2925' }}>
              <span className="font-body text-xs tracking-wide transition-colors text-[#C9A876]">Open Journal →</span>
            </div>
          </button>
        )}

        {/* New character form */}
        <form onSubmit={handleCreate} className="rounded-sm border p-5" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
          <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5A5650' }}>
            {state.character ? 'Start Over — New Character' : 'New Character'}
          </p>

          <div className="space-y-3">
            <div>
              <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Tarnished Name</label>
              <input type="text" value={name} onChange={e => { setName(e.target.value); setError(''); }}
                placeholder="Name your Tarnished..."
                className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876]"
                style={{ background: '#121212', borderColor: error ? '#8B2E2E' : '#2A2925', color: '#E8E3D8' }} />
              {error && <p className="font-body text-xs mt-1" style={{ color: '#8B2E2E' }}>{error}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Starting Class</label>
                <select value={cls} onChange={e => setCls(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876] appearance-none"
                  style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }}>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876] appearance-none"
                  style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }}>
                  {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>Run Type</label>
              <select value={runType} onChange={e => setRunType(e.target.value)}
                className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876] appearance-none"
                style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }}>
                {RUN_TYPES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-body text-xs mb-2" style={{ color: '#5A5650' }}>NG Cycle</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <button key={n} type="button" onClick={() => setNg(n)}
                    className="px-2.5 py-1 rounded-sm text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
                    style={{ borderColor: ng === n ? '#C9A876' : '#2A2925', color: ng === n ? '#C9A876' : '#5A5650', background: ng === n ? 'rgba(201,168,118,0.08)' : '#121212' }}>
                    {n === 1 ? 'NG' : `NG+${n - 1}`}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit"
              className="w-full mt-2 py-2.5 rounded-sm border font-display text-base font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876]"
              style={{ borderColor: '#C9A876', color: '#C9A876', background: 'transparent' }}>
              Begin the Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

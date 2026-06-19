import { character } from '../data/seed';

interface Props {
  onEnter: () => void;
}

const classes = ['Vagabond', 'Warrior', 'Hero', 'Astrologer', 'Prophet', 'Samurai', 'Prisoner', 'Confessor', 'Wretch', 'Bandit'];
const runTypes = ['First Playthrough', 'Quality Build', 'Pure STR', 'Pure DEX', 'Pure INT', 'Pure FAI', 'Bleed', 'All Bosses', 'No Hit'];

export default function CharacterSelect({ onEnter }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 scanline-bg"
      style={{ background: '#121212' }}
    >
      {/* Subtle Erdtree glow orb */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,118,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Eyebrow */}
        <p
          className="text-center font-body text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: '#5A5650' }}
        >
          Elden Ring Journey Tracker
        </p>

        {/* Title */}
        <h1
          className="font-display text-center text-5xl sm:text-6xl font-semibold leading-tight mb-2"
          style={{ color: '#E8E3D8' }}
        >
          Begin Your<br />
          <span style={{ color: '#C9A876' }}>Journey</span>
        </h1>

        <div className="flex items-center gap-4 my-8">
          <hr style={{ flex: 1, borderColor: '#2A2925' }} />
          <span style={{ color: '#C9A876', fontSize: '18px' }}>✦</span>
          <hr style={{ flex: 1, borderColor: '#2A2925' }} />
        </div>

        {/* Existing character card */}
        <button
          onClick={onEnter}
          className="w-full group rounded-sm border p-5 mb-6 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
          style={{
            background: '#1A1A1A',
            borderColor: '#2A2925',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#5A5650' }}>
                Continue Journey
              </p>
              <h2 className="font-display text-3xl font-semibold" style={{ color: '#E8E3D8' }}>
                {character.name}
              </h2>
            </div>
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-display text-lg font-semibold flex-shrink-0 mt-1 transition-colors group-hover:border-[#C9A876]"
              style={{ borderColor: '#C9A876', color: '#C9A876' }}
            >
              A
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-body">
            {[
              { label: 'Class', value: character.class },
              { label: 'Platform', value: character.platform },
              { label: 'Run Type', value: character.runType },
              { label: 'NG Cycle', value: `NG${character.ngCycle === 1 ? '' : character.ngCycle - 1}` },
              { label: 'Level', value: `${character.rune_level}` },
              { label: 'Hours', value: `${character.totalHours} hrs` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ color: '#5A5650' }} className="mb-0.5">{label}</p>
                <p style={{ color: '#E8E3D8' }}>{value}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-4 pt-4 flex items-center justify-between border-t"
            style={{ borderColor: '#2A2925' }}
          >
            <span className="font-body text-xs" style={{ color: '#5A5650' }}>
              Started {character.startDate}
            </span>
            <span
              className="font-body text-xs tracking-wide transition-colors group-hover:text-[#C9A876]"
              style={{ color: '#5A5650' }}
            >
              Open Journal →
            </span>
          </div>
        </button>

        {/* New character form */}
        <div
          className="rounded-sm border p-5"
          style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
        >
          <p className="font-body text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#5A5650' }}>
            New Character
          </p>

          <div className="space-y-3">
            <div>
              <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>
                Tarnished Name
              </label>
              <input
                type="text"
                placeholder="Name your Tarnished..."
                className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876]"
                style={{
                  background: '#121212',
                  borderColor: '#2A2925',
                  color: '#E8E3D8',
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>
                  Starting Class
                </label>
                <select
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876] appearance-none"
                  style={{
                    background: '#121212',
                    borderColor: '#2A2925',
                    color: '#5A5650',
                  }}
                >
                  {classes.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>
                  Platform
                </label>
                <select
                  className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876] appearance-none"
                  style={{
                    background: '#121212',
                    borderColor: '#2A2925',
                    color: '#5A5650',
                  }}
                >
                  {['PC', 'PS5', 'PS4', 'Xbox Series', 'Xbox One'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>
                Run Type
              </label>
              <select
                className="w-full px-3 py-2 rounded-sm text-sm font-body border outline-none transition-colors focus:border-[#C9A876] appearance-none"
                style={{
                  background: '#121212',
                  borderColor: '#2A2925',
                  color: '#5A5650',
                }}
              >
                {runTypes.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block font-body text-xs mb-1" style={{ color: '#5A5650' }}>
                NG Cycle
              </label>
              <div className="flex gap-2">
                {['NG', 'NG+', 'NG+2', 'NG+3', 'NG+4', 'NG+5', 'NG+6', 'NG+7'].map(ng => (
                  <button
                    key={ng}
                    className="px-2.5 py-1 rounded-sm text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
                    style={{
                      borderColor: '#2A2925',
                      color: '#5A5650',
                      background: '#121212',
                    }}
                  >
                    {ng}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full mt-2 py-2.5 rounded-sm border font-display text-base font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] hover:bg-[#C9A876] hover:text-[#121212] hover:border-[#C9A876]"
              style={{
                borderColor: '#C9A876',
                color: '#C9A876',
                background: 'transparent',
              }}
            >
              Begin the Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

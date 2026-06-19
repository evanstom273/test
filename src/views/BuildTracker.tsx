import { currentBuild, buildHistory } from '../data/seed';

const statOrder = [
  { key: 'vigor', label: 'VIG', max: 99, color: '#8B2E2E' },
  { key: 'mind', label: 'MND', max: 99, color: '#7A9CB8' },
  { key: 'endurance', label: 'END', max: 99, color: '#9DB88A' },
  { key: 'strength', label: 'STR', max: 99, color: '#C9A876' },
  { key: 'dexterity', label: 'DEX', max: 99, color: '#9B8A6E' },
  { key: 'intelligence', label: 'INT', max: 99, color: '#A08AB8' },
  { key: 'faith', label: 'FAI', max: 99, color: '#D4B87A' },
  { key: 'arcane', label: 'ARC', max: 99, color: '#8BA88B' },
] as const;

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span
        className="font-body text-xs w-8 flex-shrink-0 tracking-wider"
        style={{ color: '#5A5650' }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: '#2A2925' }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}66` }}
        />
      </div>
      <span
        className="font-body text-sm font-semibold w-6 text-right flex-shrink-0"
        style={{ color: '#E8E3D8' }}
      >
        {value}
      </span>
    </div>
  );
}

function EquipSlot({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-3 rounded-sm border"
      style={{ background: '#121212', borderColor: '#2A2925' }}
    >
      <p className="font-body text-[10px] tracking-wide uppercase mb-1" style={{ color: '#5A5650' }}>
        {label}
      </p>
      <p className="font-body text-xs" style={{ color: value === '—' ? '#3A3835' : '#E8E3D8' }}>
        {value}
      </p>
    </div>
  );
}

export default function BuildTracker() {
  const stats = currentBuild.stats;

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>
            Character Build
          </p>
          <div className="flex items-end gap-4 flex-wrap">
            <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>
              Build Tracker
            </h1>
            <span
              className="pb-2 font-display text-xl"
              style={{ color: '#C9A876' }}
            >
              Lv {stats.level}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-10">
          {/* Stats panel */}
          <div
            className="lg:col-span-2 rounded-sm border p-5"
            style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
          >
            <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>
              Attributes
            </h2>
            <div className="space-y-3">
              {statOrder.map(({ key, label, max, color }) => (
                <StatBar
                  key={key}
                  label={label}
                  value={stats[key as keyof typeof stats] as number}
                  max={max}
                  color={color}
                />
              ))}
            </div>

            <div className="mt-6 pt-5 border-t flex gap-6" style={{ borderColor: '#2A2925' }}>
              <div>
                <p className="font-body text-xs mb-1" style={{ color: '#5A5650' }}>Crimson</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#8B2E2E' }} />
                  <span className="font-body text-sm font-semibold" style={{ color: '#E8E3D8' }}>
                    {currentBuild.cracked} flasks
                  </span>
                </div>
              </div>
              <div>
                <p className="font-body text-xs mb-1" style={{ color: '#5A5650' }}>Cerulean</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#7A9CB8' }} />
                  <span className="font-body text-sm font-semibold" style={{ color: '#E8E3D8' }}>
                    {currentBuild.cerulean} flasks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="lg:col-span-3 space-y-5">
            <div
              className="rounded-sm border p-5"
              style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
            >
              <h2 className="font-display text-xl font-semibold mb-4" style={{ color: '#E8E3D8' }}>
                Equipment
              </h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <EquipSlot label="Right Hand" value={currentBuild.mainhand} />
                <EquipSlot label="Left Hand" value={currentBuild.offhand} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <EquipSlot label="Helm" value={currentBuild.helm} />
                <EquipSlot label="Chest" value={currentBuild.chest} />
                <EquipSlot label="Gauntlets" value={currentBuild.gauntlets} />
                <EquipSlot label="Legs" value={currentBuild.legs} />
              </div>
            </div>

            <div
              className="rounded-sm border p-5"
              style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
            >
              <h2 className="font-display text-xl font-semibold mb-3" style={{ color: '#E8E3D8' }}>
                Talismans
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[currentBuild.talisman1, currentBuild.talisman2, currentBuild.talisman3, currentBuild.talisman4].map((t, i) => (
                  <EquipSlot key={i} label={`Talisman ${i + 1}`} value={t} />
                ))}
              </div>
            </div>

            {currentBuild.note && (
              <div
                className="rounded-sm border-l-2 px-4 py-3"
                style={{ borderColor: '#C9A876', background: 'rgba(201,168,118,0.05)' }}
              >
                <p className="font-body text-xs mb-1" style={{ color: '#C9A876' }}>Build note</p>
                <p className="font-body text-sm leading-relaxed" style={{ color: '#9A9590' }}>
                  {currentBuild.note}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Build history */}
        <div>
          <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: '#E8E3D8' }}>
            Build History
          </h2>

          <div className="relative">
            {/* Spine */}
            <div
              className="absolute left-4 top-2 bottom-2 w-px"
              style={{ background: 'linear-gradient(to bottom, #C9A876, #2A2925)' }}
            />

            <div className="space-y-4 pl-10">
              {[...buildHistory].reverse().map((snapshot, i) => (
                <div key={snapshot.id} className="relative">
                  {/* Node */}
                  <div
                    className="absolute -left-[1.65rem] top-4 w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: i === 0 ? '#C9A876' : '#3A3835',
                      background: i === 0 ? '#C9A876' : '#121212',
                      boxShadow: i === 0 ? '0 0 8px #C9A876' : 'none',
                    }}
                  />

                  <div
                    className="rounded-sm border p-4 transition-colors"
                    style={{
                      background: '#1A1A1A',
                      borderColor: i === 0 ? '#C9A876' : '#2A2925',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-body text-xs mb-0.5" style={{ color: '#5A5650' }}>{snapshot.date}</p>
                        <h3 className="font-display text-lg font-semibold" style={{ color: i === 0 ? '#C9A876' : '#E8E3D8' }}>
                          {snapshot.label}
                          {i === 0 && <span className="ml-2 text-xs font-body font-normal" style={{ color: '#5A5650' }}>current</span>}
                        </h3>
                      </div>
                      <span className="font-body text-sm" style={{ color: '#5A5650' }}>
                        Lv {snapshot.stats.level}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
                      {statOrder.map(({ key, label, color }) => (
                        <div key={key} className="text-center">
                          <p className="font-body text-[10px] mb-0.5" style={{ color: '#5A5650' }}>{label}</p>
                          <p className="font-body text-sm font-semibold" style={{ color }}>
                            {snapshot.stats[key as keyof typeof snapshot.stats] as number}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 flex-wrap text-xs font-body">
                      <span style={{ color: '#5A5650' }}>R: <span style={{ color: '#E8E3D8' }}>{snapshot.mainhand}</span></span>
                      <span style={{ color: '#3A3835' }}>·</span>
                      <span style={{ color: '#5A5650' }}>L: <span style={{ color: '#E8E3D8' }}>{snapshot.offhand}</span></span>
                    </div>

                    {snapshot.note && (
                      <p className="font-body text-xs mt-3 leading-relaxed" style={{ color: '#5A5650' }}>
                        {snapshot.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

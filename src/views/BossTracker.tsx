import { bosses, type Boss, type BossTier } from '../data/seed';
import { StatusBadge, TierBadge } from '../components/StatusBadge';

const tiers: BossTier[] = ['Loved', 'Liked', 'Neutral', 'Disliked', 'Never Again'];
const tierColors: Record<BossTier, string> = {
  Loved: '#C9A876',
  Liked: '#9DB88A',
  Neutral: '#5A5650',
  Disliked: '#A05C3B',
  'Never Again': '#8B2E2E',
  Unranked: '#3A3835',
};

function BossRow({ boss }: { boss: Boss }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b transition-colors hover:bg-[#1F1F1F] group"
      style={{ borderColor: '#2A2925' }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-sm font-medium" style={{ color: '#E8E3D8' }}>
            {boss.name}
          </span>
          {boss.dlc && (
            <span
              className="text-[10px] font-body px-1.5 py-0.5 rounded tracking-wide"
              style={{ background: 'rgba(139,46,46,0.15)', color: '#8B2E2E' }}
            >
              DLC
            </span>
          )}
        </div>
        <p className="font-body text-xs mt-0.5" style={{ color: '#5A5650' }}>
          {boss.location}
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-3 text-xs font-body">
        <span style={{ color: '#5A5650' }}>
          {boss.attempts > 0 ? `${boss.attempts} att.` : '—'}
        </span>
      </div>

      <StatusBadge status={boss.status} />
      <TierBadge tier={boss.tier} />
    </div>
  );
}

function TierColumn({ tier, bossesInTier }: { tier: BossTier; bossesInTier: Boss[] }) {
  const color = tierColors[tier];

  return (
    <div
      className="rounded-sm border min-h-[120px]"
      style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
    >
      <div
        className="px-3 py-2 border-b flex items-center gap-2"
        style={{ borderColor: '#2A2925' }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color, boxShadow: `0 0 4px ${color}` }}
        />
        <span className="font-body text-xs font-semibold tracking-wide uppercase" style={{ color }}>
          {tier}
        </span>
        <span className="ml-auto font-body text-xs" style={{ color: '#5A5650' }}>
          {bossesInTier.length}
        </span>
      </div>
      <div className="p-2 space-y-1.5">
        {bossesInTier.length === 0 ? (
          <p className="text-xs font-body px-1 py-2 text-center" style={{ color: '#3A3835' }}>
            No bosses ranked here
          </p>
        ) : (
          bossesInTier.map(b => (
            <div
              key={b.id}
              className="px-2 py-1.5 rounded text-xs font-body border cursor-grab active:cursor-grabbing transition-colors hover:border-[#3A3835]"
              style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }}
            >
              <span>{b.name}</span>
              {b.dlc && (
                <span className="ml-1 text-[10px]" style={{ color: '#8B2E2E' }}>DLC</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function BossTracker() {
  const rankedBosses = bosses.filter(b => b.tier !== 'Unranked');
  const unranked = bosses.filter(b => b.tier === 'Unranked');

  const stats = {
    defeated: bosses.filter(b => b.status === 'defeated').length,
    attempted: bosses.filter(b => b.status === 'attempted').length,
    pending: bosses.filter(b => b.status === 'pending').length,
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>
            Boss Log
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>
              Boss Tracker
            </h1>
            <div className="flex gap-6 font-body text-sm pb-2">
              <div className="text-center">
                <p className="text-xl font-semibold font-display" style={{ color: '#C9A876' }}>{stats.defeated}</p>
                <p style={{ color: '#5A5650' }} className="text-xs">Defeated</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold font-display" style={{ color: '#8B6914' }}>{stats.attempted}</p>
                <p style={{ color: '#5A5650' }} className="text-xs">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold font-display" style={{ color: '#5A5650' }}>{stats.pending}</p>
                <p style={{ color: '#5A5650' }} className="text-xs">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Boss list */}
        <div
          className="rounded-sm border mb-12"
          style={{ background: '#1A1A1A', borderColor: '#2A2925' }}
        >
          <div
            className="flex items-center gap-3 px-4 py-2.5 border-b"
            style={{ borderColor: '#2A2925' }}
          >
            <span className="flex-1 font-body text-xs tracking-wide uppercase" style={{ color: '#5A5650' }}>
              Boss
            </span>
            <span className="hidden sm:block font-body text-xs tracking-wide uppercase w-16 text-right" style={{ color: '#5A5650' }}>
              Attempts
            </span>
            <span className="font-body text-xs tracking-wide uppercase w-20 text-right" style={{ color: '#5A5650' }}>
              Status
            </span>
            <span className="font-body text-xs tracking-wide uppercase w-20 text-right" style={{ color: '#5A5650' }}>
              Tier
            </span>
          </div>
          {bosses.map(boss => <BossRow key={boss.id} boss={boss} />)}
        </div>

        {/* Tier list */}
        <div className="mb-4">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#5A5650' }}>
            Tier Ranking
          </p>
          <h2 className="font-display text-3xl font-semibold mb-6" style={{ color: '#E8E3D8' }}>
            Boss Tier List
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {tiers.map(tier => (
              <TierColumn
                key={tier}
                tier={tier}
                bossesInTier={rankedBosses.filter(b => b.tier === tier)}
              />
            ))}
          </div>

          {unranked.length > 0 && (
            <div className="mt-4 rounded-sm border p-3" style={{ borderColor: '#2A2925', background: '#1A1A1A' }}>
              <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: '#3A3835' }}>
                Unranked — drag to a tier when ready
              </p>
              <div className="flex flex-wrap gap-2">
                {unranked.map(b => (
                  <div
                    key={b.id}
                    className="px-2 py-1.5 rounded text-xs font-body border cursor-grab"
                    style={{ background: '#121212', borderColor: '#2A2925', color: '#5A5650' }}
                  >
                    {b.name}{b.dlc && <span className="ml-1 text-[10px]" style={{ color: '#8B2E2E' }}>DLC</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

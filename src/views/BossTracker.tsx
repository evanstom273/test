import { useState, useRef } from 'react';
import { useStore } from '../store/context';
import { ALL_BOSSES, AREAS, type BossDefinition } from '../data/bosses';
import type { BossStatus, BossTier } from '../store/types';
import { StatusBadge, TierBadge } from '../components/StatusBadge';

const TIERS: BossTier[] = ['Loved', 'Liked', 'Neutral', 'Disliked', 'Never Again'];
const tierColors: Record<BossTier, string> = {
  Loved: '#C9A876', Liked: '#9DB88A', Neutral: '#5A5650',
  Disliked: '#A05C3B', 'Never Again': '#8B2E2E', Unranked: '#3A3835',
};

function cycleStatus(current: BossStatus): BossStatus {
  if (current === 'pending') return 'attempted';
  if (current === 'attempted') return 'defeated';
  return 'pending';
}

function BossRow({ boss, onStatusClick, onIncrement, onDecrement }: {
  boss: BossDefinition;
  onStatusClick: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const { state } = useStore();
  const bd = state.bossData[boss.id] ?? { status: 'pending', attempts: 0, tier: 'Unranked', notes: '' };

  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border-b transition-colors hover:bg-[#1F1F1F]" style={{ borderColor: '#2A2925' }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-sm font-medium" style={{ color: '#E8E3D8' }}>{boss.name}</span>
          {boss.required && <span className="text-[10px] font-body px-1.5 py-0.5 rounded" style={{ background: 'rgba(201,168,118,0.1)', color: '#C9A876' }}>Required</span>}
          {boss.dlc && <span className="text-[10px] font-body px-1.5 py-0.5 rounded" style={{ background: 'rgba(139,46,46,0.15)', color: '#8B2E2E' }}>DLC</span>}
        </div>
        <p className="font-body text-xs mt-0.5 truncate" style={{ color: '#5A5650' }}>{boss.location}</p>
      </div>

      {/* Attempts counter */}
      <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
        <button onClick={onDecrement}
          className="w-5 h-5 rounded text-xs leading-none border transition-colors hover:border-[#5A5650] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
          style={{ borderColor: '#2A2925', color: '#5A5650', background: '#121212' }}>−</button>
        <span className="font-body text-xs w-8 text-center" style={{ color: bd.attempts > 0 ? '#E8E3D8' : '#3A3835' }}>
          {bd.attempts > 0 ? `${bd.attempts}×` : '—'}
        </span>
        <button onClick={onIncrement}
          className="w-5 h-5 rounded text-xs leading-none border transition-colors hover:border-[#5A5650] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
          style={{ borderColor: '#2A2925', color: '#5A5650', background: '#121212' }}>+</button>
      </div>

      {/* Status toggle */}
      <button onClick={onStatusClick} className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876] rounded">
        <StatusBadge status={bd.status} />
      </button>

      <div className="flex-shrink-0">
        <TierBadge tier={bd.tier} />
      </div>
    </div>
  );
}

function TierColumn({ tier, bosses, onDrop }: { tier: BossTier; bosses: BossDefinition[]; onDrop: (bossId: string) => void }) {
  const [dragOver, setDragOver] = useState(false);
  const color = tierColors[tier];

  return (
    <div
      className="rounded-sm border min-h-[120px] transition-colors"
      style={{ background: dragOver ? '#1F1F1F' : '#1A1A1A', borderColor: dragOver ? color : '#2A2925' }}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOver(false); }}
      onDrop={e => { e.preventDefault(); setDragOver(false); const id = e.dataTransfer.getData('bossId'); if (id) onDrop(id); }}
    >
      <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: '#2A2925' }}>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
        <span className="font-body text-xs font-semibold tracking-wide uppercase" style={{ color }}>{tier}</span>
        <span className="ml-auto font-body text-xs" style={{ color: '#5A5650' }}>{bosses.length}</span>
      </div>
      <div className="p-2 space-y-1.5 min-h-[80px]">
        {bosses.length === 0 ? (
          <p className="text-xs font-body px-1 py-3 text-center" style={{ color: '#2A2925' }}>
            {dragOver ? 'Drop here' : 'Empty'}
          </p>
        ) : (
          bosses.map(b => (
            <TierCard key={b.id} boss={b} />
          ))
        )}
      </div>
    </div>
  );
}

function TierCard({ boss }: { boss: BossDefinition }) {
  const dragRef = useRef<HTMLDivElement>(null);
  const { state } = useStore();
  const bd = state.bossData[boss.id];

  return (
    <div ref={dragRef} draggable
      onDragStart={e => e.dataTransfer.setData('bossId', boss.id)}
      className="px-2 py-1.5 rounded text-xs font-body border cursor-grab active:cursor-grabbing transition-colors hover:border-[#3A3835]"
      style={{ background: '#121212', borderColor: '#2A2925', color: '#E8E3D8' }}>
      <span>{boss.name}</span>
      {boss.dlc && <span className="ml-1 text-[10px]" style={{ color: '#8B2E2E' }}>DLC</span>}
      {bd?.attempts > 0 && <span className="ml-1 text-[10px]" style={{ color: '#5A5650' }}>{bd.attempts}×</span>}
    </div>
  );
}

export default function BossTracker() {
  const { state, setBossStatus, incrementAttempts, decrementAttempts, setBossTier } = useStore();
  const [filter, setFilter] = useState<'all' | 'base' | 'dlc'>('all');
  const [areaFilter, setAreaFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | BossStatus>('all');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'list' | 'tier'>('list');

  const filtered = ALL_BOSSES.filter(b => {
    if (filter === 'base' && b.dlc) return false;
    if (filter === 'dlc' && !b.dlc) return false;
    if (areaFilter !== 'All' && b.area !== areaFilter) return false;
    if (statusFilter !== 'all' && (state.bossData[b.id]?.status ?? 'pending') !== statusFilter) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    defeated: ALL_BOSSES.filter(b => (state.bossData[b.id]?.status ?? 'pending') === 'defeated').length,
    attempted: ALL_BOSSES.filter(b => (state.bossData[b.id]?.status ?? 'pending') === 'attempted').length,
    pending: ALL_BOSSES.filter(b => (state.bossData[b.id]?.status ?? 'pending') === 'pending').length,
    total: ALL_BOSSES.length,
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4" style={{ background: '#121212' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="font-body text-xs tracking-[0.3em] uppercase mb-2" style={{ color: '#5A5650' }}>Boss Log</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: '#E8E3D8' }}>Boss Tracker</h1>
            <div className="flex gap-5 font-body text-sm pb-2">
              {[
                { label: 'Defeated', value: stats.defeated, color: '#C9A876' },
                { label: 'In Progress', value: stats.attempted, color: '#8B6914' },
                { label: 'Remaining', value: stats.pending, color: '#5A5650' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-semibold font-display" style={{ color }}>{value}</p>
                  <p style={{ color: '#5A5650' }} className="text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: '#2A2925' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(stats.defeated / stats.total) * 100}%`, background: 'linear-gradient(to right, #C9A876, #9B8A6E)' }} />
          </div>
          <p className="font-body text-xs mt-1" style={{ color: '#5A5650' }}>
            {stats.defeated} / {stats.total} bosses defeated ({Math.round((stats.defeated / stats.total) * 100)}%)
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b" style={{ borderColor: '#2A2925' }}>
          {(['list', 'tier'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 font-body text-sm capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
              style={{ color: tab === t ? '#C9A876' : '#5A5650', borderBottom: tab === t ? '1px solid #C9A876' : '1px solid transparent', marginBottom: '-1px' }}>
              {t === 'list' ? 'Boss List' : 'Tier List'}
            </button>
          ))}
        </div>

        {tab === 'list' && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <input type="text" placeholder="Search bosses..." value={search} onChange={e => setSearch(e.target.value)}
                className="px-3 py-1.5 rounded-sm text-xs font-body border outline-none focus:border-[#C9A876] flex-1 min-w-40"
                style={{ background: '#1A1A1A', borderColor: '#2A2925', color: '#E8E3D8' }} />
              {(['all', 'base', 'dlc'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-sm text-xs font-body border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A876]"
                  style={{ borderColor: filter === f ? '#C9A876' : '#2A2925', color: filter === f ? '#C9A876' : '#5A5650', background: '#1A1A1A' }}>
                  {f === 'all' ? 'All' : f === 'base' ? 'Base Game' : 'DLC'}
                </button>
              ))}
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-3 py-1.5 rounded-sm text-xs font-body border outline-none focus:border-[#C9A876] appearance-none"
                style={{ background: '#1A1A1A', borderColor: '#2A2925', color: '#5A5650' }}>
                <option value="all">Any Status</option>
                <option value="defeated">Defeated</option>
                <option value="attempted">In Progress</option>
                <option value="pending">Pending</option>
              </select>
              <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)}
                className="px-3 py-1.5 rounded-sm text-xs font-body border outline-none focus:border-[#C9A876] appearance-none max-w-40"
                style={{ background: '#1A1A1A', borderColor: '#2A2925', color: '#5A5650' }}>
                <option>All</option>
                {AREAS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>

            <div className="rounded-sm border" style={{ background: '#1A1A1A', borderColor: '#2A2925' }}>
              <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: '#2A2925' }}>
                <span className="flex-1 font-body text-xs tracking-wide uppercase" style={{ color: '#5A5650' }}>Boss</span>
                <span className="hidden sm:block font-body text-xs tracking-wide uppercase w-24 text-center" style={{ color: '#5A5650' }}>Attempts</span>
                <span className="font-body text-xs tracking-wide uppercase w-20 text-right" style={{ color: '#5A5650' }}>Status</span>
                <span className="font-body text-xs tracking-wide uppercase w-20 text-right" style={{ color: '#5A5650' }}>Tier</span>
              </div>
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="font-body text-sm" style={{ color: '#5A5650' }}>No bosses match these filters</p>
                </div>
              ) : (
                filtered.map(boss => (
                  <BossRow key={boss.id} boss={boss}
                    onStatusClick={() => setBossStatus(boss.id, cycleStatus(state.bossData[boss.id]?.status ?? 'pending'))}
                    onIncrement={() => incrementAttempts(boss.id)}
                    onDecrement={() => decrementAttempts(boss.id)} />
                ))
              )}
            </div>
            <p className="font-body text-xs mt-2" style={{ color: '#5A5650' }}>
              Click the status badge to cycle: Pending → In Progress → Defeated
            </p>
          </>
        )}

        {tab === 'tier' && (
          <div>
            <p className="font-body text-xs mb-4" style={{ color: '#5A5650' }}>
              Drag bosses between tiers to rank them. Only bosses you've encountered appear here.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              {TIERS.map(tier => (
                <TierColumn key={tier} tier={tier}
                  bosses={ALL_BOSSES.filter(b => (state.bossData[b.id]?.tier ?? 'Unranked') === tier && (state.bossData[b.id]?.status ?? 'pending') !== 'pending')}
                  onDrop={bossId => setBossTier(bossId, tier)} />
              ))}
            </div>
            {/* Unranked */}
            {(() => {
              const unranked = ALL_BOSSES.filter(b => {
                const bd = state.bossData[b.id];
                return (bd?.tier ?? 'Unranked') === 'Unranked' && (bd?.status ?? 'pending') !== 'pending';
              });
              return unranked.length > 0 ? (
                <div className="rounded-sm border p-3" style={{ borderColor: '#2A2925', background: '#1A1A1A' }}>
                  <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: '#3A3835' }}>Unranked — drag to a tier</p>
                  <div className="flex flex-wrap gap-2">
                    {unranked.map(b => <TierCard key={b.id} boss={b} />)}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

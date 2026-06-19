import type { BossStatus, BossTier } from '../data/seed';

export function StatusBadge({ status }: { status: BossStatus }) {
  const styles: Record<BossStatus, { label: string; color: string; bg: string }> = {
    defeated: { label: 'Defeated', color: '#C9A876', bg: 'rgba(201,168,118,0.1)' },
    attempted: { label: 'Attempted', color: '#8B6914', bg: 'rgba(139,105,20,0.1)' },
    pending: { label: 'Pending', color: '#5A5650', bg: 'rgba(90,86,80,0.1)' },
  };
  const s = styles[status];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-body font-medium tracking-wide"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}

export function TierBadge({ tier }: { tier: BossTier }) {
  const styles: Record<BossTier, { color: string; bg: string }> = {
    Loved: { color: '#C9A876', bg: 'rgba(201,168,118,0.12)' },
    Liked: { color: '#9DB88A', bg: 'rgba(157,184,138,0.1)' },
    Neutral: { color: '#5A5650', bg: 'rgba(90,86,80,0.1)' },
    Disliked: { color: '#A05C3B', bg: 'rgba(160,92,59,0.12)' },
    'Never Again': { color: '#8B2E2E', bg: 'rgba(139,46,46,0.15)' },
    Unranked: { color: '#3A3835', bg: 'rgba(58,56,53,0.3)' },
  };
  const s = styles[tier];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-xs font-body tracking-wide"
      style={{ color: s.color, background: s.bg }}
    >
      {tier}
    </span>
  );
}

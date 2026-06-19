export type BossStatus = 'pending' | 'attempted' | 'defeated';
export type BossTier = 'Loved' | 'Liked' | 'Neutral' | 'Disliked' | 'Never Again' | 'Unranked';
export type EventType = 'start' | 'boss' | 'build' | 'journal' | 'milestone';

export interface Character {
  name: string;
  class: string;
  platform: string;
  runType: string;
  ngCycle: number;
  startDate: string;
}

export interface BossState {
  status: BossStatus;
  attempts: number;
  tier: BossTier;
  notes: string;
}

export interface StatBlock {
  level: number;
  vigor: number;
  mind: number;
  endurance: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
  arcane: number;
}

export interface BuildSnapshot {
  id: string;
  date: string;
  label: string;
  stats: StatBlock;
  rightHand: string[];
  leftHand: string[];
  helm: string;
  chest: string;
  gauntlets: string;
  legs: string;
  talisman1: string;
  talisman2: string;
  talisman3: string;
  talisman4: string;
  cracked: number;
  cerulean: number;
  memoryStonesHeld: number;
  spells: string[];
  note: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  tags: string[];
  mood: string;
}

export interface TimelineEvent {
  id: string;
  type: EventType;
  timestamp: string;
  title: string;
  body: string;
  location: string;
  tags: string[];
}

export interface JourneyStore {
  character: Character | null;
  totalHours: number;
  bossData: Record<string, BossState>;
  builds: BuildSnapshot[];
  journal: JournalEntry[];
  timeline: TimelineEvent[];
}

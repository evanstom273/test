import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { JourneyStore, Character, BossStatus, BossTier, BuildSnapshot, JournalEntry, TimelineEvent, EventType } from './types';
import { EMPTY_STATE } from './initial';

const STORAGE_KEY = 'elden-journey-v2';

function load(): JourneyStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as JourneyStore;
  } catch {}
  return EMPTY_STATE;
}

function save(state: JourneyStore) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

interface StoreActions {
  setCharacter: (c: Character) => void;
  setHours: (h: number) => void;
  setBossStatus: (id: string, status: BossStatus) => void;
  incrementAttempts: (id: string) => void;
  decrementAttempts: (id: string) => void;
  setBossTier: (id: string, tier: BossTier) => void;
  setBossNotes: (id: string, notes: string) => void;
  saveBuild: (build: Omit<BuildSnapshot, 'id'>) => void;
  updateBuild: (id: string, build: Omit<BuildSnapshot, 'id'>) => void;
  addJournal: (entry: Omit<JournalEntry, 'id'>) => void;
  addTimeline: (event: Omit<TimelineEvent, 'id'>) => void;
  clearJourney: () => void;
}

type StoreCtx = { state: JourneyStore } & StoreActions;

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JourneyStore>(load);

  const update = useCallback((updater: (s: JourneyStore) => JourneyStore) => {
    setState(prev => {
      const next = updater(prev);
      save(next);
      return next;
    });
  }, []);

  const setCharacter = useCallback((c: Character) => {
    update(s => ({ ...s, character: c }));
  }, [update]);

  const setHours = useCallback((h: number) => {
    update(s => ({ ...s, totalHours: h }));
  }, [update]);

  const setBossStatus = useCallback((id: string, status: BossStatus) => {
    update(s => ({
      ...s,
      bossData: { ...s.bossData, [id]: { ...s.bossData[id], status } },
    }));
  }, [update]);

  const incrementAttempts = useCallback((id: string) => {
    update(s => ({
      ...s,
      bossData: { ...s.bossData, [id]: { ...s.bossData[id], attempts: (s.bossData[id]?.attempts ?? 0) + 1 } },
    }));
  }, [update]);

  const decrementAttempts = useCallback((id: string) => {
    update(s => ({
      ...s,
      bossData: { ...s.bossData, [id]: { ...s.bossData[id], attempts: Math.max(0, (s.bossData[id]?.attempts ?? 0) - 1) } },
    }));
  }, [update]);

  const setBossTier = useCallback((id: string, tier: BossTier) => {
    update(s => ({
      ...s,
      bossData: { ...s.bossData, [id]: { ...s.bossData[id], tier } },
    }));
  }, [update]);

  const setBossNotes = useCallback((id: string, notes: string) => {
    update(s => ({
      ...s,
      bossData: { ...s.bossData, [id]: { ...s.bossData[id], notes } },
    }));
  }, [update]);

  const saveBuild = useCallback((build: Omit<BuildSnapshot, 'id'>) => {
    const id = `build-${Date.now()}`;
    update(s => ({ ...s, builds: [...s.builds, { ...build, id }] }));
  }, [update]);

  const updateBuild = useCallback((id: string, build: Omit<BuildSnapshot, 'id'>) => {
    update(s => ({ ...s, builds: s.builds.map(b => b.id === id ? { ...build, id } : b) }));
  }, [update]);

  const addJournal = useCallback((entry: Omit<JournalEntry, 'id'>) => {
    const id = `j-${Date.now()}`;
    update(s => ({ ...s, journal: [{ ...entry, id }, ...s.journal] }));
  }, [update]);

  const addTimeline = useCallback((event: Omit<TimelineEvent, 'id'>) => {
    const id = `ev-${Date.now()}`;
    update(s => ({ ...s, timeline: [{ ...event, id }, ...s.timeline] }));
  }, [update]);

  const clearJourney = useCallback(() => {
    update(() => EMPTY_STATE);
  }, [update]);

  return (
    <Ctx.Provider value={{
      state,
      setCharacter, setHours,
      setBossStatus, incrementAttempts, decrementAttempts,
      setBossTier, setBossNotes,
      saveBuild, updateBuild, addJournal, addTimeline,
      clearJourney,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be inside StoreProvider');
  return ctx;
}

// Derived stat helpers
export function totalDefeated(bossData: JourneyStore['bossData']): number {
  return Object.values(bossData).filter(b => b.status === 'defeated').length;
}

export function totalAttempts(bossData: JourneyStore['bossData']): number {
  return Object.values(bossData).reduce((sum, b) => sum + b.attempts, 0);
}

export function currentLevel(builds: BuildSnapshot[]): number {
  return builds.length > 0 ? builds[builds.length - 1].stats.level : 1;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export type { StoreCtx, EventType };

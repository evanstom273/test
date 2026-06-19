# Technical Architecture Document
## Elden Ring Journey Tracker

**Version:** 1.0  
**Date:** 2026-06-19  
**Repository:** evanstom273/test  

---

## 1. Overview

A single-page, client-side web application for tracking an Elden Ring playthrough. Records boss encounters, character builds, journal entries, and a personal timeline. All data lives in the user's browser — no server, no account, no network dependency after initial load.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 | Functional components throughout |
| Language | TypeScript 5 | Strict mode, full type coverage |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Inline `style={}` used for dynamic / brand colours |
| Build | Vite 8 | `tsc -b && vite build` pipeline |
| Deployment | Vercel | Auto-deploy on push to `main` |
| Storage | `localStorage` | Key: `elden-journey-v2` |
| Dependencies | None (runtime) | Zero third-party runtime packages |

---

## 3. Repository Structure

```
src/
├── App.tsx                  # Root: StoreProvider wrapper, view router
├── main.tsx                 # ReactDOM.createRoot entry point
├── components/
│   ├── Nav.tsx              # Fixed top navigation bar
│   └── StatusBadge.tsx      # Boss status pill (pending / attempted / defeated)
├── data/
│   └── bosses.ts            # Static list of all 207 bosses + area constants
├── store/
│   ├── types.ts             # All shared TypeScript interfaces
│   ├── initial.ts           # EMPTY_STATE default value
│   └── context.tsx          # React Context: state + all action callbacks
└── views/
    ├── CharacterSelect.tsx  # New / edit character form (initial screen)
    ├── Timeline.tsx         # Chronological event feed + add event form
    ├── BossTracker.tsx      # Boss list with status, attempts, tier, notes
    ├── BuildTracker.tsx     # Build snapshot creation and history
    ├── Journal.tsx          # Free-text journal entries with mood + tags
    └── Archive.tsx          # Export (JSON / MD / PDF), Import, Delete character
```

---

## 4. Data Model

All state lives in a single `JourneyStore` object, serialised to `localStorage` on every mutation.

```typescript
interface JourneyStore {
  character:  Character | null;
  totalHours: number;
  bossData:   Record<string, BossState>;   // keyed by boss id
  builds:     BuildSnapshot[];
  journal:    JournalEntry[];
  timeline:   TimelineEvent[];
}
```

### 4.1 Character

```typescript
interface Character {
  name:      string;
  class:     string;           // e.g. "Vagabond"
  platform:  string;           // e.g. "PC"
  runType:   string;           // e.g. "First Playthrough"
  ngCycle:   number;           // 1 = NG, 2 = NG+1, …
  startDate: string;           // ISO date YYYY-MM-DD
}
```

### 4.2 BossState

```typescript
type BossStatus = 'pending' | 'attempted' | 'defeated';
type BossTier   = 'Unranked' | 'Loved' | 'Liked' | 'Neutral' | 'Disliked' | 'Never Again';

interface BossState {
  status:   BossStatus;
  attempts: number;
  tier:     BossTier;
  notes:    string;
}
```

Boss identity (name, location, area, required, dlc) is static data in `bosses.ts`. Only mutable state is stored in `bossData`.

### 4.3 BuildSnapshot

```typescript
interface BuildSnapshot {
  id:         string;          // "build-{timestamp}"
  label:      string;
  date:       string;          // ISO date
  stats: {
    level:        number;
    vigor:        number;
    mind:         number;
    endurance:    number;
    strength:     number;
    dexterity:    number;
    intelligence: number;
    faith:        number;
    arcane:       number;
  };
  rightHand:  string[];        // 3 slots
  leftHand:   string[];        // 3 slots
  helm:       string;
  chest:      string;
  gauntlets:  string;
  legs:       string;
  talisman1–4: string;
  cracked:    number;          // Crimson flask charges
  cerulean:   number;          // Cerulean flask charges
  spells:     string[];
  note:       string;
}
```

### 4.4 JournalEntry

```typescript
interface JournalEntry {
  id:    string;               // "j-{timestamp}"
  title: string;
  date:  string;
  mood:  string;
  body:  string;
  tags:  string[];
}
```

### 4.5 TimelineEvent

```typescript
type EventType = 'boss' | 'area' | 'build' | 'milestone' | 'note';

interface TimelineEvent {
  id:        string;           // "ev-{timestamp}"
  type:      EventType;
  timestamp: string;           // ISO date YYYY-MM-DD
  title:     string;
  location?: string;
  body?:     string;
}
```

---

## 5. State Management

### Pattern

Single React Context (`Ctx`) backed by a `useState<JourneyStore>`. A single `update(updater)` helper handles all mutations:

```typescript
const update = useCallback((updater: (s: JourneyStore) => JourneyStore) => {
  setState(prev => {
    const next = updater(prev);
    save(next);              // write to localStorage on every change
    return next;
  });
}, []);
```

Every action is a thin `useCallback` wrapper around `update`. No reducers, no middleware, no external library.

### Persistence

- On load: `JSON.parse(localStorage.getItem('elden-journey-v2'))` → falls back to `EMPTY_STATE`.
- On every mutation: `localStorage.setItem('elden-journey-v2', JSON.stringify(next))`.
- Survives page refresh, tab close, Vercel deployments. Scoped to origin + browser — not shared across devices.

### Exposed Actions

| Action | Description |
|---|---|
| `setCharacter(c)` | Create / update character profile |
| `setHours(h)` | Update total hours played |
| `setBossStatus(id, status)` | Mark pending / attempted / defeated |
| `incrementAttempts(id)` | +1 attempt |
| `decrementAttempts(id)` | -1 attempt (floor 0) |
| `setBossAttempts(id, n)` | Set attempt count directly |
| `setBossTier(id, tier)` | Rate a boss |
| `setBossNotes(id, notes)` | Free-text note on a boss |
| `saveBuild(build)` | Append new snapshot |
| `updateBuild(id, build)` | Edit existing snapshot |
| `addJournal(entry)` | Prepend journal entry |
| `addTimeline(event)` | Prepend timeline event |
| `importJourney(store)` | Replace entire state from parsed JSON |
| `clearJourney()` | Reset to EMPTY_STATE (delete character) |

### Derived Helpers (not in context, imported where needed)

```typescript
totalDefeated(bossData)   // number of defeated bosses
totalAttempts(bossData)   // sum of all attempt counts
currentLevel(builds)      // level from most recent build snapshot
todayISO()                // current date as YYYY-MM-DD
```

---

## 6. Routing

No router library. A `View` union type drives a simple conditional render in `AppInner`:

```typescript
type View = 'character' | 'timeline' | 'bosses' | 'build' | 'journal' | 'export';
```

`useState<View>` initialises to `'character'` if no character exists, else `'timeline'`. Navigation is passed down as `onNavigate: (v: View) => void`.

---

## 7. Boss Data

`ALL_BOSSES` is a static array of 207 `BossDefinition` objects covering the base game and Shadow of the Erdtree DLC. Each entry:

```typescript
interface BossDefinition {
  id:       string;    // slug, e.g. "margit-the-fell-omen"
  name:     string;
  location: string;    // specific site / fog gate location
  area:     string;    // region, e.g. "Limgrave"
  required: boolean;   // on the critical path
  dlc:      boolean;
}
```

Also exported: `AREAS` (unique sorted area list), `BASE_GAME_BOSSES`, `DLC_BOSSES`.

Apostrophes in location strings use double-quoted string literals to avoid TypeScript parse errors (e.g. `"Perfumer's Ruins"`).

---

## 8. Export / Import

### JSON Export

Full `JourneyStore` plus denormalised boss array (each boss definition merged with its state). Used for backup and cross-device transfer.

```json
{
  "character": { ... },
  "totalHours": 120,
  "exported": "2026-06-19T12:00:00.000Z",
  "stats": { "defeated": 142, "totalAttempts": 891, ... },
  "bosses": [ { "id": "...", "name": "...", "status": "defeated", "attempts": 7, ... } ],
  "builds": [ ... ],
  "journal": [ ... ],
  "timeline": [ ... ]
}
```

### Markdown Export

Narrative document: character header, progress summary, timeline, defeated bosses (with tier + notes), in-progress bosses, pending list, full build history (stats + all equipment), journal.

### PDF Export

No library. Generates a complete HTML document string with embedded print CSS, opens it in a new tab via `window.open()` + `document.write()`, then calls `window.print()` after a 400 ms delay to allow the browser to render before the print dialog appears. Users choose "Save as PDF" in the browser dialog. XSS-safe via an `esc()` helper that encodes `&`, `<`, `>`, `"`.

### Import

`FileReader` reads a chosen `.json` file. `parseImport()` reconstructs `JourneyStore`, handling both the current flat-bosses export format and a legacy direct-`bossData` format. Shows a preview (boss/build/journal/timeline counts) with a confirm step before overwriting state.

---

## 9. UI Conventions

| Token | Value | Usage |
|---|---|---|
| Background | `#121212` | Page, nav |
| Surface | `#1A1A1A` | Cards, inputs |
| Border default | `#2A2925` | All borders at rest |
| Gold | `#C9A876` | Brand accent, active states |
| Text primary | `#E8E3D8` | Headings, values |
| Text muted | `#5A5650` | Labels, metadata |
| Text faint | `#3A3835` | Placeholder, inactive |
| Danger | `#8B2E2E` | Delete / destructive actions |

- `font-display` → heading font (set in Tailwind config)
- `font-body` → body font
- All interactive elements have `focus-visible:ring-2 focus-visible:ring-[#C9A876]` for keyboard accessibility
- Inline `style={}` used for dynamic or brand colours that Tailwind would otherwise purge

---

## 10. Deployment

- **Host:** Vercel  
- **Trigger:** Push to `main` branch  
- **Build command:** `npm run build` (`tsc -b && vite build`)  
- **Output:** `dist/` — static HTML + JS + CSS bundle  
- **No environment variables required** — fully static, no API keys  
- Storage is client-side only; deployments have no effect on user data

---

## 11. Known Constraints

- **Single character per browser.** One `localStorage` slot. Multiple characters would require a keyed store or profile selection layer.
- **No cloud sync.** Users must export JSON manually to transfer between devices or browsers.
- **PDF via print dialog.** No programmatic PDF generation — depends on the browser's "Save as PDF" printer. Print layout is controlled via `@page` / `@media print` CSS.
- **No auth.** Data is entirely local; no login, no server, no privacy surface.
- **207 bosses hardcoded.** Adding new bosses (e.g. future DLC) requires editing `bosses.ts` and redeploying.

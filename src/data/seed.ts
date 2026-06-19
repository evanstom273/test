export type BossStatus = 'defeated' | 'attempted' | 'pending';
export type BossTier = 'Loved' | 'Liked' | 'Neutral' | 'Disliked' | 'Never Again' | 'Unranked';
export type EventType = 'start' | 'boss' | 'build' | 'journal' | 'milestone';

export interface Boss {
  id: string;
  name: string;
  location: string;
  status: BossStatus;
  attempts: number;
  tier: BossTier;
  dlc: boolean;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  type: EventType;
  timestamp: string;
  title: string;
  body?: string;
  bossId?: string;
  location?: string;
  tags?: string[];
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
  mainhand: string;
  offhand: string;
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
  note: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  tags: string[];
  mood?: string;
}

export const character = {
  name: 'Aethon',
  class: 'Vagabond',
  platform: 'PC',
  runType: 'Quality Build',
  ngCycle: 1,
  startDate: '2024-02-14',
  totalHours: 87,
  rune_level: 112,
};

export const bosses: Boss[] = [
  {
    id: 'margit',
    name: 'Margit, the Fell Omen',
    location: "Stormhill, Limgrave",
    status: 'defeated',
    attempts: 7,
    tier: 'Liked',
    dlc: false,
    notes: 'Wall of flesh until I learned his rhythm. Great tutorial boss.',
  },
  {
    id: 'godrick',
    name: 'Godrick the Grafted',
    location: 'Stormveil Castle',
    status: 'defeated',
    attempts: 3,
    tier: 'Loved',
    dlc: false,
    notes: 'Second phase dragon arm reveal is one of the best moments in the game.',
  },
  {
    id: 'rennala',
    name: 'Rennala, Queen of the Full Moon',
    location: 'Raya Lucaria Academy',
    status: 'defeated',
    attempts: 2,
    tier: 'Liked',
    dlc: false,
    notes: 'Beautiful fight. The students phase is chaos but in a fun way.',
  },
  {
    id: 'radahn',
    name: 'Starscourge Radahn',
    location: 'Caelid, Redmane Castle',
    status: 'defeated',
    attempts: 11,
    tier: 'Loved',
    dlc: false,
    notes: 'Festival of war. Died to meteors more times than I care to admit.',
  },
  {
    id: 'morgott',
    name: 'Morgott, the Omen King',
    location: 'Leyndell, Royal Capital',
    status: 'defeated',
    attempts: 5,
    tier: 'Liked',
    dlc: false,
  },
  {
    id: 'rykard',
    name: 'Rykard, Lord of Blasphemy',
    location: 'Mt. Gelmir, Volcano Manor',
    status: 'defeated',
    attempts: 1,
    tier: 'Neutral',
    dlc: false,
    notes: 'Gimmick fight. The snake reveal is cool the first time.',
  },
  {
    id: 'malenia',
    name: 'Malenia, Blade of Miquella',
    location: 'Elphael, Brace of the Haligtree',
    status: 'attempted',
    attempts: 34,
    tier: 'Disliked',
    dlc: false,
    notes: 'The lifesteal on hit is designed to punish everything I enjoy doing. Respect but no love.',
  },
  {
    id: 'godfrey',
    name: 'Godfrey, First Elden Lord',
    location: 'Leyndell, Ashen Capital',
    status: 'defeated',
    attempts: 4,
    tier: 'Loved',
    dlc: false,
  },
  {
    id: 'elden_beast',
    name: 'Elden Beast',
    location: 'Leyndell, Ashen Capital',
    status: 'pending',
    attempts: 0,
    tier: 'Unranked',
    dlc: false,
  },
  {
    id: 'fire_giant',
    name: 'Fire Giant',
    location: 'Mountaintops of the Giants',
    status: 'defeated',
    attempts: 6,
    tier: 'Disliked',
    dlc: false,
    notes: 'The ankle phase goes on forever and the camera is a monster.',
  },
  {
    id: 'radagon',
    name: 'Radagon of the Golden Order',
    location: 'Leyndell, Ashen Capital',
    status: 'pending',
    attempts: 0,
    tier: 'Unranked',
    dlc: false,
  },
  {
    id: 'messmer',
    name: 'Messmer the Impaler',
    location: "Shadow Keep, Shadow Realm",
    status: 'attempted',
    attempts: 9,
    tier: 'Unranked',
    dlc: true,
    notes: 'The fire snake incantations are destroying me. Need to find a better window.',
  },
  {
    id: 'bayle',
    name: 'Bayle the Dread',
    location: "Dragon's Pit, Shadow Realm",
    status: 'pending',
    attempts: 0,
    tier: 'Unranked',
    dlc: true,
  },
  {
    id: 'putrescent',
    name: 'Putrescent Knight',
    location: 'Scadutree Base, Shadow Realm',
    status: 'defeated',
    attempts: 5,
    tier: 'Neutral',
    dlc: true,
  },
];

export const buildHistory: BuildSnapshot[] = [
  {
    id: 'build-1',
    date: '2024-02-14',
    label: 'Starting Vagabond',
    stats: { level: 9, vigor: 15, mind: 10, endurance: 11, strength: 14, dexterity: 13, intelligence: 9, faith: 9, arcane: 7 },
    mainhand: 'Longsword',
    offhand: 'Heater Shield',
    helm: 'None',
    chest: 'Vagabond Knight Armor',
    gauntlets: 'Vagabond Knight Gauntlets',
    legs: 'Vagabond Knight Greaves',
    talisman1: '—',
    talisman2: '—',
    talisman3: '—',
    talisman4: '—',
    cracked: 4,
    cerulean: 0,
    note: 'Default loadout. Getting a feel for the roll timing.',
  },
  {
    id: 'build-2',
    date: '2024-02-19',
    label: 'Knight into Quality',
    stats: { level: 45, vigor: 28, mind: 12, endurance: 20, strength: 22, dexterity: 20, intelligence: 9, faith: 9, arcane: 7 },
    mainhand: "Uchigatana +7",
    offhand: 'Brass Shield',
    helm: "Iron Helmet",
    chest: 'Twinned Armor',
    gauntlets: 'Twinned Gauntlets',
    legs: 'Twinned Leggings',
    talisman1: 'Crimson Amber Medallion',
    talisman2: '—',
    talisman3: '—',
    talisman4: '—',
    cracked: 5,
    cerulean: 0,
    note: 'Switched to katana after Margit. Bleed procs feel strong.',
  },
  {
    id: 'build-3',
    date: '2024-03-08',
    label: 'Rivers of Blood Pivot',
    stats: { level: 85, vigor: 40, mind: 18, endurance: 30, strength: 14, dexterity: 40, intelligence: 9, faith: 9, arcane: 45 },
    mainhand: 'Rivers of Blood +9',
    offhand: 'Mohgwyn\'s Sacred Spear +5',
    helm: 'White Mask',
    chest: 'Ronin\'s Armor',
    gauntlets: 'Ronin\'s Gauntlets',
    legs: 'Ronin\'s Greaves',
    talisman1: 'Rotten Winged Sword Insignia',
    talisman2: 'Millicent\'s Prosthesis',
    talisman3: 'Lord of Blood\'s Exultation',
    talisman4: 'Carian Filigreed Crest',
    cracked: 6,
    cerulean: 2,
    note: 'Full bleed/arcane pivot. Feels like cheating but the DPS is wild.',
  },
  {
    id: 'build-4',
    date: '2024-04-01',
    label: 'Current — Strength/Faith',
    stats: { level: 112, vigor: 50, mind: 20, endurance: 32, strength: 55, dexterity: 14, intelligence: 9, faith: 40, arcane: 7 },
    mainhand: "Greatsword of Damnation +10",
    offhand: 'Golden Order Seal +7',
    helm: 'Bull-Goat Helm',
    chest: 'Tree Sentinel Armor',
    gauntlets: 'Tree Sentinel Gauntlets',
    legs: 'Tree Sentinel Greaves',
    talisman1: 'Erdtree\'s Favor +2',
    talisman2: 'Great-Jar\'s Arsenal',
    talisman3: 'Shard of Alexander',
    talisman4: 'Sacred Scorpion Charm',
    cracked: 8,
    cerulean: 2,
    note: 'Faith scaling for holy damage. Tree Sentinel armor for the gravitas.',
  },
];

export const currentBuild = buildHistory[buildHistory.length - 1];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'ev-1',
    type: 'start',
    timestamp: '2024-02-14',
    title: 'Journey Begins',
    body: 'Character created. Aethon, the Vagabond, steps into the Stranded Graveyard. The Lands Between await.',
    location: 'Stranded Graveyard',
  },
  {
    id: 'ev-2',
    type: 'boss',
    timestamp: '2024-02-15',
    title: 'Margit, the Fell Omen — Defeated',
    body: 'Seven attempts. His cane catch-attack finally clicked — learned it comes out only when I dodge toward him. Great teacher.',
    bossId: 'margit',
    location: 'Stormhill',
    tags: ['defeated', 'turning-point'],
  },
  {
    id: 'ev-3',
    type: 'journal',
    timestamp: '2024-02-16',
    title: 'First steps beyond the fog',
    body: 'Limgrave opens up and the scale of this world hits. I can see the Erdtree from everywhere. Rode Torrent for the first time — the way the music shifts when you mount is something.',
    tags: ['exploration', 'open-world'],
  },
  {
    id: 'ev-4',
    type: 'boss',
    timestamp: '2024-02-17',
    title: 'Godrick the Grafted — Defeated',
    body: 'Three tries. Second phase dragon arm is incredible. The roar before he grafts it on — one of the best boss moments yet.',
    bossId: 'godrick',
    location: 'Stormveil Castle',
    tags: ['defeated'],
  },
  {
    id: 'ev-5',
    type: 'milestone',
    timestamp: '2024-02-19',
    title: 'First Great Rune activated',
    body: 'Climbed the Divine Tower of Limgrave. The view from the top with Godrick\'s Great Rune pulsing — the game keeps rewarding patience.',
    location: 'Divine Tower of Limgrave',
    tags: ['great-rune', 'milestone'],
  },
  {
    id: 'ev-6',
    type: 'build',
    timestamp: '2024-02-19',
    title: 'Build pivot — picked up the Uchigatana',
    body: 'Dropped the Longsword. The bleed buildup changes the calculus on long fights.',
    tags: ['build-change', 'bleed'],
  },
  {
    id: 'ev-7',
    type: 'boss',
    timestamp: '2024-02-25',
    title: 'Starscourge Radahn — Defeated',
    body: 'Eleven attempts. The meteor phase kept clipping me through what felt like safe spots. Finally learned to sprint perpendicular across the whole arena. The festival aesthetic for this fight is something I\'ll remember.',
    bossId: 'radahn',
    location: 'Caelid',
    tags: ['defeated', 'hard-won'],
  },
  {
    id: 'ev-8',
    type: 'boss',
    timestamp: '2024-03-15',
    title: 'Malenia, Blade of Miquella — Still trying',
    body: 'Thirty-four attempts. Her lifesteal resets every window I build. I know her pattern now but execution at that pace costs me. Taking a break from her.',
    bossId: 'malenia',
    location: 'Haligtree',
    tags: ['attempted', 'nemesis'],
  },
  {
    id: 'ev-9',
    type: 'build',
    timestamp: '2024-04-01',
    title: 'Respecced to Strength/Faith',
    body: 'Larval Tear at Liurnia. Swapping out Rivers of Blood — I want to feel the weight of a big sword again before the endgame.',
    tags: ['respec', 'build-change', 'strength', 'faith'],
  },
  {
    id: 'ev-10',
    type: 'journal',
    timestamp: '2024-04-10',
    title: 'Entered the Shadow Realm',
    body: 'The DLC opening shook me. Crossing that fog gate with no idea what\'s on the other side — and then the shadow of the Erdtree stretches across everything. 87 hours in and it still has this.',
    tags: ['dlc', 'shadow-realm', 'exploration'],
  },
];

export const journalEntries: JournalEntry[] = [
  {
    id: 'j-1',
    date: '2024-02-16',
    title: 'First steps beyond the fog',
    body: 'Limgrave opens up and the scale of this world hits all at once. I can see the Erdtree from everywhere — it\'s not just a background element, it orients you, anchors you. Rode Torrent for the first time today. The way the ambient music shifts when you mount is something I didn\'t expect to notice, but it reframes the whole feeling of the world.\n\nThe game trusts you to wander. No quest markers, no waypoints screaming at you. I followed a golden light and ended up in a dungeon I was nowhere near ready for. Died four times to a giant crab before finding the grace.',
    tags: ['exploration', 'open-world', 'torrent'],
    mood: 'wonder',
  },
  {
    id: 'j-2',
    date: '2024-02-22',
    title: 'On Caelid',
    body: 'The shift from Limgrave to Caelid is one of the most striking environmental transitions I\'ve seen in any game. The rot, the scarlet color, the way the music goes dissonant. It\'s wrong on purpose, and you feel it before your brain processes what changed.\n\nI\'m not ready to be here. The enemies three-shot me. But I found the Street of Sages Ruins and died to a scarlet flower six times trying to get a spell I can\'t even cast yet. Worth it.',
    tags: ['caelid', 'exploration', 'rot'],
    mood: 'dread',
  },
  {
    id: 'j-3',
    date: '2024-03-15',
    title: 'Malenia and what I\'m learning about patience',
    body: 'Thirty-four attempts. I\'ve stopped counting out of pride and started counting because I want to track the learning curve. Attempts 1–12 were me reacting. Attempts 13–25 were me building a plan that didn\'t account for her aggression variance. Attempts 26–34 I know the fight. I can name every attack. I die to execution, not to surprise.\n\nThere\'s something specific about learning to play without flinching. She punishes panic more than any boss I\'ve faced. The lifesteal on Waterfowl means cautious play costs you more than reading her and committing.\n\nTaking a break. I\'ll come back when I stop dreading the fog gate.',
    tags: ['malenia', 'bosses', 'patience', 'waterfowl-dance'],
    mood: 'resolute',
  },
  {
    id: 'j-4',
    date: '2024-04-10',
    title: 'The Shadow Realm opens',
    body: 'The Realm of Shadow opens differently than I expected. The fog gate off the back of Mohg\'s arena, the prayer icon slowly filling, the world that reveals itself — it doesn\'t try to impress you with a fanfare. It just shows you the shadow of a second tree and lets that land.\n\nSixty more hours in here, supposedly. I believe it. The density of these first few areas already feels like a full game. Messmer\'s boss area is visible from the starting plateau and I have no idea how to reach it. That feeling — distant architecture you can see but not yet touch — is what this game does better than anyone.',
    tags: ['dlc', 'shadow-realm', 'messmer', 'exploration'],
    mood: 'awe',
  },
];

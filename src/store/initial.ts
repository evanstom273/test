import type { JourneyStore, BossState } from './types';
import { ALL_BOSSES } from '../data/bosses';

const defaultBossState = (): BossState => ({
  status: 'pending',
  attempts: 0,
  tier: 'Unranked',
  notes: '',
});

function makeBossData(overrides: Record<string, Partial<BossState>> = {}): Record<string, BossState> {
  const result: Record<string, BossState> = {};
  for (const b of ALL_BOSSES) {
    result[b.id] = { ...defaultBossState(), ...overrides[b.id] };
  }
  return result;
}

// Pre-filled example state for a mid-playthrough Vagabond
export const INITIAL_STATE: JourneyStore = {
  character: {
    name: 'Aethon',
    class: 'Vagabond',
    platform: 'PC',
    runType: 'Quality Build',
    ngCycle: 1,
    startDate: '2024-02-14',
  },
  totalHours: 87,
  bossData: makeBossData({
    'grafted-scion':    { status: 'defeated',  attempts: 1,  tier: 'Neutral',    notes: 'Tutorial boss — died immediately, as intended.' },
    'tree-sentinel':    { status: 'defeated',  attempts: 12, tier: 'Liked',      notes: 'Kept coming back until I could beat it. Great confidence check.' },
    'agheel':           { status: 'defeated',  attempts: 2,  tier: 'Liked',      notes: 'Fun dragon intro. Felt cinematic.' },
    'darriwil':         { status: 'defeated',  attempts: 4,  tier: 'Liked',      notes: 'Great aggressive knight fight.' },
    'tibia-limgrave':   { status: 'defeated',  attempts: 1,  tier: 'Neutral',    notes: '' },
    'crucible-stormhill':{ status: 'defeated', attempts: 3,  tier: 'Liked',      notes: 'Tough for the level but fair.' },
    'margit':           { status: 'defeated',  attempts: 7,  tier: 'Liked',      notes: 'Wall of flesh until I learned his rhythm. Excellent teacher.' },
    'godrick':          { status: 'defeated',  attempts: 3,  tier: 'Loved',      notes: 'Dragon arm reveal is one of the best boss moments in the game.' },
    'leonine':          { status: 'defeated',  attempts: 2,  tier: 'Neutral',    notes: '' },
    'red-wolf':         { status: 'defeated',  attempts: 2,  tier: 'Neutral',    notes: '' },
    'rennala':          { status: 'defeated',  attempts: 2,  tier: 'Liked',      notes: 'Beautiful fight. Phase 1 students chaos is fun.' },
    'loretta-carian':   { status: 'defeated',  attempts: 3,  tier: 'Liked',      notes: 'Elegant mounted lance fight.' },
    'magma-wyrm-makar': { status: 'defeated',  attempts: 2,  tier: 'Neutral',    notes: '' },
    'oneil':            { status: 'defeated',  attempts: 1,  tier: 'Neutral',    notes: '' },
    'radahn':           { status: 'defeated',  attempts: 11, tier: 'Loved',      notes: 'Festival of war. Meteor phase destroyed me repeatedly. Incredible spectacle.' },
    'ekzykes':          { status: 'defeated',  attempts: 2,  tier: 'Neutral',    notes: '' },
    'elemer':           { status: 'defeated',  attempts: 3,  tier: 'Liked',      notes: '' },
    'fallingstar':      { status: 'defeated',  attempts: 4,  tier: 'Neutral',    notes: '' },
    'rykard':           { status: 'defeated',  attempts: 1,  tier: 'Neutral',    notes: 'Gimmick fight. Snake reveal is cool once.' },
    'godfrey-shade':    { status: 'defeated',  attempts: 2,  tier: 'Liked',      notes: '' },
    'morgott':          { status: 'defeated',  attempts: 5,  tier: 'Liked',      notes: 'Margit upgraded. More aggressive and satisfying.' },
    'ancestor-spirit':  { status: 'defeated',  attempts: 1,  tier: 'Liked',      notes: 'Atmospheric encounter.' },
    'valiant-gargoyles':{ status: 'defeated',  attempts: 5,  tier: 'Disliked',   notes: 'Two-boss fight where one always catches me from behind.' },
    'astel':            { status: 'defeated',  attempts: 3,  tier: 'Liked',      notes: 'Cosmic horror vibes. Great design.' },
    'mohg-lord':        { status: 'defeated',  attempts: 6,  tier: 'Liked',      notes: 'Nihil! The bleed phase 2 is brutal but learnable.' },
    'niall':            { status: 'defeated',  attempts: 4,  tier: 'Neutral',    notes: '' },
    'borealis':         { status: 'defeated',  attempts: 2,  tier: 'Neutral',    notes: '' },
    'fire-giant':       { status: 'defeated',  attempts: 6,  tier: 'Disliked',   notes: 'Ankle phase is tedious. Camera fights me the whole time.' },
    'loretta-haligtree':{ status: 'defeated',  attempts: 3,  tier: 'Liked',      notes: 'Better than Carian manor version.' },
    'malenia':          { status: 'attempted', attempts: 34, tier: 'Disliked',   notes: 'Lifesteal punishes everything I enjoy doing. On a break from her.' },
    'godskin-duo':      { status: 'defeated',  attempts: 7,  tier: 'Disliked',   notes: 'Two-boss fights almost always feel cheap.' },
    'maliketh':         { status: 'defeated',  attempts: 4,  tier: 'Loved',      notes: 'Black Blade phase is one of the best in the game.' },
    'placidusax':       { status: 'defeated',  attempts: 2,  tier: 'Liked',      notes: 'Awe-inspiring encounter.' },
    'godfrey':          { status: 'defeated',  attempts: 4,  tier: 'Loved',      notes: 'Hoarah Loux wrestling phase is pure hype.' },
    'radagon':          { status: 'pending',   attempts: 0,  tier: 'Unranked',   notes: '' },
    'elden-beast':      { status: 'pending',   attempts: 0,  tier: 'Unranked',   notes: '' },
    'messmer':          { status: 'attempted', attempts: 9,  tier: 'Unranked',   notes: 'Fire snake incantations are destroying me. Need a better opening.' },
    'putrescent':       { status: 'defeated',  attempts: 5,  tier: 'Neutral',    notes: '' },
    'bayle':            { status: 'pending',   attempts: 0,  tier: 'Unranked',   notes: '' },
    'dancing-lion':     { status: 'defeated',  attempts: 6,  tier: 'Liked',      notes: 'Tricky elemental switches. Great intro DLC boss.' },
    'rellana':          { status: 'defeated',  attempts: 8,  tier: 'Liked',      notes: 'Twin moon phase is stunning.' },
    'hippo':            { status: 'defeated',  attempts: 3,  tier: 'Neutral',    notes: '' },
  }),
  builds: [
    {
      id: 'build-1',
      date: '2024-02-14',
      label: 'Starting Vagabond',
      stats: { level: 9, vigor: 15, mind: 10, endurance: 11, strength: 14, dexterity: 13, intelligence: 9, faith: 9, arcane: 7 },
      rightHand: ['Longsword', '', ''], leftHand: ['Heater Shield', '', ''],
      helm: 'None', chest: 'Vagabond Knight Armor', gauntlets: 'Vagabond Knight Gauntlets', legs: 'Vagabond Knight Greaves',
      talisman1: '—', talisman2: '—', talisman3: '—', talisman4: '—',
      cracked: 4, cerulean: 0, memoryStonesHeld: 0, spells: [],
      note: 'Default loadout. Getting a feel for the roll timing.',
    },
    {
      id: 'build-2',
      date: '2024-02-19',
      label: 'Uchigatana Bleed Build',
      stats: { level: 45, vigor: 28, mind: 12, endurance: 20, strength: 22, dexterity: 20, intelligence: 9, faith: 9, arcane: 7 },
      rightHand: ['Uchigatana +7', '', ''], leftHand: ['Brass Shield', '', ''],
      helm: 'Iron Helmet', chest: 'Twinned Armor', gauntlets: 'Twinned Gauntlets', legs: 'Twinned Leggings',
      talisman1: 'Crimson Amber Medallion', talisman2: '—', talisman3: '—', talisman4: '—',
      cracked: 5, cerulean: 0, memoryStonesHeld: 0, spells: [],
      note: 'Switched to katana after Margit. Bleed procs feel strong.',
    },
    {
      id: 'build-3',
      date: '2024-03-08',
      label: 'Rivers of Blood (Arcane)',
      stats: { level: 85, vigor: 40, mind: 18, endurance: 30, strength: 14, dexterity: 40, intelligence: 9, faith: 9, arcane: 45 },
      rightHand: ['Rivers of Blood +9', '', ''], leftHand: ["Mohgwyn's Sacred Spear +5", '', ''],
      helm: 'White Mask', chest: "Ronin's Armor", gauntlets: "Ronin's Gauntlets", legs: "Ronin's Greaves",
      talisman1: 'Rotten Winged Sword Insignia', talisman2: "Millicent's Prosthesis", talisman3: "Lord of Blood's Exultation", talisman4: 'Carian Filigreed Crest',
      cracked: 6, cerulean: 2, memoryStonesHeld: 0, spells: [],
      note: 'Full bleed/arcane pivot. Feels like cheating but the DPS is wild.',
    },
    {
      id: 'build-4',
      date: '2024-04-01',
      label: 'Strength / Faith (Current)',
      stats: { level: 112, vigor: 50, mind: 20, endurance: 32, strength: 55, dexterity: 14, intelligence: 9, faith: 40, arcane: 7 },
      rightHand: ['Greatsword of Damnation +10', '', ''], leftHand: ['Golden Order Seal +7', '', ''],
      helm: 'Bull-Goat Helm', chest: 'Tree Sentinel Armor', gauntlets: 'Tree Sentinel Gauntlets', legs: 'Tree Sentinel Greaves',
      talisman1: "Erdtree's Favor +2", talisman2: "Great-Jar's Arsenal", talisman3: 'Shard of Alexander', talisman4: 'Sacred Scorpion Charm',
      cracked: 8, cerulean: 2, memoryStonesHeld: 3,
      spells: ['Golden Vow', 'Flame, Grant Me Strength', 'Erdtree Heal', 'Black Blade'],
      note: 'Faith scaling for holy damage. Tree Sentinel armor for the gravitas.',
    },
  ],
  journal: [
    {
      id: 'j-1', date: '2024-02-16', mood: 'wonder',
      title: 'First steps beyond the fog',
      body: "Limgrave opens up and the scale hits all at once. I can see the Erdtree from everywhere — it doesn't just sit in the background, it orients you. Rode Torrent for the first time. The way the ambient music shifts when you mount is something I didn't expect to notice, but it reframes the entire feeling of the world.\n\nThe game trusts you to wander. No quest markers, no waypoints screaming at you. I followed a golden light and ended up in a dungeon I was nowhere near ready for.",
      tags: ['exploration', 'open-world', 'torrent'],
    },
    {
      id: 'j-2', date: '2024-02-22', mood: 'dread',
      title: 'On Caelid',
      body: "The shift from Limgrave to Caelid is one of the most striking environmental transitions I've seen in any game. The rot, the scarlet color, the way the music goes dissonant. It's wrong on purpose, and you feel it before your brain processes what changed.\n\nI'm not ready to be here. The enemies three-shot me. But I found the Street of Sages Ruins and died to a scarlet flower six times trying to get a spell I can't even cast yet. Worth it.",
      tags: ['caelid', 'exploration', 'rot'],
    },
    {
      id: 'j-3', date: '2024-03-15', mood: 'resolute',
      title: 'Malenia and patience',
      body: "Thirty-four attempts. I've stopped counting out of pride and started counting because I want to track the learning curve. Attempts 1–12 were me reacting. Attempts 13–25 were me building a plan that didn't account for her aggression variance. Attempts 26–34 I know the fight. I can name every attack. I die to execution, not surprise.\n\nThere's something specific about learning to play without flinching. She punishes panic more than any boss I've faced. Taking a break. I'll come back when I stop dreading the fog gate.",
      tags: ['malenia', 'patience', 'waterfowl-dance'],
    },
    {
      id: 'j-4', date: '2024-04-10', mood: 'awe',
      title: 'The Shadow Realm opens',
      body: "The DLC opening shook me. Crossing that fog gate with no idea what's on the other side — and then the shadow of the Erdtree stretches across everything. 87 hours in and it still has this.\n\nMessmer's boss area is visible from the starting plateau. I have no idea how to reach it. That feeling — distant architecture you can see but not yet touch — is what this game does better than anyone.",
      tags: ['dlc', 'shadow-realm', 'exploration'],
    },
  ],
  timeline: [
    { id: 'ev-1', type: 'start',     timestamp: '2024-02-14', title: 'Journey Begins',                      body: 'Aethon, the Vagabond, steps into the Stranded Graveyard. The Lands Between await.',    location: 'Stranded Graveyard', tags: [] },
    { id: 'ev-2', type: 'boss',      timestamp: '2024-02-15', title: 'Margit, the Fell Omen — Defeated',   body: 'Seven attempts. His cane catch-attack finally clicked. Great teacher.',                  location: 'Stormveil Castle',   tags: ['boss', 'defeated'] },
    { id: 'ev-3', type: 'journal',   timestamp: '2024-02-16', title: 'First steps beyond the fog',         body: 'Limgrave opens up and the scale of this world hits.',                                   location: 'Limgrave',           tags: ['exploration'] },
    { id: 'ev-4', type: 'boss',      timestamp: '2024-02-17', title: 'Godrick the Grafted — Defeated',     body: 'Three tries. Dragon arm reveal is incredible.',                                         location: 'Stormveil Castle',   tags: ['boss', 'defeated'] },
    { id: 'ev-5', type: 'milestone', timestamp: '2024-02-19', title: 'First Great Rune activated',         body: 'Climbed the Divine Tower of Limgrave.',                                                 location: 'Divine Tower',       tags: ['great-rune'] },
    { id: 'ev-6', type: 'build',     timestamp: '2024-02-19', title: 'Switched to the Uchigatana',         body: 'Dropped the Longsword. Bleed buildup changes the calculus on long fights.',             location: 'Roundtable Hold',    tags: ['build-change', 'bleed'] },
    { id: 'ev-7', type: 'boss',      timestamp: '2024-02-25', title: 'Starscourge Radahn — Defeated',      body: 'Eleven attempts. The festival aesthetic for this fight is unforgettable.',               location: 'Wailing Dunes',      tags: ['boss', 'defeated'] },
    { id: 'ev-8', type: 'boss',      timestamp: '2024-03-15', title: 'Malenia, Blade of Miquella — Ongoing','body': 'Thirty-four attempts. On a break.',                                                  location: 'Elphael',            tags: ['boss', 'attempted'] },
    { id: 'ev-9', type: 'build',     timestamp: '2024-04-01', title: 'Respecced to Strength / Faith',      body: 'Larval Tear at Liurnia. Swapping out Rivers of Blood.',                                location: 'Roundtable Hold',    tags: ['respec', 'build-change'] },
    { id: 'ev-10', type: 'journal',  timestamp: '2024-04-10', title: 'Entered the Shadow Realm',           body: '87 hours in and it still has this.',                                                   location: 'Mohgwyn Palace',     tags: ['dlc'] },
  ],
};

export const EMPTY_STATE: JourneyStore = {
  character: null,
  totalHours: 0,
  bossData: makeBossData(),
  builds: [],
  journal: [],
  timeline: [],
};

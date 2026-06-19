// ─── WEAPON DEFINITIONS ─────────────────────────────────────────────────────

export interface WeaponEntry {
  name: string;
  category: string;
  somber: boolean;
  dlc?: boolean;
}

export const WEAPONS: WeaponEntry[] = [
  // Daggers
  { name: 'Dagger',                       category: 'Dagger',              somber: false },
  { name: 'Misericorde',                   category: 'Dagger',              somber: false },
  { name: 'Parrying Dagger',              category: 'Dagger',              somber: false },
  { name: 'Erdsteel Dagger',              category: 'Dagger',              somber: false },
  { name: 'Ivory Sickle',                 category: 'Dagger',              somber: false },
  { name: 'Blade of Calling',             category: 'Dagger',              somber: true  },
  { name: 'Black Knife',                  category: 'Dagger',              somber: true  },
  { name: 'Celebrant\'s Sickle',          category: 'Dagger',              somber: false },
  { name: 'Scorpion\'s Stinger',          category: 'Dagger',              somber: true  },
  { name: 'Crystalknife',                 category: 'Dagger',              somber: false },
  { name: 'Reduvia',                      category: 'Dagger',              somber: true  },
  { name: 'Glintstone Kris',              category: 'Dagger',              somber: true  },
  { name: 'Wakizashi',                    category: 'Dagger',              somber: false },
  { name: 'Bloodstained Dagger',          category: 'Dagger',              somber: false },

  // Straight Swords
  { name: 'Short Sword',                  category: 'Straight Sword',      somber: false },
  { name: 'Longsword',                    category: 'Straight Sword',      somber: false },
  { name: 'Broadsword',                   category: 'Straight Sword',      somber: false },
  { name: 'Lordsworn\'s Straight Sword',  category: 'Straight Sword',      somber: false },
  { name: 'Carian Knight\'s Sword',       category: 'Straight Sword',      somber: false },
  { name: 'Crystal Sword',               category: 'Straight Sword',      somber: false },
  { name: 'Rotten Crystal Sword',        category: 'Straight Sword',      somber: false },
  { name: 'Ornamental Straight Sword',   category: 'Straight Sword',      somber: false },
  { name: 'Miquellan Knight\'s Sword',   category: 'Straight Sword',      somber: false },
  { name: 'Coded Sword',                 category: 'Straight Sword',      somber: true  },
  { name: 'Golden Epitaph',              category: 'Straight Sword',      somber: true  },
  { name: 'Sword of Night and Flame',    category: 'Straight Sword',      somber: true  },
  { name: 'Sword of St. Trina',          category: 'Straight Sword',      somber: true  },
  { name: 'Regalia of Eochaid',          category: 'Straight Sword',      somber: true  },
  { name: 'Sword of Light',              category: 'Straight Sword',      somber: true,  dlc: true },
  { name: 'Sword of Darkness',           category: 'Straight Sword',      somber: true,  dlc: true },
  { name: 'Stone-Sheathed Sword',        category: 'Straight Sword',      somber: true,  dlc: true },
  { name: 'Velvet Sword of St. Trina',   category: 'Straight Sword',      somber: true,  dlc: true },

  // Greatswords
  { name: 'Claymore',                    category: 'Greatsword',          somber: false },
  { name: 'Zweihander',                  category: 'Greatsword',          somber: false },
  { name: 'Knight\'s Greatsword',        category: 'Greatsword',          somber: false },
  { name: 'Banished Knight\'s Greatsword',category: 'Greatsword',         somber: false },
  { name: 'Flamberge',                   category: 'Greatsword',          somber: false },
  { name: 'Ordovis\'s Greatsword',       category: 'Greatsword',          somber: true  },
  { name: 'Dark Moon Greatsword',        category: 'Greatsword',          somber: true  },
  { name: 'Helphen\'s Steeple',          category: 'Greatsword',          somber: true  },
  { name: 'Blasphemous Blade',           category: 'Greatsword',          somber: true  },
  { name: 'Inseparable Sword',           category: 'Greatsword',          somber: true  },
  { name: 'Sacred Relic Sword',          category: 'Greatsword',          somber: true  },
  { name: 'Greatsword of Damnation',     category: 'Greatsword',          somber: true  },
  { name: 'Forked Greatsword',           category: 'Greatsword',          somber: false },
  { name: 'Gargoyle\'s Greatsword',      category: 'Greatsword',          somber: false },
  { name: 'Marais Executioner\'s Sword', category: 'Greatsword',          somber: true  },
  { name: 'Sword of Milos',              category: 'Greatsword',          somber: true  },
  { name: 'Greatsword of Radahn (Lord)', category: 'Greatsword',          somber: true,  dlc: true },
  { name: 'Greatsword of Radahn (Shadow)',category: 'Greatsword',         somber: true,  dlc: true },

  // Colossal Swords
  { name: 'Greatsword',                  category: 'Colossal Sword',      somber: false },
  { name: 'Watchdog\'s Greatsword',      category: 'Colossal Sword',      somber: false },
  { name: 'Godslayer\'s Greatsword',     category: 'Colossal Sword',      somber: true  },
  { name: 'Grafted Blade Greatsword',    category: 'Colossal Sword',      somber: true  },
  { name: 'Starscourge Greatsword',      category: 'Colossal Sword',      somber: true  },
  { name: 'Royal Greatsword',            category: 'Colossal Sword',      somber: true  },
  { name: 'Maliketh\'s Black Blade',     category: 'Colossal Sword',      somber: true  },
  { name: 'Elden Greatsword',            category: 'Colossal Sword',      somber: true  },
  { name: 'Ruins Greatsword',            category: 'Colossal Sword',      somber: true  },
  { name: 'Fire Knight\'s Greatsword',   category: 'Colossal Sword',      somber: false, dlc: true },
  { name: 'Bloodfiend\'s Arm',           category: 'Colossal Sword',      somber: false, dlc: true },

  // Katanas
  { name: 'Uchigatana',                  category: 'Katana',              somber: false },
  { name: 'Nagakiba',                    category: 'Katana',              somber: false },
  { name: 'Serpentbone Blade',           category: 'Katana',              somber: false },
  { name: 'Meteoric Ore Blade',          category: 'Katana',              somber: true  },
  { name: 'Moonveil',                    category: 'Katana',              somber: true  },
  { name: 'Rivers of Blood',             category: 'Katana',              somber: true  },
  { name: 'Dragonscale Blade',           category: 'Katana',              somber: true  },
  { name: 'Hand of Malenia',             category: 'Katana',              somber: true  },
  { name: 'Star-Lined Sword',            category: 'Katana',              somber: false, dlc: true },
  { name: 'Sword of Night',              category: 'Katana',              somber: true,  dlc: true },

  // Great Katanas (DLC)
  { name: 'Dragon-Hunter\'s Great Katana',category: 'Great Katana',       somber: false, dlc: true },
  { name: 'Euporia',                     category: 'Great Katana',        somber: true,  dlc: true },
  { name: 'Rakshasa\'s Great Katana',    category: 'Great Katana',        somber: false, dlc: true },
  { name: 'Gazing Finger',              category: 'Great Katana',        somber: true,  dlc: true },

  // Curved Swords
  { name: 'Scimitar',                    category: 'Curved Sword',        somber: false },
  { name: 'Falchion',                    category: 'Curved Sword',        somber: false },
  { name: 'Grossmesser',                 category: 'Curved Sword',        somber: false },
  { name: 'Beastman\'s Curved Sword',    category: 'Curved Sword',        somber: false },
  { name: 'Bloodhound\'s Fang',          category: 'Curved Sword',        somber: true  },
  { name: 'Icerind Hatchet',             category: 'Curved Sword',        somber: true  },
  { name: 'Magma Blade',                 category: 'Curved Sword',        somber: true  },
  { name: 'Mantis Blade',                category: 'Curved Sword',        somber: false },
  { name: 'Flowing Curved Sword',        category: 'Curved Sword',        somber: false },

  // Axes
  { name: 'Hand Axe',                    category: 'Axe',                 somber: false },
  { name: 'Battle Axe',                  category: 'Axe',                 somber: false },
  { name: 'Warped Axe',                  category: 'Axe',                 somber: false },
  { name: 'Stormhawk Axe',              category: 'Axe',                 somber: true  },
  { name: 'Sacrificial Axe',             category: 'Axe',                 somber: true  },
  { name: 'Forked Hatchet',              category: 'Axe',                 somber: false },
  { name: 'Axe of Godrick',              category: 'Axe',                 somber: true  },
  { name: 'Rosus\' Axe',                 category: 'Axe',                 somber: false },

  // Greataxes
  { name: 'Greataxe',                    category: 'Greataxe',            somber: false },
  { name: 'Jawbone Axe',                 category: 'Greataxe',            somber: false },
  { name: 'Executioner\'s Greataxe',     category: 'Greataxe',            somber: false },
  { name: 'Axe of Godfrey',              category: 'Greataxe',            somber: true  },
  { name: 'Winged Greathorn',            category: 'Greataxe',            somber: true  },
  { name: 'Omen Cleaver',                category: 'Greataxe',            somber: false },

  // Hammers
  { name: 'Club',                        category: 'Hammer',              somber: false },
  { name: 'Hammer',                      category: 'Hammer',              somber: false },
  { name: 'Spiked Club',                 category: 'Hammer',              somber: false },
  { name: 'Stone Club',                  category: 'Hammer',              somber: false },
  { name: 'Warpick',                     category: 'Hammer',              somber: false },
  { name: 'Cranial Vessel Candlestand',  category: 'Hammer',              somber: false },
  { name: 'Morning Star',                category: 'Hammer',              somber: false },

  // Great Hammers
  { name: 'Great Club',                  category: 'Great Hammer',        somber: false },
  { name: 'Brick Hammer',                category: 'Great Hammer',        somber: false },
  { name: 'Rotten Staff',                category: 'Great Hammer',        somber: false },
  { name: 'Giant-Crusher',               category: 'Great Hammer',        somber: false },
  { name: 'Smithscript Hammer',          category: 'Great Hammer',        somber: false, dlc: true },
  { name: 'Putrescence Cleaver',         category: 'Great Hammer',        somber: true,  dlc: true },

  // Spears
  { name: 'Spear',                       category: 'Spear',               somber: false },
  { name: 'Finger Seal',                 category: 'Spear',               somber: false },
  { name: 'Short Spear',                 category: 'Spear',               somber: false },
  { name: 'Celebrant\'s Rib-Rake',       category: 'Spear',               somber: false },
  { name: 'Cleanrot Spear',              category: 'Spear',               somber: false },
  { name: 'Clayman\'s Harpoon',          category: 'Spear',               somber: false },
  { name: 'Rotten Crystal Spear',        category: 'Spear',               somber: false },
  { name: 'Mohgwyn\'s Sacred Spear',     category: 'Spear',               somber: true  },
  { name: 'Inquisitor\'s Girandole',     category: 'Spear',               somber: true  },
  { name: 'Bolt of Gransax',             category: 'Spear',               somber: true  },
  { name: 'Torchpole',                   category: 'Spear',               somber: false },

  // Halberds
  { name: 'Halberd',                     category: 'Halberd',             somber: false },
  { name: 'Guardian\'s Swordspear',      category: 'Halberd',             somber: false },
  { name: 'Vulgar Militia Saw',          category: 'Halberd',             somber: false },
  { name: 'Nightrider Glaive',           category: 'Halberd',             somber: false },
  { name: 'Loretta\'s War Sickle',       category: 'Halberd',             somber: true  },
  { name: 'Commander\'s Standard',       category: 'Halberd',             somber: true  },
  { name: 'Golden Halberd',              category: 'Halberd',             somber: true  },
  { name: 'Dragoon Halberd',             category: 'Halberd',             somber: false, dlc: true },

  // Reapers
  { name: 'Scythe',                      category: 'Reaper',              somber: false },
  { name: 'Grave Scythe',                category: 'Reaper',              somber: false },
  { name: 'Death\'s Poker',              category: 'Reaper',              somber: true  },
  { name: 'Winged Scythe',               category: 'Reaper',              somber: true  },
  { name: 'Halo Scythe',                 category: 'Reaper',              somber: true  },
  { name: 'Curseblade\'s Cirque',        category: 'Reaper',              somber: false, dlc: true },

  // Whips
  { name: 'Whip',                        category: 'Whip',                somber: false },
  { name: 'Urumi',                       category: 'Whip',                somber: false },
  { name: 'Thorned Whip',                category: 'Whip',                somber: false },
  { name: 'Hoslow\'s Petal Whip',        category: 'Whip',                somber: true  },
  { name: 'Magma Whip Candlestick',      category: 'Whip',                somber: true  },

  // Colossal Weapons
  { name: 'Prelate\'s Inferno Crozier',  category: 'Colossal Weapon',     somber: false },
  { name: 'Envoy\'s Greathorn',          category: 'Colossal Weapon',     somber: false },
  { name: 'Duelist Greataxe',            category: 'Colossal Weapon',     somber: false },
  { name: 'Dragon Greatclaw',            category: 'Colossal Weapon',     somber: true  },
  { name: 'Godrick\'s Axe',              category: 'Colossal Weapon',     somber: true  },
  { name: 'Fallingstar Beast Jaw',       category: 'Colossal Weapon',     somber: true  },
  { name: 'Staff of the Avatar',         category: 'Colossal Weapon',     somber: false },
  { name: 'Devonia\'s Pick',             category: 'Colossal Weapon',     somber: true,  dlc: true },

  // Twinblades
  { name: 'Twinblade',                   category: 'Twinblade',           somber: false },
  { name: 'Esker\'s Twinblade',          category: 'Twinblade',           somber: false },
  { name: 'Godskin Peeler',              category: 'Twinblade',           somber: false },
  { name: 'Eleonora\'s Poleblade',       category: 'Twinblade',           somber: true  },
  { name: 'Gargoyle\'s Twinblade',       category: 'Twinblade',           somber: false },
  { name: 'Gargoyle\'s Black Twinblade', category: 'Twinblade',           somber: false },
  { name: 'Maliketh\'s Blade',           category: 'Twinblade',           somber: true  },

  // Glintstone Staffs
  { name: 'Glintstone Staff',            category: 'Glintstone Staff',    somber: false },
  { name: 'Astrologer\'s Staff',         category: 'Glintstone Staff',    somber: false },
  { name: 'Demi-Human Queen\'s Staff',   category: 'Glintstone Staff',    somber: false },
  { name: 'Crystal Staff',               category: 'Glintstone Staff',    somber: false },
  { name: 'Carian Glintstone Staff',     category: 'Glintstone Staff',    somber: false },
  { name: 'Meteorite Staff',             category: 'Glintstone Staff',    somber: true  },
  { name: 'Staff of Loss',               category: 'Glintstone Staff',    somber: false },
  { name: 'Carian Regal Scepter',        category: 'Glintstone Staff',    somber: true  },
  { name: 'Azur\'s Glintstone Staff',    category: 'Glintstone Staff',    somber: true  },
  { name: 'Lusat\'s Glintstone Staff',   category: 'Glintstone Staff',    somber: true  },
  { name: 'Prince of Death\'s Staff',    category: 'Glintstone Staff',    somber: false },
  { name: 'Maternal Staff',              category: 'Glintstone Staff',    somber: true,  dlc: true },
  { name: 'Staff of the Great Beyond',   category: 'Glintstone Staff',    somber: true,  dlc: true },

  // Sacred Seals
  { name: 'Finger Seal',                 category: 'Sacred Seal',         somber: false },
  { name: 'Erdtree Seal',                category: 'Sacred Seal',         somber: false },
  { name: 'Frenzied Flame Seal',         category: 'Sacred Seal',         somber: false },
  { name: 'Dragon Communion Seal',       category: 'Sacred Seal',         somber: false },
  { name: 'Clawmark Seal',               category: 'Sacred Seal',         somber: true  },
  { name: 'Golden Order Seal',           category: 'Sacred Seal',         somber: false },
  { name: "Giant's Seal",                category: 'Sacred Seal',         somber: false },
  { name: 'Gravel Stone Seal',           category: 'Sacred Seal',         somber: false },
  { name: 'Godslayer\'s Seal',           category: 'Sacred Seal',         somber: false },
  { name: 'Spiraltree Seal',             category: 'Sacred Seal',         somber: false, dlc: true },

  // Bows
  { name: 'Short Bow',                   category: 'Bow',                 somber: false },
  { name: 'Longbow',                     category: 'Bow',                 somber: false },
  { name: 'Composite Bow',               category: 'Bow',                 somber: false },
  { name: 'Serpent Bow',                 category: 'Bow',                 somber: false },
  { name: 'Horn Bow',                    category: 'Bow',                 somber: false },
  { name: 'Erdtree Bow',                 category: 'Bow',                 somber: true  },
  { name: 'Black Bow',                   category: 'Bow',                 somber: false },
  { name: 'Pulley Bow',                  category: 'Bow',                 somber: false },

  // Greatbows
  { name: 'Greatbow',                    category: 'Greatbow',            somber: false },
  { name: 'Golem Greatbow',              category: 'Greatbow',            somber: false },
  { name: 'Lion Greatbow',               category: 'Greatbow',            somber: true  },
  { name: 'Jar Cannon',                  category: 'Greatbow',            somber: true  },
  { name: 'Radahn\'s Spears',            category: 'Greatbow',            somber: true  },

  // Crossbows
  { name: 'Crossbow',                    category: 'Crossbow',            somber: false },
  { name: 'Crepus\'s Black-Key Crossbow',category: 'Crossbow',            somber: false },
  { name: 'Full Moon Crossbow',          category: 'Crossbow',            somber: true  },
  { name: 'Pulley Crossbow',             category: 'Crossbow',            somber: false },

  // DLC weapon types
  { name: 'Backhand Blade',              category: 'Backhand Blade',      somber: false, dlc: true },
  { name: 'Occult Backhand Blade',       category: 'Backhand Blade',      somber: false, dlc: true },
  { name: 'Smithscript Cirque',          category: 'Throwing Blade',      somber: false, dlc: true },
  { name: 'Smithscript Greatsword',      category: 'Light Greatsword',    somber: false, dlc: true },
  { name: 'Milady',                      category: 'Light Greatsword',    somber: false, dlc: true },
  { name: 'Fire Knight\'s Shortsword',   category: 'Light Greatsword',    somber: false, dlc: true },
  { name: 'Leda\'s Sword',               category: 'Light Greatsword',    somber: true,  dlc: true },

  // Fists & Claws
  { name: 'Caestus',                     category: 'Fist',                somber: false },
  { name: 'Spiked Caestus',              category: 'Fist',                somber: false },
  { name: 'Star Fist',                   category: 'Fist',                somber: false },
  { name: 'Iron Ball',                   category: 'Fist',                somber: false },
  { name: 'Cipher Pata',                 category: 'Fist',                somber: true  },
  { name: 'Katar',                       category: 'Claw',                somber: false },
  { name: 'Hookclaws',                   category: 'Claw',                somber: false },
  { name: 'Venomous Fang',               category: 'Claw',                somber: false },
  { name: 'Bloodhound Claws',            category: 'Claw',                somber: false },
  { name: 'Raptor Talons',               category: 'Claw',                somber: false },

  // Thrusting Swords
  { name: 'Estoc',                       category: 'Thrusting Sword',     somber: false },
  { name: 'Rapier',                      category: 'Thrusting Sword',     somber: false },
  { name: 'Rogier\'s Rapier',            category: 'Thrusting Sword',     somber: false },
  { name: 'Noble\'s Estoc',              category: 'Thrusting Sword',     somber: false },
  { name: 'Crystal Spear',               category: 'Thrusting Sword',     somber: false },
  { name: 'Bloody Helice',               category: 'Thrusting Sword',     somber: true  },
  { name: 'Estoc (Ash of War: Impaling Thrust)', category: 'Thrusting Sword', somber: false },
  { name: 'Antspur Rapier',              category: 'Thrusting Sword',     somber: false },
];

export const WEAPON_NAMES = WEAPONS.map(w => w.name);
export const SOMBER_WEAPONS = new Set(WEAPONS.filter(w => w.somber).map(w => w.name));
export const WEAPON_CATEGORIES = [...new Set(WEAPONS.map(w => w.category))];

export function isWeaponSomber(name: string): boolean {
  return SOMBER_WEAPONS.has(name);
}

export function getMaxUpgrade(somber: boolean): number {
  return somber ? 10 : 25;
}

// ─── ARMOR SETS ──────────────────────────────────────────────────────────────

export const ARMOR_SETS: string[] = [
  // Base Game
  'Alberich\'s', 'Albinauric', 'All-Knowing', 'Aristocrat', 'Astrologer',
  'Azur\'s Glintstone', 'Bandit', 'Banished Knight', 'Battlemage', 'Beast Champion',
  'Black Knife', 'Blackflame Monk', 'Blaidd\'s', 'Bloodhound Knight', 'Bloodsoaked',
  'Blue Cloth', 'Blue Festive', 'Blue Silver', 'Briar', 'Bull-Goat',
  'Carian Knight', 'Chain', 'Champion', 'Cleanrot', 'Commoner\'s',
  'Confessor', 'Consort\'s', 'Crucible Axe', 'Crucible Tree', 'Cuckoo Knight',
  'Depraved Perfumer', 'Drake Knight', 'Duelist', 'Eccentric', 'Elden Lord',
  'Errant Sorcerer', 'Exile', 'Festive', 'Fia\'s', 'Finger Maiden',
  'Fingerprint', 'Fire Monk', 'Fire Prelate', 'Fur', 'Gelmir Knight',
  'General Radahn', 'Godrick Knight', 'Godskin Apostle', 'Godskin Noble', 'Goldmask\'s',
  'Guardian', 'Guilty', 'Haligtree Knight', 'High Page', 'Highwayman',
  'Hoslow\'s', 'House Marais', 'Iron', 'Juvenile Scholar', 'Kaiden',
  'Knight', 'Land of Reeds', 'Lazuli Sorcerer', 'Leather', 'Leyndell Knight',
  'Lionel\'s', 'Lusat\'s', 'Malenia\'s', 'Malformed Dragon', 'Maliketh\'s',
  'Millicent\'s', 'Mushroom', 'Night Maiden', 'Night\'s Cavalry', 'Noble\'s',
  'Nox Monk', 'Nox Swordstress', 'Old Aristocrat', 'Omen', 'Omenkiller',
  'Page', 'Perfumer', 'Preceptor\'s', 'Prisoner', 'Prophet',
  'Queen of the Full Moon', 'Raging Wolf', 'Raptor\'s', 'Redmane Knight', 'Ronin\'s',
  'Rotten Duelist', 'Royal Knight', 'Royal Remains', 'Ruler\'s', 'Sage',
  'Sanguine Noble', 'Scaled', 'Snow Witch', 'Spellblade', 'Traveler\'s',
  'Traveling Maiden', 'Tree Sentinel', 'Twinned', 'Vagabond Knight', 'Veteran\'s',
  'Vulgar Militia', 'War Surgeon', 'White Reed', 'Zamor',
  // DLC
  'Ansbach\'s', 'Ascetic\'s', 'Black Knight', 'Dancer\'s', 'Dane\'s',
  'Death Knight', 'Divine Beast', 'Divine Bird', 'Fire Knight', 'Freyja\'s',
  'Gaius\'s', 'Gravebird', 'High Priest', 'Horned Warrior', 'Hornsent',
  'Igon\'s', 'Iron Rivet', 'Highland Warrior', 'Messmer\'s', 'Night (DLC)',
  'Oathseeker Knight', 'Rakshasa', 'Rellana\'s', 'Solitude', 'Thiollier\'s',
  'Verdigris', 'Young Lion\'s',
];

const ARMOR_PIECES = ['Helm', 'Chest', 'Gauntlets', 'Greaves'];

export function getArmorPieces(set: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const piece of ARMOR_PIECES) {
    result[piece] = `${set} ${piece === 'Helm' ? 'Helm' : piece === 'Chest' ? 'Armor' : piece === 'Gauntlets' ? 'Gauntlets' : 'Greaves'}`;
  }
  return result;
}

// ─── TALISMANS ───────────────────────────────────────────────────────────────

export const TALISMANS: string[] = [
  // HP
  'Crimson Amber Medallion', 'Crimson Amber Medallion +1', 'Crimson Amber Medallion +2', 'Crimson Amber Medallion +3',
  'Crimson Seed Talisman', 'Crimson Seed Talisman +1', 'Blessed Dew Talisman',
  // FP
  'Cerulean Amber Medallion', 'Cerulean Amber Medallion +1', 'Cerulean Amber Medallion +2', 'Cerulean Amber Medallion +3',
  'Cerulean Seed Talisman', 'Cerulean Seed Talisman +1', 'Blessed Blue Dew Talisman',
  // Stamina / Equip Load
  'Viridian Amber Medallion', 'Viridian Amber Medallion +1', 'Viridian Amber Medallion +2', 'Viridian Amber Medallion +3',
  'Green Turtle Talisman', 'Two-Headed Turtle Talisman',
  'Arsenal Charm', 'Arsenal Charm +1', 'Great-Jar\'s Arsenal',
  'Erdtree\'s Favor', 'Erdtree\'s Favor +1', 'Erdtree\'s Favor +2',
  // Stat boosts
  'Radagon\'s Scarseal', 'Radagon\'s Soreseal',
  'Marika\'s Scarseal', 'Marika\'s Soreseal',
  'Starscourge Heirloom', 'Prosthesis-Wearer Heirloom', 'Stargazer Heirloom',
  'Two Fingers Heirloom', 'Outer God Heirloom',
  // Elemental defense
  'Dragoncrest Shield Talisman', 'Dragoncrest Shield Talisman +1', 'Dragoncrest Shield Talisman +2', 'Dragoncrest Greatshield Talisman',
  'Spelldrake Talisman', 'Spelldrake Talisman +1', 'Spelldrake Talisman +2', 'Spelldrake Talisman +3',
  'Flamedrake Talisman', 'Flamedrake Talisman +1', 'Flamedrake Talisman +2', 'Flamedrake Talisman +3',
  'Boltdrake Talisman', 'Boltdrake Talisman +1', 'Boltdrake Talisman +2', 'Boltdrake Talisman +3',
  'Haligdrake Talisman', 'Haligdrake Talisman +1', 'Haligdrake Talisman +2',
  'Pearldrake Talisman', 'Pearldrake Talisman +1', 'Pearldrake Talisman +2', 'Pearldrake Talisman +3',
  'Golden Braid',
  // Status resist
  'Immunizing Horn Charm', 'Immunizing Horn Charm +1', 'Immunizing Horn Charm +2',
  'Stalwart Horn Charm', 'Stalwart Horn Charm +1', 'Stalwart Horn Charm +2',
  'Clarifying Horn Charm', 'Clarifying Horn Charm +1', 'Clarifying Horn Charm +2',
  'Mottled Necklace', 'Mottled Necklace +1', 'Mottled Necklace +2', 'Ailment Talisman',
  'Prince of Death\'s Pustule', 'Prince of Death\'s Cyst',
  // Weapon-type combat
  'Dagger Talisman', 'Curved Sword Talisman', 'Twinblade Talisman', 'Axe Talisman',
  'Hammer Talisman', 'Spear Talisman', 'Lance Talisman', 'Claw Talisman',
  'Greatshield Talisman', 'Two-Handed Sword Talisman', 'Pearl Shield Talisman',
  'Arrow\'s Sting Talisman', 'Arrow\'s Reach Talisman', 'Arrow\'s Soaring Sting Talisman', 'Sharpshot Talisman',
  // Magic
  'Graven-School Talisman', 'Graven-Mass Talisman',
  'Faithful\'s Canvas Talisman', 'Flock\'s Canvas Talisman',
  'Primal Glintstone Blade', 'Moon of Nokstella', 'Old Lord\'s Talisman', 'Radagon Icon',
  // Ash of War / combat arts
  'Roar Medallion', 'Companion Jar', 'Perfumer\'s Talisman', 'Carian Filigreed Crest',
  'Warrior Jar Shard', 'Shard of Alexander', 'Godfrey Icon', 'Shattered Stone Talisman',
  'Smithing Talisman',
  // Defense / poise
  'Bull-Goat\'s Talisman', 'Blue Dancer Charm',
  'Crucible Scale Talisman', 'Crucible Feather Talisman', 'Crucible Knot Talisman',
  'Talisman of All Crucibles', 'Fine Crucible Feather Talisman',
  'Retaliatory Crossed-Tree', 'Lacerating Crossed-Tree',
  // Scorpion charms
  'Magic Scorpion Charm', 'Fire Scorpion Charm', 'Lightning Scorpion Charm', 'Sacred Scorpion Charm',
  // Conditional attack
  'Red-Feathered Branchsword', 'Blue-Feathered Branchsword',
  'Ritual Sword Talisman', 'Ritual Shield Talisman',
  // On-hit / kill
  'Assassin\'s Crimson Dagger', 'Assassin\'s Cerulean Dagger',
  'Winged Sword Insignia', 'Rotten Winged Sword Insignia', 'Millicent\'s Prosthesis',
  'Godskin Swaddling Cloth', 'Kindred of Rot\'s Exultation', 'Lord of Blood\'s Exultation',
  'Taker\'s Cameo', 'Ancestral Spirit\'s Horn',
  'Enraged Divine Beast', 'Talisman of the Dread', 'Talisman of Lord\'s Bestowal',
  'Rellana\'s Cameo', 'Beloved Stardust', 'Aged One\'s Exultation',
  'St. Trina\'s Smile', 'Blade of Mercy', 'Crusade Insignia', 'Dried Bouquet',
  'Verdigris Discus',
  // Utility
  'Gold Scarab', 'Silver Scarab', 'Crepus\'s Vial', 'Concealing Veil',
  'Longtail Cat Talisman', 'Furled Finger\'s Trick Mirror',
  '— (empty)',
];

// ─── SORCERIES ───────────────────────────────────────────────────────────────

export interface SpellEntry {
  name: string;
  fp: number;
  slots: number;
  type: 'sorcery' | 'incantation';
  school: string;
  dlc?: boolean;
}

export const SORCERIES: SpellEntry[] = [
  // Glintstone
  { name: 'Glintstone Pebble',            fp: 7,  slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Swift Glintstone Shard',       fp: 5,  slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Great Glintstone Shard',       fp: 12, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Glintstone Arc',               fp: 9,  slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Glintstone Cometshard',        fp: 17, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Comet',                        fp: 24, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Comet Azur',                   fp: 40, slots: 3, type: 'sorcery', school: 'Glintstone' },
  { name: 'Scholar\'s Armament',          fp: 15, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Scholar\'s Shield',            fp: 30, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Magic Downpour',               fp: 20, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Loretta\'s Greatbow',          fp: 20, slots: 1, type: 'sorcery', school: 'Glintstone' },
  { name: 'Loretta\'s Mastery',           fp: 55, slots: 2, type: 'sorcery', school: 'Glintstone' },
  { name: 'Shard Spiral',                 fp: 14, slots: 1, type: 'sorcery', school: 'Glintstone' },
  // Carian
  { name: 'Carian Slicer',                fp: 4,  slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Carian Greatsword',            fp: 12, slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Carian Piercer',               fp: 17, slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Glintblade Phalanx',           fp: 18, slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Carian Phalanx',               fp: 24, slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Adula\'s Moonblade',           fp: 22, slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Ranni\'s Dark Moon',           fp: 57, slots: 2, type: 'sorcery', school: 'Carian' },
  { name: 'Rennala\'s Full Moon',         fp: 47, slots: 2, type: 'sorcery', school: 'Carian' },
  { name: 'Carian Retaliation',           fp: 5,  slots: 1, type: 'sorcery', school: 'Carian' },
  { name: 'Carian Affinity',              fp: 18, slots: 1, type: 'sorcery', school: 'Carian' },
  // Gravity
  { name: 'Rock Sling',                   fp: 18, slots: 1, type: 'sorcery', school: 'Gravity' },
  { name: 'Gravity Well',                 fp: 12, slots: 1, type: 'sorcery', school: 'Gravity' },
  { name: 'Collapsing Stars',             fp: 18, slots: 1, type: 'sorcery', school: 'Gravity' },
  { name: 'Meteorite',                    fp: 30, slots: 1, type: 'sorcery', school: 'Gravity' },
  { name: 'Meteorite of Astel',           fp: 60, slots: 2, type: 'sorcery', school: 'Gravity' },
  { name: 'Stars of Ruin',                fp: 40, slots: 2, type: 'sorcery', school: 'Gravity' },
  { name: 'Terra Magica',                 fp: 20, slots: 1, type: 'sorcery', school: 'Gravity' },
  { name: 'Founding Rain of Stars',       fp: 32, slots: 2, type: 'sorcery', school: 'Gravity' },
  // Night
  { name: 'Night Shard',                  fp: 7,  slots: 1, type: 'sorcery', school: 'Night' },
  { name: 'Ambush Shard',                 fp: 13, slots: 1, type: 'sorcery', school: 'Night' },
  { name: 'Night Comet',                  fp: 21, slots: 1, type: 'sorcery', school: 'Night' },
  { name: 'Night Maiden\'s Mist',         fp: 20, slots: 1, type: 'sorcery', school: 'Night' },
  { name: 'Eternal Darkness',             fp: 25, slots: 1, type: 'sorcery', school: 'Night' },
  { name: 'Unseen Blade',                 fp: 13, slots: 1, type: 'sorcery', school: 'Night' },
  { name: 'Unseen Form',                  fp: 20, slots: 1, type: 'sorcery', school: 'Night' },
  // Cold
  { name: 'Freezing Mist',               fp: 20, slots: 1, type: 'sorcery', school: 'Cold' },
  { name: 'Glintstone Icecrag',           fp: 12, slots: 1, type: 'sorcery', school: 'Cold' },
  { name: 'Zamor Ice Storm',              fp: 17, slots: 1, type: 'sorcery', school: 'Cold' },
  { name: 'Frozen Armament',              fp: 20, slots: 1, type: 'sorcery', school: 'Cold' },
  { name: 'Crystal Torrent',              fp: 28, slots: 1, type: 'sorcery', school: 'Cold' },
  // Magma
  { name: 'Magma Shot',                   fp: 16, slots: 1, type: 'sorcery', school: 'Magma' },
  { name: 'Roiling Magma',               fp: 28, slots: 1, type: 'sorcery', school: 'Magma' },
  { name: 'Gelmir\'s Fury',              fp: 16, slots: 1, type: 'sorcery', school: 'Magma' },
  { name: 'Rykard\'s Rancor',            fp: 23, slots: 2, type: 'sorcery', school: 'Magma' },
  // Primeval
  { name: 'Shattering Crystal',           fp: 27, slots: 1, type: 'sorcery', school: 'Primeval' },
  { name: 'Crystal Burst',               fp: 16, slots: 1, type: 'sorcery', school: 'Primeval' },
  { name: 'Gavel of Haima',              fp: 36, slots: 2, type: 'sorcery', school: 'Primeval' },
  { name: 'Cannon of Haima',             fp: 50, slots: 2, type: 'sorcery', school: 'Primeval' },
  { name: 'Haima\'s Gintrap',            fp: 13, slots: 1, type: 'sorcery', school: 'Primeval' },
  // DLC
  { name: 'Glintblade Trio',             fp: 19, slots: 1, type: 'sorcery', school: 'Carian',   dlc: true },
  { name: 'Rellana\'s Twin Moons',        fp: 47, slots: 2, type: 'sorcery', school: 'Carian',   dlc: true },
  { name: 'Miriam\'s Vanishing',          fp: 9,  slots: 1, type: 'sorcery', school: 'Carian',   dlc: true },
  { name: 'Gravitational Missile',        fp: 18, slots: 1, type: 'sorcery', school: 'Gravity',  dlc: true },
  { name: 'Blades of Stone',             fp: 18, slots: 2, type: 'sorcery', school: 'Gravity',  dlc: true },
  { name: 'Glintstone Nail',             fp: 10, slots: 1, type: 'sorcery', school: 'Finger',   dlc: true },
  { name: 'Glintstone Nails',            fp: 23, slots: 1, type: 'sorcery', school: 'Finger',   dlc: true },
  { name: 'Fleeting Microcosm',          fp: 26, slots: 1, type: 'sorcery', school: 'Finger',   dlc: true },
  { name: 'Cherishing Fingers',          fp: 20, slots: 1, type: 'sorcery', school: 'Finger',   dlc: true },
  { name: 'Mantle of Thorns',            fp: 9,  slots: 1, type: 'sorcery', school: 'Thorn',    dlc: true },
  { name: 'Impenetrable Thorns',         fp: 15, slots: 1, type: 'sorcery', school: 'Thorn',    dlc: true },
  { name: 'Rings of Spectral Light',     fp: 14, slots: 1, type: 'sorcery', school: 'Death',    dlc: true },
  { name: 'Mass of Putrescence',         fp: 41, slots: 1, type: 'sorcery', school: 'Death',    dlc: true },
  { name: 'Vortex of Putrescence',       fp: 29, slots: 2, type: 'sorcery', school: 'Death',    dlc: true },
];

export const INCANTATIONS: SpellEntry[] = [
  // Erdtree / Heal
  { name: 'Heal',                          fp: 16, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Great Heal',                    fp: 40, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Erdtree Heal',                  fp: 65, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Urgent Heal',                   fp: 10, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Cure Poison',                   fp: 14, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Flame Cleanse Me',              fp: 14, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Golden Vow',                    fp: 45, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Blessing of the Erdtree',       fp: 40, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Erdtree Blessing',              fp: 30, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Rejection',                     fp: 10, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Magic Fortification',           fp: 25, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Lightning Fortification',       fp: 30, slots: 1, type: 'incantation', school: 'Erdtree' },
  { name: 'Flame Fortification',           fp: 15, slots: 1, type: 'incantation', school: 'Erdtree' },
  // Order / Golden Order
  { name: 'Order\'s Blade',               fp: 30, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Law of Causality',              fp: 25, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Law of Regression',             fp: 55, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Radagon\'s Rings of Light',     fp: 26, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Discus of Light',               fp: 15, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Triple Rings of Light',         fp: 36, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Litany of Proper Death',        fp: 27, slots: 1, type: 'incantation', school: 'Golden Order' },
  { name: 'Fundamentalist\'s Essence',     fp: 22, slots: 1, type: 'incantation', school: 'Golden Order' },
  // Dragon Communion
  { name: 'Agheel\'s Flame',              fp: 36, slots: 1, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Dragonfire',                   fp: 28, slots: 1, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Rotten Breath',                fp: 36, slots: 1, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Ekzykes\'s Decay',             fp: 45, slots: 2, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Borealis\'s Mist',             fp: 36, slots: 1, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Smarag\'s Glintstone Breath',  fp: 36, slots: 1, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Greyoll\'s Roar',              fp: 55, slots: 2, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Theodorix\'s Magma',           fp: 50, slots: 2, type: 'incantation', school: 'Dragon Communion' },
  { name: 'Glintstone Breath',            fp: 28, slots: 1, type: 'incantation', school: 'Dragon Communion' },
  // Dragon Cult / Lightning
  { name: 'Lightning Spear',              fp: 18, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Honed Bolt',                   fp: 14, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Lightning Strike',             fp: 22, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Ancient Dragons\' Lightning Spear', fp: 25, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Ancient Dragons\' Lightning Strike', fp: 32, slots: 2, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Electrify Armament',           fp: 30, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Fortissax\'s Lightning Spear', fp: 40, slots: 2, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Death Lightning',              fp: 34, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Lansseax\'s Glaive',           fp: 38, slots: 2, type: 'incantation', school: 'Dragon Cult' },
  { name: 'Dragonbolt Blessing',          fp: 55, slots: 1, type: 'incantation', school: 'Dragon Cult' },
  // Giants' Flame
  { name: 'O Flame!',                     fp: 14, slots: 1, type: 'incantation', school: "Giants' Flame" },
  { name: 'Burn O Flame!',                fp: 30, slots: 1, type: 'incantation', school: "Giants' Flame" },
  { name: 'Whirl O Flame!',               fp: 16, slots: 1, type: 'incantation', school: "Giants' Flame" },
  { name: 'Giantsflame Take Thee',        fp: 36, slots: 1, type: 'incantation', school: "Giants' Flame" },
  { name: 'Flame of the Fell God',        fp: 34, slots: 2, type: 'incantation', school: "Giants' Flame" },
  { name: 'Fire\'s Deadly Sin',           fp: 15, slots: 1, type: 'incantation', school: "Giants' Flame" },
  // Black Flame
  { name: 'Black Flame',                  fp: 18, slots: 1, type: 'incantation', school: 'Black Flame' },
  { name: 'Black Flame Blade',            fp: 20, slots: 1, type: 'incantation', school: 'Black Flame' },
  { name: 'Black Flame Ritual',           fp: 30, slots: 2, type: 'incantation', school: 'Black Flame' },
  { name: 'Scouring Black Flame',         fp: 26, slots: 1, type: 'incantation', school: 'Black Flame' },
  { name: 'Black Flame\'s Protection',    fp: 30, slots: 1, type: 'incantation', school: 'Black Flame' },
  { name: 'Black Flame Tornado',          fp: 32, slots: 2, type: 'incantation', school: 'Black Flame' },
  // Bestial
  { name: 'Beast Claw',                   fp: 8,  slots: 1, type: 'incantation', school: 'Bestial' },
  { name: 'Bestial Sling',                fp: 7,  slots: 1, type: 'incantation', school: 'Bestial' },
  { name: 'Bestial Vitality',             fp: 17, slots: 1, type: 'incantation', school: 'Bestial' },
  { name: 'Stone of Gurranq',             fp: 10, slots: 1, type: 'incantation', school: 'Bestial' },
  { name: 'Gurranq\'s Beast Claw',        fp: 24, slots: 1, type: 'incantation', school: 'Bestial' },
  { name: 'The Flame of Frenzy',          fp: 16, slots: 1, type: 'incantation', school: 'Frenzied Flame' },
  { name: 'Frenzied Burst',               fp: 24, slots: 1, type: 'incantation', school: 'Frenzied Flame' },
  { name: 'Inescapable Frenzy',           fp: 30, slots: 1, type: 'incantation', school: 'Frenzied Flame' },
  { name: 'Unendurable Frenzy',           fp: 38, slots: 2, type: 'incantation', school: 'Frenzied Flame' },
  { name: 'Howl of Shabriri',             fp: 25, slots: 1, type: 'incantation', school: 'Frenzied Flame' },
  // Servants of Rot
  { name: 'Poison Mist',                  fp: 10, slots: 1, type: 'incantation', school: 'Servants of Rot' },
  { name: 'Scarlet Aeonia',               fp: 30, slots: 1, type: 'incantation', school: 'Servants of Rot' },
  { name: 'Pest Threads',                 fp: 14, slots: 1, type: 'incantation', school: 'Servants of Rot' },
  { name: 'Swarm of Flies',               fp: 14, slots: 1, type: 'incantation', school: 'Servants of Rot' },
  { name: 'Kindred of Rot\'s Fingers',    fp: 14, slots: 1, type: 'incantation', school: 'Servants of Rot' },
  { name: 'Malenia\'s Blessing',          fp: 30, slots: 1, type: 'incantation', school: 'Servants of Rot' },
  // Other
  { name: 'Elden Stars',                  fp: 41, slots: 2, type: 'incantation', school: 'Erdtree' },
  // DLC
  { name: 'Bayle\'s Tyranny',             fp: 46, slots: 2, type: 'incantation', school: 'Dragon Communion', dlc: true },
  { name: 'Dragonbolt of Florissax',      fp: 35, slots: 1, type: 'incantation', school: 'Dragon Communion', dlc: true },
  { name: 'Ancient Dragon Florissax',     fp: 55, slots: 2, type: 'incantation', school: 'Dragon Communion', dlc: true },
  { name: 'Messmer\'s Orb',              fp: 31, slots: 2, type: 'incantation', school: 'Fire Knight',       dlc: true },
  { name: 'Messmer Soldier\'s Spear',     fp: 18, slots: 1, type: 'incantation', school: 'Fire Knight',       dlc: true },
  { name: 'Flame of the Contortion',      fp: 22, slots: 1, type: 'incantation', school: "Giants' Flame",     dlc: true },
  { name: 'Divine Bird Feathers',         fp: 20, slots: 1, type: 'incantation', school: 'Erdtree',            dlc: true },
  { name: 'Shadow Bait',                  fp: 14, slots: 1, type: 'incantation', school: 'Servants of Rot',    dlc: true },
  { name: 'Romina\'s Purification',       fp: 40, slots: 2, type: 'incantation', school: 'Servants of Rot',    dlc: true },
];

export const ALL_SPELLS: SpellEntry[] = [...SORCERIES, ...INCANTATIONS];

// Memory slot calculation
export const MAX_BASE_SLOTS = 2;
export const MAX_MEMORY_STONES  = 8;
export const MOON_OF_NOKSTELLA_BONUS = 2;

export function calcMemorySlots(stonesHeld: number, moonEquipped: boolean): number {
  return MAX_BASE_SLOTS + stonesHeld + (moonEquipped ? MOON_OF_NOKSTELLA_BONUS : 0);
}

export function isMoonOfNokstella(talisman: string): boolean {
  return talisman === 'Moon of Nokstella';
}

export const MEMORY_STONES_LOCATIONS = [
  { name: 'Memory Stone #1', location: "Oridys's Rise, Weeping Peninsula" },
  { name: 'Memory Stone #2', location: 'Converted Tower, Western Liurnia' },
  { name: 'Memory Stone #3', location: 'Red Wolf of Radagon (boss drop), Raya Lucaria Academy' },
  { name: 'Memory Stone #4', location: "Testu's Rise, Northern Liurnia" },
  { name: 'Memory Stone #5', location: "Seluvis's Rise, Three Sisters, Liurnia" },
  { name: 'Memory Stone #6', location: 'Demi-Human Queen Maggie (boss drop), Mt. Gelmir' },
  { name: 'Memory Stone #7', location: "Lenne's Rise, Dragonbarrow, Caelid" },
  { name: 'Memory Stone #8', location: 'Twin Maiden Husks, Roundtable Hold (3,000 runes)' },
];

export interface BossDefinition {
  id: string;
  name: string;
  location: string;
  area: string;
  required: boolean;
  dlc: boolean;
}

export const ALL_BOSSES: BossDefinition[] = [
  // ── LIMGRAVE ──────────────────────────────────────────────
  { id: 'grafted-scion',       name: 'Grafted Scion',                         location: 'Chapel of Anticipation',        area: 'Limgrave',                   required: false, dlc: false },
  { id: 'tree-sentinel',       name: 'Tree Sentinel',                          location: 'Limgrave, Highway',             area: 'Limgrave',                   required: false, dlc: false },
  { id: 'agheel',              name: 'Flying Dragon Agheel',                   location: 'Dragon-Burnt Ruins',            area: 'Limgrave',                   required: false, dlc: false },
  { id: 'darriwil',            name: 'Bloodhound Knight Darriwil',             location: "Forlorn Hound Evergaol",        area: 'Limgrave',                   required: false, dlc: false },
  { id: 'tibia-limgrave',      name: 'Tibia Mariner',                          location: 'Summonwater Village',           area: 'Limgrave',                   required: false, dlc: false },
  { id: 'crucible-stormhill',  name: 'Crucible Knight',                        location: 'Stormhill Evergaol',            area: 'Limgrave',                   required: false, dlc: false },
  { id: 'margit',              name: 'Margit, the Fell Omen',                  location: 'Stormveil Castle Gate',         area: 'Limgrave',                   required: true,  dlc: false },
  { id: 'godrick',             name: 'Godrick the Grafted',                    location: 'Stormveil Castle',              area: 'Limgrave',                   required: true,  dlc: false },

  // ── WEEPING PENINSULA ─────────────────────────────────────
  { id: 'leonine',             name: 'Leonine Misbegotten',                    location: 'Castle Morne',                  area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'watchdog-impaler',    name: 'Erdtree Burial Watchdog',                location: "Impaler's Catacombs",           area: 'Weeping Peninsula',          required: false, dlc: false },

  // ── LIURNIA OF THE LAKES ──────────────────────────────────
  { id: 'smarag',              name: 'Glintstone Dragon Smarag',               location: 'Lake-Facing Cliffs',            area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'red-wolf',            name: 'Red Wolf of Radagon',                    location: 'Raya Lucaria Academy',          area: 'Liurnia of the Lakes',       required: true,  dlc: false },
  { id: 'rennala',             name: 'Rennala, Queen of the Full Moon',         location: 'Raya Lucaria Academy',          area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'loretta-carian',      name: 'Royal Knight Loretta',                   location: 'Carian Manor',                  area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'bols',                name: 'Bols, Carian Knight',                    location: "Cuckoo's Evergaol",             area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'magma-wyrm-makar',    name: 'Magma Wyrm Makar',                       location: 'Gael Tunnel',                   area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'adan',                name: 'Adan, Thief of Fire',                    location: "Malefactor's Evergaol",         area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'onyx-lord-royal',     name: 'Onyx Lord',                              location: 'Royal Grave Evergaol',          area: 'Liurnia of the Lakes',       required: false, dlc: false },

  // ── CAELID ────────────────────────────────────────────────
  { id: 'oneil',               name: "Commander O'Neil",                        location: 'Aeonia Swamp',                  area: 'Caelid',                     required: false, dlc: false },
  { id: 'radahn',              name: 'Starscourge Radahn',                     location: 'Wailing Dunes, Redmane Castle', area: 'Caelid',                     required: false, dlc: false },
  { id: 'ekzykes',             name: 'Decaying Ekzykes',                       location: 'Caelid Highway South',          area: 'Caelid',                     required: false, dlc: false },
  { id: 'nox-swordstress',     name: 'Nox Swordstress & Nox Priest',           location: 'Sellia, Town of Sorcery',       area: 'Caelid',                     required: false, dlc: false },

  // ── ALTUS PLATEAU ─────────────────────────────────────────
  { id: 'elemer',              name: 'Elemer of the Briar',                    location: 'The Shaded Castle',             area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'demi-queen-gilika',   name: 'Demi-Human Queen Gilika',                location: 'Lux Ruins',                     area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'godskin-noble-tbr',   name: 'Godskin Noble',                          location: 'Temple of Eiglay',              area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'tibia-altus',         name: 'Tibia Mariner',                          location: "Wyndham Ruins",                 area: 'Altus Plateau',              required: false, dlc: false },

  // ── MT. GELMIR ────────────────────────────────────────────
  { id: 'fallingstar',         name: 'Full-Grown Fallingstar Beast',           location: 'Ninth Mt. Gelmir Campsite',     area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'maggie',              name: 'Demi-Human Queen Maggie',                location: 'Hermit Village',                area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'rykard',              name: 'Rykard, Lord of Blasphemy',              location: 'Volcano Manor',                 area: 'Mt. Gelmir',                 required: false, dlc: false },

  // ── LEYNDELL, ROYAL CAPITAL ───────────────────────────────
  { id: 'fell-twins',          name: 'Fell Twins',                             location: 'Leyndell, Royal Capital',       area: 'Leyndell',                   required: false, dlc: false },
  { id: 'godfrey-shade',       name: 'Godfrey, First Elden Lord (Shade)',      location: 'Leyndell, Royal Capital',       area: 'Leyndell',                   required: true,  dlc: false },
  { id: 'morgott',             name: 'Morgott, the Omen King',                 location: 'Leyndell, Royal Capital',       area: 'Leyndell',                   required: true,  dlc: false },

  // ── SIOFRA RIVER / UNDERGROUND ────────────────────────────
  { id: 'ancestor-spirit',     name: 'Ancestor Spirit',                        location: 'Hallowhorn Grounds, Siofra',    area: 'Siofra River',               required: false, dlc: false },
  { id: 'dragonkin-siofra',    name: 'Dragonkin Soldier',                      location: 'Siofra River',                  area: 'Siofra River',               required: false, dlc: false },
  { id: 'valiant-gargoyles',   name: 'Valiant Gargoyles',                      location: 'Siofra Aqueduct',               area: 'Siofra River',               required: false, dlc: false },
  { id: 'dragonkin-nokstella',  name: 'Dragonkin Soldier of Nokstella',        location: 'Ainsel River Main',             area: 'Ainsel River',               required: false, dlc: false },
  { id: 'astel',               name: 'Astel, Naturalborn of the Void',         location: 'Lake of Rot',                   area: 'Lake of Rot',                required: false, dlc: false },
  { id: 'mohg-omen',           name: 'Mohg, the Omen',                         location: 'Subterranean Shunning-Grounds', area: 'Leyndell Underground',       required: false, dlc: false },
  { id: 'fortissax',           name: 'Lichdragon Fortissax',                   location: 'Deeproot Depths',               area: 'Deeproot Depths',            required: false, dlc: false },
  { id: 'fias-champions',      name: "Fia's Champions",                        location: 'Deeproot Depths',               area: 'Deeproot Depths',            required: false, dlc: false },
  { id: 'mohg-lord',           name: 'Mohg, Lord of Blood',                    location: 'Mohgwyn Palace',                area: 'Mohgwyn Palace',             required: false, dlc: false },
  { id: 'revenant-nokron',     name: 'Mimic Tear',                             location: "Night's Sacred Ground, Nokron", area: 'Nokron',                     required: false, dlc: false },
  { id: 'regal-ancestor',      name: 'Regal Ancestor Spirit',                  location: 'Nokron, Eternal City',          area: 'Nokron',                     required: false, dlc: false },

  // ── MOUNTAINTOPS OF THE GIANTS ────────────────────────────
  { id: 'borealis',            name: 'Borealis the Freezing Fog',              location: 'Freezing Lake',                 area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'niall',               name: 'Commander Niall',                        location: 'Castle Sol',                    area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'fire-giant',          name: 'Fire Giant',                             location: "Giants' Mountaintop",           area: 'Mountaintops of the Giants', required: true,  dlc: false },

  // ── CONSECRATED SNOWFIELD ─────────────────────────────────
  { id: 'putrid-avatar',       name: 'Putrid Avatar',                          location: 'Consecrated Snowfield',         area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'astel-stars',         name: 'Astel, Stars of Darkness',              location: 'Yelough Anix Tunnel',           area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'adula',               name: 'Glintstone Dragon Adula',               location: 'Cathedral of Manus Celes',      area: 'Consecrated Snowfield',      required: false, dlc: false },

  // ── MIQUELLA'S HALIGTREE ──────────────────────────────────
  { id: 'loretta-haligtree',   name: "Loretta, Knight of the Haligtree",      location: "Miquella's Haligtree",          area: "Miquella's Haligtree",       required: false, dlc: false },
  { id: 'malenia',             name: 'Malenia, Blade of Miquella',            location: 'Elphael, Brace of the Haligtree',area: "Miquella's Haligtree",      required: false, dlc: false },

  // ── CRUMBLING FARUM AZULA ─────────────────────────────────
  { id: 'godskin-duo',         name: 'Godskin Duo',                            location: 'Dragon Temple, Farum Azula',    area: 'Crumbling Farum Azula',      required: true,  dlc: false },
  { id: 'maliketh',            name: 'Maliketh, the Black Blade',              location: 'Crumbling Farum Azula',         area: 'Crumbling Farum Azula',      required: true,  dlc: false },
  { id: 'placidusax',          name: 'Dragonlord Placidusax',                 location: 'Crumbling Farum Azula',         area: 'Crumbling Farum Azula',      required: false, dlc: false },

  // ── LEYNDELL, ASHEN CAPITAL ───────────────────────────────
  { id: 'gideon',              name: 'Sir Gideon Ofnir, the All-Knowing',     location: 'Leyndell, Ashen Capital',       area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },
  { id: 'godfrey',             name: 'Godfrey, First Elden Lord / Hoarah Loux',location: 'Leyndell, Ashen Capital',      area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },
  { id: 'radagon',             name: 'Radagon of the Golden Order',            location: 'Elden Throne',                  area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },
  { id: 'elden-beast',         name: 'Elden Beast',                            location: 'Elden Throne',                  area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },

  // ── DLC: SHADOW OF THE ERDTREE ────────────────────────────
  { id: 'dancing-lion',        name: 'Divine Beast Dancing Lion',              location: 'Belurat Tower Settlement',      area: 'Gravesite Plain',            required: true,  dlc: true },
  { id: 'rellana',             name: 'Rellana, Twin Moon Knight',              location: 'Castle Ensis',                  area: 'Gravesite Plain',            required: true,  dlc: true },
  { id: 'hippo',               name: 'Golden Hippopotamus',                    location: 'Shadow Keep, Entrance',         area: 'Scadu Altus',                required: true,  dlc: true },
  { id: 'gaius',               name: 'Commander Gaius',                        location: 'Shadow Keep Back Gate',         area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'messmer',             name: 'Messmer the Impaler',                   location: 'Shadow Keep',                   area: 'Scadu Altus',                required: true,  dlc: true },
  { id: 'romina',              name: 'Romina, Saint of the Bud',              location: 'Church of the Bud',             area: 'Ancient Ruins of Rauh',      required: true,  dlc: true },
  { id: 'putrescent',          name: 'Putrescent Knight',                      location: 'Stone Coffin Fissure',          area: 'Cerulean Coast',             required: false, dlc: true },
  { id: 'scadutree-avatar',    name: 'Scadutree Avatar',                       location: 'Scaduview',                     area: 'Cerulean Coast',             required: false, dlc: true },
  { id: 'bayle',               name: 'Bayle the Dread',                        location: "Dragon's Pit, Jagged Peak",     area: 'Jagged Peak',                required: false, dlc: true },
  { id: 'midra',               name: 'Midra, Lord of Frenzied Flame',         location: "Midra's Manse",                 area: 'Abyssal Woods',              required: false, dlc: true },
  { id: 'metyr',               name: 'Metyr, Mother of Fingers',              location: 'Cathedral of Manus Metyr',      area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'consort-radahn',      name: 'Promised Consort Radahn',               location: 'Enir-Ilim',                     area: 'Enir-Ilim',                  required: true,  dlc: true },
];

export const AREAS = [...new Set(ALL_BOSSES.map(b => b.area))];

export const BASE_GAME_BOSSES = ALL_BOSSES.filter(b => !b.dlc);
export const DLC_BOSSES = ALL_BOSSES.filter(b => b.dlc);

export interface BossDefinition {
  id: string;
  name: string;
  location: string;
  area: string;
  required: boolean;
  dlc: boolean;
}

export const ALL_BOSSES: BossDefinition[] = [

  // ── LIMGRAVE ──────────────────────────────────────────────────────────────
  { id: 'grafted-scion',          name: 'Grafted Scion',                          location: 'Chapel of Anticipation',            area: 'Limgrave',                   required: false, dlc: false },
  { id: 'soldier-of-godrick',     name: 'Soldier of Godrick',                     location: 'Cave of Knowledge',                 area: 'Limgrave',                   required: false, dlc: false },
  { id: 'beastman-limgrave',      name: 'Beastman of Farum Azula',                location: 'Groveside Cave',                    area: 'Limgrave',                   required: false, dlc: false },
  { id: 'demi-chief-limgrave',    name: 'Demi-Human Chief',                       location: 'Coastal Cave',                      area: 'Limgrave',                   required: false, dlc: false },
  { id: 'demi-chief-limgrave2',   name: 'Demi-Human Chiefs',                      location: 'Demi-Human Forest Ruins',           area: 'Limgrave',                   required: false, dlc: false },
  { id: 'watchdog-stormfoot',     name: 'Erdtree Burial Watchdog',                location: 'Stormfoot Catacombs',               area: 'Limgrave',                   required: false, dlc: false },
  { id: 'cemetery-limgrave',      name: 'Cemetery Shade',                         location: 'Black Knife Catacombs',             area: 'Limgrave',                   required: false, dlc: false },
  { id: 'grave-warden-limgrave',  name: 'Grave Warden Duelist',                   location: 'Murkwater Catacombs',               area: 'Limgrave',                   required: false, dlc: false },
  { id: 'black-knife-limgrave',   name: 'Black Knife Assassin',                   location: 'Deathtouched Catacombs',            area: 'Limgrave',                   required: false, dlc: false },
  { id: 'mad-pumpkin-limgrave',   name: 'Mad Pumpkin Head',                       location: 'Waypoint Ruins Cellar',             area: 'Limgrave',                   required: false, dlc: false },
  { id: 'patches',                name: 'Patches',                                location: 'Murkwater Cave',                    area: 'Limgrave',                   required: false, dlc: false },
  { id: 'guardian-golem',         name: 'Guardian Golem',                         location: 'Highroad Cave',                     area: 'Limgrave',                   required: false, dlc: false },
  { id: 'crucible-stormhill',     name: 'Crucible Knight',                        location: 'Stormhill Evergaol',                area: 'Limgrave',                   required: false, dlc: false },
  { id: 'darriwil',               name: 'Bloodhound Knight Darriwil',             location: 'Forlorn Hound Evergaol',            area: 'Limgrave',                   required: false, dlc: false },
  { id: 'night-cavalry-limgrave', name: "Night's Cavalry",                        location: 'East Limgrave, Saintsbridge',       area: 'Limgrave',                   required: false, dlc: false },
  { id: 'bell-bearing-limgrave',  name: 'Bell Bearing Hunter',                    location: "Warmaster's Shack",                 area: 'Limgrave',                   required: false, dlc: false },
  { id: 'tibia-limgrave',         name: 'Tibia Mariner',                          location: 'Summonwater Village',               area: 'Limgrave',                   required: false, dlc: false },
  { id: 'deathbird-limgrave',     name: 'Deathbird',                              location: 'Limgrave, Lake Bridge',             area: 'Limgrave',                   required: false, dlc: false },
  { id: 'tree-sentinel',          name: 'Tree Sentinel',                          location: 'Limgrave, Erdtree Surroundings',    area: 'Limgrave',                   required: false, dlc: false },
  { id: 'agheel',                 name: 'Flying Dragon Agheel',                   location: 'Dragon-Burnt Ruins',                area: 'Limgrave',                   required: false, dlc: false },
  { id: 'margit',                 name: 'Margit, the Fell Omen',                  location: 'Stormveil Castle Gate',             area: 'Limgrave',                   required: true,  dlc: false },
  { id: 'godrick',                name: 'Godrick the Grafted',                    location: 'Stormveil Castle',                  area: 'Limgrave',                   required: true,  dlc: false },

  // ── WEEPING PENINSULA ─────────────────────────────────────────────────────
  { id: 'cemetery-tombsward',     name: 'Cemetery Shade',                         location: 'Tombsward Catacombs',               area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'watchdog-impaler',       name: 'Erdtree Burial Watchdog',                location: "Impaler's Catacombs",               area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'ancient-hero-weeping',   name: 'Ancient Hero of Zamor',                  location: 'Weeping Evergaol',                  area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'night-cavalry-weeping',  name: "Night's Cavalry",                        location: 'Weeping Peninsula, Church Road',    area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'deathbird-weeping',      name: 'Deathbird',                              location: 'Weeping Peninsula, Castle Morne Road', area: 'Weeping Peninsula',       required: false, dlc: false },
  { id: 'miranda-tombsward',      name: 'Miranda the Blighted Bloom',             location: 'Tombsward Cave',                    area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'runebear',               name: 'Runebear',                               location: 'Earthbore Cave',                    area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'scaly-misbegotten',      name: 'Scaly Misbegotten',                      location: 'Morne Tunnel',                      area: 'Weeping Peninsula',          required: false, dlc: false },
  { id: 'leonine',                name: 'Leonine Misbegotten',                    location: 'Castle Morne',                      area: 'Weeping Peninsula',          required: false, dlc: false },

  // ── LIURNIA OF THE LAKES ──────────────────────────────────────────────────
  { id: 'spirit-caller-liurnia',  name: 'Spirit-Caller Snail',                    location: "Road's End Catacombs",              area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'crystalian-academy',     name: 'Crystalian',                             location: 'Academy Crystal Cave',              area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'crystalians-liurnia',    name: 'Crystalian (Spear & Staff)',             location: 'Raya Lucaria Crystal Tunnel',       area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'bloodhound-lake',        name: 'Bloodhound Knight',                      location: 'Lakeside Crystal Cave',             area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'cleanrot-stillwater',    name: 'Cleanrot Knight',                        location: 'Stillwater Cave',                   area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'royal-revenant',         name: 'Royal Revenant',                         location: 'Kingsrealm Ruins',                  area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'omenkiller-village',     name: 'Omenkiller',                             location: 'Village of the Albinaurics',        area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'deathbird-liurnia',      name: 'Deathbird',                              location: 'Liurnia, South of Academy Gate',    area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'death-rite-liurnia',     name: 'Death Rite Bird',                        location: 'Liurnia, Northeast',                area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'night-cavalry-liurnia',  name: "Night's Cavalry",                        location: 'Liurnia, Eastern Tablelands',       area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'night-cavalry-liurnia2', name: "Night's Cavalry",                        location: 'Liurnia, Northern Tablelands',      area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'tibia-liurnia',          name: 'Tibia Mariner',                          location: 'Liurnia, North of Academy Gate',    area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'adan',                   name: 'Adan, Thief of Fire',                    location: "Malefactor's Evergaol",             area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'bols',                   name: 'Bols, Carian Knight',                    location: "Cuckoo's Evergaol",                 area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'alecto',                 name: 'Alecto, Black Knife Ringleader',         location: "Ringleader's Evergaol",             area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'onyx-lord-royal',        name: 'Onyx Lord',                              location: 'Royal Grave Evergaol',              area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'smarag',                 name: 'Glintstone Dragon Smarag',               location: 'Liurnia, Lake-Facing Cliffs',       area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'magma-wyrm-makar',       name: 'Magma Wyrm Makar',                       location: 'Ruin-Strewn Precipice',             area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'red-wolf',               name: 'Red Wolf of Radagon',                    location: 'Raya Lucaria Academy',              area: 'Liurnia of the Lakes',       required: true,  dlc: false },
  { id: 'rennala',                name: 'Rennala, Queen of the Full Moon',         location: 'Raya Lucaria Academy',              area: 'Liurnia of the Lakes',       required: false, dlc: false },
  { id: 'loretta-carian',         name: 'Royal Knight Loretta',                   location: 'Caria Manor',                       area: 'Liurnia of the Lakes',       required: false, dlc: false },

  // ── CAELID ────────────────────────────────────────────────────────────────
  { id: 'cemetery-caelid',        name: 'Cemetery Shade',                         location: 'War-Dead Catacombs',                area: 'Caelid',                     required: false, dlc: false },
  { id: 'watchdog-caelid-duo',    name: 'Erdtree Burial Watchdog (Duo)',           location: 'Caelid Catacombs',                  area: 'Caelid',                     required: false, dlc: false },
  { id: 'nox-swordstress',        name: 'Nox Swordstress & Nox Monk',             location: 'Sellia, Town of Sorcery',           area: 'Caelid',                     required: false, dlc: false },
  { id: 'frenzied-duelist',       name: 'Frenzied Duelist',                       location: 'Caelid Gaol',                       area: 'Caelid',                     required: false, dlc: false },
  { id: 'mad-pumpkin-caelid',     name: 'Mad Pumpkin Heads (Duo)',                location: 'Sellia Crystal Tunnel',             area: 'Caelid',                     required: false, dlc: false },
  { id: 'magma-wyrm-caelid',      name: 'Magma Wyrm',                             location: 'Gael Tunnel',                       area: 'Caelid',                     required: false, dlc: false },
  { id: 'crucible-misbegotten',   name: 'Crucible Knight & Misbegotten Warrior',  location: 'Redmane Castle',                    area: 'Caelid',                     required: false, dlc: false },
  { id: 'fallingstar-caelid',     name: 'Fallingstar Beast',                      location: 'Caelid, South of Rotview Balcony',  area: 'Caelid',                     required: false, dlc: false },
  { id: 'putrid-avatar-caelid',   name: 'Putrid Avatar',                          location: 'Caelid, Minor Erdtree',             area: 'Caelid',                     required: false, dlc: false },
  { id: 'ekzykes',                name: 'Decaying Ekzykes',                       location: 'Caelid Highway South',              area: 'Caelid',                     required: false, dlc: false },
  { id: 'oneil',                  name: "Commander O'Neil",                        location: 'Swamp of Aeonia',                   area: 'Caelid',                     required: false, dlc: false },
  { id: 'radahn',                 name: 'Starscourge Radahn',                     location: 'Wailing Dunes, Redmane Castle',     area: 'Caelid',                     required: false, dlc: false },

  // ── DRAGONBARROW ──────────────────────────────────────────────────────────
  { id: 'beastman-dragonbarrow',  name: 'Beastman of Farum Azula',                location: 'Dragonbarrow Cave',                 area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'cleanrot-dragonbarrow',  name: 'Cleanrot Knight',                        location: 'Sellia Hideaway',                   area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'putrid-crystalians',     name: 'Putrid Crystalian Trio',                 location: 'Sellia Crystal Tunnel',             area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'putrid-tree-spirit',     name: 'Putrid Tree Spirit',                     location: 'War-Dead Catacombs',                area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'battlemage-hugues',      name: 'Battlemage Hugues',                      location: 'Farum Greatbridge',                 area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'black-blade-kindred-db', name: 'Black Blade Kindred',                    location: 'Dragonbarrow Fork',                 area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'godskin-divine-tower',   name: 'Godskin Apostle',                        location: 'Divine Tower of Caelid',            area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'greyll',                 name: 'Flying Dragon Greyll',                   location: 'Farum Greatbridge',                 area: 'Dragonbarrow',               required: false, dlc: false },

  // ── ALTUS PLATEAU ─────────────────────────────────────────────────────────
  { id: 'watchdog-altus',         name: 'Erdtree Burial Watchdog',                location: 'Wyndham Catacombs',                 area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'sanguine-noble',         name: 'Sanguine Noble',                         location: 'Writheblood Ruins',                 area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'wormface',               name: 'Wormface',                               location: 'Minor Erdtree, Altus',              area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'omenkiller-altus',       name: 'Omenkiller & Miranda Flower',            location: "Perfumer's Ruins",                  area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'miranda-altus',          name: 'Miranda the Blighted Bloom',             location: 'Altus Plateau, Minor Erdtree area', area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'ancient-hero-altus',     name: 'Ancient Hero of Zamor',                  location: "Sainted Hero's Grave",              area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'black-knife-altus',      name: 'Black Knife Assassin',                   location: "Sage's Cave",                       area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'black-knife-altus2',     name: 'Black Knife Assassin',                   location: "Sainted Hero's Grave",              area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'necromancer-garris',     name: 'Necromancer Garris',                     location: "Sage's Cave",                       area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'godefroy',               name: 'Godefroy the Grafted',                   location: 'Golden Lineage Evergaol',           area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'crystalians-altus',      name: 'Crystalian (Spear & Ringblade)',         location: 'Altus Tunnel',                      area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'fallingstar-altus',      name: 'Fallingstar Beast',                      location: 'Altus Plateau',                     area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'perfumer-misbegotten',   name: 'Perfumer Tricia & Misbegotten Warrior',  location: 'Unsightly Catacombs',               area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'godskin-apostle-altus',  name: 'Godskin Apostle',                        location: 'Windmill Village',                  area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'ancient-lansseax',       name: 'Ancient Dragon Lansseax',                location: 'Altus Plateau, Seethewater',        area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'tibia-altus',            name: 'Tibia Mariner',                          location: 'Wyndham Ruins',                     area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'elemer',                 name: 'Elemer of the Briar',                    location: 'The Shaded Castle',                 area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'demi-queen-gilika',      name: 'Demi-Human Queen Gilika',                location: 'Lux Ruins',                         area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'bell-bearing-altus',     name: 'Bell Bearing Hunter',                    location: "Hermit Merchant's Shack, Altus",    area: 'Altus Plateau',              required: false, dlc: false },
  { id: 'night-cavalry-altus',    name: "Night's Cavalry",                        location: 'Altus Plateau, East Bridge',        area: 'Altus Plateau',              required: false, dlc: false },

  // ── CAPITAL OUTSKIRTS ─────────────────────────────────────────────────────
  { id: 'draconic-tree-sentinel', name: 'Draconic Tree Sentinel',                 location: 'Capital Outskirts, Outer Wall',     area: 'Capital Outskirts',          required: true,  dlc: false },
  { id: 'tree-sentinel-duo',      name: 'Tree Sentinels (Duo)',                   location: 'Altus Plateau, Capital Gate',       area: 'Capital Outskirts',          required: false, dlc: false },
  { id: 'crucible-ordovis',       name: 'Crucible Knight & Crucible Knight Ordovis', location: "Auriza Hero's Grave",            area: 'Capital Outskirts',          required: false, dlc: false },
  { id: 'fell-twins-auriza',      name: 'Fell Twins',                             location: 'Auriza Side Tomb',                  area: 'Capital Outskirts',          required: false, dlc: false },
  { id: 'onyx-lord-capital',      name: 'Onyx Lord',                              location: 'Capital Outskirts, Underground',    area: 'Capital Outskirts',          required: false, dlc: false },
  { id: 'bell-bearing-capital',   name: 'Bell Bearing Hunter',                    location: 'Isolated Merchant Shack, Capital',  area: 'Capital Outskirts',          required: false, dlc: false },
  { id: 'night-cavalry-capital',  name: "Night's Cavalry",                        location: 'Capital Outskirts, Outer Wall',     area: 'Capital Outskirts',          required: false, dlc: false },

  // ── MT. GELMIR ────────────────────────────────────────────────────────────
  { id: 'kindred-of-rot',         name: 'Kindred of Rot',                         location: 'Seethewater Cave',                  area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'demi-queen-margot',      name: 'Demi-Human Queen Margot',                location: 'Volcano Cave',                      area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'abductor-virgins',       name: 'Abductor Virgins',                       location: 'Volcano Manor Basement',            area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'red-wolf-champion',      name: 'Red Wolf of the Champion',               location: "Gelmir Hero's Grave",               area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'magma-wyrm-gelmir',      name: 'Magma Wyrm',                             location: 'Fort Laiedd',                       area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'godskin-noble-gelmir',   name: 'Godskin Noble',                          location: 'Temple of Eiglay, Volcano Manor',   area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'fallingstar-gelmir',     name: 'Full-Grown Fallingstar Beast',           location: 'Ninth Mt. Gelmir Campsite',         area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'maggie',                 name: 'Demi-Human Queen Maggie',                location: 'Hermit Village',                    area: 'Mt. Gelmir',                 required: false, dlc: false },
  { id: 'rykard',                 name: 'Rykard, Lord of Blasphemy',              location: 'Volcano Manor',                     area: 'Mt. Gelmir',                 required: false, dlc: false },

  // ── LEYNDELL, ROYAL CAPITAL ───────────────────────────────────────────────
  { id: 'esgar',                  name: 'Esgar, Priest of Blood',                 location: 'Leyndell Sewers',                   area: 'Leyndell',                   required: false, dlc: false },
  { id: 'mohg-omen',              name: 'Mohg, the Omen',                         location: 'Subterranean Shunning-Grounds',     area: 'Leyndell',                   required: false, dlc: false },
  { id: 'fell-twins',             name: 'Fell Twins',                             location: 'Leyndell, Royal Capital',           area: 'Leyndell',                   required: false, dlc: false },
  { id: 'godfrey-shade',          name: 'Godfrey, First Elden Lord (Shade)',      location: 'Leyndell, Royal Capital',           area: 'Leyndell',                   required: true,  dlc: false },
  { id: 'morgott',                name: 'Morgott, the Omen King',                 location: 'Leyndell, Royal Capital',           area: 'Leyndell',                   required: true,  dlc: false },

  // ── SIOFRA RIVER / NOKRON / UNDERGROUND ───────────────────────────────────
  { id: 'ancestor-spirit',        name: 'Ancestor Spirit',                        location: 'Hallowhorn Grounds, Siofra River',  area: 'Siofra River',               required: false, dlc: false },
  { id: 'dragonkin-siofra',       name: 'Dragonkin Soldier',                      location: 'Siofra River',                      area: 'Siofra River',               required: false, dlc: false },
  { id: 'valiant-gargoyles',      name: 'Valiant Gargoyles',                      location: 'Siofra Aqueduct',                   area: 'Siofra River',               required: false, dlc: false },
  { id: 'dragonkin-nokstella',    name: 'Dragonkin Soldier of Nokstella',         location: 'Ainsel River Main',                 area: 'Ainsel River',               required: false, dlc: false },
  { id: 'dragonkin-lake',         name: 'Dragonkin Soldier',                      location: 'Lake of Rot',                       area: 'Lake of Rot',                required: false, dlc: false },
  { id: 'astel',                  name: 'Astel, Naturalborn of the Void',         location: 'Lake of Rot',                       area: 'Lake of Rot',                required: false, dlc: false },
  { id: 'regal-ancestor',         name: 'Regal Ancestor Spirit',                  location: 'Nokron, Eternal City',              area: 'Nokron',                     required: false, dlc: false },
  { id: 'mimic-tear',             name: 'Mimic Tear',                             location: "Night's Sacred Ground, Nokron",    area: 'Nokron',                     required: false, dlc: false },
  { id: 'spirit-caller-nokstella',name: 'Spirit-Caller Snail',                    location: 'Nokstella Waterfall Basin',         area: 'Ainsel River',               required: false, dlc: false },
  { id: 'mohg-lord',              name: 'Mohg, Lord of Blood',                    location: 'Mohgwyn Palace',                    area: 'Mohgwyn Palace',             required: false, dlc: false },
  { id: 'fias-champions',         name: "Fia's Champions",                        location: 'Deeproot Depths',                   area: 'Deeproot Depths',            required: false, dlc: false },
  { id: 'crucible-siluria',       name: 'Crucible Knight Siluria',                location: 'Deeproot Depths',                   area: 'Deeproot Depths',            required: false, dlc: false },
  { id: 'fortissax',              name: 'Lichdragon Fortissax',                   location: 'Deeproot Depths',                   area: 'Deeproot Depths',            required: false, dlc: false },

  // ── MOUNTAINTOPS OF THE GIANTS ────────────────────────────────────────────
  { id: 'ancient-hero-zamor',     name: 'Ancient Hero of Zamor',                  location: 'Mountaintops, Zamor Ruins',         area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'deathbird-mountaintops', name: 'Deathbird',                              location: 'Mountaintops, Foot of the Forge',   area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'vyke',                   name: 'Vyke, Knight of the Roundtable',         location: 'Church of Inhibition',              area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'godskin-spiritcaller',   name: 'Godskin Apostle & Godskin Noble',        location: "Spiritcaller's Cave",               area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'borealis',               name: 'Borealis the Freezing Fog',              location: 'Freezing Lake',                     area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'niall',                  name: 'Commander Niall',                        location: 'Castle Sol',                        area: 'Mountaintops of the Giants', required: false, dlc: false },
  { id: 'fire-giant',             name: 'Fire Giant',                             location: "Giants' Mountaintop Forge",         area: 'Mountaintops of the Giants', required: true,  dlc: false },

  // ── FORBIDDEN LANDS / APPROACHES ──────────────────────────────────────────
  { id: 'black-blade-kindred-fl', name: 'Black Blade Kindred',                    location: 'Forbidden Lands, Grand Lift',       area: 'Forbidden Lands',            required: false, dlc: false },
  { id: 'stray-mimic-tear',       name: 'Stray Mimic Tear',                       location: 'Hidden Path to the Haligtree',      area: 'Forbidden Lands',            required: false, dlc: false },
  { id: 'night-cavalry-forbidden',name: "Night's Cavalry",                        location: 'Forbidden Lands',                   area: 'Forbidden Lands',            required: false, dlc: false },

  // ── CONSECRATED SNOWFIELD ─────────────────────────────────────────────────
  { id: 'putrid-avatar',          name: 'Putrid Avatar',                          location: 'Consecrated Snowfield, Minor Erdtree', area: 'Consecrated Snowfield',  required: false, dlc: false },
  { id: 'putrid-avatar-db',       name: 'Putrid Avatar',                          location: 'Dragonbarrow, Minor Erdtree',       area: 'Dragonbarrow',               required: false, dlc: false },
  { id: 'astel-stars',            name: 'Astel, Stars of Darkness',               location: 'Yelough Anix Tunnel',               area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'death-rite-snowfield',   name: 'Death Rite Bird',                        location: 'Consecrated Snowfield',             area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'great-wyrm-theodorix',   name: 'Great Wyrm Theodorix',                   location: 'Consecrated Snowfield, River',      area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'misbegotten-crusader',   name: 'Misbegotten Crusader',                   location: 'Cave of the Forlorn',               area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'putrid-grave-duelist',   name: 'Putrid Grave Warden Duelist',            location: 'Consecrated Snowfield Catacombs',   area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'night-cavalry-snowfield',name: "Night's Cavalry (Duo)",                  location: 'Consecrated Snowfield, Road',       area: 'Consecrated Snowfield',      required: false, dlc: false },
  { id: 'adula',                  name: 'Glintstone Dragon Adula',                location: 'Cathedral of Manus Celes',          area: 'Consecrated Snowfield',      required: false, dlc: false },

  // ── MIQUELLA'S HALIGTREE ──────────────────────────────────────────────────
  { id: 'loretta-haligtree',      name: "Loretta, Knight of the Haligtree",       location: "Miquella's Haligtree",              area: "Miquella's Haligtree",       required: false, dlc: false },
  { id: 'malenia',                name: 'Malenia, Blade of Miquella',             location: 'Elphael, Brace of the Haligtree',   area: "Miquella's Haligtree",       required: false, dlc: false },

  // ── CRUMBLING FARUM AZULA ─────────────────────────────────────────────────
  { id: 'godskin-duo',            name: 'Godskin Duo',                            location: 'Dragon Temple, Farum Azula',        area: 'Crumbling Farum Azula',      required: true,  dlc: false },
  { id: 'maliketh',               name: 'Maliketh, the Black Blade',              location: 'Crumbling Farum Azula',             area: 'Crumbling Farum Azula',      required: true,  dlc: false },
  { id: 'placidusax',             name: 'Dragonlord Placidusax',                  location: 'Crumbling Farum Azula, Tempest',    area: 'Crumbling Farum Azula',      required: false, dlc: false },

  // ── LEYNDELL, ASHEN CAPITAL ───────────────────────────────────────────────
  { id: 'gideon',                 name: 'Sir Gideon Ofnir, the All-Knowing',      location: 'Leyndell, Ashen Capital',           area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },
  { id: 'godfrey',                name: 'Godfrey, First Elden Lord / Hoarah Loux',location: 'Leyndell, Ashen Capital',           area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },
  { id: 'radagon',                name: 'Radagon of the Golden Order',             location: 'Elden Throne',                      area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },
  { id: 'elden-beast',            name: 'Elden Beast',                            location: 'Elden Throne',                      area: 'Leyndell, Ashen Capital',    required: true,  dlc: false },

  // ── DLC: GRAVESITE PLAIN ──────────────────────────────────────────────────
  { id: 'blackgaol-knight',       name: 'Blackgaol Knight',                       location: 'Western Nameless Mausoleum',        area: 'Gravesite Plain',            required: false, dlc: true },
  { id: 'demi-swordmaster-onze',  name: 'Demi-Human Swordmaster Onze',            location: 'Gravesite Plain',                   area: 'Gravesite Plain',            required: false, dlc: true },
  { id: 'red-bear',               name: 'Red Bear',                               location: 'Gravesite Plain, Ruined Forge',     area: 'Gravesite Plain',            required: false, dlc: true },
  { id: 'ghostflame-dragon',      name: 'Ghostflame Dragon',                      location: 'Gravesite Plain',                   area: 'Gravesite Plain',            required: false, dlc: true },
  { id: 'dancing-lion',           name: 'Divine Beast Dancing Lion',              location: 'Belurat Tower Settlement',          area: 'Gravesite Plain',            required: true,  dlc: true },
  { id: 'rellana',                name: 'Rellana, Twin Moon Knight',              location: 'Castle Ensis',                      area: 'Gravesite Plain',            required: true,  dlc: true },

  // ── DLC: SCADU ALTUS ──────────────────────────────────────────────────────
  { id: 'hippo',                  name: 'Golden Hippopotamus',                    location: 'Shadow Keep, Entrance Hall',        area: 'Scadu Altus',                required: true,  dlc: true },
  { id: 'gaius',                  name: 'Commander Gaius',                        location: 'Shadow Keep Back Gate',             area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'black-knight-edredd',    name: 'Black Knight Edredd',                   location: 'Scadu Altus, Moorth Highway',       area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'black-knight-garrew',    name: 'Black Knight Garrew',                   location: 'Fort of Reprimand',                 area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'count-ymir',             name: 'Count Ymir, Mother of Fingers',          location: 'Scadu Altus',                       area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'curseblade-labirith',    name: 'Curseblade Labirith',                   location: 'Scadu Altus',                       area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'death-knight-dlc',       name: 'Death Knight',                           location: 'Scadu Altus, Ruined Forge',         area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'rakshasa',               name: 'Rakshasa',                               location: 'Scadu Altus',                       area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'ralva',                  name: 'Ralva the Great Red Bear',               location: 'Scadu Altus',                       area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'messmer',                name: 'Messmer the Impaler',                    location: 'Shadow Keep Specimen Storehouse',   area: 'Scadu Altus',                required: true,  dlc: true },
  { id: 'scadutree-avatar',       name: 'Scadutree Avatar',                       location: 'Scaduview',                         area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'fallingstar-scadu',      name: 'Fallingstar Beast',                      location: 'Scaduview',                         area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'tree-sentinel-scadu',    name: 'Tree Sentinel',                          location: 'Scaduview',                         area: 'Scadu Altus',                required: false, dlc: true },
  { id: 'metyr',                  name: 'Metyr, Mother of Fingers',               location: 'Cathedral of Manus Metyr',          area: 'Scadu Altus',                required: false, dlc: true },

  // ── DLC: ANCIENT RUINS OF RAUH ────────────────────────────────────────────
  { id: 'rugalea',                name: 'Rugalea the Great Red Bear',             location: 'Rauh Base',                         area: 'Ancient Ruins of Rauh',      required: false, dlc: true },
  { id: 'romina',                 name: 'Romina, Saint of the Bud',               location: 'Church of the Bud',                 area: 'Ancient Ruins of Rauh',      required: true,  dlc: true },

  // ── DLC: CERULEAN COAST / STONE COFFIN ────────────────────────────────────
  { id: 'demi-queen-marigga',     name: 'Demi-Human Queen Marigga',               location: 'Cerulean Coast',                    area: 'Cerulean Coast',             required: false, dlc: true },
  { id: 'putrescent',             name: 'Putrescent Knight',                      location: 'Stone Coffin Fissure',              area: 'Cerulean Coast',             required: false, dlc: true },

  // ── DLC: ABYSSAL WOODS ────────────────────────────────────────────────────
  { id: 'jori',                   name: 'Jori, Elder Inquisitor',                 location: 'Abyssal Woods',                     area: 'Abyssal Woods',              required: false, dlc: true },
  { id: 'midra',                  name: 'Midra, Lord of Frenzied Flame',          location: "Midra's Manse",                     area: 'Abyssal Woods',              required: false, dlc: true },

  // ── DLC: CHARO'S HIDDEN GRAVE ─────────────────────────────────────────────
  { id: 'chief-bloodfiend',       name: 'Chief Bloodfiend',                       location: 'Rivermouth Cave',                   area: "Charo's Hidden Grave",       required: false, dlc: true },
  { id: 'death-rite-charo',       name: 'Death Rite Bird',                        location: "Charo's Hidden Grave",              area: "Charo's Hidden Grave",       required: false, dlc: true },
  { id: 'lamenter',               name: 'Lamenter',                               location: "Charo's Hidden Grave",              area: "Charo's Hidden Grave",       required: false, dlc: true },
  { id: 'tibia-charo',            name: 'Tibia Mariner',                          location: "Charo's Hidden Grave",              area: "Charo's Hidden Grave",       required: false, dlc: true },

  // ── DLC: DRAGON'S PIT / JAGGED PEAK ──────────────────────────────────────
  { id: 'ancient-dragon-man',     name: 'Ancient Dragon-Man',                     location: "Dragon's Pit",                      area: "Jagged Peak",                required: false, dlc: true },
  { id: 'senessax',               name: 'Ancient Dragon Senessax',                location: 'Jagged Peak',                       area: 'Jagged Peak',                required: false, dlc: true },
  { id: 'jagged-peak-drake',      name: 'Jagged Peak Drake',                      location: 'Jagged Peak',                       area: 'Jagged Peak',                required: false, dlc: true },
  { id: 'bayle',                  name: 'Bayle the Dread',                        location: "Dragon's Pit, Jagged Peak",         area: 'Jagged Peak',                required: false, dlc: true },

  // ── DLC: SOUTHERN MAUSOLEUM / MOORTH ──────────────────────────────────────
  { id: 'dancer-of-ranah',        name: 'Dancer of Ranah',                        location: 'Southern Nameless Mausoleum',       area: 'Gravesite Plain',            required: false, dlc: true },
  { id: 'dryleaf-dane',           name: 'Dryleaf Dane',                           location: 'Moorth Ruins',                      area: 'Scadu Altus',                required: false, dlc: true },

  // ── DLC: ENIR-ILIM ────────────────────────────────────────────────────────
  { id: 'consort-radahn',         name: 'Promised Consort Radahn',                location: 'Enir-Ilim',                         area: 'Enir-Ilim',                  required: true,  dlc: true },
];

export const AREAS = [...new Set(ALL_BOSSES.map(b => b.area))];

export const BASE_GAME_BOSSES = ALL_BOSSES.filter(b => !b.dlc);
export const DLC_BOSSES = ALL_BOSSES.filter(b => b.dlc);

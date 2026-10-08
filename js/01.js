const DETAILS = {"ub-moon": {"name": "UB Moonshadow", "role": "Slow", "ins": {"Choke": 1, "Endurance": 1, "Grist, the Hunger Tide": 1, "Hogaak, Arisen Necropolis": 1}, "outs": {"Collector Ouphe": 1, "Elvish Visionary": 1, "Temur Sabertooth": 1, "Natural Order": 1}, "opp": ["2 Massacre", "1 Fatal Push", "2 Sheoldred's Edict", "2 Force of Negation", "2 Barrowgoyf"], "sweep": ["Massacre"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/dimir-tempo", "confidence": "Exact current MyMTGO shell", "notes": "Hogaak is a major reason to stay BG: the current Moonshadow shell has poor clean answers once Hogaak resolves. Snuff Out is not the default because the core threats are black. Keep 3 Natural Order; cut the Visionary/Sabertooth loop against Bowmasters + hard tempo.", "inCount": 4, "outCount": 4, "over": "Normal", "wasteland": "YES", "macro": "Tempo / Aggro"}, "ub-legends": {"name": "UB Legends", "role": "Slow", "ins": {"Choke": 1, "Snuff Out": 2, "Grist, the Hunger Tide": 1, "Hogaak, Arisen Necropolis": 1}, "outs": {"Collector Ouphe": 1, "Elvish Visionary": 1, "Temur Sabertooth": 1, "Natural Order": 1, "Vibrance": 1}, "opp": ["Tamiyo / Bilbo package", "Bowmasters", "extra removal", "Force of Negation"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/dimir-tempo", "confidence": "Variant inference", "notes": "If Hogaak comes in, keep all 3 Formidable Speakers: Speaker is part of the Hogaak package, not an independent flex slot. Snuff gets better against Tamiyo/Bilbo-style nonblack engines. This is an explicit exception to the generic Vibrance/Wasteland heuristic: even though UB tempo has Wasteland, Hogaak + Speaker is the more important post-board package.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "YES", "macro": "Tempo / Aggro"}, "ur-cutter": {"name": "UR Cutter / Izzet Tempo", "role": "Slow", "ins": {"Choke": 1, "Snuff Out": 2, "Hogaak, Arisen Necropolis": 1}, "outs": {"Collector Ouphe": 1, "Elvish Visionary": 1, "Temur Sabertooth": 1, "Natural Order": 1}, "opp": ["extra burn/removal", "Grafdigger's Cage in some builds", "Force of Negation", "Counterbalance variants"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/izzet-delver", "confidence": "Family-level", "notes": "Do not become a control deck. Choke is the structural card; removal is there to regain tempo. Hogaak is attractive when the opponent has no Swords/Karakas.", "inCount": 4, "outCount": 4, "over": "Normal", "wasteland": "YES", "macro": "Tempo / Aggro"}, "bg-gaak": {"name": "BG Hogaak / Moonshadow", "role": "Control", "ins": {"Leyline of the Void": 2, "Endurance": 1, "Snuff Out": 2}, "outs": {"Allosaurus Shepherd": 3, "Elvish Visionary": 1, "Temur Sabertooth": 1}, "opp": ["graveyard recursion", "discard", "free/cheap interaction"], "sweep": [], "caller": "LOW", "src": "", "confidence": "Archetype definition to verify", "notes": "Graveyard first, then race. This row is provisional until we pin the exact build your friend's label refers to.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "MIXED", "macro": "Tempo / Aggro"}, "uw-stifle": {"name": "UW Stiflenought", "role": "Slow", "ins": {"Choke": 1, "Snuff Out": 2, "Grist, the Hunger Tide": 1}, "outs": {"Collector Ouphe": 1, "Elvish Visionary": 1, "Temur Sabertooth": 1, "Natural Order": 1}, "opp": ["Containment Priest", "Lavinia", "2 Force of Negation", "Prismatic Ending", "Wrath of the Skies", "Torpor Orb"], "sweep": ["Wrath of the Skies"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/stiflenought", "confidence": "Exact current MyMTGO list", "notes": "Expect a real post-board transformation into additional hate. Caller of the Claw becomes highly relevant if we decide to dedicate a slot to sweeper recovery.", "inCount": 4, "outCount": 4, "over": "Normal", "wasteland": "YES", "macro": "Tempo / Aggro"}, "dnt": {"name": "Yorion WB Taxes", "role": "Slow", "ins": {"Snuff Out": 2, "Grist, the Hunger Tide": 1}, "outs": {"Allosaurus Shepherd": 3}, "opp": ["Containment Priest", "3 Wrath of the Skies", "2 Disruptor Flute", "Deafening Silence"], "sweep": ["Wrath of the Skies"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/death-taxes", "confidence": "Exact current MyMTGO list", "notes": "Keep Visionary/Sabertooth + Eladamri. Hogaak stays out because Swords + Karakas are exactly the effects that punish it.", "inCount": 3, "outCount": 3, "over": "Normal", "wasteland": "YES", "macro": "Midrange"}, "beanstalk": {"name": "5C / White Beanstalk", "role": "Slow", "ins": {"Choke": 1, "Gaddock Teeg": 1, "Grist, the Hunger Tide": 1}, "outs": {"Collector Ouphe": 1, "Natural Order": 1, "Vibrance": 1}, "opp": ["3 Containment Priest", "3 Wrath of the Skies", "3 Consign to Memory", "extra Force of Negation", "Pyroblast"], "sweep": ["Wrath of the Skies"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/white-beanstalk", "confidence": "Exact White Beanstalk proxy", "notes": "Reviewed SLOW plan. Preserve Visionary, all Speakers, Quirion and Symbiote. Trim one Natural Order because an unprotected NO is weak into heavy countermagic. Teeg is prioritized most highly here because the Beanstalk shell is especially dense in expensive noncreature spells. Hogaak stays out into Swords/Karakas.", "inCount": 3, "outCount": 3, "over": "Normal", "wasteland": "NO", "macro": "Blue Control"}, "stoneblade": {"name": "UWr Stoneblade", "role": "Slow", "ins": {"Choke": 1, "Gaddock Teeg": 1, "Grist, the Hunger Tide": 1, "Snuff Out": 2}, "outs": {"Collector Ouphe": 1, "Natural Order": 2, "Quirion Ranger": 1, "Vibrance": 1}, "opp": ["Swords / Ending", "Containment Priest variants", "Wrath of the Skies in Bant/UW shells"], "sweep": ["Wrath of the Skies (variant-dependent)"], "caller": "MEDIUM", "src": "https://mymtgo.com/cards/legacy/wrath-of-the-skies", "confidence": "Family-level", "notes": "Reviewed SLOW plan. Add Gaddock Teeg and trim one Quirion Ranger for the extra slot. Speaker remains important because it can turn an awkward naturally drawn Teeg into another creature. Current map retains the previously agreed two-Natural-Order trim, plus Ouphe and Vibrance.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "NO", "macro": "Blue Control"}, "blue-tron": {"name": "Blue Tron", "role": "Control", "ins": {"Thoughtseize": 4, "Gaddock Teeg": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Vibrance": 1, "Quirion Ranger": 1}, "opp": ["Dismember", "extra Force of Negation", "Karn wishboard bullets", "Ensnaring Bridge variants"], "sweep": ["Ugin / board-control effects"], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/mono-blue-tron", "confidence": "Exact current archetype", "notes": "Current review state: 4 Thoughtseize + Teeg are wanted. Eladamri is now kept. Visionary, Sabertooth and Vibrance remain the grind-package cuts, plus one Quirion Ranger. This is intentionally shown as 5 IN / 4 OUT because one additional cut has not yet been selected.", "inCount": 5, "outCount": 4, "over": "Needs 1 OUT", "wasteland": "NO", "macro": "Prison / Big Mana"}, "lands": {"name": "GX Lands", "role": "Slow", "ins": {"Endurance": 1, "Force of Vigor": 2, "Leyline of the Void": 2}, "outs": {"Allosaurus Shepherd": 3, "Elvish Visionary": 1, "Formidable Speaker": 1}, "opp": ["Disruptor Flute", "Drop of Honey", "Force of Vigor", "Endurance"], "sweep": ["Drop of Honey (attrition)"], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/lands", "confidence": "Exact current archetype", "notes": "Reviewed SLOW plan. Bring 2 Leyline of the Void + Endurance together with 2 Force of Vigor. Cut all three Shepherds, Visionary and one Formidable Speaker. Keep Temur Sabertooth and Eladamri.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "YES", "macro": "Prison / Big Mana"}, "8moon": {"name": "Mono Red — Chalice", "role": "Control", "ins": {"Force of Vigor": 2, "Snuff Out": 2, "Gaddock Teeg": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Eladamri, Korvecdal": 1, "Quirion Ranger": 1, "Natural Order": 1}, "opp": ["4 Chalice of the Void", "4 Broadside Bombardiers", "4 Magus of the Moon", "4 Fury", "4 The One Ring", "2 Fiery Confluence post-board", "2 Disruptor Flute", "3 Trinisphere"], "sweep": ["4 Fury maindeck", "2 Fiery Confluence sideboard"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/mono-red-stompy", "confidence": "Exact current MyMTGO archetype", "notes": "CONTROL plan. Keep Vibrance despite no Wasteland: Magus of the Moon turns our nonbasics into Mountains, which enables RR and lets Vibrance act as a tutorable 3-damage answer to Magus. FoV covers the turn-zero/turn-one Chalice/prison axis; Snuff covers Bombardiers, Magus and other creature threats. Keep all Shepherds because they let green spells ignore Chalice. Teeg attacks Ring/Chalice/top-end but also locks our own GSZ/NO.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "NO", "macro": "Prison / Big Mana"}, "eldrazi": {"name": "Eldrazi", "role": "Control", "ins": {"Force of Vigor": 2, "Thoughtseize": 2, "Gaddock Teeg": 1}, "outs": {"Allosaurus Shepherd": 3, "Elvish Visionary": 1, "Temur Sabertooth": 1}, "opp": ["Warping Wail", "Dismember", "Eldrazi Confluence", "Disruptor Flute"], "sweep": ["Eldrazi Confluence"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/eldrazi", "confidence": "Current MyMTGO family", "notes": "Warping Wail can counter Natural Order. The sweeper warning matters: do not deploy every body into Eldrazi Confluence without a reason.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "MIXED", "macro": "Prison / Big Mana"}, "initiative": {"name": "WR Initiative", "role": "Control", "ins": {"Force of Vigor": 2, "Snuff Out": 2, "Gaddock Teeg": 1}, "outs": {"Allosaurus Shepherd": 3, "Vibrance": 1, "Elvish Visionary": 1}, "opp": ["4 Fury post-board", "Eldrazi Confluence", "Disruptor Flute", "Karn package"], "sweep": ["2 Eldrazi Confluence main + 1 side", "4 Fury side"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/initiative", "confidence": "Exact current MyMTGO list", "notes": "This is one of the most important Caller of the Claw candidates. Current MyMTGO list has two Confluence main, another in the side, plus four Fury. No Wasteland expected, so Vibrance is a priority OUT; keep Sabertooth because it can later bounce Teeg and unlock GSZ/NO.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "NO", "macro": "Prison / Big Mana"}, "affinity": {"name": "Affinity / Blue Artifacts", "role": "Control", "ins": {"Force of Vigor": 2}, "outs": {"Vibrance": 1, "Eladamri, Korvecdal": 1}, "opp": ["Force of Will / Negation", "Dismember variants", "artifact lock pieces"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/blue-artifacts", "confidence": "Family-level", "notes": "Ouphe main is the real plan. Do not dilute the deck simply because the opponent has many artifacts; two FoV is enough unless we see a heavier prison configuration.", "inCount": 2, "outCount": 2, "over": "Normal", "wasteland": "NO", "macro": "Permanent Combo"}, "mono-rean": {"name": "Mono-B Reanimator", "role": "Control", "ins": {"Thoughtseize": 4, "Leyline of the Void": 2, "Endurance": 1}, "outs": {"Allosaurus Shepherd": 3, "Elvish Visionary": 1, "Temur Sabertooth": 1, "Vibrance": 1, "Eladamri, Korvecdal": 1}, "opp": ["discard", "graveyard-hate answers", "possible transformational threats"], "sweep": [], "caller": "LOW", "src": "", "confidence": "Family mapping", "notes": "Seven changes is deliberate: this is a polarized combo matchup. If the exact build has blue counters, keep more Shepherd and cut slower value instead.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Graveyard", "tags": ["Graveyard", "Fast combo"]}, "ub-rean": {"name": "UB / 5C Reanimator", "role": "Control", "ins": {"Thoughtseize": 4, "Leyline of the Void": 2, "Endurance": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Vibrance": 1, "Eladamri, Korvecdal": 1, "Natural Order": 1, "Formidable Speaker": 1, "Quirion Ranger": 1}, "opp": ["4 Show and Tell transformation", "4 Stronghold Gambit in 5C builds", "Abrade / Snuff Out variants"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/5c-reanimator", "confidence": "Exact current 5C transformation", "notes": "Keep Shepherd against Force. The crucial lesson from testing is to respect the Show and Tell juke: Thoughtseize is not optional even when Leyline is in the deck.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Graveyard", "tags": ["Graveyard", "Show transformation", "Fast combo"]}, "oops": {"name": "Oops All Spells", "role": "Control", "ins": {"Thoughtseize": 4, "Leyline of the Void": 2, "Gaddock Teeg": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Vibrance": 1, "Eladamri, Korvecdal": 1, "Formidable Speaker": 2, "Quirion Ranger": 1}, "opp": ["Belcher-style transformational plans", "fast mana", "graveyard combo"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/oops-all-spells", "confidence": "Exact archetype", "notes": "Teeg blocks Dread Return and several expensive noncreature lines. Ouphe also matters against artifact mana.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Graveyard"}, "cephalid": {"name": "Cephalid Breakfast", "role": "Control", "ins": {"Thoughtseize": 4, "Snuff Out": 2, "Gaddock Teeg": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Vibrance": 1, "Eladamri, Korvecdal": 1, "Formidable Speaker": 1, "Wirewood Symbiote": 1, "Natural Order": 1}, "opp": ["2 Lavinia", "extra Swords", "3 Force of Negation", "Prismatic Ending", "2 Pithing Needle"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/cephalid-breakfast", "confidence": "Exact current MyMTGO list", "notes": "Ouphe already shuts off Shuko. Snuff is preventive interaction: do not wait until Nomads + Illusionist is fully assembled. Teeg blocks Dread Return/FoW but also locks our GSZ/NO.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Permanent Combo"}, "sneak": {"name": "Sneak & Show", "role": "Control", "ins": {"Thoughtseize": 4, "Grist, the Hunger Tide": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Eladamri, Korvecdal": 1, "Vibrance": 1, "Wirewood Symbiote": 1}, "opp": ["Fury", "2 Abrade", "Brotherhood's End", "2 Grafdigger's Cage", "Disruptor Flute"], "sweep": ["Brotherhood's End", "Fury"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/show-and-tell", "confidence": "Exact current MyMTGO list", "notes": "Keep Shepherd and 4 Natural Order. Grist can be put in via their Show and Tell, then functions as a planeswalker. Cage attacks GSZ/NO.", "inCount": 5, "outCount": 5, "over": "Review density", "wasteland": "NO", "macro": "Spell Combo", "tags": ["Show and Tell", "Sneak Attack", "Countermagic"]}, "omni": {"name": "Omni-Tell", "role": "Control", "ins": {"Thoughtseize": 4, "Force of Vigor": 2, "Grist, the Hunger Tide": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Eladamri, Korvecdal": 1, "Vibrance": 1, "Wirewood Symbiote": 2, "Natural Order": 1}, "opp": ["Omniscience", "Cage / Flute variants", "sweepers depending on Show shell"], "sweep": ["Brotherhood's End / Fury (family-dependent)"], "caller": "MEDIUM", "src": "https://mymtgo.com/metagame/legacy/show-and-tell", "confidence": "Show-family proxy", "notes": "FoV is more important than against pure Sneak because Omniscience is a structural target, but remember the active player can act before a destroy trigger resolves after Show and Tell.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Spell Combo", "tags": ["Show and Tell", "Omniscience", "Countermagic"]}, "aluren": {"name": "Aluren", "role": "Control", "ins": {"Thoughtseize": 4, "Gaddock Teeg": 1, "Force of Vigor": 1}, "outs": {"Collector Ouphe": 1, "Vibrance": 1, "Eladamri, Korvecdal": 1, "Natural Order": 1, "Quirion Ranger": 1, "Wirewood Symbiote": 1}, "opp": ["Veil of Summer", "Force of Negation", "Defense Grid", "Disruptor Flute", "Carpet of Flowers"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/aluren", "confidence": "Exact current MyMTGO list", "notes": "Keep Speaker and the loop. Their Aluren can make our ETB engine cheaper. Teeg blocks Aluren and FoW but also our own GSZ/NO, so sequence it as a lock piece, not a passive value creature.", "inCount": 6, "outCount": 6, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Permanent Combo"}, "doomsday": {"name": "Doomsday", "role": "Turbo", "ins": {"Thoughtseize": 4, "Snuff Out": 2, "Endurance": 1}, "outs": {"Vibrance": 1, "Elvish Visionary": 1, "Temur Sabertooth": 1, "Eladamri, Korvecdal": 1, "Formidable Speaker": 3}, "opp": ["fair transformation pieces", "extra removal", "Force of Negation variants"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/doomsday", "confidence": "Exact current archetype", "notes": "TURBO plan. Keep Collector Ouphe: current Doomsday uses LED/Petal and Ouphe can constrain pile execution. Cut Vibrance and the grind package. Keep all 4 Natural Order and all Shepherds. Snuff Out is specifically valuable against Thassa's Oracle when the pile relies on non-zero blue devotion: removing Oracle before the trigger resolves can reduce devotion and force a different pile. Endurance adds another pile/library constraint.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "YES", "macro": "Spell Combo"}, "tes": {"name": "TES", "role": "Control", "ins": {"Thoughtseize": 4, "Force of Vigor": 2}, "outs": {"Allosaurus Shepherd": 3, "Vibrance": 1, "Elvish Visionary": 1, "Temur Sabertooth": 1}, "opp": ["Boomerang Basics", "Thoughtseize", "Boseiju", "Haywire Mite", "Carpet of Flowers"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/tes", "confidence": "Exact current MyMTGO list", "notes": "Ouphe is fundamental. FoV attacks a 20-artifact mana/engine shell. We accept six changes because the matchup is highly polarized. TES has no Wasteland, making Vibrance a clean flex cut.", "inCount": 6, "outCount": 6, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Spell Combo"}, "energy": {"name": "WBR Energy", "role": "Slow", "ins": {"Snuff Out": 2, "Grist, the Hunger Tide": 1}, "outs": {"Collector Ouphe": 1, "Allosaurus Shepherd": 2}, "opp": ["Containment Priest", "Clarion Conqueror in some builds", "Grafdigger's Cage / Abrade variants", "Deafening Silence"], "sweep": ["Wrath of the Skies appears in some Energy lists"], "caller": "MEDIUM", "src": "https://mymtgo.com/metagame/legacy/energy", "confidence": "Current family; exact sideboard varies", "notes": "Do not over-sideboard. Current selected MyMTGO list shows Priest/Cage/Abrade/PoP; Wrath of the Skies has also been recorded in Energy lists. Bombardment already on board is hard to answer reactively.", "inCount": 3, "outCount": 3, "over": "Normal", "wasteland": "YES", "macro": "Tempo / Aggro"}, "gb-mole": {"name": "Cradle Control", "role": "Slow", "ins": {"Endurance": 1, "Grist, the Hunger Tide": 1, "Snuff Out": 2}, "outs": {"Allosaurus Shepherd": 3, "Collector Ouphe": 1}, "opp": ["Snuff Out", "Abrupt Decay", "Thoughtseize", "Disruptor Flute", "Endurance", "Gaddock Teeg variants"], "sweep": ["Toxic Deluge possible in black midrange variants"], "caller": "MEDIUM", "src": "https://mymtgo.com/metagame/legacy/golgari-cradle-control", "confidence": "Family mapping: Cradle Control, non-Cradle Mole and intermediate Hogaak/GSZ builds", "notes": "Reviewed SLOW plan. Keep all 4 Natural Order. Do not bring Leyline of the Void or Hogaak by default: one Endurance is enough graveyard pressure for the usual Mole / Cradle Control shells, while 2 Snuff Out interact directly with their creature engines. Keep Visionary, Symbiote, Speaker and Sabertooth for the grind. Keep Vibrance in Wasteland versions.", "inCount": 4, "outCount": 4, "over": "Normal", "wasteland": "MIXED", "macro": "Midrange"}, "key-ring": {"name": "Colorless Tron / Forge", "role": "Control", "ins": {"Thoughtseize": 4, "Force of Vigor": 2, "Gaddock Teeg": 1}, "outs": {"Allosaurus Shepherd": 3, "Vibrance": 1, "Formidable Speaker": 2, "Eladamri, Korvecdal": 1}, "opp": ["4 Chalice of the Void", "4 Trinisphere", "4 The One Ring", "4 Karn, the Great Creator", "4 Ugin, Eye of the Storms", "3 Disruptor Flute"], "sweep": ["Ugin, Eye of the Storms / board-control mode"], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/colorless-tron", "confidence": "Exact current MyMTGO Colorless Tron", "notes": "On the play use 4 Thoughtseize; on the draw the working heuristic remains 3 Thoughtseize because Chalice/Trinisphere can make the fourth copy late. Current registered list has no Wasteland, so Vibrance is a priority OUT. Keep Ouphe and the Visionary/Sabertooth loop. Teeg shuts off Chalice, Ring, Karn, Ugin and Kozilek's Command, but also locks our GSZ/NO until removed or bounced.", "inCount": 7, "outCount": 7, "over": "Deliberate transformation", "wasteland": "NO", "macro": "Prison / Big Mana"}, "sewer-cam": {"name": "Sewer Cam / Welder Combo", "role": "Control", "ins": {"Force of Vigor": 2, "Thoughtseize": 2}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Vibrance": 1, "Eladamri, Korvecdal": 1}, "opp": ["Force of Will", "artifact recursion", "post-board removal / Flute variants"], "sweep": [], "caller": "LOW", "src": "https://mymtgo.com/metagame/legacy/welder-combo", "confidence": "Welder-family mapping", "notes": "Ouphe main is excellent. Welder Combo has recently posted strong Challenge finishes, so preserving the lockpiece matters more than trying to grind.", "inCount": 4, "outCount": 4, "over": "Normal", "wasteland": "NO", "macro": "Permanent Combo", "tags": ["Artifacts", "Graveyard engine", "Countermagic"]}, "red-creature": {"name": "Mono Red — No Chalice", "role": "Slow", "ins": {"Snuff Out": 2, "Grist, the Hunger Tide": 1}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Eladamri, Korvecdal": 1}, "opp": ["Broadside Bombardiers", "Magus of the Moon", "Fury", "Pyrogoyf / Caves variants", "The One Ring in some builds"], "sweep": ["Fury", "Fiery Confluence if shown"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/mono-red-stompy", "confidence": "Variant plan derived from current Mono-Red family", "notes": "SLOW plan when the opponent is creature-heavy and does not show Chalice. Keep Vibrance because Magus itself enables RR, turning Vibrance into a tutorable Bolt-style answer. If The One Ring is shown, add Teeg and trim Natural Order #4. Force of Vigor is not automatic without the Chalice/prison axis.", "wasteland": "NO", "macro": "Prison / Big Mana", "inCount": 3, "outCount": 3, "over": "Normal"}, "jeskai-control": {"name": "Jeskai Control", "role": "Slow", "ins": {"Choke": 1, "Gaddock Teeg": 1, "Grist, the Hunger Tide": 1}, "outs": {"Collector Ouphe": 1, "Natural Order": 1, "Vibrance": 1}, "opp": ["Back to Basics", "Wrath of the Skies", "Containment Priest", "Lavinia, Azorius Renegade", "Temporary Lockdown / extra countermagic depending on build"], "sweep": ["Wrath of the Skies", "Temporary Lockdown", "Terminus / Supreme Verdict variants"], "caller": "HIGH", "src": "https://mymtgo.com/metagame/legacy/bant-control", "confidence": "Current Bant/Azorius Control family", "notes": "Reviewed SLOW plan. Preserve Visionary, all Speakers, Quirion and Symbiote. Trim one Natural Order because an unprotected copy is poor into countermagic. Current mapping uses Choke + Grist + Teeg as the compact three-card package.", "wasteland": "NO", "macro": "Blue Control", "inCount": 3, "outCount": 3, "over": "Normal"}, "8cast": {"name": "8-Cast", "role": "Control", "ins": {"Force of Vigor": 2, "Snuff Out": 2}, "outs": {"Elvish Visionary": 1, "Temur Sabertooth": 1, "Eladamri, Korvecdal": 1, "Vibrance": 1}, "opp": ["Force of Will / Force of Negation", "Dismember", "Consign to Memory", "Chalice of the Void variants", "Harbinger of the Seas variants"], "sweep": ["Whipflare variants", "Sudden Demise in UR builds"], "caller": "MEDIUM", "src": "https://www.deckexplorer.com/decks/legacy/archetype/8-cast_87e40cdb-70cc-4771-bfc9-19498f4118f6/aggregate-list", "confidence": "Current aggregate / variant-sensitive", "notes": "Default CONTROL plan: preserve all 3 Allosaurus Shepherd, Collector Ouphe and all 4 Natural Order. Trim the slow grind package: Visionary, Sabertooth, Eladamri and Vibrance. Bring 2 Force of Vigor + 2 Snuff Out. Ouphe is the central lock piece; Shepherd protects the green engine through Force effects. Force of Vigor remains valuable even when Chalice is absent. Do not default to Choke or Teeg. UR variants can present Sudden Demise; some stock shells can have Whipflare.", "inCount": 4, "outCount": 4, "over": "Normal", "wasteland": "NO", "macro": "Prison / Big Mana"}};

/* RC23 preview: Sneak & Show and Omni-Tell belong to Spell Combo.
   Keep Aluren in Permanent Combo. Reorder the rendered rows without changing
   any of the matchup plans or IN/OUT data. */
function moveRowsToMacroGroup(ids, macroName){
 const table=document.querySelector('.transposed');
 if(!table)return;
 const group=[...table.querySelectorAll('tr.macroGroup')]
  .find(row=>row.textContent.trim()===macroName);
 if(!group)return;
 let anchor=group;
 ids.forEach(id=>{
  const cell=table.querySelector(`.matchcol[data-id="${id}"]`);
  const row=cell?.closest('tr');
  if(!row)return;
  const tag=row.querySelector('.macroTag');
  if(tag)tag.textContent=macroName;
  anchor.insertAdjacentElement('afterend',row);
  anchor=row;
 });
}
moveRowsToMacroGroup(['sneak','omni'],'Spell Combo');

/* RC25 preview: one unified Mono Red plan. The former No-Chalice subtype is
   removed, and the remaining row is rebuilt from the consolidated plan. */
function consolidateMonoRedPlan(){
 const plan=DETAILS['8moon'];
 if(!plan)return;
 Object.assign(plan,{
  name:'Mono Red',
  role:'Control',
  ins:{'Force of Vigor':2,'Snuff Out':2,'Grist, the Hunger Tide':1},
  outs:{'Allosaurus Shepherd':1,'Eladamri, Korvecdal':1,'Elvish Visionary':1,'Formidable Speaker':1,'Temur Sabertooth':1},
  opp:['Chalice of the Void','Trinisphere','Broadside Bombardiers','Magus of the Moon','Fury','The One Ring','Fiery Confluence','Disruptor Flute','Pyrogoyf / Caves variants'],
  sweep:['Fury','Fiery Confluence'],
  caller:'HIGH',
  notes:'Unified CONTROL plan for the Mono Red family. Bring Force of Vigor even when Chalice has not yet been shown because it also covers Trinisphere, The One Ring and Disruptor Flute. Snuff Out answers Magus, Bombardiers and other creature threats; Grist adds a flexible removal and pressure engine. Keep all 4 Natural Order and every Quirion Ranger to preserve strong Moon draws. Keep Vibrance despite no Wasteland: Magus turns our nonbasics into Mountains, enabling RR and making Vibrance a tutorable 3-damage answer to Magus. Trim only one Shepherd, retaining two copies to operate through Chalice.',
  inCount:5,
  outCount:5,
  over:'Review density',
  wasteland:'NO',
  macro:'Prison / Big Mana'
 });
 delete DETAILS['red-creature'];

 const table=document.querySelector('.transposed');
 const mainCell=table?.querySelector('.matchcol[data-id="8moon"]');
 const row=mainCell?.closest('tr');
 if(!table||!row)return;
 mainCell.textContent='Mono Red';
 const headers=[...table.querySelectorAll('thead .rotateHead span')].map(cell=>cell.textContent.trim());
 const cells=[...row.cells];
 const writeCells=(start,names,values,baseClass)=>names.forEach((name,index)=>{
  const count=values[name]||0;
  const cell=cells[start+index];
  if(!cell)return;
  cell.textContent=count||'';
  cell.className=baseClass+(count?' nz':'');
 });
 const sideboardStart=headers.indexOf('Choke');
 writeCells(6,headers.slice(0,sideboardStart),plan.outs,'outCell');
 writeCells(6+sideboardStart,headers.slice(sideboardStart),plan.ins,'inCell');
 cells[5].textContent='5/5';
 cells[5].className='countcell warn';
 table.querySelector('.matchcol[data-id="red-creature"]')?.closest('tr')?.remove();
}
consolidateMonoRedPlan();

/* RC26 preview: finalized Prison / Big Mana plans. */
function applySideboardPlan(id,changes){
 const plan=DETAILS[id];
 if(!plan)return;
 Object.assign(plan,changes);
 const table=document.querySelector('.transposed');
 const row=table?.querySelector(`.matchcol[data-id="${id}"]`)?.closest('tr');
 if(!table||!row)return;
 const headers=[...table.querySelectorAll('thead .rotateHead span')].map(cell=>cell.textContent.trim());
 const cells=[...row.cells];
 const writeCells=(start,names,values,baseClass)=>names.forEach((name,index)=>{
  const count=values[name]||0;
  const cell=cells[start+index];
  if(!cell)return;
  cell.textContent=count||'';
  cell.className=baseClass+(count?' nz':'');
 });
 const sideboardStart=headers.indexOf('Choke');
 writeCells(6,headers.slice(0,sideboardStart),plan.outs,'outCell');
 writeCells(6+sideboardStart,headers.slice(sideboardStart),plan.ins,'inCell');
 cells[2].textContent=plan.role;
 cells[2].className=`rolecell ${plan.role.toLowerCase()}`;
 const wasteLabel=plan.wasteland==='MIXED'?'MIX':plan.wasteland;
 cells[3].textContent=wasteLabel;
 cells[3].className=`waste${wasteLabel}`;
 cells[4].textContent=plan.sweep?.length?'⚠':'';
 cells[4].className=plan.sweep?.length?'sweepHot':'';
 cells[5].textContent=`${plan.inCount}/${plan.outCount}`;
 cells[5].className=`countcell ${plan.inCount>=6?'danger':plan.inCount===5?'warn':'safe'}`;
}

applySideboardPlan('eldrazi',{
 role:'Control',
 ins:{'Grist, the Hunger Tide':1,'Hogaak, Arisen Necropolis':1,'Snuff Out':2},
 outs:{'Allosaurus Shepherd':1,'Elvish Visionary':1,'Temur Sabertooth':1,'Vibrance':1},
 opp:['4 Chalice of the Void','3 Thorn of Amethyst','4 Wasteland','2 Dismember','2 Eldrazi Confluence','1 All Is Dust','4 Disruptor Flute','2 Null Rod','2 Unlicensed Hearse','2 Faerie Macabre'],
 sweep:['Eldrazi Confluence','All Is Dust'],
 caller:'HIGH',
 notes:'Final CONTROL plan. Bring 2 Snuff Out, Grist and Hogaak. Cut Visionary, Sabertooth, Vibrance and only one Shepherd. Keep two Shepherds because the current shell has 4 Chalice of the Void. Hogaak gives us a resilient threat against a deck without Swords to Plowshares or Karakas, while Grist and Snuff Out control its creature starts. Respect post-board Hearse and Faerie Macabre when building the graveyard.',
 inCount:4,
 outCount:4,
 over:'Normal',
 wasteland:'YES',
 macro:'Prison / Big Mana'
});

applySideboardPlan('initiative',{
 role:'Control',
 ins:{'Force of Vigor':2,'Grist, the Hunger Tide':1,'Snuff Out':2},
 outs:{'Allosaurus Shepherd':1,'Elvish Visionary':1,'Quirion Ranger':1,'Temur Sabertooth':1,'Vibrance':1},
 opp:['Fury','Eldrazi Confluence','Disruptor Flute','The One Ring / Karn package','fast Initiative creatures'],
 sweep:['Eldrazi Confluence','Fury'],
 caller:'HIGH',
 notes:'Final CONTROL plan. Use the same removal core as against Eldrazi, but replace Hogaak with 2 Force of Vigor to answer Ring, Flute and the artifact/Karn axis. Cut Visionary, Sabertooth, Vibrance, one Shepherd and one Quirion Ranger. Keep all 4 Natural Order and preserve the remaining fast mana engine.',
 inCount:5,
 outCount:5,
 over:'Review density',
 wasteland:'NO',
 macro:'Prison / Big Mana'
});

applySideboardPlan('blue-tron',{
 role:'Control',
 ins:{'Gaddock Teeg':1,'Thoughtseize':4},
 outs:{'Elvish Visionary':1,'Formidable Speaker':1,'Quirion Ranger':1,'Temur Sabertooth':1,'Vibrance':1},
 notes:'Final CONTROL plan: 4 Thoughtseize plus Gaddock Teeg. Keep Eladamri and all Shepherds. Cut Visionary, Sabertooth and Vibrance from the grind package, plus one Quirion Ranger and one Formidable Speaker. Shepherd remains important against Force effects; Teeg attacks the expensive noncreature payoffs but also locks our own GSZ and Natural Order.',
 inCount:5,
 outCount:5,
 over:'Review density',
 wasteland:'NO',
 macro:'Prison / Big Mana'
});

/* RC27 preview: finalized Graveyard, Permanent Combo and Spell Combo plans. */
applySideboardPlan('bg-gaak',{
 role:'Control',
 ins:{'Endurance':1,'Force of Vigor':2,'Leyline of the Void':2},
 outs:{'Allosaurus Shepherd':3,'Elvish Visionary':1,'Temur Sabertooth':1},
 notes:'Final CONTROL plan. Replace Snuff Out with 2 Force of Vigor. Bring Endurance plus both Leylines, then remove the Visionary/Sabertooth loop and all three Shepherds. Graveyard containment comes first; Force of Vigor covers the permanent and artifact axis without diluting the plan with creature removal.',
 inCount:5,
 outCount:5,
 over:'Review density',
 wasteland:'MIXED',
 macro:'Graveyard'
});

applySideboardPlan('oops',{
 role:'Control',
 ins:{'Force of Vigor':2,'Gaddock Teeg':1,'Leyline of the Void':2,'Thoughtseize':4},
 outs:{'Eladamri, Korvecdal':1,'Elvish Visionary':1,'Formidable Speaker':3,'Temur Sabertooth':1,'Vibrance':1,'Wirewood Symbiote':2},
 notes:'Final polarized combo plan. Add Gaddock Teeg and both Force of Vigor to the 4 Thoughtseize + 2 Leyline package. Keep every Quirion Ranger and all 4 Natural Order because there is no meaningful board interaction: disrupt the first turn, then race. Cut all three Formidable Speakers, both Symbiotes and the slow value package.',
 inCount:9,
 outCount:9,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Graveyard'
});

applySideboardPlan('cephalid',{
 role:'Control',
 ins:{'Gaddock Teeg':1,'Grist, the Hunger Tide':1,'Snuff Out':2,'Thoughtseize':3},
 outs:{'Allosaurus Shepherd':1,'Eladamri, Korvecdal':1,'Formidable Speaker':2,'Natural Order':1,'Temur Sabertooth':1,'Vibrance':1},
 notes:'Final CONTROL plan. Use 3 Thoughtseize, 2 Snuff Out, Gaddock Teeg and Grist. Preserve Elvish Visionary and every Wirewood Symbiote so the compact draw engine remains available. Cut one Shepherd and a second Speaker instead; Collector Ouphe remains one of the strongest cards because it shuts off Shuko.',
 inCount:7,
 outCount:7,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Permanent Combo'
});

applySideboardPlan('aluren',{
 role:'Control',
 ins:{'Force of Vigor':2,'Grist, the Hunger Tide':1,'Thoughtseize':4},
 outs:{'Elvish Visionary':1,'Formidable Speaker':2,'Temur Sabertooth':1,'Vibrance':1,'Wirewood Symbiote':2},
 notes:'Final CONTROL plan. Bring 4 Thoughtseize, both Force of Vigor and Grist; do not bring Gaddock Teeg. Keep Collector Ouphe, Eladamri, all Shepherds, all Natural Orders and every Quirion Ranger to preserve the fastest lines. Pay for the seven-card package by removing Visionary, Sabertooth, Vibrance, both Symbiotes and two three-mana Speakers.',
 inCount:7,
 outCount:7,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Permanent Combo'
});

applySideboardPlan('sewer-cam',{
 role:'Control',
 ins:{'Force of Vigor':2,'Leyline of the Void':2,'Snuff Out':2},
 outs:{'Allosaurus Shepherd':1,'Eladamri, Korvecdal':1,'Formidable Speaker':1,'Natural Order':1,'Quirion Ranger':1,'Vibrance':1},
 notes:'Final CONTROL plan. Replace Thoughtseize with both Leylines and add 2 Snuff Out alongside 2 Force of Vigor. Keep Collector Ouphe and the Visionary/Sabertooth loop. Trim one Shepherd, Eladamri, one Speaker, one Natural Order, one Quirion Ranger and Vibrance.',
 inCount:6,
 outCount:6,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Permanent Combo'
});

applySideboardPlan('sneak',{
 role:'Control',
 ins:{'Choke':1,'Grist, the Hunger Tide':1,'Thoughtseize':4},
 outs:{'Elvish Visionary':1,'Formidable Speaker':1,'Temur Sabertooth':1,'Vibrance':1,'Wirewood Symbiote':2},
 notes:'Final CONTROL plan. Add Choke to 4 Thoughtseize and Grist. Keep Eladamri, all Shepherds and all 4 Natural Order. Remove Visionary, Sabertooth, Vibrance, both Symbiotes and one Formidable Speaker. Grist can enter through Show and Tell; Choke pressures the blue mana base after the initial exchange.',
 inCount:6,
 outCount:6,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Spell Combo'
});

applySideboardPlan('tes',{
 role:'Control',
 ins:{'Force of Vigor':2,'Gaddock Teeg':1,'Leyline of the Void':2,'Thoughtseize':4},
 outs:{'Allosaurus Shepherd':3,'Elvish Visionary':1,'Formidable Speaker':1,'Natural Order':1,'Temur Sabertooth':1,'Vibrance':1,'Wirewood Symbiote':1},
 notes:'Final polarized combo plan. Add Gaddock Teeg and both Leylines to the 4 Thoughtseize + 2 Force of Vigor package. Cut the Visionary/Sabertooth/Vibrance grind package, all three Shepherds, one Natural Order, one Formidable Speaker and one Wirewood Symbiote. Keep Collector Ouphe and race behind layered disruption.',
 inCount:9,
 outCount:9,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Spell Combo'
});

function removeMatchup(id,name){
 document.querySelector(`.transposed .matchcol[data-id="${id}"]`)?.closest('tr')?.remove();
 delete DETAILS[id];
 document.querySelectorAll('table.data tbody tr').forEach(row=>{
  if(row.cells[0]?.textContent.trim()===name)row.remove();
 });
}
removeMatchup('affinity','Affinity / Blue Artifacts');
removeMatchup('omni','Omni-Tell');

/* RC28 preview: 3 Thoughtseize in every Blue Control plan. Keep one more
   Natural Order than RC27, cut one Quirion Ranger in every matchup and expose
   the Stoneblade mana-dork cut as its own visible matrix column. */
function ensureManaDorkColumn(){
 const table=document.querySelector('.transposed');
 const headerRow=table?.querySelector('thead tr');
 if(!table||!headerRow)return;
 if([...headerRow.querySelectorAll('.rotateHead span')]
  .some(span=>span.textContent.trim()==='Mana dork'))return;
 const firstSideHeader=[...headerRow.querySelectorAll('.rotateHead')]
  .find(cell=>cell.textContent.trim()==='Choke');
 if(!firstSideHeader)return;
 const insertionIndex=[...headerRow.cells].indexOf(firstSideHeader);
 const header=document.createElement('th');
 header.className='rotateHead';
 header.innerHTML='<span>Mana dork</span>';
 headerRow.insertBefore(header,firstSideHeader);
 table.querySelectorAll('tbody tr').forEach(row=>{
  if(row.classList.contains('macroGroup')){
   row.cells[0].colSpan=headerRow.cells.length;
   return;
  }
  const cell=document.createElement('td');
  cell.className='outCell';
  row.insertBefore(cell,row.cells[insertionIndex]||null);
 });
}
ensureManaDorkColumn();

applySideboardPlan('beanstalk',{
 role:'Slow',
 ins:{'Choke':1,'Gaddock Teeg':1,'Grist, the Hunger Tide':1,'Thoughtseize':3},
 outs:{'Collector Ouphe':1,'Formidable Speaker':1,'Natural Order':1,'Quirion Ranger':1,'Temur Sabertooth':1,'Vibrance':1},
 notes:'Final SLOW plan. Add 3 Thoughtseize to Choke, Gaddock Teeg and Grist. Cut Collector Ouphe, one Formidable Speaker, one Natural Order, one Quirion Ranger, Temur Sabertooth and Vibrance. Keep three Natural Orders while trimming the vulnerable top end and slower utility cards.',
 inCount:6,
 outCount:6,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Blue Control'
});

applySideboardPlan('jeskai-control',{
 role:'Slow',
 ins:{'Choke':1,'Gaddock Teeg':1,'Grist, the Hunger Tide':1,'Thoughtseize':3},
 outs:{'Collector Ouphe':1,'Formidable Speaker':1,'Natural Order':1,'Quirion Ranger':1,'Temur Sabertooth':1,'Vibrance':1},
 notes:'Final SLOW plan. Add 3 Thoughtseize to Choke, Gaddock Teeg and Grist. Cut Collector Ouphe, one Formidable Speaker, one Natural Order, one Quirion Ranger, Temur Sabertooth and Vibrance. Preserve three Natural Orders and the compact Visionary/Symbiote engine for the longer game.',
 inCount:6,
 outCount:6,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Blue Control'
});

applySideboardPlan('stoneblade',{
 role:'Slow',
 ins:{'Choke':1,'Grist, the Hunger Tide':1,'Snuff Out':2,'Thoughtseize':3},
 outs:{'Collector Ouphe':1,'Formidable Speaker':1,'Mana dork':1,'Natural Order':1,'Quirion Ranger':1,'Temur Sabertooth':1,'Vibrance':1},
 notes:'Final SLOW plan. Bring 3 Thoughtseize alongside Choke, Grist and both Snuff Out; do not bring Gaddock Teeg. Cut Collector Ouphe, one Formidable Speaker, one mana dork, one Natural Order, one Quirion Ranger, Temur Sabertooth and Vibrance. Keep three Natural Orders while retaining enough mana and grind density for a seven-card transformation.',
 inCount:7,
 outCount:7,
 over:'Deliberate transformation',
 wasteland:'NO',
 macro:'Blue Control'
});

/* RC29: alternative UWx Control plan supplied by vegecookies. */
function addVegecookiesControl(){
 const table=document.querySelector('.transposed');
 const headerRow=table.querySelector('thead tr');
 const sideHeader=[...headerRow.querySelectorAll('.rotateHead')].find(cell=>cell.textContent.trim()==='Choke');
 const index=[...headerRow.cells].indexOf(sideHeader);
 const header=document.createElement('th');
 header.className='rotateHead';
 header.innerHTML='<span>Atraxa, Grand Unifier</span>';
 headerRow.insertBefore(header,sideHeader);
 table.querySelectorAll('tbody tr').forEach(row=>{
  if(row.classList.contains('macroGroup')){row.cells[0].colSpan=headerRow.cells.length;return;}
  const cell=document.createElement('td');
  cell.className='outCell';
  row.insertBefore(cell,row.cells[index]||null);
 });
 const base=table.querySelector('.matchcol[data-id="jeskai-control"]').closest('tr');
 const row=base.cloneNode(true);
 row.querySelectorAll('[data-id]').forEach(cell=>cell.dataset.id='control-vegecookies');
 row.querySelector('.matchcol').textContent='Control (vegecookies)';
 base.insertAdjacentElement('afterend',row);
 DETAILS['control-vegecookies']={
  ...DETAILS['jeskai-control'],
  name:'Control (vegecookies)',
  src:'',
  confidence:'Sideboard plan supplied by vegecookies for UWx Control; opponent warnings inherited from the UWx family.',
  tags:['UWx Control','vegecookies'],
 };
 applySideboardPlan('control-vegecookies',{
  role:'Slow',
  ins:{'Thoughtseize':4,'Grist, the Hunger Tide':1,'Choke':1},
  outs:{'Natural Order':4,'Vibrance':1,'Atraxa, Grand Unifier':1},
  inCount:6,
  outCount:6,
  over:'Deliberate transformation',
  wasteland:'NO',
  macro:'Blue Control',
  notes:'Alternative UWx Control plan supplied by vegecookies, based on this list: board out all 4 Natural Orders, Vibrance and Atraxa; bring in 4 Thoughtseize, Grist and Choke. Preserve the creature-based grind engine, including Visionary, Symbiote, Sabertooth and all Formidable Speakers.'
 });
}
addVegecookiesControl();

/* Boros Energy (8 Oct 2026): written from MyMTGO's "Energy" data (their reference 75 and what they side in
   against Elves), IN / OUT agreed with the user. Its row sits under WBR Energy in the sideboard map. */
(function addBorosEnergy(){
 const base=document.querySelector('.transposed .matchcol[data-id="energy"]')?.closest('tr');
 if(base){const row=base.cloneNode(true);row.querySelectorAll('[data-id]').forEach(cell=>cell.dataset.id='boros-energy');row.querySelector('.matchcol').textContent='Boros Energy';base.insertAdjacentElement('afterend',row);}
 DETAILS['boros-energy']={name:'Boros Energy',role:'Slow',macro:'Tempo / Aggro',ins:{},outs:{},inCount:0,outCount:0,over:'Normal',
  opp:['Containment Priest','Abrade','Disruptor Flute','Price of Progress','Gaddock Teeg / Grafdigger’s Cage'],
  sweep:[],caller:'MEDIUM',src:'https://mymtgo.com/metagame/legacy/energy',confidence:'Proposed test plan, 8 Oct 2026',notes:''};
 applySideboardPlan('boros-energy',{
  ins:{'Snuff Out':3,'Primaris Eliminator':1},
  outs:{'Allosaurus Shepherd':3,'Collector Ouphe':1},
  inCount:4,outCount:4,over:'Normal',wasteland:'YES',
  notes:'Snuff Out answers almost every threat: Ocelot Pride, Guide of Souls, Thalia, Voice of Victory and their hate bears are nonblack (Orcish Bowmasters is black). Primaris Eliminator’s −2/−2 mode clears cats, tokens and 2/2s, and Formidable Speaker can find it. Allosaurus Shepherd’s protection is wasted: they play no counters. Keep Atraxa: its card advantage is worth it even with Karakas. Assassin’s Trophy stays in the sideboard: once Goblin Bombardment is in play it has usually done its job, and removing it after it resolves is rarely what you want. Need one more slot? Cut a Formidable Speaker. Watch for Gaddock Teeg (no Natural Order, no Green Sun’s Zenith), Containment Priest (exiles what Natural Order and Green Sun’s Zenith bring; Speaker’s search to hand still works), Voice of Victory (no spells during their turn, so Snuff Out only on yours), Karakas (bounces Marwyn and an animated Cradle), Bowmasters (kills a mana dork) and Price of Progress (17 of the 19 lands are nonbasic).'
 });
})();


/* RC32: grouped sideboard matrix and dated Goldfish MTGO snapshot. */
const MANA_ICONS={"1": "assets/7b91fa1f7367.svg", "2": "assets/7fbc1f73f428.svg", "3": "assets/09d8770c9c01.svg", "4": "assets/ee1cea2cecac.svg", "5": "assets/d3bc312ec169.svg", "B/G": "assets/cff6d59d2dc1.svg", "W": "assets/84a733f1f7c5.svg", "U": "assets/b6f748d0d263.svg", "B": "assets/193c362cf4fe.svg", "R": "assets/9177aa91ff05.svg", "G": "assets/6e93955e821b.svg", "C": "assets/241bd965525d.svg", "R/G": "assets/96ca57b5a006.svg"};
const SB_COSTS={"Choke": ["2", "G"], "Endurance": ["1", "G", "G"], "Force of Vigor": ["2", "G", "G"], "Gaddock Teeg": ["G", "W"], "Grist, the Hunger Tide": ["1", "B", "G"], "Hogaak, Arisen Necropolis": ["5", "B/G", "B/G"], "Leyline of the Void": ["2", "B", "B"], "Snuff Out": ["3", "B"], "Thoughtseize": ["B"]};

/* RC51: screenshot-verified 3 October 2026 75. These are proposed test plans. */
for(const key of Object.keys(SB_COSTS)) delete SB_COSTS[key];
Object.assign(SB_COSTS,{"Choke": ["2", "G"], "Chomping Changeling": ["2", "G"], "Hogaak, Arisen Necropolis": ["5", "B/G", "B/G"], "Leyline of the Void": ["2", "B", "B"], "Marwyn, the Preserver": ["1", "G"], "Snuff Out": ["3", "B"], "Thoughtseize": ["B"]});
const RC51_PLANS={"ub-moon":{"ins":{"Choke":2,"Hogaak, Arisen Necropolis":1,"Marwyn, the Preserver":1},"outs":{"Collector Ouphe":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1},"notes":"Protect Cradle from Wasteland with Marwyn. Snuff Out cannot target the central black threats; Choke and Hogaak support a longer game.","inCount":4,"outCount":4,"over":"Normal"},"ub-legends":{"ins":{"Choke":2,"Hogaak, Arisen Necropolis":1,"Marwyn, the Preserver":1},"outs":{"Collector Ouphe":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1},"notes":"Protect Cradle from Wasteland; black creatures make Snuff Out unreliable. Preserve enough of the fast engine to punish slow hands.","inCount":4,"outCount":4,"over":"Normal"},"ur-cutter":{"ins":{"Choke":2,"Snuff Out":2,"Hogaak, Arisen Necropolis":1,"Marwyn, the Preserver":1},"outs":{"Collector Ouphe":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Natural Order":1,"Vibrance":1,"Formidable Speaker":1},"notes":"Marwyn protects Cradle against Wasteland. Snuff Out answers nonblack threats; keep two Natural Orders to maintain pressure.","inCount":6,"outCount":6,"over":"Deliberate transformation"},"bg-gaak":{"ins":{"Leyline of the Void":3},"outs":{"Allosaurus Shepherd":2,"Elvish Visionary":1},"notes":"Mulligan for Leyline when the graveyard is essential to their draw. Snuff Out cannot answer black creatures; retain the fast creature engine.","inCount":3,"outCount":3,"over":"Normal"},"uw-stifle":{"ins":{"Choke":2,"Snuff Out":2,"Marwyn, the Preserver":1},"outs":{"Collector Ouphe":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Natural Order":1,"Vibrance":1},"notes":"Marwyn shields Cradle from targeted land destruction; it does not stop Stifle on an activated or triggered ability. Snuff Out can answer Dreadnought.","inCount":5,"outCount":5,"over":"Review density"},"dnt":{"ins":{"Snuff Out":3,"Marwyn, the Preserver":1,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":3,"Vibrance":1,"Natural Order":1},"notes":"Protect Cradle against Wasteland and recur destroyed lands; Changeling hits equipment or other artifacts/enchantments. Snuff Out is live against most white creatures.","inCount":5,"outCount":5,"over":"Review density"},"beanstalk":{"ins":{"Choke":2,"Thoughtseize":3},"outs":{"Collector Ouphe":1,"Vibrance":1,"Natural Order":1,"Temur Sabertooth":1,"Quirion Ranger":1},"notes":"Pressure the blue mana and discard sweepers. Hogaak is vulnerable to exile removal; preserve the compact creature engine.","inCount":5,"outCount":5,"over":"Review density"},"stoneblade":{"ins":{"Choke":2,"Thoughtseize":2,"Snuff Out":2},"outs":{"Vibrance":1,"Natural Order":1,"Quirion Ranger":1,"Formidable Speaker":1,"Temur Sabertooth":1,"Elvish Visionary":1},"notes":"Keep main-deck Ouphe to suppress equipment activations. Use Snuff Out for nonblack creatures and avoid overloading on discard.","inCount":6,"outCount":6,"over":"Deliberate transformation"},"blue-tron":{"ins":{"Thoughtseize":4,"Chomping Changeling":1},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Quirion Ranger":1,"Formidable Speaker":1},"notes":"Discard costly payoffs and fetch Changeling for key artifacts. Preserve the fast Natural Order plan.","inCount":5,"outCount":5,"over":"Review density"},"lands":{"ins":{"Leyline of the Void":3,"Marwyn, the Preserver":1,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":3,"Elvish Visionary":1,"Vibrance":1},"notes":"Marwyn is the key GSZ bullet against Wasteland: it grants lands hexproof and returns destroyed lands for {2}. Leyline blocks Loam; Changeling answers Exploration and Mox Diamond.","inCount":5,"outCount":5,"over":"Review density"},"8moon":{"ins":{"Snuff Out":3,"Chomping Changeling":1},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Natural Order":1},"notes":"Keep all Shepherds against Chalice. Changeling answers Chalice or another artifact; Marwyn does not protect against Blood Moon.","inCount":4,"outCount":4,"over":"Normal"},"eldrazi":{"ins":{"Snuff Out":3,"Hogaak, Arisen Necropolis":1,"Marwyn, the Preserver":1,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Natural Order":1,"Once Upon a Time":1},"notes":"Marwyn protects Cradle from Wasteland; Changeling answers Chalice or Ring. Respect graveyard exile before committing Hogaak.","inCount":6,"outCount":6,"over":"Deliberate transformation"},"initiative":{"ins":{"Snuff Out":3,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1},"notes":"Free creature removal buys time; Changeling can break a disruptive artifact. Keep the Natural Order clock.","inCount":4,"outCount":4,"over":"Normal"},"mono-rean":{"ins":{"Thoughtseize":4,"Leyline of the Void":3},"outs":{"Allosaurus Shepherd":3,"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Quirion Ranger":1},"notes":"Leyline covers the graveyard and Thoughtseize answers discard or transformational threats. Do not bring Hogaak into opposing Leylines.","inCount":7,"outCount":7,"over":"Deliberate transformation"},"ub-rean":{"ins":{"Thoughtseize":4,"Leyline of the Void":3},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Natural Order":1,"Formidable Speaker":1,"Quirion Ranger":1,"Allosaurus Shepherd":1},"notes":"Bring the full graveyard and discard package. Keep Ouphe against fast mana; preserve two Shepherds against blue interaction.","inCount":7,"outCount":7,"over":"Deliberate transformation"},"oops":{"ins":{"Thoughtseize":4,"Leyline of the Void":3,"Chomping Changeling":1},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Allosaurus Shepherd":3,"Formidable Speaker":2},"notes":"Eight-card anti-combo transformation: Leyline, early discard and an artifact/enchantment answer. Keep Ouphe and all three Natural Orders; race after disruption.","inCount":8,"outCount":8,"over":"Deliberate transformation"},"cephalid":{"ins":{"Thoughtseize":3,"Snuff Out":3,"Leyline of the Void":2},"outs":{"Formidable Speaker":2,"Natural Order":1,"Vibrance":1,"Allosaurus Shepherd":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Once Upon a Time":1},"notes":"Ouphe disables Shuko and Snuff Out can remove combo creatures before the mill. Leyline disrupts Dread Return lines but is not a hard lock against a naturally cast Oracle.","inCount":8,"outCount":8,"over":"Deliberate transformation"},"sneak":{"ins":{"Thoughtseize":4,"Choke":2},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Wirewood Symbiote":1,"Formidable Speaker":1,"Once Upon a Time":1},"notes":"Attack their hand early and constrain Islands with Choke. Preserve the Natural Order clock and Atraxa as a Show and Tell option.","inCount":6,"outCount":6,"over":"Deliberate transformation"},"aluren":{"ins":{"Thoughtseize":4,"Choke":2,"Chomping Changeling":1},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Wirewood Symbiote":2,"Formidable Speaker":2},"notes":"Thoughtseize Aluren or protection before it resolves. Changeling can destroy an Aluren in play, but opponents may combo in response; keep a fast clock.","inCount":7,"outCount":7,"over":"Deliberate transformation"},"doomsday":{"ins":{"Thoughtseize":4,"Choke":2},"outs":{"Vibrance":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Formidable Speaker":2,"Wirewood Symbiote":1},"notes":"Four discard spells attack Doomsday directly. Snuff Out on Oracle does not beat an empty-library trigger; preserve Ouphe against fast mana and race.","inCount":6,"outCount":6,"over":"Deliberate transformation"},"tes":{"ins":{"Thoughtseize":4,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":3,"Elvish Visionary":1,"Temur Sabertooth":1},"notes":"Keep main-deck Ouphe and a fast clock. Changeling can remove artifact mana or an enchantment, but a three-mana creature is not early disruption.","inCount":5,"outCount":5,"over":"Review density"},"energy":{"ins":{"Snuff Out":3},"outs":{"Collector Ouphe":1,"Allosaurus Shepherd":1,"Vibrance":1},"notes":"Snuff Out is efficient against nonblack attackers. Retain the Natural Order engine; adjust if the opponent shows a significant artifact package.","inCount":3,"outCount":3,"over":"Normal"},"gb-mole":{"ins":{"Snuff Out":3,"Marwyn, the Preserver":1,"Hogaak, Arisen Necropolis":1},"outs":{"Allosaurus Shepherd":3,"Collector Ouphe":1,"Vibrance":1},"notes":"Marwyn protects Cradle against Wasteland and returns destroyed lands. Snuff Out is useful on green creatures but misses black ones; check exile answers before Hogaak.","inCount":5,"outCount":5,"over":"Review density"},"key-ring":{"ins":{"Thoughtseize":4,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":3,"Vibrance":1,"Elvish Visionary":1},"notes":"Ouphe is the main lock piece. Changeling is searchable artifact removal; Thoughtseize covers payoff and sweepers.","inCount":5,"outCount":5,"over":"Review density"},"sewer-cam":{"ins":{"Snuff Out":2,"Leyline of the Void":3,"Chomping Changeling":1},"outs":{"Allosaurus Shepherd":1,"Natural Order":1,"Vibrance":1,"Elvish Visionary":1,"Temur Sabertooth":1,"Formidable Speaker":1},"notes":"Leyline shuts down graveyard-based Welder lines; Snuff Out handles Welder/Engineer; Changeling removes the key artifact. Keep Ouphe.","inCount":6,"outCount":6,"over":"Deliberate transformation"},"jeskai-control":{"ins":{"Choke":2,"Thoughtseize":3},"outs":{"Collector Ouphe":1,"Vibrance":1,"Natural Order":1,"Quirion Ranger":1,"Temur Sabertooth":1},"notes":"Discard sweepers and protect a compact grind engine. Bring both Chokes; trim only one of the three Natural Orders.","inCount":5,"outCount":5,"over":"Review density"},"8cast":{"ins":{"Snuff Out":3,"Chomping Changeling":1},"outs":{"Elvish Visionary":1,"Temur Sabertooth":1,"Vibrance":1,"Allosaurus Shepherd":1},"notes":"Keep Ouphe; fetch Changeling to destroy a key artifact and use Snuff Out on nonblack threats.","inCount":4,"outCount":4,"over":"Normal"},"control-vegecookies":{"ins":{"Thoughtseize":3,"Choke":2},"outs":{"Natural Order":3,"Vibrance":1,"Atraxa, Grand Unifier":1},"notes":"Adapted specialist UWx plan for the current 3 Natural Orders: cut all three plus Vibrance and Atraxa; bring 3 Thoughtseize and 2 Choke. Preserve the creature engine.","inCount":5,"outCount":5,"over":"Review density"}};
for(const [id,plan] of Object.entries(RC51_PLANS)) applySideboardPlan(id,plan);

/* 5 Oct 2026 list (runkor, MTGO): Elvish Visionary -> Marwyn, the Preserver in the main deck, and one
   Windswept Heath -> a third Boseiju. Sideboard: Hogaak, Chomping Changeling and Marwyn leave; two
   Assassin's Trophy and one Primaris Eliminator arrive. Every plan is converted by three rules, kept
   here so they can be reviewed:
   1. Marwyn takes Visionary's slot. A cut Visionary becomes a cut Marwyn; a plan that brought Marwyn
      in no longer needs to. If it did not cut Visionary either, it keeps one card it used to cut.
   2. Hogaak in -> Primaris Eliminator in: removal on a body that Formidable Speaker can find.
   3. Chomping Changeling in -> Assassin's Trophy in: wider instant-speed permanent removal. */
for(const key of Object.keys(SB_COSTS)) delete SB_COSTS[key];
Object.assign(SB_COSTS,{"Assassin's Trophy": ["B", "G"], "Choke": ["2", "G"], "Leyline of the Void": ["2", "B", "B"], "Primaris Eliminator": ["4", "B"], "Snuff Out": ["3", "B"], "Thoughtseize": ["B"]});
(function convertPlansToOctoberList(){
 const VIS='Elvish Visionary',MAR='Marwyn, the Preserver',HOG='Hogaak, Arisen Necropolis',CHG='Chomping Changeling';
 // Plans that brought Marwyn in without cutting Visionary keep this card instead (it kills small creatures).
 const KEEP={'dnt':'Vibrance','gb-mole':'Vibrance'};
 const total=o=>Object.values(o).reduce((a,b)=>a+b,0);
 for(const [id,p] of Object.entries(DETAILS)){
  const ins={...p.ins},outs={...p.outs},changes=[];
  if(ins[MAR]){
   delete ins[MAR];
   if(outs[VIS]){delete outs[VIS];changes.push('Marwyn is now in the main deck, in Visionary’s slot');}
   else if(KEEP[id]&&outs[KEEP[id]]){outs[KEEP[id]]--;if(!outs[KEEP[id]])delete outs[KEEP[id]];changes.push('Marwyn is now in the main deck; keep '+KEEP[id]);}
  }else if(outs[VIS]){outs[MAR]=outs[VIS];delete outs[VIS];changes.push('cut Marwyn where Visionary was cut');}
  if(ins[HOG]){ins['Primaris Eliminator']=(ins['Primaris Eliminator']||0)+ins[HOG];delete ins[HOG];changes.push('Primaris Eliminator replaces Hogaak');}
  if(ins[CHG]){ins["Assassin's Trophy"]=(ins["Assassin's Trophy"]||0)+ins[CHG];delete ins[CHG];changes.push('Assassin’s Trophy replaces Chomping Changeling');}
  if(!changes.length)continue;
  const inCount=total(ins),outCount=total(outs);
  const over=inCount===p.inCount?p.over:inCount<=4?'Normal':inCount===5?'Review density':'Deliberate transformation';
  applySideboardPlan(id,{ins,outs,inCount,outCount,over,notes:(p.notes||'')+' 5 Oct list: '+changes.join('; ')+'.'});
 }
})();

const MATCH_COLORS={"ub-moon": "UB", "ub-legends": "UB", "ur-cutter": "UR", "bg-gaak": "BG", "uw-stifle": "WU", "dnt": "WB", "beanstalk": "WUBRG", "stoneblade": "WUR", "blue-tron": "U", "lands": "G", "8moon": "R", "eldrazi": "C", "initiative": "WR", "mono-rean": "B", "ub-rean": "WUBRG", "oops": "BG", "cephalid": "WUB", "sneak": "UR", "aluren": "UBG", "necro": "B", "doomsday": "UB", "tes": "UBRG", "energy": "WBR", "gb-mole": "BG", "key-ring": "C", "sewer-cam": "WUR", "jeskai-control": "WUR", "8cast": "U", "control-vegecookies": "WU"};
const GOLDFISH_META={"ub-moon": {"7": {"label": "≈11.1%", "detail": "Dimir Tempo: 11.1% (31); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online", "sources": [{"key": "dimir-tempo", "share": 11.1, "label": "Dimir Tempo", "published": "11.1% (31)", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online"}]}, "14": {"label": "≈9.5%", "detail": "Dimir Tempo: 9.5% (53); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online", "sources": [{"key": "dimir-tempo", "share": 9.5, "label": "Dimir Tempo", "published": "9.5% (53)", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online"}]}, "30": {"label": "≈11.1%", "detail": "Dimir Tempo: 11.1% (144); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online", "sources": [{"key": "dimir-tempo", "share": 11.1, "label": "Dimir Tempo", "published": "11.1% (144)", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online"}]}}, "ub-legends": {"7": {"label": "≈11.1%", "detail": "Dimir Tempo: 11.1% (31); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online", "sources": [{"key": "dimir-tempo", "share": 11.1, "label": "Dimir Tempo", "published": "11.1% (31)", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online"}]}, "14": {"label": "≈9.5%", "detail": "Dimir Tempo: 9.5% (53); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online", "sources": [{"key": "dimir-tempo", "share": 9.5, "label": "Dimir Tempo", "published": "9.5% (53)", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online"}]}, "30": {"label": "≈11.1%", "detail": "Dimir Tempo: 11.1% (144); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online", "sources": [{"key": "dimir-tempo", "share": 11.1, "label": "Dimir Tempo", "published": "11.1% (144)", "url": "https://www.mtggoldfish.com/archetype/legacy-dimir-tempo#online"}]}}, "ur-cutter": {"7": {"label": "≈5.7%", "detail": "Izzet Delver: 5.7% (16)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-delver#online", "sources": [{"key": "izzet-delver", "share": 5.7, "label": "Izzet Delver", "published": "5.7% (16)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-delver#online"}]}, "14": {"label": "≈4.3%", "detail": "Izzet Delver: 4.3% (24)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-delver#online", "sources": [{"key": "izzet-delver", "share": 4.3, "label": "Izzet Delver", "published": "4.3% (24)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-delver#online"}]}, "30": {"label": "≈4.4%", "detail": "Izzet Delver: 4.2% (54) + Izzet Tempo: 0.2% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-delver#online", "sources": [{"key": "izzet-delver", "share": 4.2, "label": "Izzet Delver", "published": "4.2% (54)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-delver#online"}, {"key": "izzet-tempo", "share": 0.2, "label": "Izzet Tempo", "published": "0.2% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-izzet-tempo#online"}]}}, "uw-stifle": {"7": {"label": "≈1.1%", "detail": "Stiflenought: 1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-stiflenought#online", "sources": [{"key": "stiflenought", "share": 1.1, "label": "Stiflenought", "published": "1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-stiflenought#online"}]}, "14": {"label": "≈0.7%", "detail": "Stiflenought: 0.7% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-stiflenought#online", "sources": [{"key": "stiflenought", "share": 0.7, "label": "Stiflenought", "published": "0.7% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-stiflenought#online"}]}, "30": {"label": "≈0.6%", "detail": "Stiflenought: 0.6% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-stiflenought#online", "sources": [{"key": "stiflenought", "share": 0.6, "label": "Stiflenought", "published": "0.6% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-stiflenought#online"}]}}, "dnt": {"7": {"label": "5.0%", "detail": "Death and Taxes (Yorion) - Black/White: 5.0% (14)", "url": "https://www.mtggoldfish.com/archetype/legacy-death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa#online", "sources": [{"key": "death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa", "share": 5.0, "label": "Death and Taxes (Yorion) - Black/White", "published": "5.0% (14)", "url": "https://www.mtggoldfish.com/archetype/legacy-death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa#online"}]}, "14": {"label": "4.1%", "detail": "Death and Taxes (Yorion) - Black/White: 4.1% (23)", "url": "https://www.mtggoldfish.com/archetype/legacy-death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa#online", "sources": [{"key": "death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa", "share": 4.1, "label": "Death and Taxes (Yorion) - Black/White", "published": "4.1% (23)", "url": "https://www.mtggoldfish.com/archetype/legacy-death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa#online"}]}, "30": {"label": "5.6%", "detail": "Death and Taxes (Yorion) - Black/White: 5.6% (73)", "url": "https://www.mtggoldfish.com/archetype/legacy-death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa#online", "sources": [{"key": "death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa", "share": 5.6, "label": "Death and Taxes (Yorion) - Black/White", "published": "5.6% (73)", "url": "https://www.mtggoldfish.com/archetype/legacy-death-and-taxes-yorion-black-white-468d6491-e6a9-46c8-b9fb-da35bfca78fa#online"}]}}, "beanstalk": {"7": {"label": "≈2.5%", "detail": "Beanstalk Control (Non-Yorion): 2.5% (7)", "url": "https://www.mtggoldfish.com/archetype/legacy-beanstalk-control-non-yorion#online", "sources": [{"key": "beanstalk-control-non-yorion", "share": 2.5, "label": "Beanstalk Control (Non-Yorion)", "published": "2.5% (7)", "url": "https://www.mtggoldfish.com/archetype/legacy-beanstalk-control-non-yorion#online"}]}, "14": {"label": "≈3.9%", "detail": "Beanstalk Control (Non-Yorion): 3.9% (22)", "url": "https://www.mtggoldfish.com/archetype/legacy-beanstalk-control-non-yorion#online", "sources": [{"key": "beanstalk-control-non-yorion", "share": 3.9, "label": "Beanstalk Control (Non-Yorion)", "published": "3.9% (22)", "url": "https://www.mtggoldfish.com/archetype/legacy-beanstalk-control-non-yorion#online"}]}, "30": {"label": "≈3.9%", "detail": "Beanstalk Control (Non-Yorion): 3.9% (51)", "url": "https://www.mtggoldfish.com/archetype/legacy-beanstalk-control-non-yorion#online", "sources": [{"key": "beanstalk-control-non-yorion", "share": 3.9, "label": "Beanstalk Control (Non-Yorion)", "published": "3.9% (51)", "url": "https://www.mtggoldfish.com/archetype/legacy-beanstalk-control-non-yorion#online"}]}}, "stoneblade": {"7": {"label": "≈0.4%", "detail": "Azorius Stoneblade: 0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-azorius-stoneblade#online", "sources": [{"key": "azorius-stoneblade", "share": 0.4, "label": "Azorius Stoneblade", "published": "0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-azorius-stoneblade#online"}]}, "14": {"label": "≈0.4%", "detail": "Azorius Stoneblade: 0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-azorius-stoneblade#online", "sources": [{"key": "azorius-stoneblade", "share": 0.4, "label": "Azorius Stoneblade", "published": "0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-azorius-stoneblade#online"}]}, "30": {"label": "≈0.8%", "detail": "Azorius Stoneblade: 0.6% (8) + Jeskai Stoneblade: 0.2% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-azorius-stoneblade#online", "sources": [{"key": "azorius-stoneblade", "share": 0.6, "label": "Azorius Stoneblade", "published": "0.6% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-azorius-stoneblade#online"}, {"key": "jeskai-stoneblade", "share": 0.2, "label": "Jeskai Stoneblade", "published": "0.2% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-stoneblade#online"}]}}, "blue-tron": {"7": {"label": "≈1.1%", "detail": "Tron: 1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-tron#online", "sources": [{"key": "tron", "share": 1.1, "label": "Tron", "published": "1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-tron#online"}]}, "14": {"label": "≈3.4%", "detail": "Tron: 3.4% (19)", "url": "https://www.mtggoldfish.com/archetype/legacy-tron#online", "sources": [{"key": "tron", "share": 3.4, "label": "Tron", "published": "3.4% (19)", "url": "https://www.mtggoldfish.com/archetype/legacy-tron#online"}]}, "30": {"label": "≈5.1%", "detail": "Tron: 5.1% (66)", "url": "https://www.mtggoldfish.com/archetype/legacy-tron#online", "sources": [{"key": "tron", "share": 5.1, "label": "Tron", "published": "5.1% (66)", "url": "https://www.mtggoldfish.com/archetype/legacy-tron#online"}]}}, "key-ring": {"7": {"label": "1.4%", "detail": "Mystic Forge Combo: 1.4% (4); separate from Tron", "url": "https://www.mtggoldfish.com/archetype/legacy-mystic-forge-combo#online", "sources": [{"key": "mystic-forge-combo", "share": 1.4, "label": "Mystic Forge Combo", "published": "1.4% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-mystic-forge-combo#online"}]}, "14": {"label": "0.9%", "detail": "Mystic Forge Combo: 0.9% (5); separate from Tron", "url": "https://www.mtggoldfish.com/archetype/legacy-mystic-forge-combo#online", "sources": [{"key": "mystic-forge-combo", "share": 0.9, "label": "Mystic Forge Combo", "published": "0.9% (5)", "url": "https://www.mtggoldfish.com/archetype/legacy-mystic-forge-combo#online"}]}, "30": {"label": "1.0%", "detail": "Mystic Forge Combo: 1.0% (13); separate from Tron", "url": "https://www.mtggoldfish.com/archetype/legacy-mystic-forge-combo#online", "sources": [{"key": "mystic-forge-combo", "share": 1.0, "label": "Mystic Forge Combo", "published": "1.0% (13)", "url": "https://www.mtggoldfish.com/archetype/legacy-mystic-forge-combo#online"}]}}, "lands": {"7": {"label": "3.2%", "detail": "Lands: 3.2% (9)", "url": "https://www.mtggoldfish.com/archetype/legacy-lands#online", "sources": [{"key": "lands", "share": 3.2, "label": "Lands", "published": "3.2% (9)", "url": "https://www.mtggoldfish.com/archetype/legacy-lands#online"}]}, "14": {"label": "2.9%", "detail": "Lands: 2.9% (16)", "url": "https://www.mtggoldfish.com/archetype/legacy-lands#online", "sources": [{"key": "lands", "share": 2.9, "label": "Lands", "published": "2.9% (16)", "url": "https://www.mtggoldfish.com/archetype/legacy-lands#online"}]}, "30": {"label": "3.5%", "detail": "Lands: 3.5% (45)", "url": "https://www.mtggoldfish.com/archetype/legacy-lands#online", "sources": [{"key": "lands", "share": 3.5, "label": "Lands", "published": "3.5% (45)", "url": "https://www.mtggoldfish.com/archetype/legacy-lands#online"}]}}, "8moon": {"7": {"label": "2.5%", "detail": "Red Stompy: 2.5% (7)", "url": "https://www.mtggoldfish.com/archetype/legacy-red-stompy#online", "sources": [{"key": "red-stompy", "share": 2.5, "label": "Red Stompy", "published": "2.5% (7)", "url": "https://www.mtggoldfish.com/archetype/legacy-red-stompy#online"}]}, "14": {"label": "1.8%", "detail": "Red Stompy: 1.8% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-red-stompy#online", "sources": [{"key": "red-stompy", "share": 1.8, "label": "Red Stompy", "published": "1.8% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-red-stompy#online"}]}, "30": {"label": "1.4%", "detail": "Red Stompy: 1.4% (18)", "url": "https://www.mtggoldfish.com/archetype/legacy-red-stompy#online", "sources": [{"key": "red-stompy", "share": 1.4, "label": "Red Stompy", "published": "1.4% (18)", "url": "https://www.mtggoldfish.com/archetype/legacy-red-stompy#online"}]}}, "eldrazi": {"7": {"label": "7.9%", "detail": "Eldrazi: 7.9% (22)", "url": "https://www.mtggoldfish.com/archetype/legacy-eldrazi#online", "sources": [{"key": "eldrazi", "share": 7.9, "label": "Eldrazi", "published": "7.9% (22)", "url": "https://www.mtggoldfish.com/archetype/legacy-eldrazi#online"}]}, "14": {"label": "8.8%", "detail": "Eldrazi: 8.8% (49)", "url": "https://www.mtggoldfish.com/archetype/legacy-eldrazi#online", "sources": [{"key": "eldrazi", "share": 8.8, "label": "Eldrazi", "published": "8.8% (49)", "url": "https://www.mtggoldfish.com/archetype/legacy-eldrazi#online"}]}, "30": {"label": "6.3%", "detail": "Eldrazi: 6.3% (81)", "url": "https://www.mtggoldfish.com/archetype/legacy-eldrazi#online", "sources": [{"key": "eldrazi", "share": 6.3, "label": "Eldrazi", "published": "6.3% (81)", "url": "https://www.mtggoldfish.com/archetype/legacy-eldrazi#online"}]}}, "initiative": {"7": {"label": "0.4%", "detail": "Boros Initiative: 0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-boros-initiative#online", "sources": [{"key": "boros-initiative", "share": 0.4, "label": "Boros Initiative", "published": "0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-boros-initiative#online"}]}, "14": {"label": "0.4%", "detail": "Boros Initiative: 0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-boros-initiative#online", "sources": [{"key": "boros-initiative", "share": 0.4, "label": "Boros Initiative", "published": "0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-boros-initiative#online"}]}, "30": {"label": "0.2%", "detail": "Boros Initiative: 0.2% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-boros-initiative#online", "sources": [{"key": "boros-initiative", "share": 0.2, "label": "Boros Initiative", "published": "0.2% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-boros-initiative#online"}]}}, "mono-rean": {"7": {"label": "≈1.1%", "detail": "Reanimator: 1.1% (3); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online", "sources": [{"key": "reanimator", "share": 1.1, "label": "Reanimator", "published": "1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online"}]}, "14": {"label": "≈1.8%", "detail": "Reanimator: 1.8% (10); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online", "sources": [{"key": "reanimator", "share": 1.8, "label": "Reanimator", "published": "1.8% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online"}]}, "30": {"label": "≈1.0%", "detail": "Reanimator: 1.0% (13); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online", "sources": [{"key": "reanimator", "share": 1.0, "label": "Reanimator", "published": "1.0% (13)", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online"}]}}, "ub-rean": {"7": {"label": "≈1.1%", "detail": "Reanimator: 1.1% (3); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online", "sources": [{"key": "reanimator", "share": 1.1, "label": "Reanimator", "published": "1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online"}]}, "14": {"label": "≈1.8%", "detail": "Reanimator: 1.8% (10); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online", "sources": [{"key": "reanimator", "share": 1.8, "label": "Reanimator", "published": "1.8% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online"}]}, "30": {"label": "≈1.0%", "detail": "Reanimator: 1.0% (13); shared archetype, counted once in category totals", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online", "sources": [{"key": "reanimator", "share": 1.0, "label": "Reanimator", "published": "1.0% (13)", "url": "https://www.mtggoldfish.com/archetype/legacy-reanimator#online"}]}}, "oops": {"7": {"label": "0.4%", "detail": "Oops! All Spells: 0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-oops-all-spells#online", "sources": [{"key": "oops-all-spells", "share": 0.4, "label": "Oops! All Spells", "published": "0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-oops-all-spells#online"}]}, "14": {"label": "0.4%", "detail": "Oops! All Spells: 0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-oops-all-spells#online", "sources": [{"key": "oops-all-spells", "share": 0.4, "label": "Oops! All Spells", "published": "0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-oops-all-spells#online"}]}, "30": {"label": "0.5%", "detail": "Oops! All Spells: 0.5% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-oops-all-spells#online", "sources": [{"key": "oops-all-spells", "share": 0.5, "label": "Oops! All Spells", "published": "0.5% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-oops-all-spells#online"}]}}, "cephalid": {"7": {"label": "1.1%", "detail": "Cephalid Breakfast: 1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-cephalid-breakfast#online", "sources": [{"key": "cephalid-breakfast", "share": 1.1, "label": "Cephalid Breakfast", "published": "1.1% (3)", "url": "https://www.mtggoldfish.com/archetype/legacy-cephalid-breakfast#online"}]}, "14": {"label": "0.7%", "detail": "Cephalid Breakfast: 0.7% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-cephalid-breakfast#online", "sources": [{"key": "cephalid-breakfast", "share": 0.7, "label": "Cephalid Breakfast", "published": "0.7% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-cephalid-breakfast#online"}]}, "30": {"label": "0.8%", "detail": "Cephalid Breakfast: 0.8% (11)", "url": "https://www.mtggoldfish.com/archetype/legacy-cephalid-breakfast#online", "sources": [{"key": "cephalid-breakfast", "share": 0.8, "label": "Cephalid Breakfast", "published": "0.8% (11)", "url": "https://www.mtggoldfish.com/archetype/legacy-cephalid-breakfast#online"}]}}, "sneak": {"7": {"label": "3.6%", "detail": "Sneak and Show: 3.6% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-sneak-and-show#online", "sources": [{"key": "sneak-and-show", "share": 3.6, "label": "Sneak and Show", "published": "3.6% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-sneak-and-show#online"}]}, "14": {"label": "2.7%", "detail": "Sneak and Show: 2.7% (15)", "url": "https://www.mtggoldfish.com/archetype/legacy-sneak-and-show#online", "sources": [{"key": "sneak-and-show", "share": 2.7, "label": "Sneak and Show", "published": "2.7% (15)", "url": "https://www.mtggoldfish.com/archetype/legacy-sneak-and-show#online"}]}, "30": {"label": "2.6%", "detail": "Sneak and Show: 2.6% (33)", "url": "https://www.mtggoldfish.com/archetype/legacy-sneak-and-show#online", "sources": [{"key": "sneak-and-show", "share": 2.6, "label": "Sneak and Show", "published": "2.6% (33)", "url": "https://www.mtggoldfish.com/archetype/legacy-sneak-and-show#online"}]}}, "aluren": {"7": {"label": "2.9%", "detail": "Aluren: 2.9% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-aluren#online", "sources": [{"key": "aluren", "share": 2.9, "label": "Aluren", "published": "2.9% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-aluren#online"}]}, "14": {"label": "3.9%", "detail": "Aluren: 3.9% (22)", "url": "https://www.mtggoldfish.com/archetype/legacy-aluren#online", "sources": [{"key": "aluren", "share": 3.9, "label": "Aluren", "published": "3.9% (22)", "url": "https://www.mtggoldfish.com/archetype/legacy-aluren#online"}]}, "30": {"label": "4.4%", "detail": "Aluren: 4.4% (57)", "url": "https://www.mtggoldfish.com/archetype/legacy-aluren#online", "sources": [{"key": "aluren", "share": 4.4, "label": "Aluren", "published": "4.4% (57)", "url": "https://www.mtggoldfish.com/archetype/legacy-aluren#online"}]}}, "doomsday": {"7": {"label": "4.6%", "detail": "Doomsday: 4.6% (13)", "url": "https://www.mtggoldfish.com/archetype/legacy-doomsday#online", "sources": [{"key": "doomsday", "share": 4.6, "label": "Doomsday", "published": "4.6% (13)", "url": "https://www.mtggoldfish.com/archetype/legacy-doomsday#online"}]}, "14": {"label": "4.8%", "detail": "Doomsday: 4.8% (27)", "url": "https://www.mtggoldfish.com/archetype/legacy-doomsday#online", "sources": [{"key": "doomsday", "share": 4.8, "label": "Doomsday", "published": "4.8% (27)", "url": "https://www.mtggoldfish.com/archetype/legacy-doomsday#online"}]}, "30": {"label": "5.0%", "detail": "Doomsday: 5.0% (64)", "url": "https://www.mtggoldfish.com/archetype/legacy-doomsday#online", "sources": [{"key": "doomsday", "share": 5.0, "label": "Doomsday", "published": "5.0% (64)", "url": "https://www.mtggoldfish.com/archetype/legacy-doomsday#online"}]}}, "tes": {"7": {"label": "1.4%", "detail": "The EPIC Storm: 1.4% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-the-epic-storm#online", "sources": [{"key": "the-epic-storm", "share": 1.4, "label": "The EPIC Storm", "published": "1.4% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-the-epic-storm#online"}]}, "14": {"label": "1.4%", "detail": "The EPIC Storm: 1.4% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-the-epic-storm#online", "sources": [{"key": "the-epic-storm", "share": 1.4, "label": "The EPIC Storm", "published": "1.4% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-the-epic-storm#online"}]}, "30": {"label": "1.3%", "detail": "The EPIC Storm: 1.3% (17)", "url": "https://www.mtggoldfish.com/archetype/legacy-the-epic-storm#online", "sources": [{"key": "the-epic-storm", "share": 1.3, "label": "The EPIC Storm", "published": "1.3% (17)", "url": "https://www.mtggoldfish.com/archetype/legacy-the-epic-storm#online"}]}}, "energy": {"7": {"label": "2.5%", "detail": "Mardu Energy: 2.5% (7)", "url": "https://www.mtggoldfish.com/archetype/legacy-mardu-energy#online", "sources": [{"key": "mardu-energy", "share": 2.5, "label": "Mardu Energy", "published": "2.5% (7)", "url": "https://www.mtggoldfish.com/archetype/legacy-mardu-energy#online"}]}, "14": {"label": "3.2%", "detail": "Mardu Energy: 3.2% (18)", "url": "https://www.mtggoldfish.com/archetype/legacy-mardu-energy#online", "sources": [{"key": "mardu-energy", "share": 3.2, "label": "Mardu Energy", "published": "3.2% (18)", "url": "https://www.mtggoldfish.com/archetype/legacy-mardu-energy#online"}]}, "30": {"label": "2.8%", "detail": "Mardu Energy: 2.8% (36)", "url": "https://www.mtggoldfish.com/archetype/legacy-mardu-energy#online", "sources": [{"key": "mardu-energy", "share": 2.8, "label": "Mardu Energy", "published": "2.8% (36)", "url": "https://www.mtggoldfish.com/archetype/legacy-mardu-energy#online"}]}}, "gb-mole": {"7": {"label": "0.7%", "detail": "Cradle Control: 0.7% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-cradle-control#online", "sources": [{"key": "cradle-control", "share": 0.7, "label": "Cradle Control", "published": "0.7% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-cradle-control#online"}]}, "14": {"label": "0.4%", "detail": "Cradle Control: 0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-cradle-control#online", "sources": [{"key": "cradle-control", "share": 0.4, "label": "Cradle Control", "published": "0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-cradle-control#online"}]}, "30": {"label": "0.5%", "detail": "Cradle Control: 0.5% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-cradle-control#online", "sources": [{"key": "cradle-control", "share": 0.5, "label": "Cradle Control", "published": "0.5% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-cradle-control#online"}]}}, "sewer-cam": {"7": {"label": "6.1%", "detail": "Sewer-Cam Combo: 6.1% (17)", "url": "https://www.mtggoldfish.com/archetype/legacy-sewer-cam-combo#online", "sources": [{"key": "sewer-cam-combo", "share": 6.1, "label": "Sewer-Cam Combo", "published": "6.1% (17)", "url": "https://www.mtggoldfish.com/archetype/legacy-sewer-cam-combo#online"}]}, "14": {"label": "6.1%", "detail": "Sewer-Cam Combo: 6.1% (34)", "url": "https://www.mtggoldfish.com/archetype/legacy-sewer-cam-combo#online", "sources": [{"key": "sewer-cam-combo", "share": 6.1, "label": "Sewer-Cam Combo", "published": "6.1% (34)", "url": "https://www.mtggoldfish.com/archetype/legacy-sewer-cam-combo#online"}]}, "30": {"label": "3.7%", "detail": "Sewer-Cam Combo: 3.7% (48)", "url": "https://www.mtggoldfish.com/archetype/legacy-sewer-cam-combo#online", "sources": [{"key": "sewer-cam-combo", "share": 3.7, "label": "Sewer-Cam Combo", "published": "3.7% (48)", "url": "https://www.mtggoldfish.com/archetype/legacy-sewer-cam-combo#online"}]}}, "jeskai-control": {"7": {"label": "2.1%", "detail": "Jeskai Control: 2.1% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control#online", "sources": [{"key": "jeskai-control", "share": 2.1, "label": "Jeskai Control", "published": "2.1% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control#online"}]}, "14": {"label": "2.1%", "detail": "Jeskai Control: 2.1% (12)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control#online", "sources": [{"key": "jeskai-control", "share": 2.1, "label": "Jeskai Control", "published": "2.1% (12)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control#online"}]}, "30": {"label": "≈1.5%", "detail": "Jeskai Control: 1.1% (14) + Jeskai Control (second Goldfish entry): 0.4% (5)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control#online", "sources": [{"key": "jeskai-control", "share": 1.1, "label": "Jeskai Control", "published": "1.1% (14)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control#online"}, {"key": "jeskai-control-28399e5a-902c-4043-b288-c852671a4c2b", "share": 0.4, "label": "Jeskai Control (second Goldfish entry)", "published": "0.4% (5)", "url": "https://www.mtggoldfish.com/archetype/legacy-jeskai-control-28399e5a-902c-4043-b288-c852671a4c2b#online"}]}}, "8cast": {"7": {"label": "≈0.4%", "detail": "Affinity Stompy: 0.4% (1); requested Affinity mapping, excluding the separate 8-Cast entry", "url": "https://www.mtggoldfish.com/archetype/legacy-affinity-stompy#online", "sources": [{"key": "affinity-stompy", "share": 0.4, "label": "Affinity Stompy", "published": "0.4% (1)", "url": "https://www.mtggoldfish.com/archetype/legacy-affinity-stompy#online"}]}, "14": {"label": "≈0.4%", "detail": "Affinity Stompy: 0.4% (2); requested Affinity mapping, excluding the separate 8-Cast entry", "url": "https://www.mtggoldfish.com/archetype/legacy-affinity-stompy#online", "sources": [{"key": "affinity-stompy", "share": 0.4, "label": "Affinity Stompy", "published": "0.4% (2)", "url": "https://www.mtggoldfish.com/archetype/legacy-affinity-stompy#online"}]}, "30": {"label": "≈0.6%", "detail": "Affinity Stompy: 0.6% (8); requested Affinity mapping, excluding the separate 8-Cast entry", "url": "https://www.mtggoldfish.com/archetype/legacy-affinity-stompy#online", "sources": [{"key": "affinity-stompy", "share": 0.6, "label": "Affinity Stompy", "published": "0.6% (8)", "url": "https://www.mtggoldfish.com/archetype/legacy-affinity-stompy#online"}]}}, "bg-gaak": {"7": {"label": "1.4%", "detail": "Hogaak Moonshadow: 1.4% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-hogaak-moonshadow#online", "sources": [{"key": "hogaak-moonshadow", "share": 1.4, "label": "Hogaak Moonshadow", "published": "1.4% (4)", "url": "https://www.mtggoldfish.com/archetype/legacy-hogaak-moonshadow#online"}]}, "14": {"label": "1.1%", "detail": "Hogaak Moonshadow: 1.1% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-hogaak-moonshadow#online", "sources": [{"key": "hogaak-moonshadow", "share": 1.1, "label": "Hogaak Moonshadow", "published": "1.1% (6)", "url": "https://www.mtggoldfish.com/archetype/legacy-hogaak-moonshadow#online"}]}, "30": {"label": "0.8%", "detail": "Hogaak Moonshadow: 0.8% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-hogaak-moonshadow#online", "sources": [{"key": "hogaak-moonshadow", "share": 0.8, "label": "Hogaak Moonshadow", "published": "0.8% (10)", "url": "https://www.mtggoldfish.com/archetype/legacy-hogaak-moonshadow#online"}]}}};
MATCH_COLORS['boros-energy']='WR';
GOLDFISH_META['boros-energy']=Object.fromEntries(['7','14','30'].map(w=>{const url='https://www.mtggoldfish.com/archetype/legacy-boros-energy#online';
 return [w,{label:'—',detail:'Boros Energy: not in the 28 Sep snapshot',url,sources:[{key:'boros-energy',share:0,label:'Boros Energy',published:'—',url}]}];}));
// Nightly refresh: js/meta-live.js (written by scripts/update_meta.py) replaces the snapshot's
// shares with the latest MTGGoldfish windows. Without that file the dated snapshot above stays.
// An archetype missing from a window shows "—", never 0%.
let GOLDFISH_META_DATE='28 Sep 2026';
(function applyGoldfishLive(live){
 if(!live||!live.windows)return;
 const slugOf=url=>url.replace(/.*archetype\//,'').replace(/#.*/,'');
 for(const entry of Object.values(GOLDFISH_META))for(const w of ['7','14','30']){
  const win=entry[w];if(!win||!win.sources||!win.sources.length)continue;
  const approx=win.label.startsWith('≈');let total=0,found=0;
  for(const s of win.sources){const row=live.windows[w]&&live.windows[w][slugOf(s.url)];
   if(row){s.share=row.share;s.published=row.share.toFixed(1)+'% ('+row.decks+')';total+=row.share;found++;}
   else{s.share=0;s.published='not listed in this window';}}
  win.label=found?(approx?'≈':'')+total.toFixed(1)+'%':'—';
  win.detail=win.sources.map(s=>s.label+': '+s.published).join(' + ')+(approx?'; shared or summed archetype, counted once in category totals':'');
 }
 GOLDFISH_META_DATE=live.updatedLabel;
})(window.GOLDFISH_LIVE);
const CARD_COSTS={...SB_COSTS,...{"Mana dork": ["G"], "Quirion Ranger": ["G"], "Elvish Visionary": ["1", "G"], "Marwyn, the Preserver": ["1", "G"], "Wirewood Symbiote": ["G"], "Temur Sabertooth": ["2", "G", "G"], "Formidable Speaker": ["2", "G"], "Badgermole Cub": ["1", "G"], "Once Upon a Time": ["1", "G"], "Allosaurus Shepherd": ["G"], "Natural Order": ["2", "G", "G"], "Collector Ouphe": ["1", "G"], "Vibrance": ["3", "R/G", "R/G"], "Atraxa, Grand Unifier": ["3", "G", "W", "U", "B"]}};
function manaSymbols(symbols){
 return '<span class="manaSymbols">'+symbols.map(x=>`<img src="${MANA_ICONS[x]}" alt="{${x}}" title="{${x}}" width="13" height="13">`).join('')+'</span>';
}
function upgradeMatrix(){
 const table=document.querySelector('.matrixwrap > .transposed');
 const oldHead=table.tHead.rows[0];
 const originalMeta=[...oldHead.cells].slice(0,6);
 const groups=[['Mana',['Mana dork','Quirion Ranger']],['Loop engine',['Wirewood Symbiote','Temur Sabertooth','Formidable Speaker','Badgermole Cub']],['Core',['Allosaurus Shepherd','Once Upon a Time','Natural Order']],['Bullets',['Collector Ouphe','Marwyn, the Preserver','Vibrance','Atraxa, Grand Unifier']]];
 const side=Object.keys(SB_COSTS);
 const out=groups.flatMap(g=>g[1]);
 const top=document.createElement('tr');top.className='groupHead';
 const bottom=document.createElement('tr');bottom.className='cardHead';
 const groupCell=(name,n,cls)=>{const h=document.createElement('th');h.textContent=name;h.colSpan=n;h.className='columnGroup '+cls;h.scope='colgroup';return h;};
 originalMeta.forEach((h,i)=>{h.rowSpan=2;h.scope='col';top.appendChild(h);if(i===1)top.appendChild(groupCell('Meta % · MTGO',3,'metaGroup'));});
 for(const days of [7,14,30]){const h=document.createElement('th');h.textContent=days+'d';h.className='metaPercent';h.scope='col';bottom.appendChild(h);}
 for(const [name,cards] of [...groups,['Sideboard IN',side]]){
  const cls='group-'+name.split(' ')[0].toLowerCase();top.appendChild(groupCell(name,cards.length,cls));
  cards.forEach((card,i)=>{const h=document.createElement('th');h.className='rotateHead '+cls+(i===0?' groupStart':'');h.scope='col';h.dataset.card=card;
   h.innerHTML='<span class="cardLabel">'+manaSymbols(CARD_COSTS[card])+'<span class="cardName">'+esc(card)+'</span>'+'</span>';bottom.appendChild(h);});
 }
 table.tHead.replaceChildren(top,bottom);
 // Explicit physical columns prevent group headings from expanding number cells.
 const widths=[110,235,46,46,46,52,32,32,36,...Array(out.length+side.length).fill(29)];
 const cols=document.createElement('colgroup');
 widths.forEach(width=>{const col=document.createElement('col');col.style.width=width+'px';cols.appendChild(col);});
 table.prepend(cols);
 table.style.setProperty('width',widths.reduce((a,b)=>a+b,0)+'px','important');
 const total=9+out.length+side.length;
 table.querySelectorAll('tbody tr').forEach(row=>{
  if(row.classList.contains('macroGroup')){row.cells[0].colSpan=total;return;}
  const match=row.querySelector('.matchcol');const id=match.dataset.id;const p=DETAILS[id];
  const metadata=[...row.cells].slice(0,6);
  const cs=(MATCH_COLORS[id]||'').split('');
  const variant=['beanstalk','ub-rean','lands','oops','control-vegecookies'].includes(id)?'<small class="variantMark" title="Colors vary by build">x</small>':'';
  match.innerHTML=manaSymbols(cs)+'<span>'+esc(p.name)+'</span>'+variant;
  match.title='Color markers describe our matchup family; splashes vary.';
  row.replaceChildren();
  metadata.forEach((cell,i)=>{row.appendChild(cell);if(i!==1)return;
   for(const days of [7,14,30]){const td=document.createElement('td');td.className='metaPercent';
    const entry=GOLDFISH_META[id]?.[days];
    if(entry){const a=document.createElement('a');a.textContent=entry.label;a.href=entry.url;a.target='_blank';a.rel='noopener';a.title=days+' days · '+entry.detail+' · captured 2026-09-28';td.appendChild(a);}
    else{td.textContent=id==='control-vegecookies'?'alt.':'—';td.title=id==='control-vegecookies'?'Alternative UWx sideboard plan; not a separate metagame archetype.':['blue-tron','key-ring'].includes(id)?'Goldfish groups Tron variants; no verified separate share for this row.':'No separately matched entry in the captured window; not a claim of 0%.';}
    row.appendChild(td);
   }
  });
  for(const [name,cards] of [...groups,['Sideboard IN',side]])cards.forEach((card,i)=>{const td=document.createElement('td');const isIn=name==='Sideboard IN';const n=(isIn?p.ins:p.outs)[card]||0;td.dataset.card=card;td.className=(isIn?'inCell':'outCell')+(n?' nz':'')+(i===0?' groupStart':'');td.textContent=n||'';row.appendChild(td);});
 });
 document.querySelectorAll('#deck .deckrow').forEach(row=>{const cell=row.children[1];const name=cell?.textContent.trim();if(SB_COSTS[name])cell.innerHTML=manaSymbols(SB_COSTS[name])+esc(name);});
 const note=document.createElement('div');note.className='note metaSource';
 note.innerHTML='<b>Goldfish · MTGO only · '+(window.GOLDFISH_LIVE?'updated ':'snapshot ')+GOLDFISH_META_DATE+'</b> · 7 / 14 / 30 days. <b>≈</b> broader family or sum of published rounded shares; hover a percentage for its mapping. <b>—</b> no verified separate match, not 0%. <b>alt.</b> alternative plan, not additional meta share. <a href="https://www.mtggoldfish.com/metagame/legacy/full#online" target="_blank" rel="noopener">Open Goldfish ↗</a><br>Color icons describe the matchup family (x = variable colors). Card icons show printed mana cost, including hybrid mana; alternative casting costs are not shown.';
 document.getElementById('meta-method44').appendChild(note);
}
DETAILS['bg-gaak'].macro='Tempo / Aggro';
DETAILS['bg-gaak'].name='BG Hogaak / Moonshadow';
DETAILS['energy'].macro='Tempo / Aggro';
DETAILS['gb-mole'].name='Cradle Control';
DETAILS['key-ring'].name='Colorless Tron / Forge';
DETAILS['initiative'].macro='Tempo / Aggro';
upgradeMatrix();
// RC34: retain category separators, reclaim Macro column for meta trend.
function metaTrend(entry){
 const parse=x=>x && /^≈?\d+(?:\.\d+)?%$/.test(x.label)?Number(x.label.replace(/[≈%]/g,'')):null;
 const recent=parse(entry?.[7]),baseline=parse(entry?.[30]);
 if(recent===null||baseline===null)return {state:'unknown',text:'—',title:'No comparable 7-day and 30-day data.'};
 const delta=Math.round((recent-baseline)*10)/10;
 const approx=entry[7].label.startsWith('≈')||entry[30].label.startsWith('≈');
 const state=delta>0?'up':delta<0?'down':'flat';
 const arrow=delta>0?'↑':delta<0?'↓':'→';
 const value=(delta>0?'+':'')+delta.toFixed(1);
 return {state,text:arrow+' '+(approx?'≈':'')+value,title:(delta>0?'Rising':delta<0?'Falling':'Stable')+': '+value+' percentage points (7d − 30d). '+recent.toFixed(1)+'% vs '+baseline.toFixed(1)+'%.'+(approx?' Archetype-family estimate.':'')};
}
function addMetaTrend(){
 const table=document.querySelector('.matrixwrap > .transposed');
 table.querySelectorAll('.macrocol').forEach(cell=>cell.remove());
 table.querySelector('.metaGroup').colSpan=4;
 const head=document.createElement('th');head.className='trendHead';head.scope='col';head.innerHTML='Trend<small>7d − 30d</small>';
 const periods=table.tHead.rows[1].querySelectorAll('.metaPercent');periods[2].after(head);
 table.querySelectorAll('tbody tr:not(.macroGroup)').forEach(row=>{
  const id=row.querySelector('.matchcol').dataset.id;
  const trend=metaTrend(GOLDFISH_META[id]);
  const cell=document.createElement('td');cell.className='trendCell trend-'+trend.state;cell.textContent=trend.text;cell.title=trend.title;cell.setAttribute('aria-label',trend.title);
  row.querySelectorAll('.metaPercent')[2].after(cell);
 });
 const widths=[235,46,46,46,68,52,32,32,36,...Array(table.tHead.rows[1].querySelectorAll('.rotateHead').length).fill(29)];
 table.querySelectorAll('col').forEach((col,i)=>col.style.width=widths[i]+'px');
 table.style.setProperty('width',widths.reduce((a,b)=>a+b,0)+'px','important');
 const legend=document.createElement('span');legend.className='trendLegend';
 legend.textContent=' Trend: ↑ rising · ↓ falling · → stable. Percentage-point difference between the 7d and 30d snapshot windows; overlapping windows, not a prediction. ≈ family estimate; — no comparable data.';
 document.querySelector('.metaSource').appendChild(legend);
}
addMetaTrend();

// RC50: rank represented archetypes, deduplicating shared Goldfish buckets.
(function rankMetagame48(){
 const table=document.querySelector('.matrixwrap > .transposed'),body=table.tBodies[0];
 const categories=new Map();
 body.querySelectorAll('.macroGroup').forEach(row=>row.remove());
 for(const row of [...body.rows]){
  const id=row.querySelector('.matchcol')?.dataset.id,p=DETAILS[id];if(!p)continue;
  const name=p.macro==='Tempo'?'Tempo / Aggro':p.macro;
  if(!categories.has(name))categories.set(name,{name,rows:[],totals:{},sources:{}});
  const category=categories.get(name);category.rows.push({id,row});
 }
 for(const category of categories.values())for(const days of [7,14,30]){
  const seen=new Map();for(const {id} of category.rows)for(const source of GOLDFISH_META[id]?.[days]?.sources||[])seen.set(source.key,source.share);
  category.sources[days]=[...seen.keys()];category.totals[days]=Math.round([...seen.values()].reduce((a,b)=>a+b,0)*10)/10;
 }
 const share=id=>parseFloat((GOLDFISH_META[id]?.[14]?.label||'').replace('≈',''));
 const ordered=[...categories.values()].sort((a,b)=>b.totals[14]-a.totals[14]||a.name.localeCompare(b.name));
 for(const category of ordered){
  const heading=document.createElement('tr');heading.className='macroGroup';heading.dataset.category=category.name;
  heading.dataset.totals=JSON.stringify(category.totals);heading.dataset.sources=JSON.stringify(category.sources);
  const cell=document.createElement('td');cell.colSpan=table.querySelectorAll('col').length;
  cell.innerHTML='<div class="category-summary48"><span class="category-name48">'+esc(category.name)+'</span><span class="category-totals48">'+[7,14,30].map(d=>'<span'+(d===14?' class="sort-window48"':'')+'><small>'+d+'d</small> ≈'+category.totals[d].toFixed(1)+'%</span>').join('')+'</span></div>';
  cell.title='Sum of published rounded shares for unique Goldfish archetypes represented in this category. Shared matchup variants count once. Sorted by 14 days.';
  heading.append(cell);body.append(heading);
  category.rows.sort((a,b)=>(Number.isFinite(share(b.id))?share(b.id):-1)-(Number.isFinite(share(a.id))?share(a.id):-1)||DETAILS[a.id].name.localeCompare(DETAILS[b.id].name)).forEach(x=>body.append(x.row));
 }
 const note=document.createElement('p');note.className='meta-order48';
 note.textContent='MTGO · Updated '+GOLDFISH_META_DATE+' · Categories and matchups ranked by 14-day share. Category totals count each shared Goldfish archetype once; only matchups covered by this guide are included.';
 table.closest('.matrixwrap').before(note);
 const method=document.createElement('p');method.textContent='Mapping notes: UB Moonshadow and UB Legends share Dimir Tempo; Blue Tron uses Tron and Colorless Tron / Forge uses the separate Mystic Forge Combo bucket; both Reanimator plans share Reanimator. BG Hogaak uses Hogaak Moonshadow, Cradle Control uses Cradle Control, and WBR Energy uses Mardu Energy only. 8-Cast uses Affinity Stompy by guide convention, not the separate 8-Cast entry. Izzet and Stoneblade families combine their named variants; Jeskai Control combines both same-name Goldfish entries. Alternative control plans add no extra share. Category totals sum rounded published percentages, so they are approximate and do not describe the entire format. This is a manual refresh; automatic daily publishing remains pending.';
 document.querySelector('.metaSource').append(method);
})();


function setupFloatingMatrixHeader(){
 const wrap=document.querySelector('.matrixwrap');
 const table=wrap?.querySelector(':scope > table.transposed');
 const sourceHead=table?.querySelector('thead');
 const siteHeader=document.querySelector('body > header');
 if(!wrap||!table||!sourceHead)return;

 const shell=document.createElement('div');
 shell.className='floatingMatrixHead';
 shell.setAttribute('aria-hidden','true');
 const scroller=document.createElement('div');
 scroller.className='floatingMatrixHeadScroller';
 const floatingTable=document.createElement('table');
 floatingTable.className=table.className;
 floatingTable.appendChild(table.querySelector('colgroup').cloneNode(true));
 floatingTable.appendChild(sourceHead.cloneNode(true));
 scroller.appendChild(floatingTable);
 shell.appendChild(scroller);
 document.body.appendChild(shell);

 const sourceCells=[...sourceHead.querySelectorAll('th')];
 const floatingCells=[...floatingTable.querySelectorAll('th')];
 let syncing=false;
 let ticking=false;

 function stickyTop(){
  return Math.max(0,Math.round(siteHeader?.getBoundingClientRect().bottom||0));
 }

 function positionAndToggle(){
  ticking=false;
  const rect=wrap.getBoundingClientRect();
  const top=stickyTop();
  const headHeight=sourceHead.getBoundingClientRect().height;
  const visible=wrap.offsetParent!==null && rect.top<top && rect.bottom>top+headHeight+8;
  shell.style.top=`${top}px`;
  shell.style.left=`${Math.max(0,Math.round(rect.left))}px`;
  shell.style.width=`${Math.max(0,Math.round(Math.min(rect.width,window.innerWidth-Math.max(0,rect.left))))}px`;
  shell.classList.toggle('is-visible',visible);
  if(visible&&!syncing&&scroller.scrollLeft!==wrap.scrollLeft){
   syncing=true;
   scroller.scrollLeft=wrap.scrollLeft;
   requestAnimationFrame(()=>{syncing=false});
  }
 }

 function requestPosition(){
  if(ticking)return;
  ticking=true;
  requestAnimationFrame(positionAndToggle);
 }

 function measure(){
  const tableWidth=table.getBoundingClientRect().width;
  floatingTable.style.setProperty('width',`${tableWidth}px`,'important');
  sourceCells.forEach((cell,index)=>{
   const width=cell.getBoundingClientRect().width;
   const clone=floatingCells[index];
   if(!clone)return;
   clone.style.setProperty('width',`${width}px`,'important');
   clone.style.setProperty('min-width',`${width}px`,'important');
   clone.style.setProperty('max-width',`${width}px`,'important');
  });
  positionAndToggle();
 }

 wrap.addEventListener('scroll',()=>{
  if(syncing)return;
  syncing=true;
  scroller.scrollLeft=wrap.scrollLeft;
  requestAnimationFrame(()=>{syncing=false});
 },{passive:true});
 scroller.addEventListener('scroll',()=>{
  if(syncing)return;
  syncing=true;
  wrap.scrollLeft=scroller.scrollLeft;
  requestAnimationFrame(()=>{syncing=false});
 },{passive:true});
 window.addEventListener('scroll',requestPosition,{passive:true});
 window.addEventListener('resize',measure,{passive:true});
 document.addEventListener('guide:tabchange',()=>requestAnimationFrame(measure));
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(wrap);
 if(document.fonts?.ready)document.fonts.ready.then(measure);
 requestAnimationFrame(measure);
}
setupFloatingMatrixHeader();

// Guide menu (js/menu.js): four parts, each with its sections. A section shows one or more .pane
// elements; wip marks sections still being written (their panes are placeholders in index.html).
const GUIDE_GROUPS=[
 {id:'foundations',label:'Deck Foundations',icon:'cards',sections:[
  {id:'start',label:'Start Here',panes:['start']},
  {id:'origins',label:'Deck Origins',panes:['origins']},
  {id:'construction',label:'Deck Construction',panes:['construction','deck','mana']}]},
 {id:'theory',label:'Game Theory',icon:'tree',sections:[
  {id:'mulligans',label:'Mulligans',panes:['mulligans']},
  {id:'first-turns',label:'First Turns',panes:['first-turns']},
  {id:'game-plans',label:'Game Plans',panes:['game-plans']},
  {id:'natural-order',label:'Natural Order',panes:['natural-order']},
  {id:'loop',label:'Speaker Loop',panes:['loop']},
  {id:'goldfish',label:'Goldfish Lab',panes:['goldfish']}]},
 {id:'gameplay',label:'Gameplay',icon:'swords',sections:[
  {id:'sideboard',label:'Sideboard',panes:['map','heur']},
  {id:'matchups',label:'Matchups',panes:['matchups']},
  {id:'windows',label:'Interaction Windows',panes:['windows']}]},
 {id:'about',label:'About',icon:'book',sections:[
  {id:'sources',label:'Sources',panes:['sources']},
  {id:'credits',label:'Credits',panes:['credits']}]}
];
const GUIDE_SECTIONS=GUIDE_GROUPS.flatMap(g=>g.sections);
const guideMain=document.querySelector('body > main');
// Previous / next at the end of the active section.
const guidePager=document.createElement('nav');
guidePager.className='guide-pager';guidePager.setAttribute('aria-label','Previous and next section');
guideMain.append(guidePager);
function renderPager(id){
 const i=GUIDE_SECTIONS.findIndex(x=>x.id===id),prev=GUIDE_SECTIONS[i-1],next=GUIDE_SECTIONS[i+1];
 guidePager.innerHTML=(prev?`<button type="button" class="prev" data-id="${prev.id}"><small>← Previous</small><b>${esc(prev.label)}</b></button>`:'')+
  (next?`<button type="button" class="next" data-id="${next.id}"><small>Next →</small><b>${esc(next.label)}</b></button>`:'');
}
guidePager.addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)guideNav.select(b.dataset.id,true);});
// In-text links between sections: <button class="goto" data-goto="section-id">.
document.addEventListener('click',e=>{const b=e.target.closest('[data-goto]');if(b)guideNav.select(b.dataset.goto,true);});
// The URL hash names the open section (#matchups), so a section can be linked and survives a reload.
// It can also name any element inside a pane (#windows-opponent); other hashes return null.
function guideTarget(hash){
 const id=decodeURIComponent((hash||'').slice(1));
 if(!id)return null;
 if(GUIDE_SECTIONS.some(x=>x.id===id))return {section:id};
 const pane=document.getElementById(id)?.closest('.pane');
 const s=pane&&GUIDE_SECTIONS.find(x=>x.panes.includes(pane.id));
 return s?{section:s.id,el:document.getElementById(id)}:null;
}
// Writes the open section to the hash unless the hash already points inside it (no history entry).
function syncGuideHash(id){
 if(guideTarget(location.hash)?.section!==id)history.replaceState(null,'','#'+id);
}
function showSection(id,index,fromUser){
 const s=GUIDE_SECTIONS.find(x=>x.id===id);
 document.querySelectorAll('.pane').forEach(x=>x.classList.toggle('active',s.panes.includes(x.id)));
 renderPager(id);
 if(!document.body.classList.contains('guide-home'))syncGuideHash(id);
 // A section chosen further down the page starts from its top.
 if(fromUser){const top=guideMain.getBoundingClientRect().top+scrollY-8;if(scrollY>top)scrollTo({top});}
 document.dispatchEvent(new CustomEvent('guide:tabchange',{detail:{id}}));
}
const guideNav=SpeakerNav.create(document.getElementById('guide-nav'),{
 groups:GUIDE_GROUPS.map(g=>({...g,sections:g.sections.map(s=>({...s,controls:s.panes.join(' ')}))})),
 active:guideTarget(location.hash)?.section||'start',onChange:showSection
});
showSection(guideNav.active);
GUIDE_SECTIONS.forEach(s=>s.panes.forEach(id=>{const pane=document.getElementById(id);pane.setAttribute('role','tabpanel');pane.setAttribute('aria-labelledby',guideNav.tabFor(s.id).id);}));
// Takes a section id, or the id of a pane inside one (in-page links); a pane id also scrolls to that pane.
function showGuideTab(id){
 const s=GUIDE_SECTIONS.find(x=>x.id===id)||GUIDE_SECTIONS.find(x=>x.panes.includes(id));
 if(!s)return;
 guideNav.select(s.id);
 if(s.id!==id)document.getElementById(id).scrollIntoView({block:'start'});
}

function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function listMap(obj){
 const entries=Object.entries(obj||{});
 return entries.length ? entries.map(([k,v])=>`<span class="chip">${v}× ${CARD_COSTS[k]?manaSymbols(CARD_COSTS[k]):''}${esc(k)}</span>`).join('') : '<span class="muted">None / TBC</span>';
}
// Their most common sideboard cards on MTGO, from the nightly refresh (js/meta-live.js).
function liveSideboard(id){
 const live=window.GOLDFISH_LIVE;if(!live||!live.sideboards)return '';
 const slugs=[...new Set((GOLDFISH_META[id]?.['14']?.sources||[]).map(s=>s.url.replace(/.*archetype\//,'').replace(/#.*/,'')))];
 const blocks=slugs.map(slug=>{const cards=live.sideboards[slug];if(!cards||!cards.length)return '';
  const name=live.windows?.['14']?.[slug]?.name||slug;
  return `<div class="chips">${cards.slice(0,8).map(c=>`<span class="chip" title="${esc(c.avg)} copies on average">${esc(c.card)} · ${Math.round(c.pct)}%</span>`).join('')}</div>`+(slugs.length>1?`<p style="font-size:12px;color:var(--muted)">${esc(name)}</p>`:'');}).join('');
 return blocks?`<div class="warnbox livebox"><b>Their sideboard on MTGO · updated ${esc(live.updatedLabel)}</b>${blocks}<p style="font-size:12px;color:var(--muted)">Share of their published MTGO 75s that run each card (MTGGoldfish). It shows what they register, not what they side in against Elves.</p></div>`:'';
}
function openMatch(id){
 const p=DETAILS[id]; if(!p)return;
 const sweep=(p.sweep||[]).map(x=>`<span class="chip">${esc(x)}</span>`).join('');
 const opp=(p.opp||[]).map(x=>`<span class="chip">${esc(x)}</span>`).join('');
 document.getElementById('drawerBody').innerHTML=`
  <h2 class="drawertitle">${esc(p.name)}</h2>
  <div class="drawerMeta"><span class="macroTag">${esc(p.macro||'')}</span> · <span class="rolepill ${p.role.toLowerCase()}">${esc(p.role)}</span> · ${p.inCount} IN / ${p.outCount} OUT · ${esc(p.over)} · Wasteland: <b class="waste${esc((p.wasteland||'MIXED')==='MIXED'?'MIX':(p.wasteland||'MIXED'))}">${esc((p.wasteland||'MIXED')==='MIXED'?'MIX':(p.wasteland||'MIXED'))}</b></div>
  ${p.tags?.length?`<div class="chips">${p.tags.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div>`:''}
  <div class="planmini"><div><h4>IN</h4><div class="chips">${listMap(p.ins)}</div></div><div><h4>OUT</h4><div class="chips">${listMap(p.outs)}</div></div></div>
  <div class="warnbox"><b>Opponent likely post-board</b><div class="chips">${opp}</div><p style="font-size:12px;color:var(--muted)">Inherited matchup reference; not reverified in RC39</p></div>
  ${liveSideboard(id)}
  ${p.sweep?.length?`<div class="sweepbox"><b>⚠ Sweeper / mass-removal warning</b><div class="chips">${sweep}</div></div>`:''}
  <p><b>Caller of the Claw relevance:</b> <span class="caller ${esc(p.caller)}">${esc(p.caller)}</span></p>
  <h4>Plan notes</h4><p>${esc(p.notes)}</p>
  ${p.src?`<p><a href="${p.src}" target="_blank" rel="noopener">Open MyMTGO source ↗</a></p>`:'<p class="muted">Exact source still TBC before final deployment.</p>'}
 `;
 document.getElementById('drawer').classList.add('open');
 document.getElementById('backdrop').classList.add('open');
}
function closeMatch(){document.getElementById('drawer').classList.remove('open');document.getElementById('backdrop').classList.remove('open')}
document.getElementById('closeDrawer').onclick=closeMatch;
document.getElementById('backdrop').onclick=closeMatch;
document.querySelectorAll('[data-id]').forEach(el=>el.addEventListener('click',()=>openMatch(el.dataset.id)));

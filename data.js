// GemStone IV Character Trainer - Game Data

const GS4Data = {
    races: [
        { id: 0, name: 'Select Race' },
        { id: 1, name: 'Human', hp: 6, maxHP: 150, baseWeight: 93, weightMult: 0.9, str: 5, con: 0, dex: 0, agl: 0, dis: 0, aur: 0, log: 0, int: 0, wis: 0, inf: 0 },
        { id: 2, name: 'Giantman', hp: 7, maxHP: 200, baseWeight: 123, weightMult: 1.1875, str: 15, con: 10, dex: -5, agl: -5, dis: 0, aur: 0, log: 0, int: -5, wis: 0, inf: 0 },
        { id: 3, name: 'Half-Elf', hp: 5, maxHP: 135, baseWeight: 86, weightMult: 0.8, str: 0, con: 0, dex: 5, agl: 5, dis: 0, aur: 5, log: 0, int: 0, wis: 5, inf: 0 },
        { id: 4, name: 'Dark Elf', hp: 5, maxHP: 120, baseWeight: 81.5, weightMult: 0.7625, str: 0, con: -5, dex: 10, agl: 10, dis: 10, aur: 10, log: 0, int: 5, wis: 0, inf: 0 },
        { id: 5, name: 'Sylvan', hp: 5, maxHP: 130, baseWeight: 75.5, weightMult: 0.71, str: 0, con: -5, dex: 5, agl: 10, dis: 5, aur: 5, log: 0, int: 5, wis: 0, inf: 0 },
        { id: 6, name: 'Elf', hp: 5, maxHP: 130, baseWeight: 73.5, weightMult: 0.68, str: -5, con: -10, dex: 10, agl: 10, dis: 5, aur: 10, log: 0, int: 0, wis: 5, inf: 5 },
        { id: 7, name: 'Dwarf', hp: 6, maxHP: 140, baseWeight: 81.5, weightMult: 0.7625, str: 10, con: 15, dex: 0, agl: -5, dis: 10, aur: 0, log: 5, int: 0, wis: 5, inf: -15 },
        { id: 8, name: 'Halfling', hp: 4, maxHP: 100, baseWeight: 47, weightMult: 0.45, str: -15, con: 5, dex: 10, agl: 15, dis: 10, aur: 5, log: 0, int: 10, wis: 0, inf: 0 },
        { id: 9, name: 'Aelotoi', hp: 5, maxHP: 120, baseWeight: 71, weightMult: 0.6625, str: -5, con: 0, dex: 5, agl: 10, dis: 5, aur: 5, log: 0, int: 0, wis: 5, inf: 0 },
        { id: 10, name: 'Burghal Gnome', hp: 4, maxHP: 90, baseWeight: 43, weightMult: 0.3875, str: -15, con: 0, dex: 10, agl: 15, dis: 5, aur: 10, log: 10, int: 0, wis: 0, inf: 0 },
        { id: 11, name: 'Forest Gnome', hp: 4, maxHP: 100, baseWeight: 51.5, weightMult: 0.4625, str: -10, con: 5, dex: 5, agl: 10, dis: 5, aur: 10, log: 5, int: 0, wis: 5, inf: 0 },
        { id: 12, name: 'Half Krolvin', hp: 6, maxHP: 165, baseWeight: 103, weightMult: 1.0, str: 10, con: 10, dex: 0, agl: 0, dis: 0, aur: 0, log: 0, int: 0, wis: 0, inf: -10 },
        { id: 13, name: 'Erithian', hp: 5, maxHP: 120, baseWeight: 75.5, weightMult: 0.71, str: -5, con: 0, dex: 0, agl: 5, dis: 5, aur: 5, log: 10, int: 0, wis: 5, inf: 0 }
    ],

    classes: [
        { id: 0, name: 'Select Class', type: 'none' },
        { id: 1, name: 'Warrior', type: 'square' },
        { id: 2, name: 'Rogue', type: 'square' },
        { id: 3, name: 'Wizard', type: 'pure' },
        { id: 4, name: 'Cleric', type: 'semi' },
        { id: 5, name: 'Empath', type: 'pure' },
        { id: 6, name: 'Sorcerer', type: 'pure' },
        { id: 7, name: 'Ranger', type: 'semi' },
        { id: 8, name: 'Bard', type: 'semi' },
        { id: 9, name: 'Monk', type: 'square' },
        { id: 10, name: 'Paladin', type: 'semi' }
    ],

    skills: [
        { id: 0, name: 'Armor Use', square: 10, semi: 12, pure: 20 },
        { id: 1, name: 'Shield Use', square: 8, semi: 10, pure: 15 },
        { id: 2, name: 'Edged Weapons', square: 2, semi: 4, pure: 8 },
        { id: 3, name: 'Blunt Weapons', square: 3, semi: 5, pure: 10 },
        { id: 4, name: 'Two-Handed Weapons', square: 5, semi: 7, pure: 14 },
        { id: 5, name: 'Ranged Weapons', square: 4, semi: 6, pure: 12 },
        { id: 6, name: 'Thrown Weapons', square: 2, semi: 4, pure: 8 },
        { id: 7, name: 'Polearm Weapons', square: 4, semi: 6, pure: 12 },
        { id: 8, name: 'Brawling', square: 2, semi: 4, pure: 8 },
        { id: 9, name: 'Ambush', square: 4, semi: 6, pure: 12 },
        { id: 10, name: 'Multi Opponent Combat', square: 7, semi: 10, pure: 20 },
        { id: 11, name: 'Combat Maneuvers', square: 5, semi: 7, pure: 14 },
        { id: 12, name: 'Edged Weapons Tricks', square: 3, semi: 5, pure: 10 },
        { id: 13, name: 'Blunt Weapons Tricks', square: 3, semi: 5, pure: 10 },
        { id: 14, name: 'Two-Weapon Combat', square: 10, semi: 15, pure: 30 },
        { id: 15, name: 'Physical Fitness', square: 3, semi: 6, pure: 12 },
        { id: 16, name: 'Dodging', square: 6, semi: 8, pure: 10 },
        { id: 17, name: 'Arcane Symbols', square: 0, semi: 6, pure: 3 },
        { id: 18, name: 'Magic Item Use', square: 0, semi: 4, pure: 2 },
        { id: 19, name: 'Spell Aiming', square: 0, semi: 4, pure: 2 },
        { id: 20, name: 'Harness Power', square: 0, semi: 6, pure: 3 },
        { id: 21, name: 'Elemental Mana Control', square: 0, semi: 8, pure: 4 },
        { id: 22, name: 'Mental Mana Control', square: 0, semi: 8, pure: 4 },
        { id: 23, name: 'Spirit Mana Control', square: 0, semi: 8, pure: 4 },
        { id: 24, name: 'Sorcerous Lore', square: 0, semi: 12, pure: 6 },
        { id: 25, name: 'Elemental Lore', square: 0, semi: 12, pure: 6 },
        { id: 26, name: 'Spiritual Lore', square: 0, semi: 12, pure: 6 },
        { id: 27, name: 'Mental Lore', square: 0, semi: 12, pure: 6 }
    ],

    // Growth intervals for stat growth calculations
    statGrowthIntervals: {
        // [class][race] = interval value
        str: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,3,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,3,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,5,5,5,5,5,5,5,5,5,5,5,5]],
        con: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [3,3,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [3,3,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,5,5,5,5,5,5,5,5,5,5,5,5]],
        dex: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [3,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,4,4,4,4,4,4,4,4,4,4,4,4]],
        agl: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [3,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5]],
        dis: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [3,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5]],
        aur: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5]],
        log: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5]],
        int: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5]],
        wis: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4]],
        inf: [[0,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [4,4,4,4,4,4,4,4,4,4,4,4,4,4], [5,5,5,5,5,5,5,5,5,5,5,5,5,5], [5,5,5,5,5,5,5,5,5,5,5,5,5,5]]
    },

    cmans: [
        { name: 'Armor Spike Focus', mnemonic: 'spikefocus', costs: [0,0,0,0,0] },
        { name: 'Bearhug', mnemonic: 'bearhug', costs: [2,4,6,8,10] },
        { name: 'Berserk', mnemonic: 'berserk', costs: [0,0,0,0,0] },
        { name: 'Block Mastery', mnemonic: 'bmastery', costs: [0,0,0,0,0] },
        { name: 'Bull Rush', mnemonic: 'bullrush', costs: [0,0,0,0,0] },
        { name: 'Burst of Swiftness', mnemonic: 'burst', costs: [2,4,6,8,10] },
        { name: 'Charge', mnemonic: 'charge', costs: [2,4,6,8,10] },
        { name: 'Disarm Weapon', mnemonic: 'disarm', costs: [2,4,6,8,10] },
        { name: 'Feint', mnemonic: 'feint', costs: [2,4,6,8,10] },
        { name: 'Garrote', mnemonic: 'garrote', costs: [2,4,6,8,10] },
        { name: 'Hamstring', mnemonic: 'hamstring', costs: [2,4,6,8,10] },
        { name: 'Kick', mnemonic: 'kick', costs: [1,2,3,4,5] },
        { name: 'Precision', mnemonic: 'precision', costs: [2,4,6,8,10] },
        { name: 'Rolling Krynch Strike', mnemonic: 'krynch', costs: [2,4,6,8,10] },
        { name: 'Side by Side Strike', mnemonic: 'sidebyside', costs: [2,4,6,8,10] },
        { name: 'Stance Perfection', mnemonic: 'stanceperfection', costs: [2,4,6,8,10] },
        { name: 'Surge of Strength', mnemonic: 'surge', costs: [2,4,6,8,10] },
        { name: 'Sweep', mnemonic: 'sweep', costs: [2,4,6,8,10] },
        { name: 'Trip', mnemonic: 'trip', costs: [1,2,3,4,5] },
        { name: 'Weapon Bonding', mnemonic: 'bonding', costs: [2,4,6,8,10] }
    ],

    shields: [
        { name: 'Small Shield Focus', mnemonic: 'sfocus', costs: [0,0,0,0,0] },
        { name: 'Medium Shield Focus', mnemonic: 'mfocus', costs: [0,0,0,0,0] },
        { name: 'Large Shield Focus', mnemonic: 'lfocus', costs: [0,0,0,0,0] },
        { name: 'Tower Shield Focus', mnemonic: 'tfocus', costs: [0,0,0,0,0] },
        { name: 'Shield Bash', mnemonic: 'bash', costs: [2,4,6,8,10] },
        { name: 'Shield Charge', mnemonic: 'charge', costs: [2,4,6,8,10] },
        { name: 'Shield Forward', mnemonic: 'forward', costs: [2,4,6,8,10] },
        { name: 'Shield Pin', mnemonic: 'pin', costs: [2,4,6,8,10] },
        { name: 'Shield Riposte', mnemonic: 'riposte', costs: [2,4,6,8,10] },
        { name: 'Shield Spike Mastery', mnemonic: 'spikemastery', costs: [2,4,6,8,10] },
        { name: 'Shield Strike', mnemonic: 'strike', costs: [1,2,3,4,5] },
        { name: 'Shield Swiftness', mnemonic: 'swiftness', costs: [2,4,6,8,10] },
        { name: 'Shield Throw', mnemonic: 'throw', costs: [2,4,6,8,10] },
        { name: 'Shield Trample', mnemonic: 'trample', costs: [2,4,6,8,10] }
    ],

    spellCircles: {
        minorSpirit: { id: 1, name: 'Minor Spirit', spells: 25 },
        majorSpirit: { id: 2, name: 'Major Spirit', spells: 50 },
        cleric: { id: 3, name: 'Cleric', spells: 50 },
        minorElemental: { id: 4, name: 'Minor Elemental', spells: 30 },
        majorElemental: { id: 5, name: 'Major Elemental', spells: 50 },
        wizard: { id: 6, name: 'Wizard', spells: 50 },
        sorcerer: { id: 7, name: 'Sorcerer', spells: 50 },
        ranger: { id: 8, name: 'Ranger', spells: 30 },
        paladin: { id: 9, name: 'Paladin', spells: 30 },
        empath: { id: 10, name: 'Empath', spells: 50 },
        bard: { id: 11, name: 'Bard', spells: 50 },
        minorMental: { id: 12, name: 'Minor Mental', spells: 30 }
    },

    stances: [
        { id: 'offensive', name: 'Offensive', asModifier: -15, dsModifier: -20 },
        { id: 'advance', name: 'Advance', asModifier: -12, dsModifier: -15 },
        { id: 'forward', name: 'Forward', asModifier: -9, dsModifier: -10 },
        { id: 'neutral', name: 'Neutral', asModifier: -6, dsModifier: -5 },
        { id: 'guarded', name: 'Guarded', asModifier: -3, dsModifier: 5 },
        { id: 'defensive', name: 'Defensive', asModifier: 0, dsModifier: 10 }
    ],

    shieldTypes: [
        { id: 0, name: 'None', bonus: 0, penalty: -100 },
        { id: 1, name: 'Small', bonus: 15, penalty: -15 },
        { id: 2, name: 'Medium', bonus: 25, penalty: 0 },
        { id: 3, name: 'Large', bonus: 35, penalty: 15 },
        { id: 4, name: 'Tower', bonus: 45, penalty: 30 }
    ]
};

// Make data globally available
window.GS4Data = GS4Data;

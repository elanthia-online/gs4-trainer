// GemStone IV Character Trainer - Calculation Engine

const GS4Calculations = {
    // Calculate stat growth across 200 levels
    calculateStatGrowth(initialStat, classId, raceId, statName) {
        const growthArray = [];
        let currentValue = initialStat;
        
        // Get growth interval from data
        const growthIntervals = GS4Data.statGrowthIntervals[statName];
        if (!growthIntervals || !growthIntervals[classId]) {
            // Default growth interval
            for (let level = 0; level <= 200; level++) {
                growthArray[level] = currentValue;
            }
            return growthArray;
        }
        
        let growthInterval = growthIntervals[classId][raceId];
        if (growthInterval === 0) growthInterval = 0.1; // Prevent division by zero
        if (growthInterval < 0) growthInterval = -growthInterval; // Handle approximations
        
        // Calculate growth for each level
        for (let level = 0; level <= 200; level++) {
            growthArray[level] = currentValue;
            
            // Calculate growth rate
            let growthRate = Math.floor(currentValue / growthInterval);
            if (growthRate < 1) growthRate = 1;
            
            // Stats grow when level mod growthRate = 0 and currentValue < 100
            if (currentValue < 100 && level > 0 && level % growthRate === 0) {
                currentValue++;
            }
        }
        
        return growthArray;
    },

    // Validate training plan against maximum training allowed
    checkTrainingPlan(trainingData, classId) {
        const errors = [];
        const classType = GS4Data.classes[classId]?.type || 'none';
        
        for (let skillId = 0; skillId < GS4Data.skills.length; skillId++) {
            const skill = GS4Data.skills[skillId];
            const maxTraining = skill[classType] || 0;
            
            for (let level = 1; level <= 200; level++) {
                const training = trainingData[skillId]?.[level] || 0;
                if (training > maxTraining) {
                    errors.push({
                        skill: skill.name,
                        level: level,
                        current: training,
                        max: maxTraining
                    });
                }
            }
        }
        
        return errors;
    },

    // Calculate training points per level
    calculateTrainingPoints(classId, level) {
        const classType = GS4Data.classes[classId]?.type;
        
        // Base training points vary by class type
        let baseTP = 0;
        switch(classType) {
            case 'square': baseTP = 50; break;
            case 'semi': baseTP = 40; break;
            case 'pure': baseTP = 30; break;
            default: baseTP = 0;
        }
        
        // Additional TP for higher levels
        if (level > 100) {
            baseTP += Math.floor((level - 100) / 10) * 2;
        }
        
        return baseTP;
    },

    // Calculate Attack Strength (AS)
    calculateAS(weaponSkillRanks, weaponBonus, stance, level) {
        const stanceData = GS4Data.stances.find(s => s.id === stance);
        const stanceModifier = stanceData ? stanceData.asModifier : 0;
        
        // Base AS from skill ranks (1 rank = 1 AS per 2 ranks approximately)
        const skillAS = Math.floor(weaponSkillRanks / 2);
        
        // Level bonus (small bonus per level)
        const levelBonus = Math.floor(level / 5);
        
        const totalAS = skillAS + weaponBonus + stanceModifier + levelBonus;
        
        return {
            total: totalAS,
            breakdown: {
                skill: skillAS,
                weapon: weaponBonus,
                stance: stanceModifier,
                level: levelBonus
            }
        };
    },

    // Calculate Defense (DS)
    calculateDS(shieldRanks, dodgeRanks, shieldType, stance, level) {
        const stanceData = GS4Data.stances.find(s => s.id === stance);
        const stanceModifier = stanceData ? stanceData.dsModifier : 0;
        
        const shieldData = GS4Data.shieldTypes[shieldType] || GS4Data.shieldTypes[0];
        
        // Shield DS (1 rank = 1 DS per rank)
        const shieldDS = shieldRanks + shieldData.bonus;
        
        // Dodge DS (1 rank = 1 DS per rank)
        const dodgeDS = dodgeRanks;
        
        // Level bonus
        const levelBonus = Math.floor(level / 5);
        
        const totalDS = shieldDS + dodgeDS + stanceModifier + levelBonus;
        
        return {
            total: totalDS,
            breakdown: {
                shield: shieldDS,
                dodge: dodgeDS,
                stance: stanceModifier,
                level: levelBonus
            }
        };
    },

    // Calculate Runestaff Defense
    calculateRunestaffDefense(magicRanks, parryRanks, dodgeRanks, staffBonus, stance, level) {
        const stanceData = GS4Data.stances.find(s => s.id === stance);
        const stanceModifier = stanceData ? stanceData.dsModifier : 0;
        
        // Runestaff parry bonus
        const parryDS = Math.floor(parryRanks / 2);
        
        // Magic ranks bonus
        const magicDS = Math.floor(magicRanks / 3);
        
        // Dodge DS
        const dodgeDS = dodgeRanks;
        
        // Level bonus
        const levelBonus = Math.floor(level / 5);
        
        const totalDS = parryDS + magicDS + dodgeDS + staffBonus + stanceModifier + levelBonus;
        
        return {
            total: totalDS,
            breakdown: {
                parry: parryDS,
                magic: magicDS,
                dodge: dodgeDS,
                staff: staffBonus,
                stance: stanceModifier,
                level: levelBonus
            }
        };
    },

    // Calculate Round Time
    calculateRoundTime(armorWeight, otherWeight, weaponSpeed, haste, celerity) {
        let baseRT = weaponSpeed;
        
        // Armor penalty (heavier armor = slower)
        const armorPenalty = Math.floor(armorWeight / 10) * 0.1;
        
        // Encumbrance penalty
        const totalWeight = armorWeight + otherWeight;
        const encumbrancePenalty = Math.floor(totalWeight / 50) * 0.1;
        
        // Spell bonuses
        const hasteMod = haste ? -0.5 : 0;
        const celerityMod = celerity ? -1.0 : 0;
        
        const totalRT = baseRT + armorPenalty + encumbrancePenalty + hasteMod + celerityMod;
        
        return {
            total: Math.max(totalRT, 1), // Minimum 1 second RT
            breakdown: {
                base: baseRT,
                armor: armorPenalty,
                encumbrance: encumbrancePenalty,
                haste: hasteMod,
                celerity: celerityMod
            }
        };
    },

    // Calculate Ambush success rates
    calculateAmbush(targetLevel, yourLevel, ambushRanks, hidingRanks) {
        const levelDiff = yourLevel - targetLevel;
        
        // Base hit chance from ambush ranks
        const ambushBonus = ambushRanks * 2;
        
        // Hiding bonus
        const hidingBonus = Math.floor(hidingRanks / 2);
        
        // Level difference modifier
        const levelMod = levelDiff * 3;
        
        // Calculate melee and hidden ambush percentages
        const meleeHit = Math.max(0, Math.min(100, 50 + ambushBonus + levelMod));
        const hiddenHit = Math.max(0, Math.min(100, 30 + ambushBonus + hidingBonus + levelMod));
        
        // Critical adder when hidden
        const critAdder = Math.floor(hidingRanks / 10);
        
        return {
            meleeHit: meleeHit.toFixed(1),
            hiddenHit: hiddenHit.toFixed(1),
            critAdder: critAdder,
            breakdown: {
                ambushBonus: ambushBonus,
                hidingBonus: hidingBonus,
                levelMod: levelMod
            }
        };
    },

    // Calculate Lockpicking difficulty
    calculateLockpicking(targetLevel, material, loreBonus) {
        const baseDifficulty = targetLevel * 5;
        
        // Material modifiers
        const materialMods = {
            'glaes': -32,
            'golvern': -46,
            'vaalin': -50
        };
        
        const materialMod = materialMods[material] || 0;
        
        // Lore bonuses
        const loreMods = {
            'none': 0,
            'other': 5,
            'self': 10
        };
        
        const loreMod = loreMods[loreBonus] || 0;
        
        const totalDifficulty = baseDifficulty + materialMod + loreMod;
        
        return {
            difficulty: totalDifficulty,
            breakdown: {
                base: baseDifficulty,
                material: materialMod,
                lore: loreMod
            }
        };
    },

    // Calculate Experience capacity and absorption
    calculateExperience(fieldExp, targetLevel, critterLevel, xp) {
        // Experience capacity increases with level
        const capacity = 800 + (targetLevel * 2);
        
        // Calculate saturation percentage
        const saturation = (xp / capacity) * 100;
        
        // Absorption rates based on saturation
        let absorption;
        if (saturation >= 100) {
            absorption = { rate: 29, status: 'Saturated' };
        } else if (saturation >= 90) {
            absorption = { rate: 27, status: 'Must Rest' };
        } else if (saturation >= 80) {
            absorption = { rate: 26, status: 'Numb' };
        } else if (saturation >= 70) {
            absorption = { rate: 25, status: 'Very Muddled' };
        } else if (saturation >= 60) {
            absorption = { rate: 23, status: 'Muddled' };
        } else {
            absorption = { rate: 20 + Math.floor((60 - saturation) / 10), status: 'Clear' };
        }
        
        // Calculate XP gain from critter
        const levelDiff = critterLevel - targetLevel;
        let xpGain = fieldExp;
        
        if (levelDiff < -5) {
            xpGain = Math.floor(xpGain * 0.5); // Too low level
        } else if (levelDiff > 10) {
            xpGain = Math.floor(xpGain * 1.5); // High level critter bonus
        }
        
        return {
            capacity: capacity,
            saturation: saturation.toFixed(1),
            absorption: absorption,
            xpGain: xpGain,
            pulses: Math.floor(xpGain / absorption.rate)
        };
    },

    // Calculate Casting Strength (CS) and Target Defense (TD)
    calculateMagic(targetLevel, spellCircle, spellTrainings) {
        // Base CS from spell trainings
        const baseCS = spellTrainings * 3;
        
        // Level difference modifier
        const levelMod = 10; // Assumes same level for simplicity
        
        // Circle-specific bonuses
        const circleBonuses = {
            'minor-mental': 10,
            'minor-spirit': 10,
            'major-spirit': 15
        };
        
        const circleBonus = circleBonuses[spellCircle] || 0;
        
        const totalCS = baseCS + levelMod + circleBonus;
        
        // TD is typically lower than CS for offensive magic
        const baseTD = Math.floor(targetLevel * 1.5);
        
        return {
            cs: totalCS,
            td: baseTD,
            difference: totalCS - baseTD,
            breakdown: {
                trainings: baseCS,
                level: levelMod,
                circle: circleBonus
            }
        };
    },

    // Calculate total training cost for a skill at a given level
    calculateTrainingCost(skillId, ranks, classId) {
        const skill = GS4Data.skills[skillId];
        const classType = GS4Data.classes[classId]?.type || 'none';
        const costPerRank = skill[classType] || 0;
        
        return ranks * costPerRank;
    },

    // Calculate total points spent across all skills at a level
    calculateTotalPointsSpent(trainingData, level, classId) {
        let total = 0;
        
        for (let skillId = 0; skillId < GS4Data.skills.length; skillId++) {
            const ranks = trainingData[skillId]?.[level] || 0;
            total += this.calculateTrainingCost(skillId, ranks, classId);
        }
        
        return total;
    },

    // Validate stats total to 660 and minimum 20 each
    validateStats(stats) {
        const errors = [];
        let total = 0;
        
        const statNames = ['str', 'con', 'dex', 'agl', 'dis', 'aur', 'log', 'int', 'wis', 'inf'];
        
        for (const statName of statNames) {
            const value = stats[statName] || 0;
            total += value;
            
            if (value < 20) {
                errors.push(`${statName.toUpperCase()} must be at least 20`);
            }
            if (value > 100) {
                errors.push(`${statName.toUpperCase()} cannot exceed 100`);
            }
        }
        
        if (total !== 660) {
            errors.push(`Total stats must equal 660 (currently ${total})`);
        }
        
        return {
            valid: errors.length === 0,
            errors: errors,
            total: total
        };
    },

    // Calculate HP based on race and CON
    calculateHP(raceId, constitution, level) {
        const race = GS4Data.races[raceId];
        if (!race) return 0;
        
        const baseHP = race.hp;
        const conBonus = Math.floor((constitution - 50) / 5);
        const hpPerLevel = baseHP + conBonus;
        
        return level * hpPerLevel;
    }
};

// Make calculations globally available
window.GS4Calculations = GS4Calculations;

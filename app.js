// GemStone IV Character Trainer - Main Application

class GS4Trainer {
    constructor() {
        this.character = this.getDefaultCharacter();
        this.init();
    }

    getDefaultCharacter() {
        return {
            name: 'Enter Character Name Here',
            classId: 0,
            raceId: 0,
            currentLevel: 10,
            targetLevel: 10,
            experience: 115000,
            stats: {
                str: 0, con: 0, dex: 0, agl: 0, dis: 0,
                aur: 0, log: 0, int: 0, wis: 0, inf: 0
            },
            statGrowth: {},
            training: {},
            cmans: {},
            shields: {},
            spells: {}
        };
    }

    init() {
        this.setupEventListeners();
        this.loadCharacter();
        this.render();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Character info
        document.getElementById('char-name').addEventListener('change', (e) => {
            this.character.name = e.target.value;
            this.saveCharacter();
        });

        document.getElementById('class-select').addEventListener('change', (e) => {
            this.character.classId = parseInt(e.target.value);
            this.onClassChange();
            this.updateAllCalculators();
            this.saveCharacter();
        });

        document.getElementById('race-select').addEventListener('change', (e) => {
            this.character.raceId = parseInt(e.target.value);
            this.updateAllCalculators();
            this.saveCharacter();
        });

        document.getElementById('current-level').addEventListener('change', (e) => {
            this.character.currentLevel = parseInt(e.target.value);
            
            // Auto-update experience based on level
            const newExp = GS4Data.experienceByLevel(this.character.currentLevel);
            this.character.experience = newExp;
            document.getElementById('experience').value = newExp;
            
            this.updateStatGrowthDisplay();
            this.updateAllCalculators();
            this.saveCharacter();
        });

        document.getElementById('target-level').addEventListener('change', (e) => {
            this.character.targetLevel = parseInt(e.target.value);
            this.renderTrainingGrid();
            this.updateAllCalculators();
            this.saveCharacter();
        });

        document.getElementById('experience').addEventListener('change', (e) => {
            this.character.experience = parseInt(e.target.value);
            this.saveCharacter();
        });

        // Stats
        document.querySelectorAll('.stat-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const stat = e.target.dataset.stat;
                this.character.stats[stat] = parseInt(e.target.value) || 0;
                this.validateAndUpdateStats();
                this.saveCharacter();
            });
        });

        // Buttons
        document.getElementById('calc-stats-btn').addEventListener('click', () => this.calculateStatGrowth());
        document.getElementById('check-plan-btn').addEventListener('click', () => this.checkTrainingPlan());
        document.getElementById('update-range-btn').addEventListener('click', () => this.renderTrainingGrid());
        
        // Training points level selector
        document.getElementById('training-points-level')?.addEventListener('change', (e) => {
            this.updateTrainingPointsDisplay(parseInt(e.target.value) || 1);
        });
        
        document.getElementById('save-btn').addEventListener('click', () => this.saveCharacter());
        document.getElementById('load-btn').addEventListener('click', () => this.promptLoadCharacter());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetCharacter());
        document.getElementById('export-btn').addEventListener('click', () => this.exportJSON());
        document.getElementById('import-btn').addEventListener('click', () => this.importJSON());

        // Calculator buttons
        document.getElementById('calc-rt-btn')?.addEventListener('click', () => this.calculateRoundTime());
        document.getElementById('calc-ambush-btn')?.addEventListener('click', () => this.calculateAmbush());
        document.getElementById('calc-lock-btn')?.addEventListener('click', () => this.calculateLockpicking());
        document.getElementById('calc-as-btn')?.addEventListener('click', () => this.calculateAS());
        document.getElementById('calc-ds-btn')?.addEventListener('click', () => this.calculateDS());
        document.getElementById('calc-rs-btn')?.addEventListener('click', () => this.calculateRunestaff());
        document.getElementById('calc-exp-btn')?.addEventListener('click', () => this.calculateExperience());
        document.getElementById('calc-magic-btn')?.addEventListener('click', () => this.calculateMagic());
        document.getElementById('report-spell-btn')?.addEventListener('click', () => this.reportSpellTraining());
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Auto-populate calculator fields when switching tabs
        this.autoPopulateCalculator(tabName);
    }

    autoPopulateCalculator(tabName) {
        const level = this.character.currentLevel || 10;
        
        // Auto-populate common fields
        switch(tabName) {
            case 'roundtime':
            case 'ambush':
            case 'lockpicking':
            case 'attack':
            case 'defense':
            case 'runestaff':
            case 'experience':
            case 'magic':
                // Set target level to current level if still default
                const targetLevelMap = {
                    'roundtime': 'rt-target-level',
                    'ambush': 'ambush-target-level',
                    'lockpicking': 'lock-target-level',
                    'attack': 'as-target-level',
                    'defense': 'ds-target-level',
                    'runestaff': 'rs-target-level',
                    'experience': 'exp-target-level',
                    'magic': 'magic-target-level'
                };
                
                const fieldId = targetLevelMap[tabName];
                if (fieldId) {
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.value = level;
                    }
                }
                
                // For ambush, also set your level
                if (tabName === 'ambush') {
                    const yourLevelField = document.getElementById('ambush-your-level');
                    if (yourLevelField) {
                        yourLevelField.value = level;
                    }
                }
                break;
        }
    }

    validateAndUpdateStats() {
        const validation = GS4Calculations.validateStats(this.character.stats);
        
        document.getElementById('stats-total').textContent = `Total: ${validation.total}`;
        document.getElementById('stats-error').textContent = validation.errors.join('; ');
        
        return validation.valid;
    }

    calculateStatGrowth() {
        if (this.character.classId === 0 || this.character.raceId === 0) {
            alert('Please select a class and race first.');
            return;
        }

        const statNames = ['str', 'con', 'dex', 'agl', 'dis', 'aur', 'log', 'int', 'wis', 'inf'];
        
        for (const statName of statNames) {
            const initialValue = this.character.stats[statName];
            const growth = GS4Calculations.calculateStatGrowth(
                initialValue,
                this.character.classId,
                this.character.raceId,
                statName
            );
            
            this.character.statGrowth[statName] = growth;
        }

        this.updateStatGrowthDisplay();
        this.saveCharacter();
        alert('Stat growth calculated successfully!');
    }

    checkTrainingPlan() {
        const errors = GS4Calculations.checkTrainingPlan(this.character.training, this.character.classId);
        
        if (errors.length === 0) {
            alert('✓ Your training plan is legal!');
        } else {
            const errorMsg = errors.map(e => 
                `${e.skill} at level ${e.level}: ${e.current} ranks (max ${e.max})`
            ).join('\n');
            alert(`Training Plan Errors:\n\n${errorMsg}`);
        }
    }

    renderTrainingGrid() {
        const startLevel = parseInt(document.getElementById('level-range-start').value) || 0;
        const endLevel = parseInt(document.getElementById('level-range-end').value) || 20;
        
        const grid = document.getElementById('training-grid');
        grid.innerHTML = '';

        // Header row
        const headerRow = document.createElement('div');
        headerRow.className = 'training-row training-header';
        headerRow.innerHTML = '<div class="training-cell">Skill</div>';
        
        for (let level = startLevel; level <= endLevel; level++) {
            const cell = document.createElement('div');
            cell.className = 'training-cell';
            cell.textContent = level;
            headerRow.appendChild(cell);
        }
        grid.appendChild(headerRow);

        // Skill rows
        for (const skill of GS4Data.skills) {
            const row = document.createElement('div');
            row.className = 'training-row';
            
            const nameCell = document.createElement('div');
            nameCell.className = 'training-cell';
            nameCell.textContent = skill.name;
            row.appendChild(nameCell);

            for (let level = startLevel; level <= endLevel; level++) {
                const cell = document.createElement('div');
                cell.className = 'training-cell';
                
                const input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.max = '10';
                input.value = this.character.training[skill.id]?.[level] || 0;
                
                // Get max training for this skill
                const classType = GS4Data.classes[this.character.classId]?.type || 'none';
                const maxTraining = skill[classType] || 0;
                
                input.addEventListener('change', (e) => {
                    if (!this.character.training[skill.id]) {
                        this.character.training[skill.id] = {};
                    }
                    const value = parseInt(e.target.value) || 0;
                    this.character.training[skill.id][level] = value;
                    
                    // Visual feedback for overtraining
                    if (value > maxTraining) {
                        cell.classList.add('invalid');
                        e.target.style.borderColor = 'var(--danger-color)';
                        e.target.style.backgroundColor = '#ffe6e6';
                    } else {
                        cell.classList.remove('invalid');
                        e.target.style.borderColor = '';
                        e.target.style.backgroundColor = '';
                    }
                    
                    this.updateTrainingPointsDisplay(level);
                    this.saveCharacter();
                });
                
                cell.appendChild(input);
                row.appendChild(cell);
            }
            
            grid.appendChild(row);
        }
        
        // Update training points display for first visible level
        this.updateTrainingPointsDisplay(startLevel);
    }

    renderCMANGrid() {
        const grid = document.getElementById('cman-grid');
        grid.innerHTML = '<h3>Combat Maneuvers</h3>';

        for (const cman of GS4Data.cmans) {
            const row = document.createElement('div');
            row.className = 'ability-row';
            
            row.innerHTML = `
                <div class="ability-name">${cman.name}</div>
                <div>${cman.mnemonic}</div>
            `;

            for (let rank = 1; rank <= 5; rank++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'ability-rank-input';
                input.min = '0';
                input.max = '1';
                input.value = this.character.cmans[cman.mnemonic]?.[rank] || 0;
                input.addEventListener('change', (e) => {
                    if (!this.character.cmans[cman.mnemonic]) {
                        this.character.cmans[cman.mnemonic] = {};
                    }
                    this.character.cmans[cman.mnemonic][rank] = parseInt(e.target.value) || 0;
                    this.saveCharacter();
                });
                row.appendChild(input);
            }

            const costCell = document.createElement('div');
            costCell.textContent = `Cost: ${cman.costs.reduce((a, b) => a + b, 0)}`;
            row.appendChild(costCell);

            grid.appendChild(row);
        }
    }

    renderShieldGrid() {
        const grid = document.getElementById('shield-grid');
        grid.innerHTML = '<h3>Shield Specializations</h3>';

        for (const shield of GS4Data.shields) {
            const row = document.createElement('div');
            row.className = 'ability-row';
            
            row.innerHTML = `
                <div class="ability-name">${shield.name}</div>
                <div>${shield.mnemonic}</div>
            `;

            for (let rank = 1; rank <= 5; rank++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'ability-rank-input';
                input.min = '0';
                input.max = '1';
                input.value = this.character.shields[shield.mnemonic]?.[rank] || 0;
                input.addEventListener('change', (e) => {
                    if (!this.character.shields[shield.mnemonic]) {
                        this.character.shields[shield.mnemonic] = {};
                    }
                    this.character.shields[shield.mnemonic][rank] = parseInt(e.target.value) || 0;
                    this.saveCharacter();
                });
                row.appendChild(input);
            }

            const costCell = document.createElement('div');
            costCell.textContent = `Cost: ${shield.costs.reduce((a, b) => a + b, 0)}`;
            row.appendChild(costCell);

            grid.appendChild(row);
        }
    }

    renderSpellsGrid() {
        const grid = document.getElementById('spells-grid');
        grid.innerHTML = '';

        for (const [key, circle] of Object.entries(GS4Data.spellCircles)) {
            const headerRow = document.createElement('div');
            headerRow.className = 'spell-row circle-header';
            headerRow.textContent = circle.name;
            grid.appendChild(headerRow);

            for (let spellNum = 1; spellNum <= Math.min(circle.spells, 20); spellNum++) {
                const row = document.createElement('div');
                row.className = 'spell-row';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'spell-known-checkbox';
                checkbox.checked = this.character.spells[`${key}-${spellNum}`] || false;
                checkbox.addEventListener('change', (e) => {
                    this.character.spells[`${key}-${spellNum}`] = e.target.checked;
                    this.saveCharacter();
                });

                row.innerHTML = `
                    <div>${spellNum}</div>
                    <div>${circle.id}${spellNum.toString().padStart(2, '0')}</div>
                    <div>Spell ${spellNum}</div>
                `;
                row.insertBefore(checkbox, row.firstChild);

                grid.appendChild(row);
            }
        }
    }

    // Calculator methods
    calculateRoundTime() {
        const armorWeight = parseFloat(document.getElementById('rt-armor-weight').value) || 0;
        const otherWeight = parseFloat(document.getElementById('rt-other-weight').value) || 0;
        const weaponSpeed = parseFloat(document.getElementById('rt-weapon-speed').value) || 3;
        const haste = document.getElementById('rt-spell-haste').checked;
        const celerity = document.getElementById('rt-spell-celerity').checked;

        const result = GS4Calculations.calculateRoundTime(armorWeight, otherWeight, weaponSpeed, haste, celerity);
        
        document.getElementById('rt-results').innerHTML = `
            <h4>Round Time Results</h4>
            <p><strong>Total Round Time:</strong> ${result.total.toFixed(2)} seconds</p>
            <p>Base: ${result.breakdown.base}s</p>
            <p>Armor Penalty: ${result.breakdown.armor.toFixed(2)}s</p>
            <p>Encumbrance: ${result.breakdown.encumbrance.toFixed(2)}s</p>
            <p>Haste Bonus: ${result.breakdown.haste}s</p>
            <p>Celerity Bonus: ${result.breakdown.celerity}s</p>
        `;
    }

    calculateAmbush() {
        const targetLevel = parseInt(document.getElementById('ambush-target-level').value) || 10;
        const yourLevel = parseInt(document.getElementById('ambush-your-level').value) || 10;
        const ambushRanks = parseInt(document.getElementById('ambush-ranks').value) || 0;
        const hidingRanks = parseInt(document.getElementById('hiding-ranks').value) || 0;

        const result = GS4Calculations.calculateAmbush(targetLevel, yourLevel, ambushRanks, hidingRanks);
        
        document.getElementById('ambush-results').innerHTML = `
            <h4>Ambush Results</h4>
            <p><strong>Melee Hit %:</strong> ${result.meleeHit}%</p>
            <p><strong>Hidden Ambush Hit %:</strong> ${result.hiddenHit}%</p>
            <p><strong>Hidden Crit Adder:</strong> +${result.critAdder}</p>
            <p>Ambush Bonus: ${result.breakdown.ambushBonus}</p>
            <p>Hiding Bonus: ${result.breakdown.hidingBonus}</p>
            <p>Level Modifier: ${result.breakdown.levelMod}</p>
        `;
    }

    calculateLockpicking() {
        const targetLevel = parseInt(document.getElementById('lock-target-level').value) || 10;
        const material = document.getElementById('lock-material').value;
        const lore = document.getElementById('lock-lore').value;

        const result = GS4Calculations.calculateLockpicking(targetLevel, material, lore);
        
        document.getElementById('lock-results').innerHTML = `
            <h4>Lockpicking Results</h4>
            <p><strong>Total Difficulty:</strong> ${result.difficulty}</p>
            <p>Base Difficulty: ${result.breakdown.base}</p>
            <p>Material Modifier: ${result.breakdown.material}</p>
            <p>Lore Bonus: ${result.breakdown.lore}</p>
        `;
    }

    calculateAS() {
        const targetLevel = parseInt(document.getElementById('as-target-level').value) || 10;
        const weaponRanks = parseInt(document.getElementById('as-weapon-ranks').value) || 0;
        const weaponBonus = parseInt(document.getElementById('as-weapon-bonus').value) || 0;
        const stance = document.getElementById('as-stance').value;

        const result = GS4Calculations.calculateAS(weaponRanks, weaponBonus, stance, targetLevel);
        
        document.getElementById('as-results').innerHTML = `
            <h4>Attack Strength Results</h4>
            <p><strong>Total AS:</strong> ${result.total}</p>
            <p>Weapon Skill: ${result.breakdown.skill}</p>
            <p>Weapon Bonus: ${result.breakdown.weapon}</p>
            <p>Stance Modifier: ${result.breakdown.stance}</p>
            <p>Level Bonus: ${result.breakdown.level}</p>
        `;
    }

    calculateDS() {
        const targetLevel = parseInt(document.getElementById('ds-target-level').value) || 10;
        const shieldType = parseInt(document.getElementById('ds-shield-type').value) || 0;
        const shieldRanks = parseInt(document.getElementById('ds-shield-ranks').value) || 0;
        const dodgeRanks = parseInt(document.getElementById('ds-dodge-ranks').value) || 0;
        const stance = document.getElementById('ds-stance').value;

        const result = GS4Calculations.calculateDS(shieldRanks, dodgeRanks, shieldType, stance, targetLevel);
        
        document.getElementById('ds-results').innerHTML = `
            <h4>Defense Results</h4>
            <p><strong>Total DS:</strong> ${result.total}</p>
            <p>Shield: ${result.breakdown.shield}</p>
            <p>Dodge: ${result.breakdown.dodge}</p>
            <p>Stance Modifier: ${result.breakdown.stance}</p>
            <p>Level Bonus: ${result.breakdown.level}</p>
        `;
    }

    calculateRunestaff() {
        const targetLevel = parseInt(document.getElementById('rs-target-level').value) || 10;
        const magicRanks = parseInt(document.getElementById('rs-magic-ranks').value) || 0;
        const parryRanks = parseInt(document.getElementById('rs-parry-ranks').value) || 0;
        const dodgeRanks = parseInt(document.getElementById('rs-dodge-ranks').value) || 0;
        const staffBonus = parseInt(document.getElementById('rs-staff-bonus').value) || 0;
        const stance = document.getElementById('rs-stance').value;

        const result = GS4Calculations.calculateRunestaffDefense(magicRanks, parryRanks, dodgeRanks, staffBonus, stance, targetLevel);
        
        document.getElementById('rs-results').innerHTML = `
            <h4>Runestaff Defense Results</h4>
            <p><strong>Total DS:</strong> ${result.total}</p>
            <p>Parry: ${result.breakdown.parry}</p>
            <p>Magic: ${result.breakdown.magic}</p>
            <p>Dodge: ${result.breakdown.dodge}</p>
            <p>Staff Bonus: ${result.breakdown.staff}</p>
            <p>Stance Modifier: ${result.breakdown.stance}</p>
            <p>Level Bonus: ${result.breakdown.level}</p>
        `;
    }

    calculateExperience() {
        const fieldExp = parseInt(document.getElementById('exp-field').value) || 10;
        const targetLevel = parseInt(document.getElementById('exp-target-level').value) || 10;
        const critterLevel = parseInt(document.getElementById('exp-critter-level').value) || 1;
        const xp = parseInt(document.getElementById('exp-xp').value) || 10;

        const result = GS4Calculations.calculateExperience(fieldExp, targetLevel, critterLevel, xp);
        
        document.getElementById('exp-results').innerHTML = `
            <h4>Experience Results</h4>
            <p><strong>Capacity:</strong> ${result.capacity}</p>
            <p><strong>Saturation:</strong> ${result.saturation}%</p>
            <p><strong>Absorption Rate:</strong> ${result.absorption.rate} (${result.absorption.status})</p>
            <p><strong>XP Gain:</strong> ${result.xpGain}</p>
            <p><strong>Pulses to Absorb:</strong> ${result.pulses}</p>
        `;
    }

    calculateMagic() {
        const targetLevel = parseInt(document.getElementById('magic-target-level').value) || 10;
        const circle = document.getElementById('magic-circle').value;
        const trainings = parseInt(document.getElementById('magic-trainings').value) || 0;

        const result = GS4Calculations.calculateMagic(targetLevel, circle, trainings);
        
        document.getElementById('magic-results').innerHTML = `
            <h4>Magic Results</h4>
            <p><strong>Casting Strength (CS):</strong> ${result.cs}</p>
            <p><strong>Target Defense (TD):</strong> ${result.td}</p>
            <p><strong>Difference:</strong> ${result.difference}</p>
            <p>Training Bonus: ${result.breakdown.trainings}</p>
            <p>Level Bonus: ${result.breakdown.level}</p>
            <p>Circle Bonus: ${result.breakdown.circle}</p>
        `;
    }

    reportSpellTraining() {
        const knownSpells = Object.values(this.character.spells).filter(v => v).length;
        const avgPerLevel = (knownSpells / 200).toFixed(2);
        
        alert(`Available spell slots highlighted.\nYou have an average of ${avgPerLevel} spells per training.`);
    }

    onClassChange() {
        // Update training costs, etc.
        this.renderTrainingGrid();
    }

    updateAllCalculators() {
        // Auto-populate calculator fields from character data
        const level = this.character.currentLevel;
        
        // Update all target level fields
        const targetLevelInputs = [
            'rt-target-level', 'ambush-target-level', 'lock-target-level',
            'as-target-level', 'ds-target-level', 'rs-target-level',
            'exp-target-level', 'magic-target-level', 'ambush-your-level'
        ];
        
        targetLevelInputs.forEach(id => {
            const elem = document.getElementById(id);
            if (elem && elem.value === '10') { // Only update if still default
                elem.value = level;
            }
        });
    }

    updateStatGrowthDisplay() {
        const statNames = ['str', 'con', 'dex', 'agl', 'dis', 'aur', 'log', 'int', 'wis', 'inf'];
        
        for (const statName of statNames) {
            if (this.character.statGrowth[statName]) {
                const level = this.character.currentLevel;
                const growth = this.character.statGrowth[statName];
                const initialValue = this.character.stats[statName];
                const grownValue = growth[level] || initialValue;
                const increase = grownValue - initialValue;
                
                const growthSpan = document.getElementById(`${statName}-growth`);
                if (growthSpan) {
                    if (increase > 0) {
                        growthSpan.textContent = `+${increase} at level ${level} (${grownValue} total)`;
                    } else {
                        growthSpan.textContent = `Level ${level}: ${grownValue}`;
                    }
                }
            }
        }
    }

    updateTrainingPointsDisplay(level) {
        const pointsUsed = GS4Calculations.calculateTotalPointsSpent(
            this.character.training, 
            level, 
            this.character.classId
        );
        
        const pointsAvailable = GS4Calculations.calculateTrainingPoints(
            this.character.classId, 
            level
        );
        
        const pointsRemaining = pointsAvailable - pointsUsed;
        
        const usedElem = document.getElementById('training-points-used');
        const availElem = document.getElementById('training-points-available');
        const remainElem = document.getElementById('training-points-remaining');
        
        if (usedElem) usedElem.textContent = `Training Points Used: ${pointsUsed}`;
        if (availElem) availElem.textContent = `Available: ${pointsAvailable}`;
        if (remainElem) {
            remainElem.textContent = `Remaining: ${pointsRemaining}`;
            remainElem.className = pointsRemaining < 0 ? 'error' : pointsRemaining === 0 ? 'success' : '';
        }
    }

    render() {
        // Set initial values
        document.getElementById('char-name').value = this.character.name;
        document.getElementById('class-select').value = this.character.classId;
        document.getElementById('race-select').value = this.character.raceId;
        document.getElementById('current-level').value = this.character.currentLevel;
        document.getElementById('target-level').value = this.character.targetLevel;
        document.getElementById('experience').value = this.character.experience;

        // Set stats
        for (const [stat, value] of Object.entries(this.character.stats)) {
            const input = document.querySelector(`[data-stat="${stat}"]`);
            if (input) input.value = value;
        }

        this.validateAndUpdateStats();
        this.renderTrainingGrid();
        this.renderCMANGrid();
        this.renderShieldGrid();
        this.renderSpellsGrid();
    }

    saveCharacter() {
        localStorage.setItem('gs4-trainer-character', JSON.stringify(this.character));
    }

    loadCharacter() {
        const saved = localStorage.getItem('gs4-trainer-character');
        if (saved) {
            try {
                this.character = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading character:', e);
            }
        }
    }

    promptLoadCharacter() {
        if (confirm('Load saved character? This will overwrite current data.')) {
            this.loadCharacter();
            this.render();
        }
    }

    resetCharacter() {
        if (confirm('Reset character? This will clear all data.')) {
            this.character = this.getDefaultCharacter();
            this.saveCharacter();
            this.render();
        }
    }

    exportJSON() {
        const dataStr = JSON.stringify(this.character, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.character.name || 'character'}_gs4.json`;
        link.click();
        
        URL.revokeObjectURL(url);
    }

    importJSON() {
        const input = document.getElementById('file-input');
        input.click();
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    this.character = JSON.parse(event.target.result);
                    this.saveCharacter();
                    this.render();
                    alert('Character imported successfully!');
                } catch (error) {
                    alert('Error importing character: ' + error.message);
                }
            };
            reader.readAsText(file);
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GS4Trainer();
});

# GemStone IV Character Trainer Spreadsheet Analysis
## Version 4.6.3

---

## Overview
This is a comprehensive character training planner for GemStone IV, a text-based fantasy MMORPG. The spreadsheet allows players to plan their character development across 200 levels, including stats, skills, spells, and combat maneuvers.

---

## Sheet Structure (16 Total Sheets)

### 1. **Trainer** (Main Sheet)
- **Purpose**: Primary character planning interface
- **Key Sections**:
  - Character Name input
  - Class selection (dropdown: Warrior, Rogue, Wizard, Cleric, Empath, Sorcerer, Ranger, Bard, Monk, Paladin)
  - Race selection (Human, Giantman, Half-Elf, Dark-Elf, Sylvan, Elf, Dwarf, Halfling, Aelotoi, Burghal Gnome, Forest Gnome, Half Krolvin, Erithian)
  - Initial stats (STR, CON, DEX, AGL, DIS, AUR, LOG, INT, WIS, INF) - must total 660
  - Current Level and Target Level
  - Experience tracking
  - Stat Growth progression (columns for levels 0-200)
  - Skill training grid (28 skills × 200 levels)
  
- **Skills Tracked**:
  1. Armor Use
  2. Shield Use
  3. Edged Weapons
  4. Blunt Weapons
  5. Two-Handed Weapons
  6. Ranged Weapons
  7. Thrown Weapons
  8. Polearm Weapons
  9. Brawling
  10. Ambush
  11. Multi Opponent Combat
  12. Combat Maneuvers
  13. Edged Weapons Tricks
  14. Blunt Weapons Tricks
  15. Two-Weapon Combat
  16. Physical Fitness
  17. Dodging
  18. Arcane Symbols
  19. Magic Item Use
  20. Spell Aiming
  21. Harness Power
  22. Elemental Mana Control
  23. Mental Mana Control
  24. Spirit Mana Control
  25. Sorcerous Lore
  26. Elemental Lore
  27. Spiritual Lore
  28. Mental Lore

### 2. **Round Time Calculator**
- **Purpose**: Calculate combat round times based on various factors
- **Inputs**:
  - Armor Weight
  - Other Carried Weight
  - Weapon modifiers
  - Target Level
  - Armor type
  - Spell modifiers
- **Outputs**: Round time calculations for different combat scenarios

### 3. **Ambushing**
- **Purpose**: Calculate ambush success rates
- **Features**:
  - Target level input
  - Melee hit % (Unmodified)
  - Hiding hit % (Unmodified)
  - Hidden Ambush Critical Adder
  - Level-by-level progression (0-200)

### 4. **CMAN** (Combat Maneuvers)
- **Purpose**: Track Combat Maneuver training
- **Structure**:
  - List of all CMANs with mnemonics
  - 5 ranks per CMAN
  - Allowed/Not Allowed based on profession
  - Total ranks and points calculation
  - Includes: Bearhug, Burst of Swiftness, Charge, Disarm, Feint, Garrote, Hamstring, Kick, Precision, Rolling Krynch Strike, Side by Side Strike, Stance Perfection, Surge of Strength, Sweep, Trip, Weapon Bonding, and many more

### 5. **Shield**
- **Purpose**: Track Shield Maneuver specializations
- **Structure**: Similar to CMAN sheet
- **Includes**:
  - Small/Medium/Large/Tower Shield Focus
  - Shield Bash, Charge, Forward, Pin, Riposte, Spike Mastery, Strike, Swiftness, Throw, Trample

### 6. **Lockpicking**
- **Purpose**: Calculate lockpicking difficulty modifiers
- **Features**:
  - Target level
  - Inter-level calculations
  - Material types (Glaes, Golvern, Vaalin, etc.)
  - Lore bonuses (no lore, other lore, self lore)

### 7. **Attack Strength**
- **Purpose**: Calculate AS (Attack Strength) for weapons
- **Inputs**:
  - Weapon selection (1-3)
  - Unspelled AS
  - Weapon skill, bonus
  - Target level
- **Calculations**: AS by stance (Offensive, Advance, Forward, Neutral, Guarded, Defensive)

### 8. **Defense**
- **Purpose**: Calculate defensive statistics
- **Inputs**:
  - Target Level
  - Shield Type (1-5: Small, Medium, Large, Tower, None)
  - Stance selection
- **Calculations**:
  - Shield Defense
  - Dodge Ranks
  - Weapon defensive bonus
  - Known Spell DS
  - Total DS by level

### 9. **Runestaff**
- **Purpose**: Calculate defense when using a runestaff
- **Similar to Defense sheet but for runestaff users**

### 10. **Experience**
- **Purpose**: Experience and hunting calculations
- **Features**:
  - Field Experience tracking
  - Target Level
  - Critter Level
  - XP calculations
  - Experience Capacity by level
  - Absorption rates at different saturation levels

### 11. **Magic**
- **Purpose**: Calculate Casting Strength (CS) and Target Defense (TD)
- **Calculations for**:
  - Minor Mental
  - Minor Spirit
  - Spell trainings
  - TD calculations
  - Level progression

### 12. **Stand By**
- **Purpose**: Placeholder/loading sheet
- **Content**: "WORKING… PLEASE WAIT"

### 13. **Spells**
- **Purpose**: Track known spells and spell bonuses
- **Features**:
  - Use Known Spells toggle
  - Spell display activator
  - Target Level
  - All spell circles (Spirit, Minor Spirit, Major Spirit, Cleric, Minor Elemental, Major Elemental, Wizard, Sorcerer, Ranger, Paladin, Empath, Bard, Minor Mental)
  - Physical DS from spells
  - Spell bonuses calculation

### 14. **Buffer**
- **Purpose**: Hidden sheet with class training costs
- **Data**:
  - PDP (Physical Development Points)
  - MDP (Mental Development Points)
  - MT (Max Training)
  - All skills with costs for each class

### 15. **Tables**
- **Purpose**: Reference data for all calculations
- **Contains**:
  - Race bonus tables (HP, Max HP, Weight, stat bonuses)
  - Class/Profession data
  - Growth Intervals for stats
  - Training costs
  - Shield types and bonuses
  - Armor data
  - Weapon data
  - Experience tables
  - Spell lists and effects

### 16. **DataCopy**
- **Purpose**: Data migration and version control
- **Structure**:
  - Sheet protection settings
  - Data location mappings
  - Version history (tracks changes from v4.2.5 to v4.3)
  - Reset values

---

## VBA Macros Functionality

### 1. **ReportSpellTraining()**
- Highlights available spell slots (white background) vs unavailable (gray)
- Calculates total and average spell trainings across 200 levels
- Shows message box with statistics

### 2. **CheckTrainingPlan()**
- Validates training plan against max training limits
- Checks all 28 skills across 200 levels
- Shows error if overtraining detected
- Displays status bar during processing
- Confirms "legal" training plan if valid

### 3. **CalculateStatGrowth()**
- Calculates stat growth for all 10 stats across 200 levels
- Uses growth intervals from Tables sheet
- Factors in race and class
- Handles approximations for unknown growth intervals
- Status bar shows progress for each stat
- Growth rate: CurrentValue / GrowthInterval
- Stats grow when: Level mod GrowthRate = 0 and CurrentValue < 100

### 4. **AutoShowProfessionSpells()**
- Triggered on workbook open
- Shows relevant spell circles for selected profession
- Hides irrelevant spell circles

### 5. **ShowProfessionSpells()**
- Unhides spell rows for current profession
- Sets row height to 12.75
- Handles all spell circles

### 6. **HideProfessionSpells()**
- Hides spell rows not relevant to profession
- Sets row height to 0

### 7. **ShowSpells()**
- Shows all spell circles regardless of profession

### 8. **ComputeSpellSheet()**
- Updates Spells sheet based on Trainer data
- Calculates spell bonuses
- Updates spell availability
- Handles spell prerequisite chains

### 9. **HideCMANAllowed()** / **ShowCMANLevels()**
- Hides CMAN rows not allowed for profession
- Shows level-based CMAN unlocks

### 10. **HideShieldAllowed()** / **ShowShieldLevels()**
- Similar to CMAN but for shield abilities

### 11. **UnHideSkills()**
- Unhides all skill rows
- Resets row heights

### 12. **UpdateProfessionData()**
- Updates class-specific data when profession changes
- Adjusts allowed skills, training costs
- Updates stat growth rates

### 13. **ResetSpreadsheet()**
- Master reset function
- Creates backup copy (optional)
- Clears all user data while preserving structure
- Resets:
  - Character name
  - Stats to 0
  - All training ranks
  - Spell selections
  - CMAN/Shield selections
  - Experience values
- Recalculates everything
- Re-applies profession restrictions

### 14. **ChangeProfession()**
- Called when user changes class
- Updates spell visibility
- Updates CMAN/Shield availability
- Refreshes Trainer sheet

### 15. **Worksheet Event Handlers**
- Worksheet_Calculate(): Triggers recalculation
- Worksheet_SelectionChange(): Handles cell selection changes
- Workbook_Open(): Auto-runs on file open

---

## Key Formulas & Calculations

### Experience Capacity
```
Capacity = 800 + (Level * 2)
```

### Stat Growth
```
GrowthRate = INT(CurrentStat / GrowthInterval)
If GrowthRate < 1 Then GrowthRate = 1
If CurrentStat < 100 AND Level MOD GrowthRate = 0 Then CurrentStat += 1
```

### Attack Strength (AS)
```
AS = Weapon Skill Ranks + Weapon Bonus + Stance Modifier + Spell Bonuses
```

### Defense (DS)
```
DS = Shield Ranks + Dodge Ranks + Weapon Defensive + Spell DS + Stance Modifier
```

### Training Points per Level
Varies by class:
- Square classes: More physical, less mental
- Semi classes: Balanced
- Pure classes: More mental, less physical

---

## Inter-Level System
The spreadsheet uses a unique "Inter-Level" concept where each level from 0-200 has fractional sub-levels (0.0, 1.0, 2.0, etc.) allowing for:
- Gradual stat increases
- Spell bonus calculations at specific breakpoints
- More granular combat calculations

---

## Data Validation & Error Checking
1. **Stats must total 660** at character creation
2. **Stats must be at least 20** each
3. **Training ranks cannot exceed Max Training** (MT) per skill per level
4. **Spell prerequisites** must be met
5. **CMAN/Shield availability** based on profession

---

## External References
The spreadsheet references GemStone IV official resources:
- http://www.play.net/gs4/info/maneuvers/list.asp
- http://www.play.net/gs4/info/spells/spelllist.asp?circle=
- http://www.play.net/gs4/info/skills.asp

---

## Technical Notes
- File format: Excel 97-2003 (.xls)
- Uses OLE/COM structures
- VBA macros require macro-enabled Excel
- Dynamic named ranges for data binding
- Complex cross-sheet formulas
- Protection on most sheets (structure protected)
- Hidden sheets: Buffer, Stand By (during calculations), DataCopy
- Extensive conditional formatting
- Dropdown lists with validation

---

## Migration Considerations for Web Application

### Critical Features to Maintain:
1. **Character Creation & Stats**
   - Race/Class selection with bonuses
   - Stat allocation (total = 660, min = 20)
   - Stat growth calculation

2. **Training Planning**
   - 28 skills × 200 levels grid
   - Training cost calculation
   - Validation against max training

3. **Combat Calculations**
   - AS/DS calculators
   - Round time calculations
   - Ambush calculations

4. **Spell Management**
   - Profession-specific spell circles
   - Spell bonus calculations
   - Known spell DS tracking

5. **CMAN/Shield Abilities**
   - Profession restrictions
   - Rank tracking (5 ranks each)
   - Point cost calculation

6. **Experience System**
   - Capacity calculations
   - Absorption rates
   - Level progression

### Technical Challenges:
1. **State Management**: 200 levels × 28 skills = 5,600+ cells of training data
2. **Real-time Calculation**: Complex formulas across multiple sheets
3. **Data Persistence**: Save/load character builds
4. **Validation**: Extensive rule checking
5. **UI/UX**: Spreadsheet familiarity vs. web interface paradigms

### Recommended Architecture:
- **Frontend**: React with state management (Redux/Context)
- **Data Storage**: LocalStorage for character saves, IndexedDB for larger data
- **Calculations**: JavaScript modules mirroring VBA functions
- **UI Components**: Tabs for sheets, grid for training, forms for inputs
- **Export/Import**: JSON format for character data
- **Static Hosting**: GitHub Pages compatible (no backend needed)

type Factions = 'Empire' | 'Rebel' | 'Separatists' | 'Republic'
type Commands = 'Squadron' | 'Repair' | 'Navigate' | 'Concentrate Fire' | 'Any'
type DefenseTokens = 'Brace' | 'Redirect' | 'Scatter' | 'Evade' | 'Salvo' | 'Contain'
type Upgrades = 'Commander' | 'Defensive Retrofit' | 'Fleet Command' | 'Fleet Support' | 'Ion Cannon' | 'Offensive Retrofit' |  'Officer' | 'Ordance' | 'Superweapon' | 'Support Team' | 'Title' | 'Turbolaser' | 'Weapons Team'
type Traits = 'Bombard' | 'Jedi' | 'Medical' | 'Transport' | 'Clone' | 'Senate' | 'Comms' | 'Droid' 
type Keywords = 
{ keyword: 'Adept', value: number } | 
{ keyword: 'AI: Battery', value: number } | 
{ keyword: 'AI: Anti-Squadron', value: number } | 
{ keyword: 'Assault', value?: never } | 
{ keyword: 'Bomber', value?: never } | 
{ keyword: 'Cloak', value?: never } | 
{ keyword: 'Counter', value: number } | 
{ keyword: 'Dodge', value: number } | 
{ keyword: 'Escort', value?: never } | 
{ keyword: 'Grit', value?: never } | 
{ keyword: 'Heavy', value?: never } | 
{ keyword: 'Intel', value?: never } | 
{ keyword: 'Relay', value: number } | 
{ keyword: 'Rogue', value?: never } | 
{ keyword: 'Scout', value?: never } | 
{ keyword: 'Screen', value?: never } | 
{ keyword: 'Snipe', value?: number } | 
{ keyword: 'Strategic', value?: never } |
{ keyword: 'Swarm', value?: never }
type DieFace = "Accuracy" | "Hit" | "Crit" | "Blank" | "Hit Hit" | "Hit Crit" | "Blank Blank";

const RedDie: DieFace[] = ["Hit Hit", "Accuracy", "Hit", "Hit", "Crit", "Crit", "Blank", "Blank"];
const BlueDie: DieFace[] = ["Hit", "Hit", "Hit", "Hit", "Accuracy", "Accuracy", "Crit", "Crit"];
const BlackDie: DieFace[] = ["Hit", "Hit", "Hit", "Hit", "Hit Crit", "Hit Crit", "Blank Blank"];

class DicePool {
    private red: number;
    private blue: number;
    private black: number;
  
    constructor(red: number, blue: number, black: number) {
      this.red = red;
      this.blue = blue;
      this.black = black;
    }
  
    private rollDie(faces: DieFace[]): DieFace {
      return faces[Math.floor(Math.random() * faces.length)];
    }
  
    roll(): { red: DieFace[]; blue: DieFace[]; black: DieFace[] } {
      return {
        red: Array.from({ length: this.red }, () => this.rollDie(RedDie)),
        blue: Array.from({ length: this.blue }, () => this.rollDie(BlueDie)),
        black: Array.from({ length: this.black }, () => this.rollDie(BlackDie)),
      };
    }
  }

interface Card {
    name: string
    cost: number
    artworkUrl: string
    faction: Factions[]
    notes: {[key: string]: string}[]
}

interface Vehicle extends Card {
    hull: number
    vehicleIconUrl: string
}

interface Squadron extends Vehicle {
    keywords: Keywords[]
    speed: number
    dice: {
        antiSquadron: DicePool
        battery: DicePool
    }
    ace?:{
        ability: string
        defenseTokens: DefenseTokens[]
    }
}

interface Ship extends Vehicle {
    command: number
    squadron: number
    engineering: number
    upgradeSlots: Upgrades[]
    traits: Traits[]
    defenseTokens: DefenseTokens[]
    navigation:{
        one: [0 | 1 | 2]
        two: [0 | 1 | 2, 0 | 1 | 2]
        three?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2]
        four?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2]
    }
    dice: {
        front: DicePool
        left: DicePool
        right: DicePool
        rear: DicePool
        flak: DicePool
    }
    shields: {
        front: number
        left: number
        right: number
        rear: number
    }
}

interface Upgrade extends Card {
    wave: string
    version: string
    type: Upgrades[]
    description: string
    tokens: Commands[]
    refresh?: {
        cost: Commands[]
    } | true
}



// Example 
const pool = new DicePool(2, 2, 1);
console.log(pool.roll());
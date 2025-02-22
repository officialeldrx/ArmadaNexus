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

interface Pool {
    red?: number
    blue?: number
    black?: number
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
        antiSquadron: Pool
        battery: Pool
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
        front: Pool
        left: Pool
        right: Pool
        rear: Pool
        flak: Pool
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
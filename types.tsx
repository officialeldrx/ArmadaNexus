type Factions = 'Empire' | 'Rebel' | 'Separatists' | 'Republic'
type Commands = 'Squadron' | 'Repair' | 'Navigate' | 'Concentrate Fire' | 'Any'
type DefenseTokenType = "Brace" | "Redirect" | "Scatter" | "Evade" | "Salvo" | "Contain"
type TokenState = "Readied" | "Exhausted" | "Discarded"
type Upgrades = 'Commander' | 'Defensive Retrofit' | 'Fleet Command' | 'Fleet Support' | 'Ion Cannon' | 'Offensive Retrofit' | 'Officer' | 'Ordance' | 'Superweapon' | 'Support Team' | 'Title' | 'Turbolaser' | 'Weapons Team'
type Traits = 'Bombard' | 'Jedi' | 'Medical' | 'Transport' | 'Clone' | 'Senate' | 'Comms' | 'Droid'
type Size = 'Flotilla' | 'Small' | 'Medium' | 'Large' | 'Huge'
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
type DieColor = "red" | "blue" | "black"

const RedDie: DieFace[] = ["Hit Hit", "Accuracy", "Hit", "Hit", "Crit", "Crit", "Blank", "Blank"];
const BlueDie: DieFace[] = ["Hit", "Hit", "Hit", "Hit", "Accuracy", "Accuracy", "Crit", "Crit"];
const BlackDie: DieFace[] = ["Hit", "Hit", "Hit", "Hit", "Hit Crit", "Hit Crit", "Blank Blank"];

interface RollResult {
    red: DieFace[]
    blue: DieFace[]
    black: DieFace[]
}

interface Clarification {
    label: string
    clarifications: string[]
}

interface Card {
    name: string
    cost: number
    artworkUrl: string
    faction: Factions[]
    unique: boolean
    nickNames: string[]
    artist?: string
    clarifications?: Clarification[]
}

interface Vehicle extends Card {
    hull: number
    vehicleIconUrl: string
}

class DicePool {
    private red: number
    private blue: number
    private black: number
    private currentRoll: RollResult | null = null

    constructor(red: number, blue: number, black: number) {
        this.red = red
        this.blue = blue
        this.black = black
    }

    private rollDie(faces: DieFace[]): DieFace {
        return faces[Math.floor(Math.random() * faces.length)]
    }

    roll(obstructed?: DieColor): RollResult {
        if (obstructed && this[obstructed] === 0) {
            throw new Error(`Cannot obstruct ${obstructed} die. No ${obstructed} dice in the pool.`)
        }

        this.currentRoll = {
            red: Array.from({ length: this.red - (obstructed === "red" ? 1 : 0) }, () => this.rollDie(RedDie)),
            blue: Array.from({ length: this.blue - (obstructed === "blue" ? 1 : 0) }, () => this.rollDie(BlueDie)),
            black: Array.from({ length: this.black - (obstructed === "black" ? 1 : 0) }, () => this.rollDie(BlackDie)),
        }
        return this.currentRoll
    }

    getPool(): { red: number; blue: number; black: number } {
        return { red: this.red, blue: this.blue, black: this.black }
    }

    reroll(diceToReroll: { color: DieColor; indices: number[] }[]): RollResult {
        if (!this.currentRoll) {
            throw new Error("No current roll to reroll. Please roll first.")
        }

        const newRoll = { ...this.currentRoll }

        diceToReroll.forEach(({ color, indices }) => {
            indices.forEach((index) => {
                if (index < 0 || index >= newRoll[color].length) {
                    throw new Error(`Invalid index ${index} for ${color} dice.`)
                }
                switch (color) {
                    case "red":
                        newRoll.red[index] = this.rollDie(RedDie)
                        break
                    case "blue":
                        newRoll.blue[index] = this.rollDie(BlueDie)
                        break
                    case "black":
                        newRoll.black[index] = this.rollDie(BlackDie)
                        break
                }
            })
        })

        this.currentRoll = newRoll
        return this.currentRoll
    }

    getCurrentRoll(): RollResult | null {
        return this.currentRoll
    }

    removeDice(diceToRemove: { color: DieColor; indices: number[] }[]): void {
        if (!this.currentRoll) {
            throw new Error("No current roll to remove dice from. Please roll first.")
        }

        diceToRemove.forEach(({ color, indices }) => {
            indices.sort((a, b) => b - a)
            indices.forEach((index) => {
                if (index < 0 || index >= this.currentRoll![color].length) {
                    throw new Error(`Invalid index ${index} for ${color} dice.`)
                }
                this.currentRoll![color].splice(index, 1)
            })
        })
    }

    addDice(diceToAdd: { color: DieColor; count: number }[]): void {
        if (!this.currentRoll) {
            throw new Error("No current roll to add dice to. Please roll first.")
        }

        diceToAdd.forEach(({ color, count }) => {
            const dieFaces = color === "red" ? RedDie : color === "blue" ? BlueDie : BlackDie
            const newDice = Array.from({ length: count }, () => this.rollDie(dieFaces))
            this.currentRoll![color] = [...this.currentRoll![color], ...newDice]
        })
    }

    setDieFace(color: DieColor, index: number, face: DieFace): void {
        if (!this.currentRoll) {
            throw new Error("No current roll. Please roll first.")
        }

        if (index < 0 || index >= this.currentRoll[color].length) {
            throw new Error(`Invalid index ${index} for ${color} dice.`)
        }

        const validFaces = color === "red" ? RedDie : color === "blue" ? BlueDie : BlackDie
        if (!validFaces.includes(face)) {
            throw new Error(`Invalid face "${face}" for ${color} die.`)
        }

        this.currentRoll[color][index] = face
    }
}

class DefenseToken {
    private type: DefenseTokenType
    private state: TokenState

    constructor(type: DefenseTokenType) {
        this.type = type
        this.state = "Readied"
    }

    getType(): DefenseTokenType { return this.type }
    getState(): TokenState { return this.state }
    spend(): void {
        if (this.state === "Readied") this.state = "Exhausted"
        else if (this.state === "Exhausted") this.state = "Discarded"
    }
    exhaust(): void { if (this.state === "Readied") this.state = "Exhausted" }
    refresh(): void { if (this.state === "Exhausted") this.state = "Readied" }
    regain(newState: "Exhausted" | "Readied"): void { if (this.state === "Discarded") this.state = newState }
}

interface Squadron extends Vehicle {
    keywords: Keywords[]
    speed: number
    dice: {
        antiSquadron: DicePool
        battery: DicePool
    }
    ace?: {
        name: string
        ability: string
        defenseTokens: DefenseToken[]
    }
}

interface Ship extends Vehicle {
    values: {
        command: number
        squadron: number
        engineering: number
    }
    tokens: Commands[]
    size: Size
    upgradeSlots: Upgrades[]
    traits: Traits[]
    defenseTokens: DefenseToken[]
    navigation: {
        one: [0 | 1 | 2]
        two: [0 | 1 | 2, 0 | 1 | 2]
        three?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2]
        four?: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2]
    }
    armament: {
        front: DicePool
        left: DicePool
        right: DicePool
        rear: DicePool
        flak: DicePool
        special: DicePool
        leftAuxiliary?: DicePool
        rightAuxiliary?: DicePool
    }
    shields: {
        front: number
        left: number
        right: number
        rear: number
        leftAuxiliary?: number
        rightAuxiliary?: number
    }

    // constructor(
    //     shipData: Omit<
    //         Ship,
    //         "commandStack" | "setCommands" | "revealCommand" | "setCommand" | "discardCommands" | "viewCommands" | "takeToken"
    //     >,
    // ) {
    //     Object.assign(this, shipData)
    //     this.commandStack = []
    //     this.tokens = []
    // }

    // setCommands(commands: Commands[]): void {
    //     if (commands.length !== this.values.command) {
    //         throw new Error(`Must set exactly ${this.values.command} commands.`)
    //     }
    //     this.commandStack = commands
    // }

    // revealCommand(): Commands | null {
    //     if (this.commandStack.length === 0) {
    //         return null
    //     }
    //     this.revealedCommand = this.commandStack[0]
    //     return this.revealedCommand
    // }

    // setCommand(): void {
    //     if (!this.revealedCommand) {
    //         throw new Error("No command has been revealed.")
    //     }
    //     this.commandStack.push(this.revealedCommand)
    //     this.commandStack.shift()
    //     this.revealedCommand = null
    // }

    // discardCommands(count: number): void {
    //     if (count < 0 || count > this.values.command) {
    //         throw new Error(`Can only discard between 0 and ${this.values.command} commands.`)
    //     }
    //     this.commandStack = this.commandStack.slice(count)
    // }

    // viewCommands(): Commands[] {
    //     return this.commandStack.slice(0, this.values.command)
    // }

    // takeToken(): void {
    //     if (!this.revealedCommand) {
    //         throw new Error("No command has been revealed.")
    //     }
    //     if (this.tokens.length >= this.values.command) {
    //         throw new Error("Maximum number of tokens reached.")
    //     }
    //     if (this.tokens.includes(this.revealedCommand)) {
    //         throw new Error("Token of this type already exists.")
    //     }
    //     this.tokens.push(this.revealedCommand)
    //     this.revealedCommand = null
    // }
}

interface Upgrade extends Card {
    type: Upgrades[]
    description: string
    tokens: Commands[]
    refresh?: {
        cost: Commands[]
    } | true
}
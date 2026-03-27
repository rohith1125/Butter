import * as vscode from 'vscode';

// ─── Growth Stages ────────────────────────────────────────────────────────────

export interface GrowthStage {
  level: number;
  name: string;
  emoji: string;
  xpRequired: number;         // total XP needed to reach this stage
  xpToNext: number;           // XP needed to advance from this stage
  personality: string;        // flavour text shown in stats
}

export const GROWTH_STAGES: GrowthStage[] = [
  {
    level: 0,
    name: 'Newborn Cub',
    emoji: '🐣',
    xpRequired: 0,
    xpToNext: 200,
    personality: 'Just hatched. Blinks a lot. Doesn\'t understand pointers yet.',
  },
  {
    level: 1,
    name: 'Tiny Cub',
    emoji: '🐻',
    xpRequired: 200,
    xpToNext: 500,
    personality: 'Learning the ropes. Enjoys watching you type. Hates semicolons.',
  },
  {
    level: 2,
    name: 'Young Bear',
    emoji: '🧸',
    xpRequired: 700,
    xpToNext: 1000,
    personality: 'Getting the hang of things. Has opinions about tabs vs spaces.',
  },
  {
    level: 3,
    name: 'Adult Bear',
    emoji: '🐻‍❄️',
    xpRequired: 1700,
    xpToNext: 2000,
    personality: 'Battle-hardened. Seen production outages. Still optimistic.',
  },
  {
    level: 4,
    name: 'Legend Bear',
    emoji: '👑🐻',
    xpRequired: 3700,
    xpToNext: 5000,
    personality: 'Transcended. Ships clean code. Never breaks main. A myth.',
  },
];

// ─── Persistent State ─────────────────────────────────────────────────────────

export interface BearStateData {
  xp: number;
  honey: number;
  totalLinesSaved: number;
  totalSaves: number;
  totalErrorsFixed: number;
  totalFed: number;
  lastSeenDate: string;
  lastActiveTime: number;     // epoch ms
  hunger: number;             // 0–100, 100 = full, drains over time
  sessionKeystrokes: number;
  prestigeLevel: number;
}

export const DEFAULT_STATE: BearStateData = {
  xp: 0,
  honey: 10,                  // start with a little honey
  totalLinesSaved: 0,
  totalSaves: 0,
  totalErrorsFixed: 0,
  totalFed: 0,
  lastSeenDate: '',
  lastActiveTime: Date.now(),
  hunger: 80,
  sessionKeystrokes: 0,
  prestigeLevel: 0,
};

const STATE_KEY = 'butter.bearState';

export class BearStateManager {
  private data: BearStateData;
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    const saved = context.globalState.get<BearStateData>(STATE_KEY);
    this.data = saved ? { ...DEFAULT_STATE, ...saved } : { ...DEFAULT_STATE };
    this.applyHungerDecay();
  }

  // ─── Getters ────────────────────────────────────────────────────────────────

  get xp(): number { return this.data.xp; }
  get honey(): number { return this.data.honey; }
  get hunger(): number { return this.data.hunger; }
  get totalSaves(): number { return this.data.totalSaves; }
  get totalFed(): number { return this.data.totalFed; }
  get totalErrorsFixed(): number { return this.data.totalErrorsFixed; }
  get sessionKeystrokes(): number { return this.data.sessionKeystrokes; }
  get lastSeenDate(): string { return this.data.lastSeenDate; }

  get stage(): GrowthStage {
    for (let i = GROWTH_STAGES.length - 1; i >= 0; i--) {
      if (this.data.xp >= GROWTH_STAGES[i].xpRequired) {
        return GROWTH_STAGES[i];
      }
    }
    return GROWTH_STAGES[0];
  }

  get xpInCurrentStage(): number {
    return this.data.xp - this.stage.xpRequired;
  }

  get xpToNextStage(): number {
    return this.stage.xpToNext;
  }

  get isMaxLevel(): boolean { return false; }

  get isHungry(): boolean {
    return this.data.hunger < 30;
  }

  get isStarving(): boolean {
    return this.data.hunger < 10;
  }

  get prestigeLevel(): number { return this.data.prestigeLevel || 0; }

  get isPrestigeReady(): boolean {
    return this.stage.level === GROWTH_STAGES.length - 1 &&
      this.data.xp >= GROWTH_STAGES[GROWTH_STAGES.length - 1].xpRequired + 5000;
  }

  get stageEmoji(): string {
    const level = this.data.prestigeLevel || 0;
    const stars = '🌟'.repeat(Math.min(level, 3));
    return stars + this.stage.emoji;
  }

  prestige(): { newPrestigeLevel: number } {
    this.data.prestigeLevel = (this.data.prestigeLevel || 0) + 1;
    this.data.xp = 0;
    this.save();
    return { newPrestigeLevel: this.data.prestigeLevel };
  }

  // ─── Mutations ──────────────────────────────────────────────────────────────

  addXP(amount: number): { leveledUp: boolean; newStage: GrowthStage | null } {
    const oldStage = this.stage;
    this.data.xp += amount;
    const newStage = this.stage;
    const leveledUp = newStage.level > oldStage.level;
    this.save();
    return { leveledUp, newStage: leveledUp ? newStage : null };
  }

  addHoney(amount: number): void {
    this.data.honey = Math.min(this.data.honey + amount, 999);
    this.save();
  }

  recordSave(linesChanged: number): void {
    this.data.totalSaves++;
    this.data.totalLinesSaved += linesChanged;
    this.data.lastActiveTime = Date.now();
    // Restore a little hunger from the satisfaction of saving
    this.data.hunger = Math.min(this.data.hunger + 2, 100);
    this.save();
  }

  recordErrorFixed(): void {
    this.data.totalErrorsFixed++;
    this.save();
  }

  recordKeystroke(): void {
    this.data.sessionKeystrokes++;
    this.data.lastActiveTime = Date.now();
    // Earn honey slowly: 1 honey per 50 keystrokes
    if (this.data.sessionKeystrokes % 50 === 0) {
      this.addHoney(1);
    }
    // Drain hunger slowly while coding: 1 point per 100 keystrokes
    if (this.data.sessionKeystrokes % 100 === 0) {
      this.data.hunger = Math.max(this.data.hunger - 1, 0);
      this.save();
    }
  }

  feedBear(honeyAmount: number): {
    success: boolean;
    xpGained: number;
    message: string;
    reaction: string;
  } {
    if (this.data.honey < honeyAmount) {
      return {
        success: false,
        xpGained: 0,
        message: `Not enough honey! You have ${this.data.honey} 🍯 but need ${honeyAmount}.`,
        reaction: '😢',
      };
    }

    this.data.honey -= honeyAmount;
    this.data.totalFed += honeyAmount;
    this.data.hunger = Math.min(this.data.hunger + honeyAmount * 8, 100);

    // XP gain = honey * multiplier based on hunger
    const multiplier = this.isStarving ? 3 : this.isHungry ? 2 : 1;
    const xpGained = honeyAmount * 15 * multiplier;
    const { leveledUp, newStage } = this.addXP(xpGained);

    const stage = this.stage;
    let reaction: string;
    let message: string;

    if (leveledUp && newStage) {
      reaction = '🎉';
      message = `Grew into a ${newStage.name}! ${newStage.emoji}`;
    } else if (this.isStarving) {
      reaction = '😭→😊';
      message = `Was starving! +${xpGained} XP (3× hunger bonus)`;
    } else if (this.isHungry) {
      reaction = '🤤→😄';
      message = `Was hungry! +${xpGained} XP (2× hunger bonus)`;
    } else {
      const reactions = ['😋', '🍯', '😊', '✨', '💛'];
      reaction = reactions[Math.floor(Math.random() * reactions.length)];
      message = `Nom nom! +${xpGained} XP`;
    }

    this.save();
    return { success: true, xpGained, message, reaction };
  }

  setLastSeenDate(date: string): void {
    this.data.lastSeenDate = date;
    this.save();
  }

  // ─── Hunger Decay ───────────────────────────────────────────────────────────

  private applyHungerDecay(): void {
    const now = Date.now();
    const hoursSinceActive = (now - this.data.lastActiveTime) / (1000 * 60 * 60);
    // Lose 5 hunger per hour of inactivity, min 0
    const decay = Math.floor(hoursSinceActive * 5);
    this.data.hunger = Math.max(this.data.hunger - decay, 0);
    this.save();
  }

  // ─── Persistence ────────────────────────────────────────────────────────────

  private save(): void {
    this.context.globalState.update(STATE_KEY, this.data);
  }

  reset(): void {
    this.data = { ...DEFAULT_STATE };
    this.save();
  }
}

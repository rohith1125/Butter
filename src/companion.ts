import * as vscode from 'vscode';
import { StatusBarManager } from './statusBar';
import { BearStateManager, GROWTH_STAGES } from './bearState';

// ─── Activity State ───────────────────────────────────────────────────────────

export type ActivityState =
  | 'idle'
  | 'coding'
  | 'thinking'
  | 'resting'
  | 'celebrating'
  | 'morning'
  | 'hungry'
  | 'starving'
  | 'levelup';

// Messages keyed by activity state AND growth level (0–4)
const MESSAGES: Record<ActivityState, string[][]> = {
  morning: [
    ['*blink* ...hi', 'Is it time to code?', 'Good morning! What are we building?'],
    ['Morning! Ready to learn more.', 'Let\'s write some good code today.', 'Another day, another commit.'],
    ['Morning. Coffee acquired? Let\'s go.', 'Fresh day. Clean slate. Ship something.', 'Good morning. The diff awaits.'],
    ['Morning. Already reviewed the PR queue.', 'Up early. Spotted 3 potential issues. Good morning.', 'Morning. Try not to break main today.'],
    ['The code has been waiting. Morning.', 'I have foreseen the merge conflicts. Good morning.', 'Morning. I\'ve already fixed tomorrow\'s bugs.'],
  ],
  idle: [
    ['...', 'Here! Watching.', '*tiny yawn*', 'Waiting patiently.'],
    ['Whenever you\'re ready.', 'No rush.', 'Here with you.', '*looks around*'],
    ['Standing by.', 'Ready when you are.', 'Taking it easy.'],
    ['Waiting. Not judging the idle time.', 'No worries. Thinking too is work.', 'Breathing. You?'],
    ['In silence, bugs reveal themselves.', 'The code will wait. So will I.', 'Patience is a feature.'],
  ],
  coding: [
    ['Watching you type! 👀', 'So many keys!', '*cheers quietly*', 'You\'re doing it!'],
    ['On a roll!', 'Keep going!', 'That looks good.', 'Nice flow.'],
    ['In the zone.', 'That\'s the flow state.', 'Building things. Love it.'],
    ['Clean. Consistent. Nice.', 'You\'ve done this before.', 'That abstraction is elegant.'],
    ['Ah. You see the shape of the solution.', 'The code speaks through you.', 'Ship it.'],
  ],
  thinking: [
    ['*watches you think*', 'Hard problem?', 'Take your time...'],
    ['Thinking it through?', 'The answer is forming.', 'Mulling it over.'],
    ['Deep in thought.', 'Hard problems take time.', 'Pause. Think. Ship.'],
    ['The hardest bugs live in your assumptions.', 'Rubber duck time?', 'Think it through.'],
    ['I already know the answer. But you need to find it yourself.', 'The solution is near.', 'Almost.'],
  ],
  resting: [
    ['*napping* 💤', 'zz...z', '*tiny snore*', 'resting...'],
    ['Taking a break? Good.', 'Rest is part of the work.', 'Back soon?'],
    ['Resting up. Recharging.', 'Still here. No rush.', 'Break time is valid.'],
    ['Even senior devs take breaks.', 'The code will be there.', 'Step away. Come back fresh.'],
    ['Even legends rest.', 'The codebase is fine. (I checked.)', 'Rest. You\'ve earned it.'],
  ],
  celebrating: [
    ['Saved! ✨', 'No errors! 🎉', '*happy wiggle*', 'Clean save!'],
    ['That saved clean!', 'No errors. Dreamy.', 'Ship it!', 'Nice work!'],
    ['Green across the board.', 'That\'s clean code.', 'Satisfying.'],
    ['Exactly as it should be.', 'Clean, consistent, correct.', 'That\'s the standard.'],
    ['Perfection is the baseline here.', 'As expected.', 'Obviously.'],
  ],
  hungry: [
    ['*tummy rumble* 🍯?', 'Excuse me... hungry...', 'Could really use some honey...'],
    ['Getting a bit hungry... 🍯', 'Feed me? I\'ll grow faster!', 'Honey time?'],
    ['Hungry bear = slower growth.', 'A little honey would help...', 'Running low on energy.'],
    ['Even senior bears need fuel.', 'A well-fed bear is a productive bear.', 'Honey supply running low.'],
    ['A legend requires sustenance.', 'Feed me and I will grant you fewer bugs.', 'Honey. Now.'],
  ],
  starving: [
    ['😭 so hungry...', '*dramatic flop*', 'HONEY PLEASE', '...fading...'],
    ['Really hungry now... please...', '🍯🍯🍯', 'I\'m withering here...'],
    ['Code quality drops when the bear starves.', 'Critical hunger level reached.', 'SOS: send honey.'],
    ['This is embarrassing. Feed me.', 'Production bear, starving. Not ideal.', 'Hunger:critical. Feed immediately.'],
    ['I have survived production outages. But not this hunger.', 'Legend bear. Empty stomach. Unacceptable.', 'FEED. THE. BEAR.'],
  ],
  levelup: [
    ['I\'m growing!! 🎉', 'I leveled up!!', '*spins excitedly*', 'Getting bigger!'],
    ['Level up! 🧸', 'I\'m a bigger bear now!', 'Growth achieved!'],
    ['Evolved! 🐻', 'Bigger, wiser, bearier.', 'New form unlocked.'],
    ['🐻‍❄️ Arctic powers activated.', 'I\'ve seen things. I\'ve grown.', 'New stage. Same commitment to shipping.'],
    ['👑 Legendary status confirmed.', 'The prophecy is fulfilled.', 'Maximum bear achieved.'],
  ],
};

const THINKING_DELAY_MS = 12_000;
const HUNGER_CHECK_INTERVAL_MS = 60_000;

export class Companion implements vscode.Disposable {
  private activityState: ActivityState = 'idle';
  private thinkingTimer: ReturnType<typeof setTimeout> | undefined;
  private hungerTimer: ReturnType<typeof setInterval> | undefined;
  private disposables: vscode.Disposable[] = [];
  private context: vscode.ExtensionContext;
  private statusBar: StatusBarManager;
  public bearState: BearStateManager;
  private previousErrorCount = 0;

  constructor(context: vscode.ExtensionContext, statusBar: StatusBarManager) {
    this.context = context;
    this.statusBar = statusBar;
    this.bearState = new BearStateManager(context);
  }

  start(): void {
    this.checkMorningGreeting();
    this.startHungerLoop();

    this.disposables.push(
      vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.contentChanges.length === 0) { return; }
        e.contentChanges.forEach(() => this.bearState.recordKeystroke());

        const chars = e.contentChanges.reduce((s, c) => s + c.text.length, 0);
        if (chars > 0) {
          const { leveledUp, newStage } = this.bearState.addXP(Math.ceil(chars / 10));
          if (this.bearState.isPrestigeReady) {
            const { newPrestigeLevel } = this.bearState.prestige();
            this.triggerPrestige(newPrestigeLevel);
            return;
          }
          if (leveledUp && newStage) {
            this.triggerLevelUp(newStage);
            return;
          }
        }

        this.transitionTo('coding');
        this.resetThinkingTimer();
      }),

      vscode.workspace.onDidSaveTextDocument((doc) => {
        const diagnostics = vscode.languages.getDiagnostics(doc.uri);
        const errorCount = diagnostics.filter(
          (d) => d.severity === vscode.DiagnosticSeverity.Error
        ).length;

        if (errorCount < this.previousErrorCount) {
          const fixed = this.previousErrorCount - errorCount;
          this.bearState.recordErrorFixed();
          const { leveledUp, newStage } = this.bearState.addXP(fixed * 25);
          if (leveledUp && newStage) { this.triggerLevelUp(newStage); }
          this.bearState.addHoney(fixed * 2);
        }

        this.previousErrorCount = errorCount;
        this.bearState.recordSave(0);
        this.bearState.addHoney(1);

        const { leveledUp, newStage } = this.bearState.addXP(10);
        if (this.bearState.isPrestigeReady) {
          const { newPrestigeLevel } = this.bearState.prestige();
          this.triggerPrestige(newPrestigeLevel);
          return;
        }
        if (leveledUp && newStage) { this.triggerLevelUp(newStage); return; }

        if (errorCount === 0) {
          this.transitionTo('celebrating');
          setTimeout(() => {
            if (this.activityState === 'celebrating') { this.transitionTo('coding'); }
          }, 4_000);
        }

        this.statusBar.refresh(this.bearState);
      }),

      vscode.languages.onDidChangeDiagnostics(() => {
        const allDiags = vscode.languages.getDiagnostics();
        let total = 0;
        allDiags.forEach(([, diags]) => {
          total += diags.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length;
        });
        this.previousErrorCount = total;
      })
    );
  }

  private startHungerLoop(): void {
    this.hungerTimer = setInterval(() => {
      this.statusBar.refresh(this.bearState);
      if (this.bearState.isStarving && this.activityState !== 'levelup') {
        this.transitionTo('starving');
      } else if (this.bearState.isHungry && this.activityState === 'idle') {
        this.transitionTo('hungry');
      }
    }, HUNGER_CHECK_INTERVAL_MS);
  }

  private checkMorningGreeting(): void {
    const config = vscode.workspace.getConfiguration('butter');
    if (!config.get('companion.morningGreeting', true)) {
      this.transitionTo('idle');
      return;
    }

    const today = new Date().toDateString();
    if (this.bearState.lastSeenDate !== today) {
      this.bearState.setLastSeenDate(today);
      this.transitionTo('morning');
      if (config.get('companion.showMessages', true)) {
        const stage = this.bearState.stage;
        const msg = this.messageForState('morning');
        vscode.window.showInformationMessage(`${stage.emoji} ${msg}   [${stage.name}]`);
      }
      setTimeout(() => {
        if (this.activityState === 'morning') { this.transitionTo('idle'); }
      }, 8_000);
    } else {
      this.transitionTo('idle');
    }
  }

  private resetThinkingTimer(): void {
    if (this.thinkingTimer !== undefined) { clearTimeout(this.thinkingTimer); }
    this.thinkingTimer = setTimeout(() => {
      if (this.activityState === 'coding') { this.transitionTo('thinking'); }
      this.thinkingTimer = setTimeout(() => {
        if (this.activityState === 'thinking') { this.transitionTo('resting'); }
      }, 30_000);
    }, THINKING_DELAY_MS);
  }

  private triggerLevelUp(newStage: typeof GROWTH_STAGES[0]): void {
    this.transitionTo('levelup');
    const config = vscode.workspace.getConfiguration('butter');
    if (config.get('companion.showMessages', true)) {
      vscode.window.showInformationMessage(
        `${this.bearState.stageEmoji} Your bear grew into a ${newStage.name}!\n"${newStage.personality}"`
      );
    }
    setTimeout(() => {
      if (this.activityState === 'levelup') { this.transitionTo('idle'); }
    }, 6_000);
  }

  private triggerPrestige(level: number): void {
    this.transitionTo('levelup');
    const stars = '🌟'.repeat(Math.min(level, 3));
    const msgs = [
      `${stars} PRESTIGE ${level}! Your bear reset to Cub — but carries the stars of a legend.`,
      `${stars} The bear transcended. Prestige ${level} achieved. Starting over... stronger.`,
      `${stars} Legend → Cub. Prestige ${level}. The cycle continues.`,
    ];
    const config = vscode.workspace.getConfiguration('butter');
    if (config.get('companion.showMessages', true)) {
      vscode.window.showInformationMessage(msgs[Math.floor(Math.random() * msgs.length)]);
    }
    setTimeout(() => {
      if (this.activityState === 'levelup') { this.transitionTo('idle'); }
    }, 8_000);
  }

  transitionTo(next: ActivityState): void {
    if (this.activityState === next) { return; }
    this.activityState = next;
    const msg = this.messageForState(next);
    this.statusBar.updateActivity(next, msg, this.bearState);
  }

  private messageForState(state: ActivityState): string {
    const level = Math.min(this.bearState.stage.level, MESSAGES[state].length - 1);
    const msgs = MESSAGES[state][level];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }

  showCurrentMood(): void {
    const stage = this.bearState.stage;
    const msg = this.messageForState(this.activityState);
    const xp = this.bearState.xpInCurrentStage;
    const toNext = this.bearState.xpToNextStage;
    const honey = this.bearState.honey;
    const hunger = this.bearState.hunger;

    const hungerBar = this.makeBar(hunger, 100, 10);
    const xpBar = this.bearState.isMaxLevel
      ? '████████████ MAX'
      : this.makeBar(xp, toNext, 10);

    vscode.window.showInformationMessage(
      `${stage.emoji} ${stage.name}  •  "${msg}" | ` +
      `Hunger: [${hungerBar}] ${hunger}/100 | ` +
      `XP: [${xpBar}] ${xp}/${this.bearState.isMaxLevel ? '—' : toNext} | ` +
      `🍯 ${honey}  Saves: ${this.bearState.totalSaves}  Errors fixed: ${this.bearState.totalErrorsFixed}`
    );
  }

  private makeBar(value: number, max: number, width: number): string {
    const filled = Math.min(Math.round((value / max) * width), width);
    return '█'.repeat(filled) + '░'.repeat(width - filled);
  }

  dispose(): void {
    if (this.thinkingTimer !== undefined) { clearTimeout(this.thinkingTimer); }
    if (this.hungerTimer !== undefined) { clearInterval(this.hungerTimer); }
    this.disposables.forEach((d) => d.dispose());
  }
}

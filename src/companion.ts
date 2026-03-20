import * as vscode from 'vscode';
import { StatusBarManager } from './statusBar';

type CompanionState = 'idle' | 'coding' | 'thinking' | 'resting' | 'celebrating' | 'morning';

const STATE_MESSAGES: Record<CompanionState, string[]> = {
  morning: [
    'Good morning. Ready when you are.',
    'Morning! The code is waiting.',
    'A fresh start. Let\'s build something good.',
    'Good morning. Coffee optional, shipping mandatory.',
    'Rise and debug. You\'ve got this.',
  ],
  idle: [
    'Waiting here with you.',
    'Whenever you\'re ready.',
    'Standing by.',
    'No rush.',
    'Taking it easy.',
    'Here if you need me.',
  ],
  coding: [
    'On a roll.',
    'That\'s the flow state.',
    'Keep going.',
    'Building things.',
    'Nice.',
    'You\'re in it.',
    'Looking good.',
  ],
  thinking: [
    'Thinking it through...',
    'Hard problems take time.',
    'Taking a moment.',
    'Mulling it over.',
    'The solution is forming.',
    'Pause. Breathe. Think.',
  ],
  resting: [
    'Still here. Take your time.',
    'Taking a break? Good idea.',
    'Rest is part of the work.',
    'When you\'re ready.',
    'No code required right now.',
    'Resting up.',
  ],
  celebrating: [
    'That saved. Clean.',
    'No errors. That\'s the dream.',
    'Ship it.',
    'Looking good!',
    'Green across the board.',
    'Nice work.',
    'That\'s it.',
  ],
};

const THINKING_DELAY_MS = 10_000;
const LAST_SEEN_KEY = 'butter.companion.lastSeenDate';

export class Companion implements vscode.Disposable {
  private state: CompanionState = 'idle';
  private thinkingTimer: ReturnType<typeof setTimeout> | undefined;
  private disposables: vscode.Disposable[] = [];
  private context: vscode.ExtensionContext;
  private statusBar: StatusBarManager;

  constructor(context: vscode.ExtensionContext, statusBar: StatusBarManager) {
    this.context = context;
    this.statusBar = statusBar;
  }

  start(): void {
    this.checkMorningGreeting();

    this.disposables.push(
      vscode.workspace.onDidChangeTextDocument(() => {
        this.transitionTo('coding');
        this.resetThinkingTimer();
      }),

      vscode.workspace.onDidSaveTextDocument((doc) => {
        const diagnostics = vscode.languages.getDiagnostics(doc.uri);
        const hasErrors = diagnostics.some(
          (d) => d.severity === vscode.DiagnosticSeverity.Error
        );
        if (!hasErrors) {
          this.transitionTo('celebrating');
          // After celebrating, return to coding/idle after 5s
          setTimeout(() => {
            if (this.state === 'celebrating') {
              this.transitionTo('coding');
            }
          }, 5_000);
        }
      })
    );
  }

  private checkMorningGreeting(): void {
    const config = vscode.workspace.getConfiguration('butter');
    if (!config.get('companion.morningGreeting', true)) {
      this.transitionTo('idle');
      return;
    }

    const today = new Date().toDateString();
    const lastSeen = this.context.globalState.get<string>(LAST_SEEN_KEY);

    if (lastSeen !== today) {
      this.context.globalState.update(LAST_SEEN_KEY, today);
      this.transitionTo('morning');

      const config = vscode.workspace.getConfiguration('butter');
      if (config.get('companion.showMessages', true)) {
        const msg = this.randomMessage('morning');
        vscode.window.showInformationMessage(`🐻 ${msg}`);
      }

      setTimeout(() => {
        if (this.state === 'morning') {
          this.transitionTo('idle');
        }
      }, 8_000);
    } else {
      this.transitionTo('idle');
    }
  }

  private resetThinkingTimer(): void {
    if (this.thinkingTimer !== undefined) {
      clearTimeout(this.thinkingTimer);
    }

    this.thinkingTimer = setTimeout(() => {
      if (this.state === 'coding') {
        this.transitionTo('thinking');
      }

      const config = vscode.workspace.getConfiguration('butter');
      const activityTimeout = config.get<number>('companion.activityTimeout', 30_000);

      this.thinkingTimer = setTimeout(() => {
        if (this.state === 'thinking') {
          this.transitionTo('resting');
        }
      }, activityTimeout);
    }, THINKING_DELAY_MS);
  }

  transitionTo(next: CompanionState): void {
    if (this.state === next) {
      return;
    }
    this.state = next;
    this.statusBar.update(next, this.randomMessage(next));
  }

  showCurrentMood(): void {
    const msg = this.randomMessage(this.state);
    vscode.window.showInformationMessage(`🐻 [${this.state}] ${msg}`);
  }

  private randomMessage(state: CompanionState): string {
    const msgs = STATE_MESSAGES[state];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }

  dispose(): void {
    if (this.thinkingTimer !== undefined) {
      clearTimeout(this.thinkingTimer);
    }
    this.disposables.forEach((d) => d.dispose());
  }
}

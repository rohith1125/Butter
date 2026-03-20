import * as vscode from 'vscode';

type CompanionState = 'idle' | 'coding' | 'thinking' | 'resting' | 'celebrating' | 'morning';

const STATE_ICONS: Record<CompanionState, string> = {
  morning: '🌅',
  idle:     '🐻',
  coding:   '🐻',
  thinking: '🤔',
  resting:  '💤',
  celebrating: '✨',
};

export class StatusBarManager implements vscode.Disposable {
  private item: vscode.StatusBarItem;

  constructor(context: vscode.ExtensionContext) {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this.item.command = 'butter.companionMood';
    this.item.tooltip = 'Butter Bear — click to see mood';
    this.item.text = '$(squirrel) Butter';
    this.item.show();

    context.subscriptions.push(this.item);
  }

  update(state: CompanionState, message: string): void {
    const icon = STATE_ICONS[state];
    this.item.text = `${icon} ${message}`;
    this.item.tooltip = `Butter Bear is ${state}. Click for details.`;
  }

  hide(): void {
    this.item.hide();
  }

  show(): void {
    this.item.show();
  }

  dispose(): void {
    this.item.dispose();
  }
}

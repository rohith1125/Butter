import * as vscode from 'vscode';
import { ActivityState } from './companion';
import { BearStateManager } from './bearState';

const ACTIVITY_ICONS: Record<ActivityState, string> = {
  morning:     '🌅',
  idle:        '🐾',
  coding:      '⌨️',
  thinking:    '🤔',
  resting:     '💤',
  celebrating: '✨',
  hungry:      '🍯',
  starving:    '😭',
  levelup:     '🎉',
};

export class StatusBarManager implements vscode.Disposable {
  private item: vscode.StatusBarItem;

  constructor(context: vscode.ExtensionContext) {
    this.item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this.item.command = 'butter.bearStats';
    this.item.tooltip = 'Butter Bear — click for stats';
    this.item.text = '🐣 hatching...';
    this.item.show();
    context.subscriptions.push(this.item);
  }

  updateActivity(state: ActivityState, message: string, bearState: BearStateManager): void {
    const stage = bearState.stage;
    const icon = ACTIVITY_ICONS[state] ?? stage.emoji;
    const hunger = bearState.hunger;
    const hungerDot = hunger < 10 ? '🔴' : hunger < 30 ? '🟡' : '';

    this.item.text = `${stage.emoji}${hungerDot} ${message}`;
    this.item.tooltip = [
      `${stage.name} (Level ${stage.level})`,
      `XP: ${bearState.xpInCurrentStage} / ${bearState.isMaxLevel ? '—' : bearState.xpToNextStage}`,
      `Hunger: ${hunger}/100  🍯 Honey: ${bearState.honey}`,
      `State: ${state}  ${icon}`,
      `─────────────────`,
      `Click for full stats`,
      `Run "Feed the Bear" to feed`,
    ].join('\n');
  }

  refresh(bearState: BearStateManager): void {
    const stage = bearState.stage;
    const hunger = bearState.hunger;
    const hungerDot = hunger < 10 ? '🔴' : hunger < 30 ? '🟡' : '';
    const currentText = this.item.text;
    const spaceIdx = currentText.indexOf(' ');
    if (spaceIdx !== -1) {
      this.item.text = `${stage.emoji}${hungerDot}${currentText.slice(spaceIdx)}`;
    }
  }

  hide(): void { this.item.hide(); }
  show(): void { this.item.show(); }
  dispose(): void { this.item.dispose(); }
}

import * as vscode from 'vscode';
import { Companion } from './companion';
import { StatusBarManager } from './statusBar';
import { GROWTH_STAGES } from './bearState';

let companion: Companion | undefined;
let statusBar: StatusBarManager | undefined;

export function activate(context: vscode.ExtensionContext): void {
  const config = vscode.workspace.getConfiguration('butter');

  if (config.get<boolean>('companion.enabled', true)) {
    statusBar = new StatusBarManager(context);
    companion = new Companion(context, statusBar);
    companion.start();
    context.subscriptions.push(companion);
  }

  context.subscriptions.push(

    // ─── Feed the Bear ──────────────────────────────────────────────────────
    vscode.commands.registerCommand('butter.feedBear', async () => {
      if (!companion) {
        vscode.window.showInformationMessage('Enable Butter Bear in settings first.');
        return;
      }

      const bear = companion.bearState;
      const stage = bear.stage;
      const hunger = bear.hunger;
      const honey = bear.honey;

      const hungerLabel = hunger < 10 ? '😭 STARVING' : hunger < 30 ? '🟡 Hungry' : '😊 Content';

      if (honey === 0) {
        vscode.window.showWarningMessage(
          `${stage.emoji} No honey left! Keep coding to earn more 🍯 (1 honey per 50 keystrokes, 1 per save)`
        );
        return;
      }

      const options = [
        {
          label: `🍯 Small snack  (1 honey)`,
          description: `+${bear.isStarving ? '45' : bear.isHungry ? '30' : '15'} XP${bear.isHungry ? '  (hunger bonus!)' : ''}`,
          amount: 1,
        },
        {
          label: `🍯🍯 Good meal  (3 honey)`,
          description: `+${bear.isStarving ? '135' : bear.isHungry ? '90' : '45'} XP`,
          amount: 3,
        },
        {
          label: `🍯🍯🍯 Feast!  (5 honey)`,
          description: `+${bear.isStarving ? '225' : bear.isHungry ? '150' : '75'} XP  (fastest growth)`,
          amount: 5,
        },
      ].filter(o => o.amount <= honey);

      if (options.length === 0) {
        vscode.window.showWarningMessage(`${stage.emoji} Not enough honey for even a snack. Keep coding!`);
        return;
      }

      const pick = await vscode.window.showQuickPick(options, {
        placeHolder: `${stage.emoji} ${stage.name}  •  Hunger: ${hungerLabel}  •  🍯 ${honey} honey`,
        title: 'Feed Butter Bear',
      });

      if (!pick) { return; }

      const result = bear.feedBear(pick.amount);

      if (result.success) {
        companion.transitionTo('celebrating');
        vscode.window.showInformationMessage(
          `${result.reaction} ${result.message}  🍯 ${bear.honey} honey remaining`
        );
        statusBar?.refresh(bear);
        setTimeout(() => {
          if (companion) { companion.transitionTo('idle'); }
        }, 3_000);
      } else {
        vscode.window.showWarningMessage(result.message);
      }
    }),

    // ─── Bear Stats ─────────────────────────────────────────────────────────
    vscode.commands.registerCommand('butter.bearStats', () => {
      if (!companion) {
        vscode.window.showInformationMessage('Butter Bear is disabled.');
        return;
      }

      const bear = companion.bearState;
      const stage = bear.stage;
      const nextStage = GROWTH_STAGES[stage.level + 1];
      const xpProgress = bear.xpInCurrentStage;
      const xpNeeded = bear.xpToNextStage;
      const pct = bear.isMaxLevel ? 100 : Math.floor((xpProgress / xpNeeded) * 100);
      const progressBar = makeBar(pct, 100, 15);
      const hungerBar = makeBar(bear.hunger, 100, 10);

      const lines = [
        `${bear.stageEmoji}  ${stage.name}  (Level ${stage.level} / ${GROWTH_STAGES.length - 1})`,
        `"${stage.personality}"`,
        ``,
        `Progress to ${nextStage ? nextStage.name + ' ' + nextStage.emoji : 'MAX'}`,
        `[${progressBar}] ${pct}%  (${xpProgress} / ${bear.isMaxLevel ? '—' : xpNeeded} XP)`,
        ``,
        `Hunger:  [${hungerBar}]  ${bear.hunger}/100`,
        `Honey:   🍯 ${bear.honey}  (earn by coding & saving)`,
        ``,
        `── All-time stats ──────────────────`,
        `Total saves:       ${bear.totalSaves}`,
        `Errors fixed:      ${bear.totalErrorsFixed}`,
        `Times fed:         ${bear.totalFed} honey total`,
        `Session keystrokes: ${bear.sessionKeystrokes}`,
      ].join('\n');

      vscode.window.showInformationMessage(lines, { modal: true }, 'Feed Bear 🍯', 'Close').then((action) => {
        if (action === 'Feed Bear 🍯') {
          vscode.commands.executeCommand('butter.feedBear');
        }
      });
    }),

    // ─── Toggle Companion ───────────────────────────────────────────────────
    vscode.commands.registerCommand('butter.toggleCompanion', () => {
      if (!statusBar) {
        vscode.window.showInformationMessage(
          'Enable Butter Bear in settings: butter.companion.enabled'
        );
        return;
      }
      statusBar.hide();
      vscode.window.showInformationMessage(
        'Butter Bear hidden. Run "Toggle Butter Bear" to bring them back.'
      );
    }),

    // ─── Switch Theme ───────────────────────────────────────────────────────
    vscode.commands.registerCommand('butter.switchTheme', async () => {
      const themes = [
        'Butter Dark', 'Butter Light', 'Butter Soft',
        'Butter Midnight', 'Butter Mocha', 'Butter Storm',
        'Butter Rose', 'Butter Forest', 'Butter AMOLED', 'Butter HC'
      ];
      const current = vscode.workspace
        .getConfiguration()
        .get<string>('workbench.colorTheme');

      const items = themes.map((t) => ({
        label: t,
        description: t === current ? '● active' : '',
      }));

      const pick = await vscode.window.showQuickPick(items, {
        placeHolder: 'Switch Butter theme variant',
        title: 'Butter Themes',
      });

      if (pick) {
        await vscode.workspace.getConfiguration().update(
          'workbench.colorTheme', pick.label, vscode.ConfigurationTarget.Global
        );
        vscode.window.showInformationMessage(`Switched to ${pick.label} 🧈`);
      }
    }),

    // ─── Companion Mood (legacy) ─────────────────────────────────────────────
    vscode.commands.registerCommand('butter.companionMood', () => {
      vscode.commands.executeCommand('butter.bearStats');
    })
  );
}

function makeBar(value: number, max: number, width: number): string {
  const filled = Math.min(Math.round((value / max) * width), width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
}

export function deactivate(): void {
  companion = undefined;
  statusBar = undefined;
}

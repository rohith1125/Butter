import * as vscode from 'vscode';
import { Companion } from './companion';
import { StatusBarManager } from './statusBar';

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
    vscode.commands.registerCommand('butter.toggleCompanion', () => {
      if (!statusBar) {
        vscode.window.showInformationMessage(
          'Butter Bear is disabled. Set butter.companion.enabled to true in settings.'
        );
        return;
      }
      // Toggle visibility by checking current text
      const isVisible = statusBar !== undefined;
      if (isVisible) {
        statusBar.hide();
        vscode.window.showInformationMessage('Butter Bear hidden. Use butter.toggleCompanion to bring them back.');
      } else {
        statusBar.show();
      }
    }),

    vscode.commands.registerCommand('butter.switchTheme', async () => {
      const themes = ['Butter Dark', 'Butter Light', 'Butter Soft'];
      const current = vscode.workspace
        .getConfiguration()
        .get<string>('workbench.colorTheme');

      const items = themes.map((t) => ({
        label: t,
        description: t === current ? '(active)' : '',
      }));

      const pick = await vscode.window.showQuickPick(items, {
        placeHolder: 'Switch Butter theme variant',
      });

      if (pick) {
        await vscode.workspace
          .getConfiguration()
          .update(
            'workbench.colorTheme',
            pick.label,
            vscode.ConfigurationTarget.Global
          );
        vscode.window.showInformationMessage(`Switched to ${pick.label}`);
      }
    }),

    vscode.commands.registerCommand('butter.companionMood', () => {
      if (companion) {
        companion.showCurrentMood();
      } else {
        vscode.window.showInformationMessage(
          'Butter Bear is disabled. Enable with butter.companion.enabled in settings.'
        );
      }
    })
  );
}

export function deactivate(): void {
  companion = undefined;
  statusBar = undefined;
}

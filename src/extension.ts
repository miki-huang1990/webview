import * as vscode from 'vscode';
import { TreeViewProvider } from './TreeViewProvider';
import { createWebView } from './WebView';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('webview.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from webview!');
	});
  context.subscriptions.push(disposable);
  

  TreeViewProvider.initTreeViewItem();
  context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
    vscode.window.showInformationMessage(label);
    const webView = createWebView(context, vscode.ViewColumn.Active, label);
    context.subscriptions.push(webView);
  }));
}

// This method is called when your extension is deactivated
export function deactivate() {}

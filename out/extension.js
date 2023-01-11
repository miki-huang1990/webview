"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const TreeViewProvider_1 = require("./TreeViewProvider");
const WebView_1 = require("./WebView");
function activate(context) {
    let disposable = vscode.commands.registerCommand('webview.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from webview!');
    });
    context.subscriptions.push(disposable);
    TreeViewProvider_1.TreeViewProvider.initTreeViewItem();
    context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
        vscode.window.showInformationMessage(label);
        const webView = (0, WebView_1.createWebView)(context, vscode.ViewColumn.Active, label);
        context.subscriptions.push(webView);
    }));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
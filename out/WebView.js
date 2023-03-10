"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIframeHtml = exports.createWebView = void 0;
const vscode_1 = require("vscode");
// 创建一个全局变量，类型为：WebviewPanel 或者 undefined
let webviewPanel;
const VIEW_MAP = new Map([
    ['pig1', 'baidu'],
    ['pig2', 'news.baidu'],
    ['pig3', 'map.baidu']
]);
// 创建一个可导出的方法,并且带上参数
function createWebView(context, // 上面的代码刚介绍过，可忽略
viewColumn, // 窗口编辑器
label // 传递进来的一个 label 值，就是点击树视图项 showInformationMessage 的值
) {
    if (webviewPanel === undefined) {
        // 上面重点讲解了 createWebviewPanel 传递4个参数
        webviewPanel = vscode_1.window.createWebviewPanel('webView', // 标识，随意命名
        label, // 面板标题
        viewColumn, // 展示在哪个面板上
        {
            retainContextWhenHidden: true,
            enableScripts: true // 下面的 html 页可以使用 Scripts
        });
        // 面板嵌入 html getIframeHtml() 方法在下面
        webviewPanel.webview.html = getIframeHtml(label);
    }
    else {
        // 如果面板已经存在，重新设置标题
        webviewPanel.title = label;
        webviewPanel.webview.postMessage({ label: label });
        webviewPanel.reveal(); // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
    }
    // onDidDispose: 如果关闭该面板，将 webviewPanel 置 undefined
    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });
    return webviewPanel;
}
exports.createWebView = createWebView;
// 这个方法没什么了，就是一个 最简单的嵌入 iframe 的 html 页面
function getIframeHtml(label) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>
        <script>

            window.addEventListener('message', (e) => {
              const VIEW_MAP = {
                'pig1': 'baidu',
                'pig2': 'news.baidu',
                'pig3': 'map.baidu',
              }
                document.getElementById('iframe1').src = 'https://www.'+VIEW_MAP[e.data.label]+'.com/';
            })
            
        </script>
        <body>
        <iframe id='iframe1' class="iframeDiv" src="https://www.${VIEW_MAP.get(label)}.com/" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}
exports.getIframeHtml = getIframeHtml;
//# sourceMappingURL=WebView.js.map
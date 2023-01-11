"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewProvider = exports.TreeItemNode = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
// 创建每一项 label 对应的图片名称
// 其实就是一个Map集合，用 ts 的写法
const ITEM_ICON_MAP = new Map([
    ['pig1', 'pig1.svg'],
    ['pig2', 'pig2.svg'],
    ['pig3', 'pig3.svg']
]);
// 第一步：创建单项的节点(item)的类
class TreeItemNode extends vscode_1.TreeItem {
    constructor(
    // readonly 只可读
    label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        // command: 为每项添加点击事件的命令
        this.command = {
            title: this.label,
            command: 'itemClick',
            tooltip: this.label,
            arguments: [
                this.label, // 目前这里我们只传递一个 label
            ]
        };
        // iconPath： 为该项的图标因为我们是通过上面的 Map 获取的，所以我额外写了一个方法，放在下面
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    static getIconUriForLabel(label) {
        return vscode_1.Uri.file((0, path_1.join)(__filename, '..', '..', 'media', ITEM_ICON_MAP.get(label) + ''));
    }
}
exports.TreeItemNode = TreeItemNode;
class TreeViewProvider {
    // 自动弹出
    // 获取树视图中的每一项 item,所以要返回 element
    getTreeItem(element) {
        return element;
    }
    // 自动弹出，但是我们要对内容做修改
    // 给每一项都创建一个 TreeItemNode
    getChildren(element) {
        return ['pig1', 'pig2', 'pig3'].map(item => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    // 这个静态方法时自己写的，你要写到 extension.ts 也可以
    static initTreeViewItem() {
        // 实例化 TreeViewProvider
        const treeViewProvider = new TreeViewProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        vscode_1.window.registerTreeDataProvider('treeView-item', treeViewProvider);
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=TreeViewProvider.js.map
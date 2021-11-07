"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    // let disposable = vscode.commands.registerCommand('helloworld.world', () => {
    // 	// The code you place here will be executed every time your command is executed
    // 	// Display a message box to the user
    // 	var uri = vscode.Uri.file(`D:\\Documents\\DeleteLater\\test.js`);
    // 	var folder = vscode.workspace.getWorkspaceFolder(uri);
    // 	// vscode.window.showInformationMessage(`${uri} is the uri`);
    // 	if (folder != null)
    // 		vscode.window.showInformationMessage(`${folder.name} ${folder.uri} is the folder`);
    // 	// var folders = vscode.workspace.workspaceFolders;
    // 	// if (folders != null ) {
    // 	// 	vscode.window.showInformationMessage(`${folders[0].name} is the current workspace folders name`);
    // 	// }
    // 	var folders = vscode.workspace.workspaceFolders;
    // 	if (folders != null ) {
    // 		vscode.window.showInformationMessage(`${folders[0].name} is the current workspace folders name`);
    // 	}
    // });
    let disposable = vscode.commands.registerCommand('helloworld.world', () => {
        let message;
        let wf, f;
        if (vscode.workspace.workspaceFolders !== undefined) {
            wf = vscode.workspace.workspaceFolders[0].uri.path;
            f = vscode.workspace.workspaceFolders[0].uri.fsPath;
            message = `YOUR-EXTENSION: folder: ${wf} - ${f}`;
            // vscode.window.showInformationMessage(message);
        }
        else {
            message = "YOUR-EXTENSION: Working folder not found, open a folder an try again";
            vscode.window.showErrorMessage(message);
            // TODO stop function
        }
        var editor = vscode.window.activeTextEditor;
        if (editor) {
            // ****************** Get selected stylesheets URI's
            const document = editor.document;
            const selection = editor.selection;
            const word = document.getText(selection).trim();
            // regex for if string is an HTML element
            const reg = new RegExp(/<\/?[a-z][\s\S]*>/i);
            const isHTML = reg.test(word);
            // TODO: bug with isHTML
            const INDEX_OF_HREF_FIRST_QUOTATION = 5;
            if (isHTML) {
                let index = word.indexOf("href=");
                let subWord = word.substring(index);
                let quotation = subWord.charAt(INDEX_OF_HREF_FIRST_QUOTATION);
                let end;
                if (quotation === `"`) {
                    end = subWord.indexOf(`"`, INDEX_OF_HREF_FIRST_QUOTATION + 1);
                }
                else {
                    end = subWord.indexOf(`'`, INDEX_OF_HREF_FIRST_QUOTATION + 1);
                }
                subWord = subWord.substring(0, end).replace(/href=["']|["']/, '');
                var uri = vscode.Uri.file(`${f}/` + subWord);
                // vscode.window.showInformationMessage(`${uri} uri`);
                // vscode.window.showInformationMessage(`${uri.path} uri`);
                // vscode.workspace.openTextDocument(uri.path);
                vscode.window.showInformationMessage(`${editor} document`);
                const document = editor.document;
                editor.edit(editBuilder => {
                    editor.selections.forEach(sel => {
                        // const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                        let word = document.getText();
                        vscode.window.showErrorMessage(word);
                        let reversed = word.split('').reverse().join('');
                        // editBuilder.replace(range, reversed);
                    });
                }); // apply the (accumulated) replacement(s) (if multiple cursors/selections)
            }
            /*
            const text = document.getText();
            // vscode.window.showInformationMessage(`${text} text`);

            // Get all stylesheets

            let cssFiles = [];
            let indexCSS = text.indexOf("href=");

            while (indexCSS !== -1) {
                let subText = text.substring(indexCSS);
                let quotation = subText.charAt(INDEX_OF_HREF_FIRST_QUOTATION);
                let end;
                if (quotation === `"`) {
                    end = subText.indexOf(`"`, INDEX_OF_HREF_FIRST_QUOTATION + 1);
                } else {
                    end = subText.indexOf(`'`, INDEX_OF_HREF_FIRST_QUOTATION + 1);
                }
                indexCSS = text.indexOf("href=", indexCSS + 1);

                let cssFile = subText.substring(0, end + 1);//.replace(/href=["']|["']/, '');
                cssFiles.push(cssFile);
            }

            // vscode.window.showInformationMessage(`${cssFiles} cssFiles`);

            // Get all class or id names
            const INDEX_OF_CLASS_FIRST_QUOTATION = 6;
            const INDEX_OF_ID_FIRST_QUOTATION = 3;
            let classTags = [];
            let idTags = [];

            // while (index !== -1) {
            // 	let subText = text.substring(index);
            // 	let classTag;
            // 	if (subText.includes("class=")) {
            // 		let quotation = subText.charAt(INDEX_OF_CLASS_FIRST_QUOTATION);
            // 		let end;
            // 		if (quotation === `"`) {
            // 			end = subText.indexOf(`"`, INDEX_OF_CLASS_FIRST_QUOTATION + 1);
            // 		} else {
            // 			end = subText.indexOf(`'`, INDEX_OF_CLASS_FIRST_QUOTATION + 1);
            // 		}
            // 		index = text.indexOf("class=", index + 1);
            // 		classTag = subText.substring(0, end + 1);//.replace(/class=["']|["']/, '');
            // 	}
            // 	classTags.push(classTag);
            // }
            // vscode.window.showInformationMessage(`${classTags} classTags`);
            classTags = getAttributes("class", text);
            idTags = getAttributes("id", text);
            vscode.window.showInformationMessage(`${classTags} classTags`);

            vscode.window.showInformationMessage(`${idTags} idTags`);
            // Check if class name exists in any stylesheets

            */
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function getAttributes(attribute, htmlString) {
    attribute = attribute + "=";
    const INDEX_OF_FIRST_QUOTATION = attribute.length;
    let index = htmlString.indexOf(attribute);
    let attributeValues = [];
    while (index !== -1) {
        let subText = htmlString.substring(index);
        let attributeValue;
        // vscode.window.showErrorMessage(`${subText} subText`);
        if (subText.includes(attribute)) {
            let quotation = subText.charAt(INDEX_OF_FIRST_QUOTATION);
            let end;
            if (quotation === `"`) {
                end = subText.indexOf(`"`, INDEX_OF_FIRST_QUOTATION + 1);
            }
            else {
                end = subText.indexOf(`'`, INDEX_OF_FIRST_QUOTATION + 1);
            }
            index = htmlString.indexOf(attribute, index + 1);
            attributeValue = subText.substring(0, end + 1); //.replace(/class=["']|["']/, '');
        }
        else {
        }
        attributeValues.push(attributeValue);
    }
    return attributeValues;
}
//# sourceMappingURL=extension.js.map
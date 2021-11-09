
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
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
		// let message;
		let wf, f;
		if (vscode.workspace.workspaceFolders !== undefined) {
			wf = vscode.workspace.workspaceFolders[0].uri.path;
			f = vscode.workspace.workspaceFolders[0].uri.fsPath;

			// 	message = `YOUR-EXTENSION: folder: ${wf} - ${f}`;

			// 	// vscode.window.showInformationMessage(message);
			// }
			// else {
			// 	message = "YOUR-EXTENSION: Working folder not found, open a folder an try again";

			// 	vscode.window.showErrorMessage(message);

			// 	// TODO stop function
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

				const text = document.getText();
				
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
					
					let cssFile = subText.substring(0, end + 1);
					cssFiles.push(cssFile);
				}
				
				// Get all class or id names
				const INDEX_OF_CLASS_FIRST_QUOTATION = 6;
				const INDEX_OF_ID_FIRST_QUOTATION = 3;
				let classTags = [];
				let idTags = [];
				
				classTags = getAttributes("class", text);
				idTags = getAttributes("id", text);
				
				vscode.window.showInformationMessage(`${classTags} classTags`);
				vscode.window.showInformationMessage(`${idTags} idTags`);
				
				// Check if class name exists in any stylesheets
				// TODO : ^
				var newClasses = [];
				var newIds = [];
				// 1) Get uri's from css files
				// 2) For each css file, get text
				// 3) For each class/id, check if text contains class/id, then add to newClasses/newId
				//    else don't add
				// 4) repeat to step 2)


				// Get selected css file
				let index = word.indexOf("href=");
				let subWord = word.substring(index);
				let quotation = subWord.charAt(INDEX_OF_HREF_FIRST_QUOTATION);
				let end;
				if (quotation === `"`) {
					end = subWord.indexOf(`"`, INDEX_OF_HREF_FIRST_QUOTATION + 1);
				} else {
					end = subWord.indexOf(`'`, INDEX_OF_HREF_FIRST_QUOTATION + 1);
				}
				subWord = subWord.substring(0, end).replace(/href=["']|["']/, '');

				var uri = vscode.Uri.file(`${wf}/` + subWord);
				if (uri !== undefined) {
					var setting: vscode.Uri = vscode.Uri.parse(`${wf}/` + subWord);
					vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
						vscode.window.showTextDocument(a, 1, false).then(e => {
							e.edit(edit => {
								edit.insert(new vscode.Position(e.document.lineCount, 0), "\n\nYour advertisement here");
							});
						});
					}, (error: any) => {
						console.error(error);
						debugger;
					});
				}
				
			}
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getAttributes(attribute: string, htmlString: string) {
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
			} else {
				end = subText.indexOf(`'`, INDEX_OF_FIRST_QUOTATION + 1);
			}

			index = htmlString.indexOf(attribute, index + 1);
			attributeValue = subText.substring(0, end + 1);//.replace(/class=["']|["']/, '');
		} else {

		}
		attributeValues.push(attributeValue);
	}

	return attributeValues;
}
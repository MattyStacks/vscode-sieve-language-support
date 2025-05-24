// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Sieve Language Support extension is now active!');

	// Register language configuration and providers for Sieve files
	// The TextMate grammar and language configuration files handle the syntax highlighting
	// Additional language features could be added here in the future
}

// This method is called when your extension is deactivated
export function deactivate() {}

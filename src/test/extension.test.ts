import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Sieve Language Support Test Suite', () => {
	vscode.window.showInformationMessage('Start Sieve Language Support tests.');
	test('Extension should be present', () => {
		const extension = vscode.extensions.getExtension('your-publisher-name.sieve-language-support');
		assert.ok(extension, 'Extension should be found');
	});

	test('Should activate extension', async () => {
		const extension = vscode.extensions.getExtension('your-publisher-name.sieve-language-support');
		if (extension) {
			await extension.activate();
			assert.ok(extension.isActive, 'Extension should be active');
		}
	});

	test('Should recognize Sieve file types', async () => {
		// Create a new document with .sieve extension
		const doc = await vscode.workspace.openTextDocument({
			language: 'sieve',
			content: '# Test Sieve script\nrequire ["fileinto"];\nkeep;'
		});
		
		assert.strictEqual(doc.languageId, 'sieve', 'Language should be identified as sieve');
	});
});

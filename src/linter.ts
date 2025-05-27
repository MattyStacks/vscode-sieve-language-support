import * as vscode from 'vscode';

// Sieve linting rules and validation
interface SieveLintRule {
    pattern: RegExp;
    message: string;
    severity: vscode.DiagnosticSeverity;
}

const SIEVE_LINT_RULES: SieveLintRule[] = [
    {
        pattern: /require\s+\[\s*\]/,
        message: "Empty require statement - specify required capabilities",
        severity: vscode.DiagnosticSeverity.Warning
    },
    {
        pattern: /fileinto\s+"[^"]*"\s*;?\s*(?!stop)/,
        message: "Consider adding 'stop' after fileinto to prevent further processing",
        severity: vscode.DiagnosticSeverity.Information
    },
    {
        pattern: /^\s*keep\s*;\s*\S/m,
        message: "Code after 'keep' will not be executed",
        severity: vscode.DiagnosticSeverity.Warning
    },
    {
        pattern: /header\s+:contains\s+"[^"]*"\s+""/,
        message: "Empty string in header test will always match",
        severity: vscode.DiagnosticSeverity.Error
    }
];

export function createSieveLinter(): vscode.Disposable {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('sieve');
    
    const lintDocument = (document: vscode.TextDocument) => {
        if (document.languageId !== 'sieve') {
            return;
        }

        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const lines = text.split('\n');

        // Apply linting rules
        SIEVE_LINT_RULES.forEach(rule => {
            let match;
            const regex = new RegExp(rule.pattern.source, rule.pattern.flags + 'g');
            
            while ((match = regex.exec(text)) !== null) {
                const startPos = document.positionAt(match.index);
                const endPos = document.positionAt(match.index + match[0].length);
                const range = new vscode.Range(startPos, endPos);
                
                const diagnostic = new vscode.Diagnostic(
                    range,
                    rule.message,
                    rule.severity
                );
                diagnostic.source = 'sieve-lint';
                diagnostics.push(diagnostic);
            }
        });

        // Check for basic syntax issues
        lines.forEach((line, lineIndex) => {
            const trimmed = line.trim();
            
            // Check for missing semicolons on action statements
            if (/^(keep|discard|redirect|fileinto|reject)\b.*[^;]\s*$/.test(trimmed) && !trimmed.startsWith('#')) {
                const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                diagnostics.push(new vscode.Diagnostic(
                    range,
                    'Action statements should end with semicolon',
                    vscode.DiagnosticSeverity.Warning
                ));
            }
        });

        diagnosticCollection.set(document.uri, diagnostics);
    };

    // Set up event listeners
    const disposables = [
        diagnosticCollection,
        vscode.workspace.onDidOpenTextDocument(lintDocument),
        vscode.workspace.onDidChangeTextDocument(e => lintDocument(e.document)),
        vscode.workspace.onDidSaveTextDocument(lintDocument)
    ];

    // Lint all open Sieve documents
    vscode.workspace.textDocuments.forEach(lintDocument);

    return vscode.Disposable.from(...disposables);
}

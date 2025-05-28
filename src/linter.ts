import * as vscode from 'vscode';

// Sieve linting rules and validation
interface SieveLintRule {
    pattern: RegExp;
    message: string;
    severity: vscode.DiagnosticSeverity;
    category?: 'basic' | 'protonmail' | 'best-practice' | 'syntax';
}

const SIEVE_LINT_RULES: SieveLintRule[] = [
    // Basic syntax validation
    {
        pattern: /require\s+\[\s*\]/,
        message: "Empty require statement - specify required capabilities",
        severity: vscode.DiagnosticSeverity.Warning,
        category: 'syntax'
    },
    {
        pattern: /header\s+:contains\s+"[^"]*"\s+""/,
        message: "Empty string in header test will always match",
        severity: vscode.DiagnosticSeverity.Error,
        category: 'basic'
    },    // Note: keep/discard/stop validation is handled by smart analysis below, not regex
    
    // ProtonMail specific validation
    {
        pattern: /require\s+\[.*"vnd\.proton\.[^"]*".*\]/,
        message: "ProtonMail extension detected - ensure you're using ProtonMail's Sieve implementation",
        severity: vscode.DiagnosticSeverity.Information,
        category: 'protonmail'    },
    {
        pattern: /:addrbook:(personal|myself|organization)/,
        message: "ProtonMail contact list integration detected",
        severity: vscode.DiagnosticSeverity.Information,
        category: 'protonmail'
    },
    {
        pattern: /:incomingdefaults:(inbox|spam)/,
        message: "ProtonMail Allow/Block list integration detected",
        severity: vscode.DiagnosticSeverity.Information,
        category: 'protonmail'
    },
    {
        pattern: /vacation.*(?!:handle)/,
        message: "ProtonMail: Consider using :handle parameter for multiple vacation responses",
        severity: vscode.DiagnosticSeverity.Information,
        category: 'protonmail'
    },

    // Regular expression validation
    {
        pattern: /:regex.*\\[bwWd]/,
        message: "ProtonMail: Regex shorthand (\\b, \\w, \\W, \\d) not supported in Sieve - use full character classes",
        severity: vscode.DiagnosticSeverity.Error,
        category: 'protonmail'
    },
    
    // Folder/Label validation
    {
        pattern: /fileinto\s+"[^"]*\/[^"]*[^\\]\/[^"]*"/,
        message: "ProtonMail: Use escaped slashes (\\/) for literal slashes in folder names",
        severity: vscode.DiagnosticSeverity.Warning,
        category: 'protonmail'
    },

    // Size validation
    {
        pattern: /size\s+:(over|under)\s+(\d+)([KMG]?)\b/,
        message: "ProtonMail: Size filtering shows encrypted size, not actual content size",
        severity: vscode.DiagnosticSeverity.Information,
        category: 'protonmail'
    }
];

export function createSieveLinter(): vscode.Disposable {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('sieve');
    
    const lintDocument = (document: vscode.TextDocument) => {
        if (document.languageId !== 'sieve') {
            return;
        }

        // Check if linting is enabled
        const config = vscode.workspace.getConfiguration('sieve.linting');
        const isEnabled = config.get<boolean>('enabled', true);
        const protonmailEnabled = config.get<boolean>('protonmail', true);
        const bestPracticesEnabled = config.get<boolean>('bestPractices', true);
        const minSeverity = config.get<string>('severity', 'warning');

        if (!isEnabled) {
            diagnosticCollection.set(document.uri, []);
            return;
        }

        const diagnostics: vscode.Diagnostic[] = [];
        const text = document.getText();
        const lines = text.split('\n');

        // Filter rules based on settings
        const activeRules = SIEVE_LINT_RULES.filter(rule => {
            if (rule.category === 'protonmail' && !protonmailEnabled) {
                return false;
            }
            if (rule.category === 'best-practice' && !bestPracticesEnabled) {
                return false;
            }
            return true;
        });

        // Helper function to check severity threshold
        const shouldIncludeDiagnostic = (severity: vscode.DiagnosticSeverity): boolean => {
            const severityOrder = ['error', 'warning', 'info'];
            const ruleSeverityIndex = severity === vscode.DiagnosticSeverity.Error ? 0 :
                                   severity === vscode.DiagnosticSeverity.Warning ? 1 : 2;
            const minSeverityIndex = severityOrder.indexOf(minSeverity);
            return ruleSeverityIndex <= minSeverityIndex;
        };        // Apply linting rules
        activeRules.forEach(rule => {
            if (!shouldIncludeDiagnostic(rule.severity)) {
                return;
            }

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
                diagnostic.source = rule.category ? `sieve-${rule.category}` : 'sieve-lint';
                
                // Add related information for ProtonMail specific rules
                if (rule.category === 'protonmail') {
                    diagnostic.relatedInformation = [
                        new vscode.DiagnosticRelatedInformation(
                            new vscode.Location(document.uri, range),
                            'See ProtonMail Sieve documentation: https://proton.me/support/sieve-advanced-custom-filters'
                        )
                    ];
                }
                
                diagnostics.push(diagnostic);
            }
        });        // Smart best practice analysis for action statements followed by stop
        if (bestPracticesEnabled) {
            lines.forEach((line, lineIndex) => {
                const trimmed = line.trim();
                
                // Check for action statements that should have stop
                const actionMatch = trimmed.match(/^(fileinto|reject|vacation)\s+/);
                if (actionMatch && trimmed.endsWith(';')) {
                    // Check if stop is already on the same line
                    if (trimmed.includes('stop;')) {
                        return; // Stop is already present on the same line
                    }
                    
                    // Check if the next non-empty, non-comment line has stop
                    let nextLineIndex = lineIndex + 1;
                    let hasStopNext = false;
                    
                    while (nextLineIndex < lines.length) {
                        const nextLine = lines[nextLineIndex].trim();
                        if (nextLine && !nextLine.startsWith('#')) {
                            // Check if this line contains stop
                            if (nextLine === 'stop;' || nextLine.startsWith('stop;') || nextLine.includes('stop;')) {
                                hasStopNext = true;
                            }
                            break; // Found the next non-empty, non-comment line
                        }
                        nextLineIndex++;
                    }
                    
                    // Only suggest stop if no stop is found
                    if (!hasStopNext) {
                        const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                        if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Information)) {
                            diagnostics.push(new vscode.Diagnostic(
                                range,
                                `Consider adding 'stop' after ${actionMatch[1]} to prevent further processing`,
                                vscode.DiagnosticSeverity.Information
                            ));
                        }
                    }
                }
                
                // Check for terminal actions (keep, discard, stop) with code after them on the same line
                const terminalMatch = trimmed.match(/^(keep|discard|stop)\s*;\s*(.+)/);
                if (terminalMatch && terminalMatch[2].trim()) {
                    const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                    if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Warning)) {
                        diagnostics.push(new vscode.Diagnostic(
                            range,
                            `Code after '${terminalMatch[1]}' will not be executed`,
                            vscode.DiagnosticSeverity.Warning
                        ));
                    }
                }
            });
        }

        // Check for basic syntax issues
        lines.forEach((line, lineIndex) => {
            const trimmed = line.trim();
            
            // Check for missing semicolons on action statements
            if (/^(keep|discard|redirect|fileinto|reject|vacation|notify|flag|addflag|removeflag|setflag|expire|unexpire)\b.*[^;]\s*$/.test(trimmed) && !trimmed.startsWith('#')) {
                const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Warning)) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'Action statements should end with semicolon',
                        vscode.DiagnosticSeverity.Warning
                    ));
                }
            }

            // Check for missing require statements for extensions
            if (trimmed.includes('fileinto') && !text.includes('require') && !text.includes('"fileinto"')) {
                const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Error)) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'fileinto requires: require ["fileinto"];',
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }

            if (trimmed.includes('vacation') && !text.includes('"vacation"')) {
                const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Error)) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'vacation requires: require ["vacation"]; (ProtonMail: paid plans only)',
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }

            if (trimmed.includes('reject') && !text.includes('"reject"')) {
                const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Error)) {
                    diagnostics.push(new vscode.Diagnostic(
                        range,
                        'reject requires: require ["reject"];',
                        vscode.DiagnosticSeverity.Error
                    ));
                }
            }            // ProtonMail-specific extension requirements (only if ProtonMail linting is enabled)
            if (protonmailEnabled) {
                // Check for expire usage
                if (trimmed.includes('expire') && !trimmed.startsWith('#')) {
                    // More robust check for the require statement
                    const hasExpireRequire = /require\s*\[.*"vnd\.proton\.expire".*\]/s.test(text);
                    if (!hasExpireRequire) {
                        const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                        if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Information)) {
                            diagnostics.push(new vscode.Diagnostic(
                                range,
                                'ProtonMail: expire requires: require ["vnd.proton.expire"]; (add to enable ProtonMail expire extension)',
                                vscode.DiagnosticSeverity.Information
                            ));
                        }
                    }
                }

                if (trimmed.includes(':addrbook:') && !text.includes('"extlists"')) {
                    const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                    if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Error)) {
                        diagnostics.push(new vscode.Diagnostic(
                            range,
                            'Contact list access requires: require ["extlists"]; (ProtonMail only)',
                            vscode.DiagnosticSeverity.Error
                        ));
                    }
                }

                if (trimmed.includes(':eval') && !text.includes('"vnd.proton.eval"')) {
                    const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                    if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Error)) {
                        diagnostics.push(new vscode.Diagnostic(
                            range,
                            'eval requires: require ["vnd.proton.eval"]; (ProtonMail only)',
                            vscode.DiagnosticSeverity.Error
                        ));
                    }
                }

                // Check for potential folder/label issues
                if (trimmed.includes('fileinto') && trimmed.includes('/') && !trimmed.includes('\\/')) {
                    const range = new vscode.Range(lineIndex, 0, lineIndex, line.length);
                    if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Information)) {
                        diagnostics.push(new vscode.Diagnostic(
                            range,
                            'ProtonMail: Folders use "/" as separator, escape literal slashes with "\\/"',
                            vscode.DiagnosticSeverity.Information
                        ));
                    }
                }
            }
        });

        // Validate expiration values for ProtonMail (only if ProtonMail linting is enabled)
        if (protonmailEnabled) {
            const expireMatches = text.matchAll(/expire\s+"day"\s+"(\d+)"/g);
            for (const match of expireMatches) {
                const days = parseInt(match[1]);
                if (days > 730) {
                    const startPos = document.positionAt(match.index!);
                    const endPos = document.positionAt(match.index! + match[0].length);
                    const range = new vscode.Range(startPos, endPos);
                    
                    if (shouldIncludeDiagnostic(vscode.DiagnosticSeverity.Warning)) {
                        diagnostics.push(new vscode.Diagnostic(
                            range,
                            `ProtonMail: Expiration time ${days} days exceeds maximum of 730 days and will be capped`,
                            vscode.DiagnosticSeverity.Warning
                        ));
                    }
                }
            }
        }

        diagnosticCollection.set(document.uri, diagnostics);
    };

    // Set up event listeners
    const disposables = [
        diagnosticCollection,
        vscode.workspace.onDidOpenTextDocument(lintDocument),
        vscode.workspace.onDidChangeTextDocument(e => lintDocument(e.document)),
        vscode.workspace.onDidSaveTextDocument(lintDocument),
        // Re-lint when configuration changes
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('sieve.linting')) {
                vscode.workspace.textDocuments.forEach(lintDocument);
            }
        })
    ];

    // Lint all open Sieve documents
    vscode.workspace.textDocuments.forEach(lintDocument);

    return vscode.Disposable.from(...disposables);
}

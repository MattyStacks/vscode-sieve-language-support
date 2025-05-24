<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Sieve Language Support VS Code Extension

This is a VS Code extension project for the Sieve email filtering language. Please use the get_vscode_api with a query as input to fetch the latest VS Code API references.

## Project Structure
- `src/extension.ts` - Main extension entry point
- `syntaxes/sieve.tmLanguage.json` - TextMate grammar for Sieve language
- `package.json` - Extension manifest with language contributions

## Language Features
- Syntax highlighting for Sieve email filtering scripts
- File associations for .sieve and .siv files
- Support for Sieve RFC 5228 syntax and common extensions

## Development Guidelines
- Follow VS Code extension best practices
- Use TypeScript for all extension code
- Ensure proper grammar scoping for syntax highlighting
- Test with various Sieve script examples

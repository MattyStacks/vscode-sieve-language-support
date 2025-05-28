# Sieve Test Files

This directory contains various Sieve script examples and test files for the VS Code extension.

## 📋 Test File Directory

### Basic Examples
- **`simple-test.sieve`** - Basic Sieve syntax demonstration
- **`example.sieve`** - General Sieve email filtering examples  
- **`test-extension.sieve`** - Simple extension testing script

### Advanced Examples
- **`test-advanced.sieve`** - Complex Sieve features and syntax

### Linting Test Files
- **`test-linting-demo.sieve`** - Basic linting error demonstrations
- **`test-linter.sieve`** - Original linter test file
- **`test-expire-validation.sieve`** - Tests expire statement validation (7-day vs 730+ day warnings)
- **`test-stop-validation.sieve`** - Tests smart stop statement suggestions (recognizes when stop is already present)
- **`debug-warnings.sieve`** - Simple debug file for testing warning behavior
- **`comprehensive-test.sieve`** - Complete test of all linting rules and scenarios
- **`test-basic-expire.sieve`** - Basic expire usage without ProtonMail extensions (demonstrates ProtonMail linting toggle)

### ProtonMail-Specific Tests
- **`test-protonmail-demo.sieve`** - ProtonMail extension examples
- **`test-protonmail-linter.sieve`** - Comprehensive ProtonMail linting demonstrations

## 🧪 How to Use These Files

### For Testing the Extension
1. Press `F5` in VS Code to launch Extension Development Host
2. Open any of these files in the new window
3. Observe syntax highlighting and linting behavior

### For Learning Sieve
- Start with `simple-test.sieve` for basic syntax
- Progress to `example.sieve` for practical examples
- Explore `test-advanced.sieve` for complex features
- Use ProtonMail files if using ProtonMail's Sieve implementation

### For Development
- Use linting test files to verify error detection
- Create new test files to validate specific features
- Reference these files when writing documentation

## 🎯 Expected Behavior

When opening these files with the extension active, you should see:
- **Syntax Highlighting**: Keywords, commands, strings, comments properly colored
- **Linting Feedback**: Red/yellow/blue squiggles under problematic code
- **Problems Panel**: Detailed error descriptions and suggestions
- **Hover Information**: Contextual help when hovering over issues

## 📝 Notes

- All files use realistic Sieve syntax patterns
- Linting test files intentionally contain errors to demonstrate validation
- ProtonMail test files include provider-specific extensions
- Files are organized by complexity and feature focus

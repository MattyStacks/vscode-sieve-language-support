# Change Log

All notable changes to the "sieve-language-support" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.2.1] - 2025-05-28

### 🚀 Stable Release
- **Promoted to Stable**: All features from 1.2.0 pre-release are now available in the stable channel
- **No Changes**: Identical functionality to 1.2.0 pre-release, just promoted to stable for wider availability

## [1.2.0] - 2025-05-27

### 🎉 MAJOR FEATURE: Smart Linting System Added

#### ✨ Added
- **🔍 Comprehensive Sieve Linting**: Real-time error detection and validation for Sieve scripts
  - **Syntax Validation**: Missing semicolons, malformed statements, empty constructs
  - **Require Statement Validation**: Automatic detection of missing extension requirements
  - **Logic Analysis**: Detection of unreachable code after `keep`, `discard`, `stop`
  - **Best Practice Suggestions**: Recommendations to add `stop` after actions

- **🚀 ProtonMail-Specific Linting**: Specialized rules for ProtonMail's Sieve implementation
  - **Extension Detection**: Recognition of ProtonMail-specific extensions (`vnd.proton.*`)
  - **Contact List Integration**: Validation for `:addrbook:` and `:incomingdefaults:` usage
  - **Expiration Limits**: Warning when expiration exceeds 730-day maximum
  - **Regex Validation**: Error detection for unsupported regex shorthand (`\b`, `\w`, `\d`)
  - **Folder Path Validation**: Suggestions for proper folder/label escaping
  - **Size Filtering Notes**: Information about encrypted vs. actual size
  - **Vacation Optimization**: Suggestions for `:handle` parameter usage

- **⚙️ Configurable Linting Settings**: Full user control over linting behavior
  - `sieve.linting.enabled`: Toggle linting on/off
  - `sieve.linting.protonmail`: Enable/disable ProtonMail-specific rules
  - `sieve.linting.bestPractices`: Control best practice suggestions
  - `sieve.linting.severity`: Set minimum severity threshold (error/warning/info)

- **📝 Enhanced Test Files**: Comprehensive linting demonstration
  - `test-protonmail-linter.sieve`: Shows all linting rules in action
  - Examples of both problematic and correct Sieve patterns

#### 🔧 Technical Improvements
- **Categorized Diagnostics**: Rules organized by type (basic, syntax, best-practice, protonmail)
- **Related Information**: Direct links to ProtonMail documentation for specific rules
- **Configuration Reactivity**: Settings changes apply immediately without restart
- **Performance Optimized**: Efficient regex patterns and conditional rule application
- **Smart Expire Validation**: Only warns when expiration exceeds 730 days (not all expire statements)
- **Smart Stop Suggestions**: Context-aware best practice suggestions that recognize when `stop` is already present

### Technical Bug Fixes (Latest Session)
- **Fixed False Warnings**: Removed problematic regex rules that incorrectly flagged all keep/discard/stop statements
- **Enhanced Stop Detection**: Improved algorithm to properly detect stop statements on same line or following lines
- **Terminal Action Validation**: Added smart detection of code after terminal actions on same line
- **Line-by-Line Analysis**: Replaced simple regex matching with intelligent code analysis

#### 📚 Linting Rules Include
- **Basic Validation**: Empty require statements, empty string tests, missing semicolons
- **Extension Requirements**: fileinto, vacation, reject, envelope, regex validation
- **ProtonMail Extensions**: expire, extlists, vnd.proton.eval requirements
- **Logic Flow**: Code reachability analysis after terminal actions
- **Best Practices**: stop statement suggestions, vacation handle recommendations
- **ProtonMail Limits**: Expiration time validation, regex shorthand warnings

### 🎯 Use Cases
- **Email Filter Development**: Write Sieve scripts with confidence
- **ProtonMail Users**: Specialized support for ProtonMail's implementation
- **Learning Sieve**: Educational feedback for Sieve language learners
- **Script Maintenance**: Easy identification of issues in existing scripts

## [1.1.5] - 2025-05-27

### Fixed
- **Main Branch**: Publishing to the release branch.

## [1.1.2] - 2025-05-27

### Fixed
- **README Image Display**: Fixed broken image link in VS Code marketplace by using absolute GitHub URL
  - Image now displays correctly in vscode.dev, marketplace, and all web environments
  - Resolves broken relative path issue in marketplace viewer

## [1.1.1] - 2025-05-27

### Added
- **Web Support**: Extension now works in VS Code for the Web (vscode.dev, github.dev, GitHub Codespaces)
- **Virtual Workspaces**: Full compatibility with virtual workspace environments
- **Untrusted Workspaces**: Safe operation in untrusted/web environments

## [1.1.0] - 2025-05-27

### Added
- **Web Support**: Extension now works in VS Code for the Web (vscode.dev, github.dev, GitHub Codespaces)
- **Linter Framework**: Added comprehensive Sieve linting infrastructure (disabled by default)
  - Syntax validation for missing semicolons and empty statements
  - Best practice suggestions (e.g., adding 'stop' after fileinto)
  - Logic warnings for unreachable code
  - Real-time error detection as you type
- **Enhanced Testing**: Complete testing infrastructure for development
  - Comprehensive testing checklist (`TESTING-CHECKLIST.md`)
  - Additional test files for various scenarios
- **Build System**: Improved build configuration for cross-platform compatibility
  - Updated esbuild configuration with "neutral" platform targeting
  - Enhanced browser compatibility for web environments

### Changed
- **Extension Architecture**: Refactored for dual desktop/web environment support
- **Build Process**: Updated bundling to support both Node.js and browser environments
- **Package Configuration**: Added `browser` entry point for web compatibility

### Fixed
- **Cross-Platform Compatibility**: Resolved issues with extension loading in web environments
- **Build Pipeline**: Fixed TypeScript compilation for web-compatible outputs

### Technical Details
- Added `"browser": "./dist/extension.js"` to package.json for web support
- Updated esbuild platform from "node" to "neutral" for broader compatibility
- Prepared optional linter module (`src/linter.ts`) for future activation
- Enhanced test coverage with multiple Sieve example files

## [1.0.0] - 2025-05-26

### Added

- Additional readme screenshots.

### Fixed

- Package publisher to correct publisher.


### Changed

- simple sieve test syntax.


## [0.0.1] - 2025-05-23

### Added
- Initial release of Sieve Language Support extension
- Complete syntax highlighting for Sieve email filtering language (RFC 5228)
- Support for .sieve and .siv file extensions
- Language configuration with proper bracket matching, auto-closing pairs, and comment toggling
- Comprehensive TextMate grammar covering:
  - Keywords (if, elsif, else, require, stop, allof, anyof, not)
  - Action commands (keep, discard, redirect, fileinto, reject, vacation, etc.)
  - Test commands (address, header, body, size, exists, etc.)
  - Operators and modifiers (:is, :contains, :matches, :regex, :comparator, etc.)
  - String literals and multiline text blocks
  - Comments (line and block comments)
  - Numbers with size suffixes (K, M, G)
- Example Sieve scripts for testing and reference
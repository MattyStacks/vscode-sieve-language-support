# Change Log

All notable changes to the "sieve-language-support" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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
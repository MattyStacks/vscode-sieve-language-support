# Change Log

All notable changes to the "sieve-language-support" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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
# Sieve Extension Testing Checklist

## 🎯 Core Functionality Tests

### ✅ Extension Loading
- [ ] Extension appears in Extensions list (`Ctrl+Shift+X`, search "Sieve")
- [ ] Extension activates without errors
- [ ] No error messages in Developer Console (`Ctrl+Shift+I`)

### ✅ File Association Tests
- [ ] `.sieve` files are recognized as Sieve language
- [ ] `.siv` files are recognized as Sieve language
- [ ] Status bar shows "Sieve" as language mode
- [ ] Right-click → "Change Language Mode" shows Sieve option

### ✅ Syntax Highlighting Tests

#### Keywords (should be highlighted)
- [ ] `require` - control keyword
- [ ] `if`, `elsif`, `else` - conditional keywords
- [ ] `stop` - action keyword
- [ ] `allof`, `anyof`, `not` - logical operators

#### Commands (should be highlighted)
- [ ] `keep`, `discard` - basic actions
- [ ] `fileinto`, `redirect` - mail actions
- [ ] `reject`, `vacation` - response actions
- [ ] `header`, `address`, `size` - test commands

#### Operators (should be highlighted)
- [ ] `:contains`, `:is`, `:matches` - comparison operators
- [ ] `:over`, `:under` - size operators
- [ ] `:regex` - pattern matching

#### Strings & Comments (should be highlighted)
- [ ] `"quoted strings"` - string literals
- [ ] `# line comments` - comment styling
- [ ] `/* block comments */` - block comment styling
- [ ] Multiline text blocks with `text:` ... `.`

#### Numbers (should be highlighted)
- [ ] `1000` - plain numbers
- [ ] `1K`, `2M`, `5G` - numbers with size suffixes

### ✅ Language Configuration Tests
- [ ] Auto-closing brackets: `{`, `[`, `(`
- [ ] Auto-closing quotes: `"`
- [ ] `Ctrl+/` toggles line comments (`#`)
- [ ] Bracket matching highlights pairs
- [ ] Proper indentation behavior

### ✅ Web Compatibility Tests
- [ ] Extension works in VS Code Desktop
- [ ] Extension works in vscode.dev (if accessible)
- [ ] Extension works in GitHub Codespaces

## 📝 Test Files to Use

1. **`simple-test.sieve`** - Basic syntax
2. **`example.sieve`** - Complex examples  
3. **`test-advanced.sieve`** - Advanced features
4. **`test-extension.sieve`** - Created for testing
5. **`test-linter.sieve`** - Future linter testing

## 🚨 Common Issues to Check

- [ ] No JavaScript errors in Developer Console
- [ ] Extension doesn't slow down VS Code startup
- [ ] Memory usage remains reasonable
- [ ] Works with large Sieve files (>1000 lines)
- [ ] Handles malformed Sieve syntax gracefully

## ✅ Pass Criteria

- All syntax highlighting works correctly
- No errors in console
- Extension loads in <2 seconds
- File associations work properly
- Language features (commenting, brackets) work
- Unit tests pass (3/3)

---
**Status**: ⏳ Ready for Testing

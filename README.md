# Sieve Language Support

A Visual Studio Code extension that provides syntax highlighting for the Sieve email filtering language, as defined in RFC 5228 and related extensions.

## Features

- **🎨 Syntax Highlighting**: Complete syntax highlighting for Sieve scripts including:
  - Keywords (`if`, `elsif`, `else`, `require`, `stop`)
  - Commands (`keep`, `discard`, `redirect`, `fileinto`, `reject`, `vacation`)
  - Tests (`address`, `header`, `body`, `size`, `exists`)
  - Operators (`:is`, `:contains`, `:matches`, `:regex`, etc.)
  - Comments (line comments with `#` and block comments)
  - Strings and multiline text blocks
  - Numbers with optional size suffixes (K, M, G)

- **🔍 Smart Linting System**: Real-time error detection and validation
  - **Syntax Validation**: Missing semicolons, malformed statements, empty constructs
  - **Extension Requirements**: Automatic detection of missing `require` statements
  - **Logic Analysis**: Detection of unreachable code after `keep`, `discard`, `stop`
  - **Best Practice Suggestions**: Recommendations to add `stop` after actions
  - **Performance Optimization**: Smart expiration validation (only warns when exceeding limits)
  - **Configurable Rules**: Customizable linting behavior through VS Code settings

- **🚀 ProtonMail-Specific Support**: Specialized features for ProtonMail users
  - **Extension Detection**: Recognition of ProtonMail-specific extensions (`vnd.proton.*`)
  - **Contact List Validation**: Support for `:addrbook:` and `:incomingdefaults:` usage
  - **Smart Expiration Limits**: Warnings only when expiration exceeds 730-day maximum
  - **Regex Validation**: Error detection for unsupported regex shorthand (`\b`, `\w`, `\d`)
  - **Folder Path Suggestions**: Guidance for proper folder/label escaping
  - **Size Filtering Info**: Notes about encrypted vs. actual message size
  - **Vacation Optimization**: Suggestions for `:handle` parameter usage

- **📁 File Association**: Automatically recognizes `.sieve` and `.siv` file extensions

- **🌐 Cross-Platform Support**: Works in both desktop VS Code and web environments
  - Full compatibility with VS Code for the Web (vscode.dev, github.dev)
  - GitHub Codespaces support
  - Virtual workspace environments
  - Untrusted workspace environments

## Supported Sieve Features

This extension supports syntax highlighting for:
- **Core Sieve (RFC 5228)**: Basic filtering constructs
- **Common Extensions**: Including fileinto, reject, vacation, envelope, and body tests
- **Advanced Features**: Regular expressions, date tests, and metadata handling

## Email Providers Supporting Sieve

The following online email providers support Sieve email filtering:

### Full Sieve Support
- **[FastMail](https://www.fastmail.com/)** - Complete Sieve implementation with ManageSieve protocol and web interface
- **[Migadu](https://www.migadu.com/)** - Full Sieve support with advanced filtering capabilities
- **[Posteo](https://posteo.de/)** - Privacy-focused email with comprehensive Sieve filtering
- **[Runbox](https://runbox.com/)** - Norwegian email provider with complete Sieve support
- **[Zoho Mail](https://www.zoho.com/mail/)** - Business email with extensive Sieve filtering options
- **[Kolab Now](https://kolabnow.com/)** - Collaboration platform with full Sieve implementation
- **[Mailbox.org](https://mailbox.org/)** - German email provider with Sieve filtering
- **[ProtonMail](https://protonmail.com/)** - Encrypted email with server-side Sieve filtering
- **[Tuta](https://tuta.com/)** (formerly Tutanota) - Secure email with basic Sieve capabilities


## Installation

### VS Code Desktop / VS Code Insiders
1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Sieve Language Support"
4. Click Install

### VS Code for the Web
This extension now supports VS Code web environments:
- **[vscode.dev](https://vscode.dev)** - VS Code in the browser
- **[github.dev](https://github.dev)** - GitHub's web editor (press `.` on any GitHub repository)
- **GitHub Codespaces** - Cloud development environments

To install in web environments:
1. Open any of the web environments above
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Sieve Language Support"
4. Click Install

### Manual Installation (for self-hosted environments)
If the extension isn't available in your marketplace, download and install manually:

```bash
# Download the extension package
curl -L "https://marketplace.visualstudio.com/_apis/public/gallery/publishers/MattyStacks/vsextensions/sieve-language-support/latest/vspackage" -o sieve-language-support.vsix

# Install the extension
code --install-extension sieve-language-support.vsix
```

## Usage

Simply open any `.sieve` or `.siv` file in VS Code and the syntax highlighting will be automatically applied.

### Getting Started with Syntax Highlighting
1. Create a new file with `.sieve` or `.siv` extension
2. Start writing your Sieve email filtering rules
3. Enjoy automatic syntax highlighting and language features

### Using the Smart Linting System
The extension provides real-time error detection and suggestions:

1. **Automatic Validation**: Errors and warnings appear as you type
2. **Problems Panel**: Press `Ctrl+Shift+M` to see all issues in one place
3. **Hover Information**: Hover over squiggly lines for detailed explanations
4. **Configurable Rules**: Adjust linting behavior in VS Code Settings (`Ctrl+,`)

**Linting Categories:**
- 🔴 **Errors**: Syntax issues, missing requirements, invalid constructs
- 🟡 **Warnings**: Missing best practices, potential problems
- 🔵 **Information**: ProtonMail features detected, optimization suggestions

### Configuring ProtonMail Support
By default, ProtonMail linting is **enabled** to provide helpful suggestions for ProtonMail-specific extensions like `expire` statements. 

**To disable ProtonMail linting:**
1. Open VS Code Settings (`Ctrl+,`)
2. Search for "sieve.linting.protonmail"
3. Uncheck the setting
4. Or add to your settings.json: `"sieve.linting.protonmail": false`

When ProtonMail linting is disabled, you can use `expire` and other commands without needing ProtonMail-specific require statements.

### ProtonMail Users
The extension includes specialized support for ProtonMail's Sieve implementation:
- Validates ProtonMail-specific extensions (`vnd.proton.*`)
- Checks expiration limits (warns only when exceeding 730 days)
- Detects unsupported regex patterns
- Provides folder path escaping guidance

### Web Environment Usage
When using VS Code for the Web:
1. Open [vscode.dev](https://vscode.dev) or press `.` on any GitHub repository
2. Install the Sieve Language Support extension
3. Open or create `.sieve` files directly in the browser
4. Full syntax highlighting works without any additional setup

## Example

### Basic Sieve Script with Syntax Highlighting
```sieve
# Example Sieve script with smart linting
require ["fileinto", "reject"];

if header :contains "subject" "SPAM" {
    fileinto "Junk";
    stop;  # ✅ Good: stop prevents further processing
}

if size :over 1M {
    reject "Message too large";
}

keep;
```

### ProtonMail-Specific Example
```sieve
# ProtonMail example with specialized linting
require ["fileinto", "vnd.proton.expire", "extlists"];

# ✅ Good: 30 days is under the 730-day limit
if header :list "from" ":addrbook:personal" {
    expire "day" "30";
    fileinto "Personal";
    stop;
}

# ⚠️ Warning: Would warn if days > 730
# expire "day" "1000";  # This would show a warning
```

Here's how the syntax highlighting looks in VS Code:

![Sieve Syntax Highlighting Example](https://raw.githubusercontent.com/MattyStacks/vscode-sieve-language-support/main/assets/simple-test-output.png)

## Test Files & Examples

The extension includes comprehensive test files in the [`test-files/`](test-files/) directory to help you explore features:

### Basic Examples
- **`simple-test.sieve`** - Basic Sieve syntax demonstration
- **`example.sieve`** - Common filtering patterns
- **`test-extension.sieve`** - Extension testing

### Advanced Features
- **`test-advanced.sieve`** - Complex Sieve constructs and advanced features

### Linting Demonstrations
- **`test-linting-demo.sieve`** - Shows basic linting errors and suggestions
- **`test-expire-validation.sieve`** - Demonstrates smart expiration validation
- **`test-protonmail-linter.sieve`** - Comprehensive ProtonMail linting showcase

### ProtonMail-Specific
- **`test-protonmail-demo.sieve`** - ProtonMail implementation examples

**To test the extension**: Press `F5` to launch the Extension Development Host and open any of these files to see syntax highlighting and linting in action.

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension provides configurable linting settings:

- **`sieve.linting.enabled`** (boolean, default: `true`) - Enable/disable Sieve linting and error detection
- **`sieve.linting.protonmail`** (boolean, default: `true`) - Enable/disable ProtonMail-specific linting rules and extension requirements. When enabled, the linter will suggest ProtonMail-specific extensions like `vnd.proton.expire` for expire statements
- **`sieve.linting.bestPractices`** (boolean, default: `true`) - Enable/disable best practice suggestions
- **`sieve.linting.severity`** (string, default: `"warning"`) - Minimum severity level for linting messages (`error`, `warning`, `info`)

Settings can be configured in VS Code Preferences (`Ctrl+,`) by searching for "sieve".

## Known Issues

- Complex nested string interpolation in multiline text blocks may not be perfectly highlighted
- Some advanced Sieve extensions beyond RFC 5228 may need additional grammar rules

## Roadmap & Future Features

### 🚀 Planned Features

#### Language Server Protocol (LSP) Support
- **Auto-completion**: Intelligent suggestions for Sieve commands, tests, and operators
- **Hover Information**: Contextual help and documentation for Sieve elements
- **Go to Definition**: Navigate to variable and capability definitions
- **Symbol Navigation**: Outline view and breadcrumb navigation

#### Enhanced Grammar Support
- **Extended Sieve RFCs**: Support for additional Sieve extensions (vacation, notify, etc.)
- **Custom Extensions**: Grammar support for provider-specific Sieve extensions
- **Improved Regex Highlighting**: Better syntax highlighting for regular expressions

#### Developer Experience
- **Code Snippets**: Pre-built templates for common Sieve patterns
- **Folding Regions**: Collapsible sections for better code organization
- **Bracket Matching**: Enhanced bracket and quote pair matching

#### Testing & Validation
- **Sieve Script Testing**: Built-in tools to test Sieve scripts against sample emails
- **Integration Testing**: Connect with email providers for live script validation
- **Debug Mode**: Step-through debugging for complex Sieve logic



## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the Sieve language support.

## Release Notes

### 1.2.1
- **🚀 Stable Release**: All smart linting features now available in stable channel (promoted from pre-release)

### 1.2.0
- **🎉 Major Feature**: Complete smart linting system with real-time error detection
- **🚀 ProtonMail Support**: Specialized linting rules for ProtonMail's Sieve implementation
- **⚙️ Configurable Settings**: User-customizable linting behavior and severity levels
- **🔧 Smart Validation**: Intelligent expiration limit checking and extension requirements
- **📁 Test Organization**: Comprehensive test files moved to dedicated `test-files/` directory
### 1.1.5
- **Web Compatibility**: Fixed remaining web environment compatibility issues
- **Engine Requirements**: Updated VS Code engine requirements for pre-release support

### 1.1.2
- **Image Display**: Fixed broken image links in VS Code marketplace and web environments
- **Documentation**: Improved README with absolute GitHub URLs for better web compatibility

### 1.1.1
- **Web Support**: Extension now works in VS Code for the Web (vscode.dev, github.dev, GitHub Codespaces)
- **Virtual Workspaces**: Full compatibility with virtual workspace environments
- **Untrusted Workspaces**: Safe operation in untrusted/web environments

### 1.1.0
- **VS Code Web Support**: Initial web compatibility implementation
- **Build System**: Enhanced build configuration for cross-platform compatibility
- **Linter Framework**: Added comprehensive Sieve linting infrastructure (disabled by default)

### 1.0.0
- **General Availability**: Ready for production use
- **Documentation**: Enhanced README with provider information and examples

### 0.0.1
- **Initial Release**: Complete syntax highlighting for Sieve email filtering scripts
- **File Support**: Support for .sieve and .siv file extensions
- **Language Configuration**: Proper bracket matching and commenting
- **Examples**: Documentation and sample files

## License

This extension is released under the MIT License.

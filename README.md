# Sieve Language Support

A Visual Studio Code extension that provides syntax highlighting for the Sieve email filtering language, as defined in RFC 5228 and related extensions.

## Features

- **Syntax Highlighting**: Complete syntax highlighting for Sieve scripts including:
  - Keywords (`if`, `elsif`, `else`, `require`, `stop`)
  - Commands (`keep`, `discard`, `redirect`, `fileinto`, `reject`, `vacation`)
  - Tests (`address`, `header`, `body`, `size`, `exists`)
  - Operators (`:is`, `:contains`, `:matches`, `:regex`, etc.)
  - Comments (line comments with `#` and block comments)
  - Strings and multiline text blocks
  - Numbers with optional size suffixes (K, M, G)

- **File Association**: Automatically recognizes `.sieve` and `.siv` file extensions

- **Language Configuration**: Provides proper bracket matching, auto-closing pairs, and comment toggling

- **Cross-Platform Support**: Works in both desktop VS Code and web environments
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

### Getting Started
1. Create a new file with `.sieve` or `.siv` extension
2. Start writing your Sieve email filtering rules
3. Enjoy automatic syntax highlighting and language features

### Web Environment Usage
When using VS Code for the Web:
1. Open [vscode.dev](https://vscode.dev) or press `.` on any GitHub repository
2. Install the Sieve Language Support extension
3. Open or create `.sieve` files directly in the browser
4. Full syntax highlighting works without any additional setup

## Example

```sieve
# Example Sieve script
require ["fileinto", "reject"];

if header :contains "subject" "SPAM" {
    fileinto "Junk";
    stop;
}

if size :over 1M {
    reject "Message too large";
}

keep;
```

Here's how the syntax highlighting looks in VS Code:

![Sieve Syntax Highlighting Example](https://raw.githubusercontent.com/MattyStacks/vscode-sieve-language-support/main/assets/simple-test-output.png)

## Requirements

No additional requirements or dependencies.

## Extension Settings

This extension does not contribute any VS Code settings. It works out of the box with default configurations.

## Known Issues

- Complex nested string interpolation in multiline text blocks may not be perfectly highlighted
- Some advanced Sieve extensions beyond RFC 5228 may need additional grammar rules

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the Sieve language support.

## Release Notes

### 1.1.5
- **Stable Release**: Published to main release branch with full web compatibility
- **Enhanced Installation**: Improved installation process for all VS Code environments

### 1.1.4
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

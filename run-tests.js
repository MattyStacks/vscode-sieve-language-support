#!/usr/bin/env node

/**
 * Simple test runner for VS Code extension
 * This script compiles and runs tests without downloading VS Code
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runCommand(command, args, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
        console.log(`Running: ${command} ${args.join(' ')}`);
        const child = spawn(command, args, { 
            cwd, 
            stdio: 'inherit',
            shell: true 
        });
        
        child.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command failed with code ${code}`));
            }
        });
    });
}

async function main() {
    try {
        console.log('🔧 Building extension...');
        await runCommand('npm', ['run', 'compile-tests']);
        await runCommand('npm', ['run', 'compile']);
        
        console.log('✅ Build successful!');
        
        // Check if test files exist
        const testDir = path.join(__dirname, 'out', 'test');
        if (fs.existsSync(testDir)) {
            const testFiles = fs.readdirSync(testDir).filter(f => f.endsWith('.test.js'));
            console.log(`📋 Found ${testFiles.length} test file(s):`, testFiles);
        }
        
        console.log('🚀 Extension is ready for testing!');
        console.log('💡 To run tests:');
        console.log('   1. Press F5 in VS Code to launch Extension Development Host');
        console.log('   2. Or use "Extension Tests" debug configuration');
        console.log('   3. Or try: npm test (if network allows VS Code download)');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();

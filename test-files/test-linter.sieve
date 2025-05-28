# Test file for Sieve linter demonstration

# This will trigger a warning - empty require
require [];

# This will trigger an info message - missing stop
if header :contains "subject" "test" {
    fileinto "TestFolder";
}

# This will trigger a warning - code after keep
keep;
discard;

# This will trigger an error - empty string test
if header :contains "from" "" {
    discard;
}

# Missing semicolon will trigger warning
keep

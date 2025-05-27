# Test Sieve Script for Extension
require ["fileinto", "reject"];

# Simple email filter
if header :contains "subject" "SPAM" {
    fileinto "Junk";
    stop;
}

# Size check
if size :over 1M {
    reject "Message too large";
}

# Default action
keep;

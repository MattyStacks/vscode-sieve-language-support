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
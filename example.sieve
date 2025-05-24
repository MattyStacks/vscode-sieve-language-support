# Example Sieve email filter script
# This script demonstrates various Sieve constructs

require ["fileinto", "reject", "vacation"];

# Check if email is from a specific sender
if address :is "from" "boss@company.com" {
    fileinto "Important";
    stop;
}

# Filter spam emails
if header :contains "subject" ["SPAM", "[SPAM]", "***SPAM***"] {
    fileinto "Junk";
    stop;
}

# Check email size
if size :over 1M {
    reject "Message too large";
    stop;
}

# Auto-reply for vacation
if header :contains "to" "vacation@example.com" {
    vacation :days 7 :subject "Out of Office" 
    text:
I am currently out of the office and will return on Monday.
For urgent matters, please contact my colleague.
.
    ;
}

# Complex condition with logical operators
if anyof (
    header :contains "from" "newsletter@",
    header :contains "subject" "Newsletter"
) {
    if not header :contains "subject" "Important" {
        fileinto "Newsletters";
        stop;
    }
}

# Default action
keep;

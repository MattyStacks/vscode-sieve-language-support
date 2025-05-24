# Advanced Sieve Email Filter Script
# Demonstrates comprehensive Sieve language features

require ["fileinto", "reject", "vacation", "imap4flags", "regex", "date", "envelope"];

# Set flags for important emails
if anyof (
    address :is "from" ["ceo@company.com", "hr@company.com"],
    header :contains "subject" "URGENT"
) {
    addflag "\\Important";
    fileinto "Priority";
    stop;
}

# Time-based filtering using date extension
if currentdate :zone "+0000" "hour" "22" {
    if not header :contains "from" "oncall@company.com" {
        fileinto "After-Hours";
    }
}

# Regular expression matching
if header :regex "subject" "^\\[TICKET-[0-9]+\\].*" {
    fileinto "Support-Tickets";
    stop;
}

# Size-based filtering with numeric suffixes
if size :over 5M {
    reject text:
Your message is too large. Please resend with smaller attachments
or use a file sharing service.

Thank you,
Mail System
.
    ;
    stop;
}

# Envelope testing
if envelope :is "to" "bulk@example.com" {
    if not envelope :contains "from" "trusted-sender.com" {
        discard;
        stop;
    }
}

# Vacation auto-responder with advanced options
if header :contains ["to", "cc"] "vacation@example.com" {
    vacation :days 7 :subject "Vacation Auto-Reply" :addresses ["vacation@example.com"]
    text:
I am currently on vacation and will return on June 1st.

For urgent matters, please contact:
- Technical issues: support@example.com
- Business matters: manager@example.com

Best regards,
Vacation Bot
.
    ;
}

# Complex logical operations
if allof (
    not header :is "precedence" "bulk",
    anyof (
        header :contains "list-id" "<newsletter",
        header :exists "list-unsubscribe"
    ),
    not address :is :domain "from" "company.com"
) {
    fileinto "Newsletters";
    removeflag "\\Seen";
}

# Body content filtering
if body :contains ["advertisement", "promotion", "sale"] {
    if not header :contains "subject" "company newsletter" {
        fileinto "Marketing";
        setflag "\\Flagged";
    }
}

# Default keep action
keep;

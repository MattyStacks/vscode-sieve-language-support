# Test stop validation - Smart best practice suggestions

require ["fileinto", "reject"];

# ✅ GOOD: This should show NO warning (stop is on the next line)
if header :contains "subject" "SPAM" {
    fileinto "Junk";
    stop;
}

# ⚠️ SHOULD WARN: This should show a warning (no stop after fileinto)
if header :contains "subject" "newsletter" {
    fileinto "Newsletters";
}

# ✅ GOOD: This should show NO warning (stop is immediately after)
if header :contains "subject" "important" {
    fileinto "Important"; stop;
}

# ⚠️ SHOULD WARN: This should show a warning (keep comes after, not stop)
if header :contains "subject" "maybe" {
    fileinto "Maybe";
    keep;
}

# ✅ GOOD: This should show NO warning (stop after comment)
if header :contains "subject" "work" {
    fileinto "Work";
    # This is a comment
    stop;
}

# Your original example - should show NO warning
if header :contains "subject" "test" {
    fileinto "TestFolder";
    stop;
}

if size :over 1M {
    reject "Message too large";
}

keep;

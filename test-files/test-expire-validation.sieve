# Test expire validation - should show appropriate linting levels

require ["vnd.proton.expire", "fileinto"];

# ✅ GOOD: 7 days - should show NO warning (under 730 limit)
if header :contains "subject" "steam" {
    expire "day" "7";
    fileinto "expiring";
}

# ✅ GOOD: 365 days - should show NO warning (under 730 limit)
if header :contains "subject" "yearly" {
    expire "day" "365";
    fileinto "expiring";
}

# ✅ GOOD: 730 days - should show NO warning (exactly at limit)
if header :contains "subject" "max" {
    expire "day" "730";
    fileinto "expiring";
}

# ⚠️ WARNING: 731 days - should show WARNING (exceeds 730 limit)
if header :contains "subject" "too-long" {
    expire "day" "731";
    fileinto "expiring";
}

# ⚠️ WARNING: 1000 days - should show WARNING (exceeds 730 limit)
if header :contains "subject" "way-too-long" {
    expire "day" "1000";
    fileinto "expiring";
}

# Your original case - should show NO warning
if allof (
    address :is "from" "${steam_sender}", 
    header :regex :comparator "i;unicode-casemap" "Subject" "${steam_subject_pattern}"
) {
    expire "day" "7";
    fileinto "expiring";
}

# Debug test for warnings that should NOT appear

require ["fileinto"];

# This should NOT show a warning (stop is on next line)
if header :contains "subject" "test" {
    fileinto "Test";
    stop;
}

# This should NOT show a warning (already has stop on same line)
if header :contains "subject" "urgent" {
    fileinto "Urgent"; stop;
}

# This SHOULD show a warning (no stop after fileinto)
if header :contains "subject" "newsletter" {
    fileinto "Newsletters";
}

# This should NOT show a warning (keep at end is normal)
keep;

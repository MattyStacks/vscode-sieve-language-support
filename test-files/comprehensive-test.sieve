# Comprehensive linting test for Sieve Language Support

require ["fileinto", "reject", "vacation", "vnd.proton.expire"];

# ===============================
# STOP VALIDATION TESTS
# ===============================

# ✅ GOOD: Should show NO warning (stop on next line)
if header :contains "subject" "test1" {
    fileinto "Test1";
    stop;
}

# ✅ GOOD: Should show NO warning (stop on same line)
if header :contains "subject" "test2" {
    fileinto "Test2"; stop;
}

# ⚠️ SHOULD WARN: Should show warning (no stop after fileinto)
if header :contains "subject" "test3" {
    fileinto "Test3";
}

# ✅ GOOD: Should show NO warning (stop after comment)
if header :contains "subject" "test4" {
    fileinto "Test4";
    # Comment here
    stop;
}

# ===============================
# TERMINAL ACTION TESTS
# ===============================

# ⚠️ SHOULD WARN: Code after keep (same line)
if header :contains "subject" "bad1" {
    keep; fileinto "Test";
}

# ⚠️ SHOULD WARN: Code after discard (same line) 
if header :contains "subject" "bad2" {
    discard; keep;
}

# ⚠️ SHOULD WARN: Code after stop (same line)
if header :contains "subject" "bad3" {
    stop; keep;
}

# ===============================
# EXPIRE VALIDATION TESTS
# ===============================

# These require ProtonMail linting to be enabled

# ✅ GOOD: Should show NO warning (7 days is fine)
if header :contains "subject" "shortterm" {
    expire "day" "7";
}

# ⚠️ SHOULD WARN: Should show warning (800 days > 730)
if header :contains "subject" "longterm" {
    expire "day" "800";
}

# ===============================
# NORMAL CASES (no warnings)
# ===============================

# Normal keep at end - should be fine
keep;

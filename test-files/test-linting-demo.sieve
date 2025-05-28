# Sieve Linting Demo - This file shows linting errors and suggestions

# ❌ ERROR: Empty require statement (should show red squiggly line)
require [];

# ❌ ERROR: Missing semicolon (should show warning)
if header :contains "subject" "test" {
    fileinto "TestFolder"
}

# ⚠️ WARNING: Missing stop after fileinto (should show blue info line)
if header :contains "from" "newsletter@example.com" {
    fileinto "Newsletters";
}

# ❌ ERROR: Empty string test (should show error)
if header :contains "subject" "" {
    discard;
}

# ❌ ERROR: Using fileinto without requiring it (should show error)
fileinto "SomeFolder";

# ⚠️ WARNING: Code after keep is unreachable (should show warning)
keep;
discard;

# ✅ GOOD: This should have no errors
require ["fileinto"];
if header :contains "from" "boss@company.com" {
    fileinto "Important";
    stop;
}

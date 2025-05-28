# ProtonMail Sieve Linter Test File
# This file demonstrates the enhanced linting capabilities

# ❌ ERROR: Empty require statement
require [];

# ✅ GOOD: Proper require with ProtonMail extensions
require ["fileinto", "imap4flags", "vacation", "vnd.proton.expire", "extlists", "vnd.proton.eval"];

# ❌ ERROR: Missing semicolon
if header :contains "subject" "test" {
    fileinto "TestFolder"
}

# ⚠️ WARNING: Missing stop after fileinto
if header :contains "subject" "newsletter" {
    fileinto "Newsletters";
}

# ⚠️ WARNING: Code after keep
keep;
discard;

# ❌ ERROR: Empty string test
if header :contains "from" "" {
    discard;
}

# ❌ ERROR: ProtonMail regex shorthand not supported
if header :regex "subject" "\\bUrgent\\b" {
    addflag "\\Flagged";
}

# ✅ GOOD: Proper regex without shorthand
if header :regex "subject" "[Uu]rgent" {
    addflag "\\Flagged";
    stop;
}

# ⚠️ WARNING: ProtonMail expiration limit
expire "day" "1000";

# 💡 INFO: ProtonMail contact list usage
if header :list "from" ":addrbook:personal?label=Family" {
    fileinto "Family";
    stop;
}

# 💡 INFO: ProtonMail Allow/Block list
if header :list "from" ":incomingdefaults:spam" {
    discard;
    stop;
}

# ⚠️ WARNING: Folder path without escaped slash
fileinto "Work/Projects/Important";

# ✅ GOOD: Properly escaped folder path
fileinto "Work/Projects\\/Important";

# ❌ ERROR: Using vacation without proper require
vacation "I'm away";

# ❌ ERROR: Using expire without proper require
expire "day" "30";

# ❌ ERROR: Using contact lists without extlists
if header :list "from" ":addrbook:myself" {
    fileinto "Personal";
}

# ❌ ERROR: Using eval without proper require
set :eval "result" "5 + 3";

# 💡 INFO: ProtonMail vacation with handle suggestion
vacation :days 7 "Out of office message";

# ✅ GOOD: ProtonMail vacation with handle
vacation :days 7 :handle "vacation-main" "Out of office message";

# 💡 INFO: Size filtering note about encrypted size
if size :over 10M {
    fileinto "Large-Emails";
    stop;
}

# ⚠️ WARNING: Code after stop
stop;
keep;

# ✅ GOOD: Proper ProtonMail script structure
if anyof(
    header :list "from" ":addrbook:personal",
    header :list "from" ":incomingdefaults:inbox"
) {
    fileinto "Trusted";
    stop;
}

# Default action
keep;

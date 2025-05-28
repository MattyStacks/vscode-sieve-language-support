# ProtonMail Sieve Linting Demo

# ❌ ERROR: ProtonMail regex shorthand not supported
if header :regex "subject" "\\bUrgent\\b" {
    addflag "\\Flagged";
}

# ⚠️ WARNING: ProtonMail expiration limit exceeded
expire "day" "1000";

# 💡 INFO: ProtonMail contact list detected
if header :list "from" ":addrbook:personal" {
    fileinto "Family";
}

# ⚠️ WARNING: Folder path should use escaped slashes
fileinto "Work/Projects/Important";

# ❌ ERROR: Using ProtonMail expire without proper require
expire "day" "30";

# ❌ ERROR: Using contact lists without extlists extension
if header :list "from" ":incomingdefaults:spam" {
    discard;
}

# 💡 INFO: Size filtering shows encrypted size
if size :over 10M {
    fileinto "Large-Emails";
}

# ✅ GOOD: Proper ProtonMail script
require ["fileinto", "vnd.proton.expire", "extlists"];
if header :list "from" ":addrbook:trusted" {
    fileinto "Trusted";
    stop;
}

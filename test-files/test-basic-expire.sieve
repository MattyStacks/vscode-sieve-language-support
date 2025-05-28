# Basic expire usage without ProtonMail extensions
# To disable ProtonMail linting: Set "sieve.linting.protonmail": false in VS Code settings

require ["fileinto"];

# Basic expire usage (will show info suggestion if ProtonMail linting is enabled)
if header :contains "subject" "temporary" {
    expire "day" "30";
    fileinto "Temporary";
    stop;
}

# Standard Sieve filtering without ProtonMail extensions
if header :contains "from" "newsletter" {
    fileinto "Newsletters";
    stop;
}

# Size-based filtering
if size :over 5M {
    discard;
    stop;
}

keep;

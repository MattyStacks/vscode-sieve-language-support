# Simple Sieve test
require ["fileinto"];

if header :contains "subject" "test" {
    fileinto "TestFolder";
    stop;
}

keep;

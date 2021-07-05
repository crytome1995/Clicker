#!/bin/bash
url="https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/crytome1995/Charts.git"
git remote add origin ${url}
git clone --branch $1 https://github.com/crytome1995/Charts.git
cd Charts/clicker
ls -la
sed -i "/^\([[:space:]]*tag: \).*/s//\1$2/" values.yaml
cat values.yaml
git commit values.yaml -m "Releasing tag dev $2"
git push ${url} $1
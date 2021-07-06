#!/bin/bash
git config --global user.email ethan.lebioda@gmail.com
git config --global user.name ${GIT_USERNAME}
url="https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/crytome1995/Charts.git"
git remote add origin ${url}

release_dev () {
    cd Charts/clicker
    sed -i "/^\([[:space:]]*tag: \).*/s//\1$2/" values.yaml
    git commit values.yaml -m "Releasing tag to $1 $2"
    git push ${url} $1
    cd ..
    cd ..
}

release_prod () {
    cd Charts
    git checkout $1
    echo "releasing tag to main $2"
    git pull
    git merge dev
    git push ${url} $1
}

case "$1" in
    "dev")
        git clone --branch $1 https://github.com/crytome1995/Charts.git
        release_dev $1 $2
        ;;
    "main")
        release_prod $1 $2
        ;;
esac
workflow "build, test and publish on release" {
  on = "push"
  resolves = ["alias-app", "alias-api"]
}

action "develop-branch-filter" {
  uses = "actions/bin/filter@master"
  args = "branch develop"
}

# install with yarn
action "install" {
  needs = "develop-branch-filter"
  uses = "actions/npm@1.0.0"
  runs = "yarn"
  args = "install"
}

# test with yarn
action "test-app" {
  needs = "install"
  uses = "actions/npm@1.0.0"
  runs = "yarn"
  args = "workspace mappslab-app test"
}

action "test-api" {
  needs = "install"
  uses = "actions/npm@1.0.0"
  runs = "yarn"
  args = "workspace mappslab-api test"
}

# build with yarn
action "build-app" {
  needs = "test-app"
  uses = "actions/npm@1.0.0"
  runs = "yarn"
  args = "workspace mappslab-app build"
}

action "build-api" {
  needs = "test-api"
  uses = "actions/npm@1.0.0"
  runs = "yarn"
  args = "workspace mappslab-app build"
}

# Deploy with Zeit
action "deploy-app" {
  needs = "test-app"
  uses = "actions/zeit-now@master"
  args = "--local-config=./app/public/now.json deploy ./app/public > $HOME/$GITHUB_ACTION.txt -e GIT_RELEASE=$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
}

action "deploy-api" {
  needs = "test-api"
  uses = "actions/zeit-now@master"
  args = "--local-config=./api/now.json deploy ./api > $HOME/$GITHUB_ACTION.txt -e GIT_RELEASE=$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
}

# Alias with Zeit
action "alias-app" {
  needs = ["deploy-app"]
  uses = "actions/zeit-now@master"
  args = "alias --local-config=./app/public/now.json `cat /github/home/deploy.txt` $GITHUB_SHA"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "alias-api" {
  needs = ["deploy-api"]
  uses = "actions/zeit-now@master"
  args = "alias --local-config=./api/now.json `cat /github/home/deploy.txt` $GITHUB_SHA"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

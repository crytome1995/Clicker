#!/usr/bin/env groovy


def label="clicker-${UUID.randomUUID().toString()}"
def gitCommit 
def repoName = "ethanlebioda/clicker"
def dev = "dev"
def main = "main"
def argoApp = "clicker-"
def appWaitTimeout = 600
def argocdServer = "argocd-server.argocd.svc.cluster.local"
podTemplate(label: label, 
    containers: [
        containerTemplate(name: 'node', image: 'node:10-alpine',ttyEnabled: true, command:
                '/bin/sh', args: '-c cat',envVars: [envVar(key: 'PUPPETEER_SKIP_CHROMIUM_DOWNLOAD', value: 'true'), envVar(key: 'PUPPETEER_EXECUTABLE_PATH', value: '/usr/bin/chromium-browser')]),
        containerTemplate(name: 'dind', image: 'docker:20-dind',privileged: true, envVars: [envVar(key: 'DOCKER_TLS_CERTDIR', value: '')]),
        containerTemplate(name: 'argo', image: 'ethanlebioda/argocli-sleep:1.0.0',ttyEnabled: true)
    ])

{
  timeout(time: 4, unit: 'HOURS') {
    node(label) {

      stage ("Checkout SCM") {
        def scmVars = checkout scm
        def lastCommit = sh script: 'git log -1 --pretty=%B', returnStdout: true
        echo ("last commit: ${lastCommit}")
        echo ("commit HASH: ${scmVars.GIT_COMMIT}")
        gitCommit = scmVars.GIT_COMMIT
      }

      stage('Test project') {
        container('node') {
            sh 'npm ci --no-optional'
            def passed = sh script: 'npm test a -- --testPathIgnorePatterns=src/e2e --coverage --coverageReporters="json-summary"', returnStatus: true
            if (passed != 0) {
                  currentBuild.result = 'ABORTED'
                  error('Failed unit tests!')
            }
          }
        }

      stage('Coverage above 70%') {
        container('node') {
          sh 'apk add jq'
          sh 'ls -la'
          def coverage = sh script: 'cat coverage/coverage-summary.json | jq \'.total.lines.pct\'', returnStdout: true
          echo ("coverage: ${coverage}")
        }
      }


      stage('Build Project') {
        container('dind') {
          def buildStatus = sh script: "docker build -t ${repoName} .", returnStatus: true
          if (buildStatus != 0) {
            currentBuild.result = 'ABORTED'
            error('Failed to build image!')
          }
          withCredentials([string(credentialsId: 'DOCKERHUB_USERNAME', variable: 'DOCKERHUB_USERNAME'),
                            string(credentialsId: 'DOCKERHUB_ACCESS_TOKEN', variable: 'DOCKERHUB_ACCESS_TOKEN')]) {
            sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_ACCESS_TOKEN'
            def imageToPush = "${repoName}:${gitCommit}"
            sh "docker tag  ${repoName} ${imageToPush}"
            echo "Pushing image ${imageToPush}"
            def pushStatus = sh script: "docker push ${imageToPush}", returnStatus: true
            if (pushStatus != 0) {
              currentBuild.result = 'ABORTED'
              error('Failed to push image!')
            }
          }
        }
      }

      stage('release to dev') {
        withCredentials([usernamePassword(credentialsId: 'GITHUB_JENKINS', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
          sh 'chmod +x scripts/release.sh'
          def releasedDev = sh script: "scripts/release.sh ${dev} ${gitCommit}", returnStatus: true
          if (releasedDev != 0) {
            currentBuild.result = 'ABORTED'
            error('Failed to release to dev!')
          }
          container('argo') {
            withCredentials([usernamePassword(credentialsId: 'ARGOCD', usernameVariable: 'ARGOCD_USERNAME', passwordVariable: 'ARGOCD_PASSWORD')]) {
              sh 'argocd login argocd-server.argocd.svc.cluster.local --insecure --plaintext --username $ARGOCD_USERNAME --password $ARGOCD_PASSWORD'
              sh "argocd app sync ${argoApp}${dev}"
              sh "argocd app wait ${argoApp}${dev} --timeout ${appWaitTimeout}"
            }
          }
        }
      }

      stage('E2E test') {
        container('node') {
          sh 'chmod +x scripts/setup-puppeter.sh'
          sh 'scripts/setup-puppeter.sh'
          def uiTestStatus = sh script:'npm test src/e2e', returnStatus: true
          if (uiTestStatus != 0) {
            currentBuild.result = 'ABORTED'
            error('End to end tests failed!')
          }
        }
      }

      stage('release to prod') {
        withCredentials([usernamePassword(credentialsId: 'GITHUB_JENKINS', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
          def releaseProd = sh script: "scripts/release.sh ${main} ${gitCommit}", returnStatus: true
          if (releaseProd != 0) {
            currentBuild.result = 'ABORTED'
            error('Failed to release to prod!')
          }
        }
        container('argo') {
          withCredentials([usernamePassword(credentialsId: 'ARGOCD', usernameVariable: 'ARGOCD_USERNAME', passwordVariable: 'ARGOCD_PASSWORD')]) {
            sh 'argocd login argocd-server.argocd.svc.cluster.local --insecure --plaintext --username $ARGOCD_USERNAME --password $ARGOCD_PASSWORD'
            sh "argocd app sync ${argoApp}prod"
            sh "argocd app wait ${argoApp}prod --timeout ${appWaitTimeout}"
          }
        }
      }
    }
  }
}
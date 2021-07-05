#!/usr/bin/env groovy


def label="clicker-${UUID.randomUUID().toString()}"
def gitCommit 
def repoName = "ethanlebioda/clicker"
def dev = "dev"
def main = "main"
podTemplate(label: label, 
    containers: [
        containerTemplate(name: 'node', image: 'node:10-alpine',ttyEnabled: true, command:
                '/bin/sh', args: '-c cat'),
        containerTemplate(name: 'dind', image: 'docker:20-dind',privileged: true, envVars: [envVar(key: 'DOCKER_TLS_CERTDIR', value: '')])
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
            def passed = sh script: 'npm test a -- --coverage --coverageReporters="json-summary"', returnStatus: true
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
          def releasedDev = sh "scripts/release.sh ${dev} ${gitCommit}", returnStatus: true
          if (releasedDev != 0) {
            currentBuild.result = 'ABORTED'
            error('Failed to release to dev!')
          }
        }

      }

      stage('E2E test') {

      }

      stage('release to prod')

    }
  }
}
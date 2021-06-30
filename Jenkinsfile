#!/usr/bin/env groovy

parameters {
  [
    booleanParam(defaultValue: true, description: 'Execute pipeline?', name: 'shouldBuild'),
    booleanParam(defaultValue: true, description: 'Push image?', name: 'pushImage')
  ]
}

def label="ai-platform-builds-${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
        containerTemplate(name: 'maven', image: ' maven:3.3.3', ttyEnabled: true, command:
                '/bin/bash', args: '-c cat', envVars: [envVar(key: 'DOCKER_HOST', value:
                'tcp://localhost:2375')]),
        containerTemplate(name: 'docker', image: 'docker:stable-dind', privileged: true, envVars:[envVar(key:'DOCKER_TLS_CERTDIR', value:'')])
])

{
  timeout(time: 4, unit: 'HOURS') {
    node(label) {
      stage ("Checkout SCM") {
        checkout scm
        def lastCommit = sh script: 'git log -1 --pretty=%B', returnStdout: true
        echo ("last commit: ${lastCommit}")
      }

      stage('Build project') {
        container('maven') {
            sh 'mvn --version'
          }
        }


      stage('Release maven project') {
        echo(env.shouldBuild)
        container('maven') {
        }
      }

    }
  }
}
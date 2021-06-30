#!/usr/bin/env groovy

parameters {
  [
    booleanParam(defaultValue: true, description: 'Execute pipeline?', name: 'shouldBuild'),
    booleanParam(defaultValue: true, description: 'Push image?', name: 'pushImage')
  ]
}

def label="ai-platform-builds-${UUID.randomUUID().toString()}"

podTemplate(label: label, 
    volumes: [
            hostPathVolume(hostPath: '/run/containerd/containerd.sock', mountPath: '//run/containerd/containerd.sock')
    ],
    containers: [
        containerTemplate(name: 'maven', image: 'maven:3.3.3', command:
                '/bin/bash', args: 'sleep 9000')
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
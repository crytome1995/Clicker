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
            hostPathVolume(hostPath: '/run/containerd/containerd.sock', mountPath: '/run/containerd/containerd.sock')
    ],
    containers: [
        containerTemplate(name: 'node', image: 'node:10-alpine',ttyEnabled: true, command:
                '/bin/sh', args: '-c cat')
    ])

{
  timeout(time: 4, unit: 'HOURS') {
    node(label) {
      stage ("Checkout SCM") {
        def scmVars = checkout scm
        def lastCommit = sh script: 'git log -1 --pretty=%B', returnStdout: true
        echo ("last commit: ${lastCommit}")
        echo ("commit HASH: ${scmVars.GIT_COMMIT}")
      }

      stage('Test project') {
        container('node') {
            sh 'npm install'
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
          def coverage = sh script: 'cat /coverage/coverage-summary.json | jq \'.total.lines.pct\'', returnStdout: true
          echo ("coverage: ${coverage}")
        }
      }


      stage('Release project') {

      }

    }
  }
}
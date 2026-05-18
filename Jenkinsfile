pipeline {
    agent any

    environment {
        SONARQUBE_ENV = "sonarqube"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                echo "Skipping Docker build in Jenkins (not required for assignment)"
            }
        }

        stage('Test') {
            steps {
                sh 'npm install jest --save-dev'
                sh 'chmod +x node_modules/.bin/jest'
                sh 'npx jest --runInBand'
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh """
                        npm install --save-dev jest
                        chmod +x node_modules/.bin/jest
                        npx jest --coverage --runInBand
                        sonar-scanner
                    """
                }
            }
        }

        stage('Security') {
            steps {
                sh """
                    echo "Running security scan placeholder"
                """
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Skipping Docker staging deploy (not required for assignment)"
            }
        }

        stage('Release to Production') {
            steps {
                echo "Skipping Docker production deploy (not required for assignment)"
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                echo "Simulated health check: OK"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
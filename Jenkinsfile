pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "viswa/sit753-devops-api:${env.BUILD_NUMBER}"
        SONARQUBE_ENV = "sonarqube"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh """
                        npm install --save-dev jest
                        npm test -- --coverage
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
                sh """
                    docker run -d --rm --name sit753-staging -p 3001:3000 ${DOCKER_IMAGE}
                """
            }
        }

        stage('Release to Production') {
            steps {
                sh """
                    docker rm -f sit753-prod || true
                    docker run -d --rm --name sit753-prod -p 3000:3000 ${DOCKER_IMAGE}
                """
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                sh """
                    curl -f http://localhost:3000/health || echo "Health check failed"
                """
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}

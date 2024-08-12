pipeline {
    agent any
    triggers {
        githubPush()
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Membangun image Docker
                    sh 'docker build -t aditbest5/ecommerce .'
                }
            }
        }

        stage('Deliver') {
            steps {
                script {
                    // Menghentikan dan menghapus container yang berjalan, jika ada
                    sh 'docker container stop ecommerce-container || true'
                    sh 'docker container rm ecommerce-container || true'

                    // Menjalankan container baru dalam mode detached (-d)
                    sh 'docker run -d --name ecommerce-container -p 5173:5173 aditbest5/ecommerce &'
                }
            }
        }
    }

    post {
        always {
            script {
                // Membersihkan image yang tidak digunakan
                sh 'docker image prune -f || true'
            }
        }
    }
}

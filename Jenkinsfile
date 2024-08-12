pipeline {
    agent any
    triggers {
        githubPush()
    }

    stages {
        // stage('Build') {
        //     steps {
        //         // script {
        //         //     // Membangun image Docker
        //         //     sh 'docker build -t aditbest5/ecommerce .'
        //         // }
        //         sh 'npm install'
        //     }
        // }

        stage('Deliver') {
            steps {
                // script {
                //     // Menghentikan dan menghapus container yang berjalan, jika ada
                //     sh 'docker container stop ecommerce-container || true'
                //     sh 'docker container rm ecommerce-container || true'

                //     // Menjalankan container baru dalam mode detached (-d)
                //     sh 'docker run -d --name ecommerce-container -p 4173:4173 aditbest5/ecommerce &'
                // }
                sh 'npm install'
            }
        }
    }

    // post {
    //     always {
    //         script {
    //             // Membersihkan image yang tidak digunakan
    //             sh 'docker image prune -f || true'
    //         }
    //     }
    // }
}

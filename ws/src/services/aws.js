const AWS = require('aws-sdk')
module.exports = {
    IAM_USER_KEY: 'AKIA2ADPX2X36UWIRFNC',
    IAM_USER_SECRET: '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',
    BUCKET_NAME: 'salao-studio-due',
    AWS_REGION: "sa-east-1",
    uploadToS3: (file, filename, acl = 'public-read') => {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = 'AKIA2ADPX2X36UWIRFNC'
            let IAM_USER_SECRET = '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'
            let BUCKET_NAME = 'salao-studio-due'

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME,
            })
            s3bucket.createBucket(() => {
                var params = {
                    Bucket: BUCKET_NAME,
                    Key: filename,
                    Body: file.data,
                    ACL: acl
                }
                s3bucket.upload(params, (err, data) => {
                    if (err) {
                        console.log("error: ", err)
                        return resolve({ error: true, message: err.message })
                    }
                    console.log(data)
                    resolve({ Arquivo: "Upload feito com Sucesso", message: data })
                })
            })
        })
    },
    deleteFileS3: (key) => {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = 'AKIA2ADPX2X36UWIRFNC'
            let IAM_USER_SECRET = '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'
            let BUCKET_NAME = 'salao-studio-due'
            let AWS_REGION = 'sa-east-1'

            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME
            })
            var params = {
                Bucket: BUCKET_NAME,
                Key: key
            }
            s3bucket.deleteObject(params, (err, data) => {
                if (err) {
                    console.log("Error: ", err)
                    return resolve({ error: true, message: err })
                }
                resolve({ Arquivo: "Deletado Com Sucesso", message: data })
            })

        })
    }
}
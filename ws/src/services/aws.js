const AWS = require('aws-sdk')
module.exports = {
    IAM_USER_KEY: process.env.IAM_USER_KEY,
    IAM_USER_SECRET: process.env.IAM_USER_SECRET,
    BUCKET_NAME: process.env.BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    uploadToS3: (file, filename, acl = 'public-read') => {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = process.env.IAM_USER_KEY
            let IAM_USER_SECRET = process.env.IAM_USER_SECRET
            let BUCKET_NAME = process.env.BUCKET_NAME

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
            let IAM_USER_KEY = process.env.IAM_USER_KEY
            let IAM_USER_SECRET = process.env.IAM_USER_SECRET
            let BUCKET_NAME = process.env.BUCKET_NAME
            let AWS_REGION = process.env.AWS_REGION

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
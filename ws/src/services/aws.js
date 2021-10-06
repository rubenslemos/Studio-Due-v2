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
                console.log('Params: ', params)
                s3bucket.upload(params, (err, data) => {
                    if (err) {
                        console.log("error: ", err)
                        return resolve({ error: true, message: err.message })
                    }
                    console.log(data)
                    resolve({ error: false, message: data })
                })
            })
        })
    },
    deleteFileS3: (key) => {
        return new Promise((resolve, reject) => {
            let IAM_USER_KEY = this.IAM_USER_KEY
            let IAM_USER_SECRET = this.IAM_USER_SECRET
            let BUCKET_NAME = this.BUCKET_NAME
            let s3bucket = new AWS.S3({
                accessKeyId: IAM_USER_KEY,
                secretAccessKey: IAM_USER_SECRET,
                Bucket: BUCKET_NAME
            })
            s3bucket.createBucket(() => {
                s3bucket.deleteObject({
                        Bucket: BUCKET_NAME,
                        Key: key
                    },
                    (err, data) => {
                        if (err) {
                            console.log(err)
                            return resolve({ error: true, message: err })
                        }
                        console.log(data)
                        resolve({ error: false, message: data })
                    })
            })
        })
    }
}
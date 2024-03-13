const AWS = require('aws-sdk');

module.exports = {
    IAM_USER_KEY: '',
    IAM_USER_SECRET: '',
    BUCKET_NAME: '',
    AWS_REGION: '',
    uploadToS3: function (file, filename, acl = 'public-read'){        
    },
    deleteFileS3: function(key){
    },
};
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'test', // Use dummy credentials for LocalStack
  secretAccessKey: 'test',
  region: 'us-east-1',
  s3ForcePathStyle: true, // Required for LocalStack
  endpoint: 'http://localhost:4566', // LocalStack endpoint
});

const s3 = new AWS.S3();

module.exports = s3;

// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// const config = require('../config');

// // Create S3 Client
// const s3 = new S3Client({
//   region: config.get('aws.region'),
//   credentials: {
//     accessKeyId: config.get('aws.accessKeyId'),
//     secretAccessKey: config.get('aws.secretAccessKey')
//   }
// });

// exports.generatePreSignedUrl = async (fileName, fileType) => {
//   const params = {
//     Bucket: config.get('aws.bucket'),
//     Key: `products/${Date.now()}_${fileName}`,
//     ContentType: fileType,
//     ACL: 'public-read'
//   };

//   try {
//     // Create the command
//     const command = new PutObjectCommand(params);
//     // Generate pre-signed URL
//     const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 minutes expiration
//     return { url, key: params.Key };
//   } catch (error) {
//     console.error('Error generating pre-signed URL', error);
//     throw new Error('Could not generate pre-signed URL');
//   }
// };

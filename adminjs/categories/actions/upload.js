
const fs = require('fs');
const AdminJs = require('adminjs');
const AWS = require('aws-sdk');
const path = require('path');
AWS.config.update({ 
    region: 'us-east-2',
    accessKeyId: 'AKIA4UJEKSYV7K7FA3HD',
    secretAccessKey: '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',
});

const multer = require("multer");
var multerS3 = require("multer-s3");


const s3 = new AWS.S3({
    accessKeyId: 'AKIA4UJEKSYV7K7FA3HD',
    secretAccessKey: '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',
});

const uploadFile = (fileName) => {
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);


    const filePath = path.join('uploads', 'avatar.png');

    var fileStream = fs.createReadStream(fileName);
    const params = {
        Bucket: 'zooprints',
        Key: filePath, // File name you want to save as in S3
        Body: fileStream
    };
    // Uploading files to the bucket
    s3.upload(params, function(s3Err, data) {
        if (s3Err) {
            throw s3Err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

uploadFile('avatar.png');
//You can replace "cat.jpg" with a file name that exists in the same directory as the code, a relative file path, or an absolute file path.


// const fileName = 'contacts.csv';

// const uploadFile = () => {
//   fs.readFile(fileName, (err, data) => {
//      if (err) throw err;
//      const params = {
//          Bucket: 'testBucket', // pass your bucket name
//          Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
//          Body: JSON.stringify(data, null, 2)
//      };
//      s3.upload(params, function(s3Err, data) {
//          if (s3Err) throw s3Err
//          console.log(`File uploaded successfully at ${data.Location}`)
//      });
//   });
// };

// uploadFile();

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'REGION'});

// // Create S3 service object
// var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // call S3 to retrieve upload file to specified bucket
// var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
// var file = process.argv[3];

// // Configure the file stream and obtain the upload parameters
// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// uploadParams.Body = fileStream;
// var path = require('path');
// uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload (uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });
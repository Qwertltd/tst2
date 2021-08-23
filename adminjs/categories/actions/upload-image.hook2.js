const path = require('path');
const fs = require('fs');
const AdminJs = require('adminjs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


/** @type {AdminJs.After<AdminJs.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, uploadImage } = context;

  if (record.isValid() && uploadImage) {
    const filePath = path.join('uploads', record.id().toString(), uploadImage.name);
    console.log(uploadImage)

    var fileStream = fs.createReadStream(uploadImage.path);
    const params = {
        Bucket: 'zooprints',
        Key: filePath,
        Body: fileStream,
        ACL:'public-read'
    };
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }

        record.update({ coverImage: `${data.Location}` });
    });
  }
  return response;
};

/** @type {AdminJs.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadImage, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };
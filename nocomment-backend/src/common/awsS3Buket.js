import aws from 'aws-sdk';
import multer from '@koa/multer';
import multerS3 from 'multer-s3';
import { logger } from './log';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.AWS_KEY_ID);
console.log(process.env.AWS_KEY);
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY_ID, // user 만들면서 지급받은 키값
  secretAccessKey: process.env.AWS_KEY,
  region: 'ap-northeast-1',
});

export const drawingCommentMulter = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME + '/drawingComment',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  }),
});

export const s3ImageMulter = (path) => {
  return multer({
    storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: process.env.AWS_BUCKET_NAME + path,
      key: function (req, file, cb) {
        cb(null, `${Date.now().toString(16)}${file.originalname}`);
      },
    }),
  });
};

export const deleteFiles = (files) => {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: files,
      Quiet: false,
    },
  };
  s3.deleteObjects(params, function (err, data) {
    if (err) {
      // an error occurred
      logger.error(err);
      logger.error(err.stack);
    } else {
      // successful response
      logger.info(data);
    }
  });
};

export default s3;

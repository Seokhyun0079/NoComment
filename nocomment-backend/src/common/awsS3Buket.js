import aws from 'aws-sdk';
import multer from '@koa/multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import send from 'koa-send';
import bufferImage from 'buffer-image';
const s3 = new aws.S3({
  accessKeyId: process.env.aws_access_key_id, // user 만들면서 지급받은 키값
  secretAccessKey: process.env.aws_secret_access_key,
  region: 'ap-northeast-1',
});

export const multerAWS = multer({
  storage: multerS3({
    s3: s3, // s3만 써도 됩니다.
    acl: 'public-read',
    bucket: 'nocommentbuket/drawingComment',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  }),
});

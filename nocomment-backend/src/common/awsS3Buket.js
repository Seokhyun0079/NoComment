import aws from 'aws-sdk';
import multer from '@koa/multer';
import multerS3 from 'multer-s3';
import { logger } from './log';
const s3 = new aws.S3({
  accessKeyId: process.env.aws_access_key_id, // user 만들면서 지급받은 키값
  secretAccessKey: process.env.aws_secret_access_key,
  region: 'ap-northeast-1',
});

export const drawingCommentMulter = multer({
  storage: multerS3({
    s3: s3, // s3만 써도 됩니다.
    acl: 'public-read',
    bucket: 'nocommentbuket/drawingComment',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  }),
});
export const profileImageMulter = multer({
  storage: multerS3({
    s3: s3, // s3만 써도 됩니다.
    acl: 'public-read',
    bucket: 'nocommentbuket/profileImage',
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString(16)}${file.originalname}`);
    },
  }),
});
export const postImageMulter = multer({
  storage: multerS3({
    s3: s3, // s3만 써도 됩니다.
    acl: 'public-read',
    bucket: 'nocommentbuket/postImage',
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString(16)}${file.originalname}`);
    },
  }),
});

export default s3;

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
const fallbackImage =
  'https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/commonImage/defualt-profile-img.png';

const BasicAvatar = ({ profileImg }) => {
  profileImg = profileImg
    ? 'https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/profileImage/' +
      profileImg
    : fallbackImage;
  return (
    <Avatar
      src={profileImg}
      style={{
        width: 95,
        height: 95,
      }}
    ></Avatar>
  );
};

export default BasicAvatar;

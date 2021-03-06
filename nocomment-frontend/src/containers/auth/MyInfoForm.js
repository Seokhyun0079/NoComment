import { Avatar } from 'material-ui';
import React from 'react';
import { StyledInput } from '../../components/common/StyledTag';
import palette from '../../lib/styles/palette';

const MyInfoForm = ({ user }) => {
  return (
    <>
      <h2>profile</h2>
      <Avatar
        style={{
          width: 200,
          height: 200,
          background: palette.yellow[0],
        }}
        src="/api/drawingComment/getImageFile/file-177c4d7f954.jpg"
      ></Avatar>
      <form>
        <h4>아이디</h4>
        <StyledInput
          autoComplete="authCode"
          name="stringId"
          type="text"
          value={user.stringId}
          readOnly
          disabled
        />
        <h4>이메일</h4>
        <StyledInput
          autoComplete="authCode"
          name="stringId"
          type="text"
          value={user.email}
          readOnly
          disabled
        />
        <h4>유저명</h4>
        <StyledInput
          autoComplete="authCode"
          name="stringId"
          type="text"
          value={user.username}
          readOnly
          disabled
        />
      </form>
    </>
  );
};

export default MyInfoForm;

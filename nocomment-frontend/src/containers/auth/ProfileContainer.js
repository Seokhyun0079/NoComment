import React, { useRef, useState } from 'react';
import { Avatar } from 'material-ui';
import { HiddenFileInput } from '../../components/common/StyledTag';
import palette from '../../lib/styles/palette';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { profileImgUp } from '../../modules/user';
const ProfileContainer = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    time: new Date().valueOf(),
  });
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  /**
   * ボータンが押下されたら、非表示になっている、 inputタグのクリックイベントを発生させる。
   * 버튼이 클릭되었을 때, 비표시로 되어있는 파일태그의 클릭이벤트를 발생시킴.
   */
  const addButtonClick = () => {
    let ref = inputRef.current;
    ref.click();
  };

  const onChange = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('stringId', user.stringId);
    dispatch(profileImgUp({ url: 'profileImage', formData: formData }));
    setState({
      time: new Date().valueOf(),
    });
  };
  return (
    <>
      <Avatar
        style={{
          width: 200,
          height: 200,
          background: palette.yellow[0],
        }}
        onClick={addButtonClick}
        src={`https://nocommentbuket.s3-ap-northeast-1.amazonaws.com/profileImage/${user.profileImg}?time=${state.time}`}
      ></Avatar>
      <HiddenFileInput
        type="file"
        ref={inputRef}
        onChange={onChange}
      ></HiddenFileInput>
    </>
  );
};

export default ProfileContainer;

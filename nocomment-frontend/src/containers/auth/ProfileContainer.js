import { React, useRef } from 'react';
import { Avatar } from 'material-ui';
import { HiddenFileInput } from '../../components/common/StyledTag';
import palette from '../../lib/styles/palette';
import { imageFileUpload } from '../../lib/api/imageFileUpload';
const ProfileContainer = () => {
  const inputRef = useRef();
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
    imageFileUpload('postImage', formData).then((result) => {
      const response = result.data;
      let uploadedFileName = '/api/drawingComment/getImageFile/' + response;
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
        src="/api/drawingComment/getProfileImageFile/file-177c4d7f954.jpg"
      ></Avatar>
      <HiddenFileInput type="file" ref={inputRef}></HiddenFileInput>
    </>
  );
};

export default ProfileContainer;

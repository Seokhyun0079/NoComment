import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PostImageUploadDialog from './PostImageUploadDialog';
import { useState } from 'react';
const ImageDailogContainer = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('selected');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [files, setFiles] = useState([]);
  return (
    <div>
      <Typography variant="subtitle1">
        {selectedValue} handleClickOpen에서 만들어서 내보내는
        handleClickOpen이랑 클로즈를 그 위의 컴포넌트에서 만들어서 내보냄 그
        다음에 변화가 있을 경우엔 값을 추가떄려버림 끝
      </Typography>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        이미지 등록
      </Button>
      <PostImageUploadDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        files={files}
        setFiles={setFiles}
      />
    </div>
  );
};

export default ImageDailogContainer;

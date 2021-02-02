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
      <Typography variant="subtitle1">{selectedValue}</Typography>
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

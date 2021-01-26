import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PostImageUploadDialog from './PostImageUploadDialog';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const ImageDailogContainer = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
        emails={emails}
      />
    </div>
  );
};

export default ImageDailogContainer;

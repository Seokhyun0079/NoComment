import React, { useRef } from 'react';
import { Dialog } from 'material-ui';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import styled from 'styled-components';
import { imageFileUpload } from '../../lib/api/imageFileUpload';
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const HiddenFileInput = styled.input`
  display: none;
`;

const PostImageUploadDialog = (props) => {
  const inputRef = useRef();
  const classes = useStyles();
  const { onClose, selectedValue, open, files, setFiles } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    alert('1');
  };
  /**
   * ボータンが押下されたら、非表示になっている、 inputタグのクリックイベントを発生させる。
   * 버튼이 클릭되었을 때, 비표시로 되어있는 파일태그의 클릭이벤트를 발생시킴.
   */
  const addButtonClick = () => {
    let ref = inputRef.current;
    ref.click();
  };
  /**
   * input Fileが変化した時、ファイルを
   * アップロードし、リストレイアウトに追加する。
   * input태그의 값이 변화했을 때 파일을 업로드하고,
   * 리스트에 추가해 레이아웃으로 보여줌.
   * @param {*} e
   */
  const onChange = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    imageFileUpload('postImage', formData).then((result) => {
      const response = result.data;
      let uploadedFileName = '/api/drawingComment/getImageFile/' + response;
      setFiles(files.concat(uploadedFileName));
      onClose(selectedValue);
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {files.map((file) => (
          <ListItem button onClick={() => handleListItemClick(file)} key={file}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <img src={file} alt="" width="100%" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={file} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={addButtonClick} onChange={onChange}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
              <HiddenFileInput type="file" ref={inputRef}></HiddenFileInput>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Select Image" />
        </ListItem>
      </List>
    </Dialog>
  );
};

PostImageUploadDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default PostImageUploadDialog;

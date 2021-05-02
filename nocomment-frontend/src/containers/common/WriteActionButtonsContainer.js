import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StringUtility from '../../common/StringUtility';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost, updatePost } from '../../modules/write';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { POST_EDIT_TYPE, POST_WRITE_TYPE } from '../../common/const';

const WriteActionButtonsContainer = ({ history, match }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  const id = match.params.postId;
  const writeType = (id === undefined ? POST_WRITE_TYPE : POST_EDIT_TYPE);
  const onPublish = () => {
    let validationFlg = true;
    let innerText = StringUtility.deleteHtmlTag(body);
    if (!StringUtility.inputValidation(title)) {
      toast('제목을 입력해주세요!');
      validationFlg = false;
    }
    if (!StringUtility.inputValidation(innerText)) {
      toast('내용을 입력해주세요!');
      validationFlg = false;
    }
    console.log(innerText);
    if (!validationFlg) {
      return;
    }
    if (match.params.postId) {
      dispatch(
        updatePost({
          id,
          title,
          body,
          tags,
        })
      );

    } else {
      dispatch(
        writePost({
          title,
          body,
          tags,
        }),
      );
    }
  };
  const onCancel = () => {
    history.goBack();
  };
  useEffect(() => {
    if (post) {
      const { _id, noCommenter } = post;
      history.push(`/@${noCommenter.stringId}/${_id}`);
    }
    if (postError) {
      console.log('에러 발생');
      console.log(postError);
    }
  }, [history, post, postError]);
  return (
    <>
      <WriteActionButtons onPublish={onPublish} onCancel={onCancel} writeType={writeType} />
      <ToastContainer />
    </>
  );
};

export default withRouter(WriteActionButtonsContainer);

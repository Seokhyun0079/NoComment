import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StringUtility from '../../common/StringUtility';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost } from '../../modules/write';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    title: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));
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
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    );
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
      <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
      <ToastContainer />
    </>
  );
};

export default withRouter(WriteActionButtonsContainer);

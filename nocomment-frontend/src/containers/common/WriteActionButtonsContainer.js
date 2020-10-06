import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { writePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError } = useSelector(({ write }) => ({
    write: write.title,
    body: write.body,
    tags: write.tags,
    post: write.post,
    postError: write.postError,
  }));

  const onPublish = () => {
    console.log(body);
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
    console.log(post);
    if (post) {
      const { _id, noCommenter } = post;
      console.log(noCommenter);
      history.push(`/@${noCommenter.username}/${_id}`);
    }
    if (postError) {
      console.log('에러 발생');
      console.log(postError);
    }
  }, [history, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default withRouter(WriteActionButtonsContainer);

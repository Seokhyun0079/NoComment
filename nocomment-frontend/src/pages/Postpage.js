import React from 'react';
import CommentContainer from '../containers/comment/CommentContainer';
import CommentListContainer from '../containers/comment/CommentListContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewContainer from '../containers/post/PostViewContainer';
const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewContainer />
      <CommentListContainer />
      <CommentContainer />
    </>
  );
};

export default PostPage;

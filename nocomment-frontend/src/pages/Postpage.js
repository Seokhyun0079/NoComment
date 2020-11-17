import React from 'react';
import CommentContainer from '../containers/comment/CommentContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewContainer from '../containers/post/PostViewContainer';
const PostPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostViewContainer />
      <CommentContainer />
    </>);
};

export default PostPage;

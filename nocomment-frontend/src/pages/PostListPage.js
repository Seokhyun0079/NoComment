import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PagingContainer from '../containers/posts/PagingContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <PagingContainer />
    </>
  );
};

export default PostListPage;

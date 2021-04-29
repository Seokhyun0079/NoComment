import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SearchBarContainer from '../containers/posts/PagingContainer';
import PostListContainer from '../containers/posts/PostListContainer';

const PostListPage = () => {
  return (
    <>
      <HeaderContainer />
      <PostListContainer />
      <SearchBarContainer />
    </>
  );
};

export default PostListPage;

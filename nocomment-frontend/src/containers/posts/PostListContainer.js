import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import PostPager from '../../components/posts/PostPager';
import styled from 'styled-components';

const PostListBlock = styled.div`
  background: white;
  padding-bottom: 50px;
`;
const PostListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user, lastPage } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
      lastPage: posts.lastPage,
    }),
  );
  const { stringId } = match.params;
  const { tag, page, search } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  useEffect(() => {
    dispatch(listPosts({ tag, stringId, page, search }));
  }, [dispatch, location.search, stringId, tag, page, search]);
  if (!posts) {
    return null;
  }
  return (
    <PostListBlock>
      <PostList
        loading={loading}
        error={error}
        posts={posts}
        showWriteButton={user}
      />
      <PostPager lastPage={lastPage} page={page}></PostPager>
    </PostListBlock>
  );
};

export default withRouter(PostListContainer);

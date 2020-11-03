import qs from 'qs';
import client from './client';
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

  export const readPost = id => client.get(`/api/posts/${id}`);
  export const removePost = id => client.delete(`/api/posts/${id}`);
  export const listPosts = ({ page, stringId, tag }) => {
    const queryString = qs.stringify({
      page,
      stringId,
      tag,
    });
    return client.get(`/api/posts?${queryString}`);
  };
  
  export const updatePost = ({ id, title, body, tags }) =>
    client.patch(`/api/posts/${id}`, {
      title,
      body,
      tags,
    });
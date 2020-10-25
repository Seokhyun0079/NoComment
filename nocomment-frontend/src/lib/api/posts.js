import client from './client';
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

  export const readPost = id => client.get(`/api/posts/${id}`);
  export const removePost = id => client.delete(`/api/posts/${id}`);
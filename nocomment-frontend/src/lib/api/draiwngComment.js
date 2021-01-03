import qs from 'qs';
import client from './client';
export const insertDrawingComment = (formData) =>
  client.post(`/api/drawingComment/insert`, formData);
export const listComment = ({ postId }) => {
  const queryString = qs.stringify({
    postId,
  });
  const url = `/api/drawingComment/list?${queryString}`;
  return client.get(url);
};

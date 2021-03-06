import client from './client';
export const imageFileUpload = (url, formData) =>
  client.post('/api/imageFileUpload/' + url, formData);

import client from './client';
export const imageFileUpload = (formData) =>
  client.post(`/api/imageFileUpload`, formData);

import client from './client';
export const list = () => client.get('/api/noCommenters/list');
export const update = ({ nocmmneter }) =>
  client.post('/api/noCommenters/authCode', {
    nocmmneter,
  });

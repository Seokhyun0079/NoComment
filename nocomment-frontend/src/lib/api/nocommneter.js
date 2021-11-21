import client from './client';
export const list = () => client.get('/api/noCommenters/list');
export const update = ({ nocmmneter }) =>
  client.post('/api/noCommenters/authCode', {
    nocmmneter,
  });
export const updateByAdmin = ({ stringId, useable, invaliDate, level }) => {
  console.dir(invaliDate);
  client.post('/api/noCommenters/updateByAdmin', {
    stringId,
    useable,
    invaliDate,
    level,
  });
};

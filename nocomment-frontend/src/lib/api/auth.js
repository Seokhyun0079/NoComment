import client from './client';

export const login = ({ stringId, password }) =>
  client.post('/api/noCommenters/login', { stringId, password });
export const register = ({ stringId, name, email, password }) =>
  client.post('/api/noCommenters/register', {
    stringId,
    name,
    email,
    password,
  });

export const authCode = ({ stringId, authCode }) =>
  client.post('/api/noCommenters/authCode', {
    stringId,
    authCode,
  });

export const update = ({ name }) =>
  client.post('/api/noCommenters/update', {
    name,
  });
export const check = () => client.get('/api/noCommenters/check');
export const logout = () => client.post('/api/noCommenters/logout');

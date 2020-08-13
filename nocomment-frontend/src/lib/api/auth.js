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

export const check = () => client.get('/api/noCommenters/check');

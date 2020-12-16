import qs from 'qs';
import client from './client';
export const insertDrawingComment = (formData) => client.post(`/api/drawingComment/insert`,  formData );
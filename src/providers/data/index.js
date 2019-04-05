import { GET_LIST } from 'react-admin';
import HttpStatus from 'http-status-codes';
import getList from './api/getList';

export default (type, resource, params) => {
  if (type === GET_LIST) {
    return getList(resource, params);
  }
  const err = new Error('Operation not yet supported');
  err.status = HttpStatus.NOT_IMPLEMENTED;
  return Promise.reject(err);
};

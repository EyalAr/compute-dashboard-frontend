import { stringify } from 'query-string';
import { GET_LIST, GET_ONE } from 'react-admin';
import HttpStatus from 'http-status-codes';
import { API_BASE } from './conf';
import { getAuthHeaders } from './auth'

const transformApiResponse = (payload, type) => {
  switch (type) {
    case GET_LIST:
      return { data: payload, total: payload.length };
    default:
      throw new Error(`Transforming API response for ${type} is not supported`);
  }
}

export default (type, resource, params) => {
  var url;
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([
          (page - 1) * perPage,
          page * perPage - 1,
        ]),
        filter: JSON.stringify(params.filter),
      };
      url = `${API_BASE}/${resource}?${stringify(query)}`;
      break;
    }
    default:
      const err = new Error('Operation not yet supported');
      err.status = HttpStatus.NOT_IMPLEMENTED;
      return Promise.reject(err);
  };
  return fetch(url, {
    headers: {
      ...getAuthHeaders(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  }).then(json => transformApiResponse(json, type));
};

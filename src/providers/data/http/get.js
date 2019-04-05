import { stringify } from 'query-string';
import { getAuthHeaders } from '../../../auth';
import { API_BASE } from '../../../conf';

export default (endpoint, query = '') => fetch(`${API_BASE}/${endpoint}?${stringify(query)}`, {
  headers: {
    ...getAuthHeaders(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then((res) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
});

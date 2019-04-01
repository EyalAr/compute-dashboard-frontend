import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        return fetch('/api/login', {
          method: 'POST',
          body: new URLSearchParams({ username, password })
        });
    }
    if (type === AUTH_LOGOUT) {
      return fetch('/api/logout');
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return Promise.resolve();
    }
    return Promise.reject('Unknown method');
};

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import { login, logout, isLoggedIn } from './auth';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        return login(username, password);
    }
    if (type === AUTH_LOGOUT) {
      return logout();
    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return isLoggedIn().then(res => res ? Promise.resolve : Promise.reject());
    }
    return Promise.reject(new Error('Unknown method'));
};

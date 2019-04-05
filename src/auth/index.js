import { API_ENDPOINTS, JWT_HEADER, JWT_STORAGE_KEY } from '../conf';

export const login = (username, password) => fetch(API_ENDPOINTS.LOGIN, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password }),
}).then((res) => {
  if (!res.ok) {
    throw new Error('Login failed');
  }
  const jwt = res.headers.get(JWT_HEADER);
  localStorage.setItem(JWT_STORAGE_KEY, jwt);
});

export const logout = () => {
  localStorage.removeItem(JWT_STORAGE_KEY);
  return Promise.resolve();
};

export const isLoggedIn = () => {
  const res = !!localStorage.getItem(JWT_STORAGE_KEY);
  return Promise.resolve(res);
};

export const getAuthHeaders = () => ({
  [JWT_HEADER]: localStorage.getItem(JWT_STORAGE_KEY),
});

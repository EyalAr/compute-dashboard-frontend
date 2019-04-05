import {
  AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK,
} from 'react-admin';
import authProvider from '../../src/providers/auth';
import { JWT_HEADER, JWT_STORAGE_KEY } from '../../src/conf';

describe('providers/auth', () => {
  describe('AUTH_LOGIN', () => {
    beforeEach(() => {
      fetch.resetMocks();
      localStorage.removeItem(JWT_STORAGE_KEY);
    });

    describe('login succeeds', () => {
      beforeEach(() => {
        fetch
          .mockResponse(null, { status: 204, headers: { [JWT_HEADER]: 'something' } });
      });
      it('should return a resolved promise', () => expect(authProvider(AUTH_LOGIN, {
        username: 'bla',
        password: 'bla',
      })).resolves.toBeUndefined());
    });

    describe('login fails', () => {
      beforeEach(() => {
        fetch
          .mockReject(null, { status: 401 });
      });
      it('should return a rejected promise', () => expect(authProvider(AUTH_LOGIN, {
        username: 'bla',
        password: 'bla',
      })).rejects.toBeDefined());
    });
  });

  describe('AUTH_LOGOUT', () => {
    it('should return a resolved promise', () => expect(authProvider(AUTH_LOGOUT, {})).resolves.toBeUndefined());
  });

  describe('AUTH_ERROR', () => {
    it('should reject if status is 401', () => expect(authProvider(AUTH_ERROR, { status: 401 })).rejects.toBeUndefined());
    it('should reject if status is 403', () => expect(authProvider(AUTH_ERROR, { status: 403 })).rejects.toBeUndefined());
    it('should resolve if status is ok', () => expect(authProvider(AUTH_ERROR, { status: 200 })).resolves.toBeUndefined());
  });

  describe('AUTH_CHECK', () => {
    describe('user is logged in', () => {
      beforeEach(() => {
        localStorage.setItem(JWT_STORAGE_KEY, 'something');
      });
      it('should resolve', () => expect(authProvider(AUTH_CHECK, {})).resolves.toBeUndefined());
    });

    describe('user is not logged in', () => {
      beforeEach(() => {
        localStorage.removeItem(JWT_STORAGE_KEY);
      });
      it('should reject', () => expect(authProvider(AUTH_CHECK, {})).rejects.toBeUndefined());
    });
  });

  describe('other', () => {
    it('should return a rejected promise', () => expect(authProvider('AUTH_BLABLA', {})).rejects.toBeDefined());
  });
});

import {
  login, isLoggedIn, getAuthHeaders, logout,
} from '../../src/auth';
import { JWT_HEADER, JWT_STORAGE_KEY } from '../../src/conf';

describe('auth', () => {
  describe('login', () => {
    beforeEach(() => {
      fetch.resetMocks();
      localStorage.removeItem(JWT_STORAGE_KEY);
    });

    describe('login succeeds', () => {
      beforeEach(() => {
        fetch
          .mockResponse(null, { status: 204, headers: { [JWT_HEADER]: 'something' } });
      });
      it('should return a resolved promise', () => expect(login('john.k', 'passpass')).resolves.toBeUndefined());
    });

    describe('login fails', () => {
      beforeEach(() => {
        fetch
          .mockReject(null, { status: 401 });
      });
      it('should return a rejected promise', () => expect(login('john.k', 'passpass')).rejects.toBeDefined());
    });
  });

  describe('isLoggedIn', () => {
    describe('user is logged in', () => {
      beforeEach(() => {
        localStorage.setItem(JWT_STORAGE_KEY, 'something');
      });
      it('should resolve to true', () => expect(isLoggedIn()).resolves.toBe(true));
    });

    describe('user is not logged in', () => {
      beforeEach(() => {
        localStorage.removeItem(JWT_STORAGE_KEY);
      });
      it('should resolve to false', () => expect(isLoggedIn()).resolves.toBe(false));
    });
  });

  describe('getAuthHeaders', () => {
    const JWT = 'something';
    beforeEach(() => {
      localStorage.setItem(JWT_STORAGE_KEY, JWT);
    });
    it('should resolve to object with correct headers', () => expect(getAuthHeaders()).toHaveProperty(JWT_HEADER, JWT));
  });

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem(JWT_STORAGE_KEY, 'something');
    });
    it('should remove JWT from local storage', () => logout().then(() => expect(localStorage.getItem(JWT_STORAGE_KEY)).toBeFalsy()));
  });
});

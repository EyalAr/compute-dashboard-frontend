import { GET_LIST } from 'react-admin';
import dataProvider from '../../src/providers/data';
import mockEc2Instances from '../mockEc2Instances.json';

const params = {
  pagination: { page: 1, perPage: 10 },
  sort: { field: 'bla', order: 'DESC' },
};

describe('providers/data', () => {
  describe('GET_LIST', () => {
    describe('known resource', () => {
      beforeEach(() => {
        fetch.mockResponse(JSON.stringify(mockEc2Instances), { status: 200 });
      });
      it('should resolve with the correct payload', () => expect(dataProvider(GET_LIST, 'some-resource', params))
        .resolves.toEqual(mockEc2Instances));
    });

    describe('unknown resource', () => {
      beforeEach(() => {
        fetch.mockReject(null, { status: 404 });
      });
      it('should reject', () => expect(dataProvider(GET_LIST, 'some-resource', params))
        .rejects.toBeDefined());
    });
  });

  describe('other', () => {
    it('should return a rejected promise', () => expect(dataProvider('BLABLA', {})).rejects.toBeDefined());
  });
});

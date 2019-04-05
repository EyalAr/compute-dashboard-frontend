import { get } from '../http';

export default (resource, params) => {
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
  return get(resource, query);
};

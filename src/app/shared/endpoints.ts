import { environment } from '../../environments/environment';

const addPagination = (page: number, elements: any) =>
  `?pageNumber=${page}&pageElements=${elements}`;
const addPaginationWithDates = (
  page: number,
  elements: any,
  start: any,
  end: any
) => `${addPagination(page, elements)}&start=${start}&end=${end}`;
const addPaginationWithDatesAndState = (
  page: number,
  elements: any,
  start: any,
  end: any,
  state: string
) =>
  `${addPagination(page, elements)}&start=${start}&end=${end}&state=${state}`;

export const Endpoint = {
  AUTH: {
    LOGIN: environment.apiHost + environment.apiVersion + 'auth/login',
  },
  CATEGORY: {
    BASE: environment.apiHost + environment.apiVersion + 'category',
  },
  USER: {
    BASE: environment.apiHost + environment.apiVersion + 'user',
    ALL: (
      page: number,
      elements: number,
      start: string,
      end: string,
      id: any
    ) =>
      environment.apiHost +
      environment.apiVersion +
      `user/admin/${id}` +
      addPaginationWithDates(page, elements, start, end),
    UPDATE: (id: string) =>
      environment.apiHost + environment.apiVersion + `user/${id}`,
    UPDATEPASSWORD: (id: string) =>
      environment.apiHost + environment.apiVersion + `user/password/${id}`,
  },
  REPORT: {
    ALL: (page: number, elements: number, start: string, end: string) =>
      environment.apiHost +
      environment.apiVersion +
      `report` +
      addPaginationWithDates(page, elements, start, end),
    ALL_GENERAL: (year: string) =>
      environment.apiHost + environment.apiVersion + `report/general/${year}`,
    CITY: (year: string) =>
      environment.apiHost + environment.apiVersion + `report/city/${year}`,
    CATEGORY: (year: string) =>
      environment.apiHost + environment.apiVersion + `report/category/${year}`,
  },
};

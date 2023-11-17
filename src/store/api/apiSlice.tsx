import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_URL = 'https://swapi.dev/api/people/';

export interface SWPeople {
  count: number;
  results: SWPerson[];
}

export interface SWPerson {
  name: string;
  gender: string;
  birth_year: string;
  height: string;
  skin_color: string;
  starships: string;
  url: string;
  mass: string;
  eye_color: string;
}

export const apiSlice = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPeopleInfo: builder.query({
      query: (params: { search: string; page: string }) => {
        return params.search
          ? `?page=${params.page}&search=` + params.search
          : `?page=${params.page}`;
      },
    }),
    getPersonDetail: builder.query({
      query: (id: string) => `${id}`,
    }),
  }),
});

export const { useGetPersonDetailQuery, useGetPeopleInfoQuery } = apiSlice;

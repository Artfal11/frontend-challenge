import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Cat {
  id: string;
  url: string;
}

export const catsApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/' }),
  endpoints: (builder) => ({
    getCats: builder.query<Cat[], number>({
      query: (page) => `images/search?limit=10&page=${page}`,
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetCatsQuery } = catsApi;
/**
 * builder.query for getting data from the server
 *
 * builder.mutate for modifying data on the server
 *
 * When calling a mutator hook in the UI, it returns an array with 2 values:
 *  a trigger function: makes the request to the server
 *  an object with other values, such as isLoading
 * If we need to pass multiple data fields to the query, use an object
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiSlice = createApi({
  reducerPath: 'api', // default (not needed)
  // baseQuery is a function. fetchBaseQuery takes the baseURL and can modify request headers
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // For authentication
  }),

  endpoints: () => ({}),
  tagTypes: ['Game', 'Challenge'],
});

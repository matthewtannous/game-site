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

import { createApi } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_URL;

/* REST API Slice

export const apiSlice = createApi({
  reducerPath: 'api', // default (not needed)
  // baseQuery is a function. fetchBaseQuery takes the baseURL and can modify request headers
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // For authentication
  }),
  keepUnusedDataFor: 10, // time to keep cached data

  endpoints: () => ({}),
  tagTypes: ['Game', 'Challenge'],
});
*/

export const apiSlice = createApi({
  baseQuery: async ({ document, variables }) => {
    try {
      const res = await fetch(`${BASE_URL}/graphql`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: document, variables }),
      });

      const data = await res.json();

      if (!res.ok || data.errors) {
        return { error: { status: res.status, data: data.errors ?? result, } };
      }

      return { data: data.data };
    } catch (err) {
      return { error: { status: 'FETCH_ERROR', data: String(err) } };
    }
  },
  keepUnusedDataFor: 10,

  endpoints: (builder) => ({}),
  tagTypes: ['Game', 'Challenge'],
});

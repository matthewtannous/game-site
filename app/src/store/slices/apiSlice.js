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
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

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

// GraphQL API Slice (https://github.com/reduxjs/redux-toolkit/blob/master/examples/query/react/graphql/src/app/services/posts.ts)
export const apiSlice = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: BASE_URL + '/graphql',
    // To pass cookies
    fetchFn: async (input, init = {}) => {
      // Ensure credentials are included
      const response = await fetch(input, {
        ...init,
        credentials: 'include',
        headers: {
          ...(init.headers || {}),
        },
      });
      return response;
    },
  }),
  keepUnusedDataFor: 10,

  endpoints: () => ({}),
  tagTypes: ['Game', 'Challenge'],
});

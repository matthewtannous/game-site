import { apiSlice } from './apiSlice';

// createChallenge,

export const apiChallengeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllChallenges: builder.query({
    //     query: () => '/challenges/detailed',
    //     providesTags: ['Challenge'],
    // }),

    getSentChallenges: builder.query({
      query: (userId) => `/challenges/sent/${userId}`,
      providesTags: ['Challenge'],
    }),
    getReceivedChallenges: builder.query({
      query: (userId) => `/challenges/received/${userId}`,
      providesTags: ['Challenge'],
    }),

    createChallenge: builder.mutation({
      query: (data) => ({
        url: '/challenges',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Challenge'],
    }),
    deleteChallenge: builder.mutation({
      query: (challengeId) => ({
        url: `/challenges/${challengeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Challenge'],
    }),
    acceptChallenge: builder.mutation({
      query: (challengeId) => ({
        url: `/challenges/accept/${challengeId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Challenge', 'Game'],
    }),
  }),
});

// export auto-generated hooks
export const {
  useGetSentChallengesQuery,
  useGetReceivedChallengesQuery,
  useCreateChallengeMutation,
  useDeleteChallengeMutation,
  useAcceptChallengeMutation,
} = apiChallengeSlice;

import { apiSlice } from './apiSlice';

// createChallenge,
/*
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
*/

export const apiChallengeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChallenges: builder.query({
      query: (userId) => ({
        document: `
        query GetChallenges($userId: Int!) {
         sentChallenges: detailedChallenges(playerId: $userId, sent: true) {
          id
          senderId
          senderName
          receiverId
          receiverName
          gameType
          createdAt
         }

         receivedChallenges: detailedChallenges(playerId: $userId, sent: false) {
          id
          senderId
          senderName
          receiverId
          receiverName
          gameType
          createdAt
         }
        }
        `,
        variables: {
          userId,
        },
      }),
      providesTags: ['Challenge'],
    }),

    createChallenge: builder.mutation({
      query: (data) => ({
        document: `
        mutation CreateChallenge($data: CreateChallengeInput!) {
          createChallenge(createChallengeInput: $data) {
            id
          }
        }`,
        variables: {
          data,
        }
      }),
    }),

    deleteChallenge: builder.mutation({
      query: (challengeId) => ({
        document: `
        mutation DeleteChallenge($challengeId: Int!) {
          removeChallenge(id: $challengeId) {
            id
          }
        }`,
        variables: {
          challengeId,
        }
      }),
    }),

    acceptChallenge: builder.mutation({
      query: (challengeId) => ({
        document: `
        mutation AcceptChallenge($challengeId: Int!) {
          acceptChallenge(id: $challengeId) {
            id
          }
        }`,
        variables: {
          challengeId,
        }
      }),
    }),


  }),
});

// export auto-generated hooks
// export const {
//   useGetSentChallengesQuery,
//   useGetReceivedChallengesQuery,
//   useCreateChallengeMutation,
//   useDeleteChallengeMutation,
//   useAcceptChallengeMutation,
// } = apiChallengeSlice;

export const {
  useGetChallengesQuery,
  useCreateChallengeMutation,
  useDeleteChallengeMutation,
  useAcceptChallengeMutation,
} = apiChallengeSlice;
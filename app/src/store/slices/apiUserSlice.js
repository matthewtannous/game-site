import { apiSlice } from './apiSlice';


export const apiUserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersExcept: builder.query({
      query: (id) => ({
        document: `
        query GetAllUsersExcept($id: Int!) {
          usersExcept(id: $id) {
            id
            username
          }
        }
          `,
          variables: {
            id
          }
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        document: `
        mutation DeleteUser($id: Int!) {
          removeUser(id: $id) {
            id
          }
        }`,
        variables: {
          id: id,
        }
      }),
    }),
  }),
});

// export auto-generated hooks
export const {
  useGetAllUsersExceptQuery,
  useDeleteUserMutation,

} = apiUserSlice;

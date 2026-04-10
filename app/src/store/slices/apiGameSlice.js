import { apiSlice } from "./apiSlice";

export const apiGameSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getAllGames: builder.query({
        //     query: () => '/games/detailed',
        //     providesTags: ['Game'], // might change move to make it other user's turn
        // }),

        // Get all games that user is in
        getAllGamesOneUser: builder.query({
            query: userId => `/games/user/${userId}`,
            providesTags: ['Game'],
        }),

        // Get one game
        getOneGame: builder.query({
            query: gameId => `/games/detailed/${gameId}`,
            providesTags: ['Game'],
        }),

        // Make a move in a game
        addGameMove: builder.mutation({
            query: move => ({
                url: '/games/play',
                method: 'POST',
                body: move,
            }),
            invalidatesTags: ['Game'],
        }),

        // Delete a game
        deleteGame: builder.mutation({
            query: gameId => ({
                url: `games/${gameId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Game'],
        }),

        updateGameState: builder.mutation({
            query: game => ({
                url: '/games/state',
                method: 'PUT',
                body: game,
            }),
            invalidatesTags: ['Game'],
        }),
    }),
});
// export auto-generated hooks
export const {
    useGetAllGamesOneUserQuery,
    useGetOneGameQuery,
    useAddGameMoveMutation,
    useDeleteGameMutation,
    useUpdateGameStateMutation,
} = apiGameSlice;
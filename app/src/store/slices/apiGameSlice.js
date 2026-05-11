import { getSocket } from '../../services/socket';
import { apiSlice } from './apiSlice';

/*
export const apiGameSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllGames: builder.query({
    //     query: () => '/games/detailed',
    //     providesTags: ['Game'], // might change move to make it other user's turn
    // }),

    // Get all games that user is in
    getAllGamesOneUser: builder.query({
      query: (userId) => `/games/user/${userId}`,
      providesTags: ['Game'],
    }),

    // Get one game
    getOneGame: builder.query({
      query: (gameId) => `/games/detailed/${gameId}`,
      providesTags: ['Game'],

      async onCacheEntryAdded(
        gameId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = getSocket();

        // data must be exactly like it is cached in the store
        const handler = (data) => {
          if (String(data.gameId) !== String(gameId)) return;

          updateCachedData((draft) => {
            Object.assign(draft, data.game);
          });
        };
        try {
          await cacheDataLoaded;

          socket.on('gameUpdated', handler);
        } catch (error) {
          console.log(error);
        }

        await cacheEntryRemoved;

        socket.off('gameUpdated', handler);
      },
    }),

    // Make a move in a game
    addGameMove: builder.mutation({
      query: (move) => ({
        url: '/games/play',
        method: 'POST',
        body: move,
      }),
      // invalidatesTags: ['Game'],
    }),

    // Delete a game
    deleteGame: builder.mutation({
      query: (gameId) => ({
        url: `games/${gameId}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Game'],
    }),

    updateGameState: builder.mutation({
      query: (game) => ({
        url: '/games/state',
        method: 'PUT',
        body: game,
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});
*/

export const apiGameSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all games that user is in
    getAllGamesOneUser: builder.query({
      query: (userId) => ({
        document: `
        query GetGames($userId: Int!) {
          detailedGamesForPlayer(playerId: $userId) {
            id
            player1Id
            player1Name
            player2Id
            player2Name
            gameType
            state
            lastMovePlayedAt
          }
        }
          `,
        variables: {
          userId: Number(userId),
        },
      }),
      providesTags: ['Game'],
    }),

    // Get one game (This query also gets the move array)
    getOneGame: builder.query({
      query: (gameId) => ({
        document: `
        query GetGame($gameId: Int!) {
          detailedGame(id: $gameId) {
            id
            player1Id
            player1Name
            player2Id
            player2Name
            gameType
            state
            lastMovePlayedAt
            moves
          }
        }
        `,
        variables: {
          gameId: Number(gameId),
        },
      }),
      providesTags: ['Game'],

      async onCacheEntryAdded(
        gameId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = getSocket();

        // data must be exactly like it is cached in the store
        const handler = (data) => {
          if (String(data.gameId) !== String(gameId)) return;

          updateCachedData((draft) => {
            if (draft.detailedGame)
              Object.assign(draft.detailedGame, data.game);
          });
        };
        try {
          await cacheDataLoaded;

          socket.on('gameUpdated', handler);
        } catch (error) {
          console.log(error);
        }

        await cacheEntryRemoved;

        socket.off('gameUpdated', handler);
      },
    }),

    // Make a move in a game
    addGameMove: builder.mutation({
      query: (move) => ({
        document: `
        mutation AddGameMove($moveDto: MoveDto!) {
        addMove(moveDto: $moveDto) {
            id
            moves
          }
        }
        `,
        variables: {
          moveDto: move,
        }
      }),

      invalidatesTags: ['Game'],
    }),

    // Delete a game
    deleteGame: builder.mutation({
      query: (gameId) => ({
        document: `
        mutation DeleteGame($gameId: Int!) {
        removeGame(id: $gameId) {
            id
          }
        }
        `,
        variables: {
          gameId: Number(gameId),
        }
      }),
      invalidatesTags: ['Game'],
    }),

    updateGameState: builder.mutation({
      query: (game) => ({
        document: `
        mutation UpdateGameState($gameState: UpdateStateDto!) {
        updateGameState(updateStateDto: $gameState) {
            id
            moves
            state
          }
        }
        `,
        variables: {
          gameState: game,
        }
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

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

// Create the store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

/**
 * Every time auth.user is updated (e.g. through signIn and signOut),
 * reflect this change in localStorage
 */
store.subscribe(() => {
    // We named the slice 'auth' and the data inside it is 'user', so we access it with state.auth.user
    const user = store.getState().auth.user;
    try {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    } catch {
        // ignore
    }
});
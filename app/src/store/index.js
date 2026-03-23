import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

store.subscribe(() => {
    const user = store.getState().auth.user;
    try {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    } catch {
        // ignore
        alert('ERROR IN STORE!!!!!!!');
    }
});
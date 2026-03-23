import { createSlice } from '@reduxjs/toolkit';

function loadUserFromStorage() {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

const initialState = {
    user: loadUserFromStorage(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state, action) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
        },
    },

});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
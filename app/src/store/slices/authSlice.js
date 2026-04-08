import { createSlice } from '@reduxjs/toolkit';

/**
 * HAS NOTHING TO DO WITH REDUX
 * This function simply returns a value if it is stored in the user's browser
 */
function loadUserFromStorage() {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

// Defines what authSlice looks like and its initial values
const initialState = {
    user: loadUserFromStorage(), // accessed using state.user
};

// Create a slice
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        // action has 2 fields: payload and type
        // action.payload is the data passed to the function
        signIn: (state, action) => {
            state.user = action.payload; // payload = user object returned from auth API
        },
        signOut: (state) => {
            state.user = null;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
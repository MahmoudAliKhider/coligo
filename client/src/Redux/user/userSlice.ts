
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    currentUser: {
        avatar: string;
        name: string;
        email: string;
    } | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.error = null,
                state.loading = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload,
                state.loading = false
        },

        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { signInStart, signInSuccess, signInFailure, signOutUserFailure, signOutUserStart, signOutUserSuccess } = userSlice.actions

export default userSlice.reducer;
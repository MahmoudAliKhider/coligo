
import { createSlice } from '@reduxjs/toolkit';

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;

}

interface UserState {
    currentUser: User | null;
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
        signUpStart: (state) => {
            state.loading = true
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.error = null,
                state.loading = false
        },
        signUpFailure: (state, action) => {
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

export const { signInStart, signInSuccess, signInFailure, signUpStart, signUpSuccess, signUpFailure, signOutUserFailure, signOutUserStart, signOutUserSuccess } = userSlice.actions

export default userSlice.reducer;
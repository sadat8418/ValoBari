import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        user: null,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
            state.token = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = true;
        }
    }
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        roles: null,
    },
    reducers: {
        setAccessToken(state, action) {
            const newToken = action.payload.accessToken;
            state.accessToken = newToken;
            localStorage.setItem('accessToken', newToken);
        },

        setRoles(state, action) {
            const newRoles = action.payload.roles;
            state.roles = newRoles;
        },

        deleteAccessToken(state, action) {
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },

        deleteRoles(state, action) {
            state.roles = null;
        },

        loadTokenFromStorage(state, action) {
            const loadedToken = localStorage.getItem('accessToken');
            if(loadedToken) {
                state.accessToken = loadedToken;
                state.roles = jwtDecode(loadedToken).roles;
            }
        },

        logout(state, action) {
            state.accessToken = null;
            state.roles = null;
            localStorage.removeItem('accessToken');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;
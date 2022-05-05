import { createSlice } from "@reduxjs/toolkit";

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
            localStorage.setItem('roles', newRoles);
        },

        deleteAccessToken(state, action) {
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },

        deleteRoles(state, action) {
            state.roles = null;
            localStorage.removeItem('roles');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;
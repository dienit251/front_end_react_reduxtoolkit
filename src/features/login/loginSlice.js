import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_URL } from '../../app/api';
import { useCookies } from 'react-cookie';

const initialState = {
    isLoading: false,
    error: null,
    isAuthenticated: false,
    user: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const checkLogin = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(LOGIN_URL, { username, password });
        if (response.status == 200 && response.data.accessToken) {
            dispatch(loginSuccess({ username: username }))
            return response;
        }
    } catch (error) {
        dispatch(loginFailure('Please check username and password again.'))
        return null;
    }
}

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;
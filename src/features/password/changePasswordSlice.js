import { createSlice } from "@reduxjs/toolkit";
import axiosIns from '../../components/axiosIns';
import Cookies from 'js-cookie';
import { CHECK_PASSWORD_URL, UPDATE_NEW_PASSWORD_URL } from "../../app/api";

const initialState = {
    isShowChangePwd: false,
    error: null
};

const changePwdSlice = createSlice({
    name: 'changePwd',
    initialState,
    reducers: {
        setIsShowChangePwd: (state, action) => {
            state.isShowChangePwd = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const checkPassword = (password) => async dispatch => {
    try {
        const response = await axiosIns.post(CHECK_PASSWORD_URL, { username: Cookies.get('username'), password: password });
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const updateNewPassword = (password) => async dispatch => {
    try {
        const response = await axiosIns.post(UPDATE_NEW_PASSWORD_URL, { username: Cookies.get('username'), password: password });
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const { setIsShowChangePwd, setError } = changePwdSlice.actions;
export default changePwdSlice.reducer;
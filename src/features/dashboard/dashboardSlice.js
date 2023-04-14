import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { GET_DATA_DASHBOARD_URL } from "../../app/api";
import axiosIns from '../../components/axiosIns';

const initialState = {
    dataField: null,
    dataContract: null,
    dataColumn: null
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDataField: (state, action) => {
            state.dataField = action.payload;
        },
        setDataContract: (state, action) => {
            state.dataContract = action.payload;
        },
        setDataColumn: (state, action) => {
            state.dataColumn = action.payload;
        }
    }
});

export const fetchDataDashboard = () => async dispatch => {
    const username = Cookies.get('username');
    const response = await axiosIns.get(`${GET_DATA_DASHBOARD_URL}?username=${username}`);
    dispatch(setDataField(JSON.parse(response.data.dataField.sp_count_field_visit_board)));
    dispatch(setDataContract(JSON.parse(response.data.dataContract.sp_count_contract_visit_board_month)));
    dispatch(setDataColumn(response.data.dataColumn));
}

export const { setDataField, setDataContract, setDataColumn } = dashboardSlice.actions;

export default dashboardSlice.reducer;
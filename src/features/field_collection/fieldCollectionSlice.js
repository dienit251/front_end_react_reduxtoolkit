import { createSlice } from "@reduxjs/toolkit";
import axiosIns from '../../components/axiosIns';
import Cookies from 'js-cookie';
import { GET_MASTERDATA_FIELD_COLLECTION_URL } from "../../app/api";


const initialState = {
    masterData: null,
    isShowFilter: false
}

const filedCollectionSlice = createSlice({
    name: 'fieldCollection',
    initialState,
    reducers: {
        openFilter: (state) => {
            state.isShowFilter = true;
        },
        closeFilter: (state) => {
            state.isShowFilter = false;
        },
        setMasterData: (state, action) => {
            var preObject = action.payload;
            var object = {};
            object.fcs = preObject.fcs.map(x => { return { label: x, value: x } });
            object.allocationCodes = preObject.allocationCodes.map(x => { return { label: x.statusDescription, value: x.statusDescription } });
            object.statuses = preObject.statuses.map(x => { return { label: `${x.statusCode} - ${x.statusDescription}`, value: x.statusCode } });
            object.begins = preObject.begins.map(x => { return { label: x.beginCode, value: x.beginCode } });
            object.products = preObject.products.map(x => { return { label: `${x.productCode} - ${x.productName}`, value: x.productCode } });
            object.areas = preObject.areas.map(x => { return { label: x.province_name, value: x.province_id, districts: x.districts.map(y => { return { label: y.district_name, value: y.district_id } }) } })
            console.log(object);
            state.masterData = object;
        }
    }
});

export const fetchMasterData = () => async dispatch => {
    try {
        const response = await axiosIns.post(GET_MASTERDATA_FIELD_COLLECTION_URL, { username: Cookies.get('username') });
        dispatch(setMasterData(response.data));
    } catch (err) {
        console.log(err);
    }
}

export const { openFilter, closeFilter, setMasterData } = filedCollectionSlice.actions;

export default filedCollectionSlice.reducer;
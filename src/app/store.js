import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import fieldCollectionReducer from '../features/field_collection/fieldCollectionSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import changePwdReducer from '../features/password/changePasswordSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    dashboard: dashboardReducer,
    changePwd: changePwdReducer,
    fieldCollection: fieldCollectionReducer
  },
});

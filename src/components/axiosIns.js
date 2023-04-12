import axios from 'axios';
import Cookies from 'js-cookie';

const axiosIns = axios.create();

axiosIns.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosIns;
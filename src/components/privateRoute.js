import Cookies from 'js-cookie';
import { Navigate } from 'react-router';

export function PrivateRoute({ children }) {
    const accessToken = Cookies.get('accessToken');
    return accessToken ? children : <Navigate to='/login' />
}
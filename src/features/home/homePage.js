import React from 'react';
import SideBar from '../../components/SideBar';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PlayersPage from '../players/playersPage';


function HomePage() {

    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('authorities');
        navigate('/');
    }


    return (
        <div className='app'>
            <SideBar />
            <main>
                <div>
                    <div className="topbar">
                        <div></div>
                        <Button className='btnSignOut' onClick={() => logout()}>Sign Out</Button>
                    </div>
                    <Outlet />
                    <Routes>
                        <Route path="players" element={<PlayersPage />} />
                    </Routes>
                </div>
            </main>

        </div>
    );
}

export default HomePage;
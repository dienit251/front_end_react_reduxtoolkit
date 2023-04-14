import React from 'react';
import SideBar from '../../components/SideBar';
import { Button } from '@mui/material';
import { useNavigate, useOutlet, Navigate, Route, Routes, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIsShowChangePwd } from '../password/changePasswordSlice';
import ChangePasswordForm from '../password/changePassword';


function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const outlet = useOutlet();
    const logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('authorities');
        Cookies.remove('username');
        navigate('/login');
    }
    const path = window.location.pathname;
    const breadCrumbMap = {
        '/home/dashboard': 'Dashboard', '/home/fieldCollection': 'Field Collection'
    };

    const openChangePwd = () => {
        dispatch(setIsShowChangePwd(true));
    }


    return (
        <div className='app'>

            <SideBar />
            <main>
                <div>
                    <div className="topbar">
                        <Link to="/home/dashboard" className="linkHomeA">
                            <div className="linkHome">
                                <h2>Collection System</h2>
                            </div>
                        </Link>
                        <div>
                            <DropdownButton title={Cookies.get('username') ? Cookies.get('username') : ''} className='btnSignOut'>
                                <Dropdown.Item className="dropdownItem" onClick={openChangePwd}>Change Password</Dropdown.Item>
                                <Dropdown.Item className="dropdownItem" onClick={logout}>Logout</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        {/* <Button className='btnSignOut' onClick={() => logout()}>Sign Out</Button> */}
                    </div>
                    <div className="customBreadcrumb">
                        <h4>{breadCrumbMap[path]}</h4>
                    </div>
                    <div className="outletForChild" >
                        {outlet}
                    </div>

                </div>
            </main>
            <ChangePasswordForm />
        </div>
    );
}
export default HomePage;
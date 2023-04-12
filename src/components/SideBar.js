import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { FaUsers } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const { collapseSidebar } = useProSidebar();
    const user = useSelector(state => state.login.user);
    const navigate = useNavigate();

    const navigatePage = (page) => {
        navigate(page);
    }

    return (
        <div>

            <Sidebar style={{ height: "100vh", backgroundColor: '#283a47 !important' }}>
                <Menu>
                    <MenuItem className='btnCollapse'
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <h2>MENU</h2>
                    </MenuItem>

                    <MenuItem icon={<FaUsers />} onClick={() => navigatePage('/home/players')}>Player management</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SideBar;
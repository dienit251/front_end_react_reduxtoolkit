import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FaBook, FaBookOpen, FaChartArea, FaChartBar, FaChartLine, FaChartPie, FaClipboardCheck, FaFacebookMessenger, FaHome, FaNewspaper, FaRegChartBar, FaSearchLocation, FaUnlock, FaUserAlt, FaUserPlus, FaUsersCog } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';

function SideBar() {
    const { collapseSidebar } = useProSidebar();
    const path = window.location.pathname;
    const username = Cookies.get('username');
    return (
        <div>
            <Sidebar style={{ height: "100vh", backgroundColor: '#283a47 !important' }} width={'18rem'}>
                <Menu>
                    <MenuItem className='btnCollapse'
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{ textAlign: "center" }}
                    >
                        {" "}
                        <img src={process.env.PUBLIC_URL + '/images/logo-white.png'} alt="logoBPO" className="logoSidebar" />
                    </MenuItem>
                    <div className="sidebarUserInfo">
                        <div>
                            <Row>
                                <Col md={3}><img src={process.env.PUBLIC_URL + '/images/peoplecircle.png'} alt="logoUser" className="logoUser inSidebar" /></Col>
                                <Col md={2}></Col>
                                <Col md={6}><h4>{username && username.toUpperCase()}</h4></Col>
                            </Row>
                        </div>
                    </div>
                    <MenuItem icon={<FaHome />} component={<Link to="/home/dashboard" />} className={path === '/home/dashboard' ? 'menu-active' : ''}> Home</MenuItem>
                    <MenuItem icon={<FaNewspaper />} component={<Link to="/home/fieldCollection" />} className={path === '/home/fieldCollection' ? 'menu-active' : ''}> Field Collection</MenuItem>

                    <SubMenu label="Management" icon={<FaBookOpen />}>
                        <MenuItem icon={<FaFacebookMessenger />} className={path === '/pushingNotification' ? 'menu-active' : ''}>Pushing Notification</MenuItem>
                        <MenuItem icon={<FaBook />} className={path === '/fcPlanning' ? 'menu-active' : ''}>FC Planning</MenuItem>
                        <MenuItem icon={<FaSearchLocation />} className={path === '/fcArea' ? 'menu-active' : ''}>FC Area</MenuItem>
                        <MenuItem icon={<FaClipboardCheck />} className={path === '/noticeBoard' ? 'menu-active' : ''}>Notice Board</MenuItem>
                    </SubMenu>
                    <SubMenu label="Reporting" icon={<FaChartBar />}>
                        <MenuItem icon={<FaChartArea />} className={path === '/visitHistoryReport' ? 'menu-active' : ''}>Visit History Report</MenuItem>
                        <MenuItem icon={<FaChartLine />} className={path === '/tatReport' ? 'menu-active' : ''}>TAT Report</MenuItem>
                        <MenuItem icon={<FaChartPie />} className={path === '/receiptReport' ? 'menu-active' : ''}>Receipt Report</MenuItem>
                        <MenuItem icon={<FaRegChartBar />} className={path === '/attachmentReport' ? 'menu-active' : ''}>Attachment Report</MenuItem>
                    </SubMenu>
                    <SubMenu label="Administration" icon={<FaUnlock />}>
                        <MenuItem icon={<FaUserAlt />} className={path === '/userManagement' ? 'menu-active' : ''}>User Management</MenuItem>
                        <MenuItem icon={<FaUsersCog />} className={path === '/roleManagement' ? 'menu-active' : ''}>Role Management</MenuItem>
                        <MenuItem icon={<FaUserPlus />} className={path === '/agencyManagement' ? 'menu-active' : ''}>Agency Management</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    )
}
export default SideBar;
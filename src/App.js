import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './features/home/homePage';
import LoginPage from './features/login/loginPage';


function App() {

  const accessToken = Cookies.get('accessToken');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={accessToken ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </div>

  );
}

export default App;

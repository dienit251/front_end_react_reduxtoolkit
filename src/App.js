import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './features/home/homePage';
import LoginPage from './features/login/loginPage';
import DashboardPage from './features/dashboard/dashboardPage';
import FieldCollectionPage from './features/field_collection/fieldCollectionPage';
import { PrivateRoute } from './components/privateRoute';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}>
          <Route path="/home/*">
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="fieldCollection" element={<FieldCollectionPage />} />
          </Route>
        </Route>
      </Routes>
    </div>

  );
}
export default App;

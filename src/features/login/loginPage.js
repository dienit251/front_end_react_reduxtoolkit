import { Button, FormControl, InputAdornment, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import './login.css';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin, loginSuccess } from './loginSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginError = useSelector(state => state.login.error);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await dispatch(checkLogin(username, password));
            const { accessToken, authorities, expireTime, tokenType } = response.data;
            const expires = new Date(Date.now() + Number(expireTime) * 1000); // Convert seconds to milliseconds
            Cookies.set('accessToken', accessToken, { expires: expires, path: '/' });
            Cookies.set('authorities', authorities, { expires: expires, path: '/' });
            Cookies.set('username', username, { expires: expires, path: '/' });
            navigate('/home/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Paper className="paperContainer">

            <form onSubmit={submitLogin}>
                <FormControl className="loginForm">
                    <h3>COLLECTION SYSTEM</h3>
                    <TextField label="Username" variant="outlined" type='text' fullWidth size="small" style={{ marginTop: '1.5rem' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        className='textFieldMUI'
                        onChange={(event) => setUsername(event.target.value)} />
                    <TextField label="Password" variant="outlined" type='password' fullWidth size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                        className='textFieldMUI'
                        onChange={(event) => setPassword(event.target.value)} />
                    <Button variant="contained" color="success" type='submit' style={{ marginTop: '1rem', backgroundColor: '#429a86' }}>
                        LOGIN
                    </Button>
                    {loginError && <span style={{ color: 'red', fontSize: '14px' }}>{loginError}</span>}
                </FormControl>
            </form>
        </Paper>
    )
}

export default LoginPage;
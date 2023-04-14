import { Lock } from '@mui/icons-material';
import { InputAdornment, TextField, Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { checkPassword, setError, setIsShowChangePwd, updateNewPassword } from './changePasswordSlice';
import { useNavigate } from 'react-router';

function ChangePasswordForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    const isShowChangePwd = useSelector(state => state.changePwd.isShowChangePwd);
    const error = useSelector(state => state.changePwd.error);

    const [valid, setValid] = useState(false);

    const close = () => {
        dispatch(setIsShowChangePwd(false));
    }

    const handleChangePwd = () => {
        dispatch(setError(null));
        if (oldPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
            dispatch(setError('Please enter Old password, New password and Confirm password'));
            setValid(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            dispatch(setError('The new password and confirmation password do not match'));
            setValid(false);
            return;
        }
        if (!dispatch(checkPassword(oldPassword))) {
            dispatch(setError('Old password is not correct'));
            setValid(false);
            return;
        }
        if (!regexPassword.test(confirmPassword)) {
            dispatch(setError('New password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'));
            setValid(false);
            return;
        }
        setValid(true);
    }

    useEffect(() => {
        if (valid && !error) {
            const updatePwdResult = dispatch(updateNewPassword(confirmPassword));
            if (!updatePwdResult) {
                dispatch(setError('Error occurred while processing change password, please try again'));
            } else {
                close();
                navigate('/login');
            }
        }
    }, [valid, error]);

    return (
        <Modal show={isShowChangePwd} onHide={close}>
            <Modal.Header closeButton>Change password</Modal.Header>
            <Modal.Body>

                <TextField label="Old password" variant="outlined" type='password' fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                    className='textFieldMUI'
                    onChange={(event) => setOldPassword(event.target.value)} />
                <TextField label="New password" variant="outlined" type='password' fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                    className='textFieldMUI'
                    onChange={(event) => setNewPassword(event.target.value)} />
                <TextField label="Confirm password" variant="outlined" type='password' fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                    className='textFieldMUI'
                    onChange={(event) => setConfirmPassword(event.target.value)} />
                <div style={{ textAlign: 'center', color: 'red', fontSize: '14px' }}>
                    {error && <span>{error}</span>}
                </div>

            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'space-around' }}>
                <Button variant="contained" color="success" onClick={handleChangePwd} style={{ backgroundColor: '#429a86', width: '10rem' }}>
                    SAVE
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangePasswordForm;
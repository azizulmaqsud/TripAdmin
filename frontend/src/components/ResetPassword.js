import { Box, Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPasswordRequest } from '../redux/auth/authSlice';

const ResetPassword = ({ email }) => {
    const [newEmail, setNewEmail] = useState(email);
    const dispatch = useDispatch();
    const handleChange = ({ target }) => {
        setNewEmail(target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordRequest({ email: newEmail }))
    }
    return (
        <Container >
            <form onSubmit={handleSubmit}>
                <TextField
                    value={newEmail}
                    fullWidth
                    variant='outlined'
                    name="email"
                    type="email"
                    label="Enter Email"
                    sx={{ mt: 3 }}
                    required
                    onChange={handleChange}
                />
                <Box sx={{ textAlign: "center" }}>
                    <Button type='submit' size='large' variant="contained" sx={{ color: "#fff", boxShadow: "none", my: 3, px: 5 }}>Send</Button>
                </Box>
            </form>
        </Container>
    );
};

export default ResetPassword;
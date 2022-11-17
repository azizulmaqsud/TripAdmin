import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
const Logout = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <ListItemButton sx={{ color: "error.main", '&:hover': { bgcolor: "primary.main", color: "#fff", '& .icon': { color: "#fff" } } }} onClick={logoutHandler}>
            <ListItemIcon>
                <LogoutIcon className='icon' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
        </ListItemButton>
    );
};

export default Logout;
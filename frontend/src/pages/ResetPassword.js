import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, verifyResetPassword } from '../redux/auth/authSlice';
import Preloader from '../components/Preloader';
import { setNotification } from '../redux/notification/notificationSlice';



export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const { isLoading, isError, redirect } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(verifyResetPassword({ token }))
    }, [token, dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const resetData = {
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
            token
        }
        if (resetData.password !== resetData.confirmPassword) {
            dispatch(setNotification({ severity: "error", message: "Password doesn't match" }));
            return;
        }
        dispatch(resetPassword(resetData))
    };
    if (isError) {
        navigate("/")
    }
    if (redirect.status) {
        navigate(redirect.path || "/login")
    }
    if (isLoading) {
        return <Preloader />
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper variant='outlined' sx={{ p: 3, mt: 10 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            id="password"
                            label="New Password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                        />
                        <Box sx={{ position: "relative" }}>
                            <Button
                                type="submit"
                                fullWidth
                                disabled={isLoading}
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: "#fff" }}
                            >
                                Reset
                            </Button>
                            {isLoading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        mt: -1,
                                        ml: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/authSlice';



export default function SignIn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isAuthenticated, isLoading } = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password')
    }
    dispatch(login(loginData))
  };

  if (isAuthenticated) {
    navigate(state?.from || "/dashboard")
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              // required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
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
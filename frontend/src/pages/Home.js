import React from 'react';
import { Box, Container } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/images/rydelogo2.png';
import logoWhite from '../assets/images/logo-white.png';
import ThemeToggler from '../components/ThemeToggler';

const Home = () => {
    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "space-between", py: 3, "& a": { textDecoration: "none" } }}>
                {/* Logo */}
                {/* <img width={100} height={100} src={colorMode === 'light' ? logo : logoWhite} alt="Logo" />  */}
                <img width={100} height={50} src={logo} alt="Logo" />

                <Box>
                    <Box component={"span"} mr={1}>
                        <ThemeToggler />
                    </Box>
                    <Link to="/login">
                        <Button variant='contained' color='primary'>Login</Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
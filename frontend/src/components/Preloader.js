import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Preloader = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <CircularProgress />
        </Box>
    );
};

export default Preloader;
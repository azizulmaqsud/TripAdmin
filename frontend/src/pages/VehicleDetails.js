import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { getVehicle } from '../services/vehiclesService';
const VehiclesDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVehicle({ email: id }).then(res => {
            setVehicle(res.data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, [id])
    return (
        <>

            {
                loading ? <Preloader /> :
                    <Paper sx={{ mt: 5, px: 3, py: 2 }} elevation={0}>
                        <Typography variant='h6' color="primary">General Information:</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Grid container rowSpacing={0} columnSpacing={8}>
                            <Grid item lg={12} xs={12} sx={{ "& pre": { fontFamily: "inherit" } }}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                        Plate Number: <br />
                                        Vin Number: <br />
                                        Brand Name: <br />
                                        Serial Number: <br />
                                        IMEI: <br />
                                        NFTID:
                                    </Typography>
                                    <Typography>
                                        {vehicle?.plateNumber} <br />
                                        {vehicle?.vinNumber} <br />
                                        {vehicle?.brandName} <br />
                                        {vehicle?.serialNumber} <br />
                                        {vehicle?.IMEI} <br />
                                        {vehicle?.algorandNFTID}
                                    </Typography>
                                </Box>



                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                        Location: <br />
                                        QR Code: <br />
                                        Tokens: <br />
                                        Charge Precentage:
                                    </Typography>
                                    <Typography>
                                        {vehicle?.location} <br />
                                        {vehicle?.qrCode} <br />
                                        {vehicle?.tokens} <br />
                                        {vehicle?.chargePrecentage}
                                    </Typography>
                                </Box>

                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                        Token 1 Owner: <br />
                                        Token 2 Owner: <br />
                                        Token 3 Owner: <br />
                                        Token 4 Owner:
                                    </Typography>
                                    <Typography>
                                        {vehicle?.token1Owner} <br />
                                        {vehicle?.token2Owner} <br />
                                        {vehicle?.token3Owner} <br />
                                        {vehicle?.token4Owner}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
            }

        </>
    );
};

export default VehiclesDetails;
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Preloader from '../components/Preloader';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchchargingStationDetails } from '../redux/chargingStation/chargingStationSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
const ChargingStationDetails = () => {
    const { id } = useParams();
    // const dispatch = useDispatch();
    // const { chargingStationDetails: chargingStation, isLoading } = useSelector(state => state.chargingStation);
    // useEffect(() => {
    //     dispatch(fetchchargingStationDetails(id));
    // }, [id, dispatch])

    const [chargingStation, setChargingStation] = useState({})
    useEffect(() => {
        if (id) {
            const unsubscribe = onSnapshot(doc(db, "chargingStations", id), (doc) => {
                if (doc.exists()) {
                    setChargingStation(doc.data());
                }
            });
            return () => {
                unsubscribe()
            }
        }
    }, [id])

    return (
        <>

            {
                <Paper sx={{ mt: 5, px: 3, py: 2 }} elevation={0}>
                    <Typography variant='h6' color="primary">General Information:</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container rowSpacing={0} columnSpacing={8}>
                        <Grid item lg={12} xs={12}>
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                    Document Name <br />
                                    Address <br />
                                    Serial Number <br />
                                    Station Name
                                </Typography>
                                <Typography>
                                    {chargingStation.documentName} <br />
                                    {chargingStation.address} <br />
                                    {chargingStation.serialNumber} <br />
                                    {chargingStation.stationName}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                    Show On Map
                                </Typography>
                                <Typography>
                                    {chargingStation.showOnMap}
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>
                </Paper>
            }

        </>
    );
};

export default ChargingStationDetails;
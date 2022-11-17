import { Box, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapWrapper from '../components/common/GoogleMapWrapper';
import { fetchChargingStations } from '../redux/chargingStation/chargingStationSlice';
import { fetchRegisteredVehicles } from '../redux/registeredVehicles/registeredVehiclesSlice';
const RydEFleet = () => {
    const dispatch = useDispatch();
    const [currentItem, setCurrentItem] = useState("chargingStations")
    const { registeredVehicles } = useSelector(state => state.registeredVehicles)
    const { chargingStations } = useSelector(state => state.chargingStation);
    useEffect(() => {
        dispatch(fetchRegisteredVehicles());
        dispatch(fetchChargingStations())
    }, [dispatch]);


    const data = {
        chargingStations: chargingStations,
        registeredVehicles: registeredVehicles
    }

    const handleChange = ({ target }) => {
        setCurrentItem(target.value)
    }
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <TextField onChange={handleChange} value={currentItem} select fullWidth sx={{ maxWidth: 300 }}>
                    <MenuItem value={"chargingStations"}>Charging Stations</MenuItem>
                    <MenuItem value={"registeredVehicles"}>Registered Vehicles</MenuItem>
                </TextField>
            </Box>

            <GoogleMapWrapper data={data[currentItem]} type={currentItem} />
        </>
    );
};





export default RydEFleet;
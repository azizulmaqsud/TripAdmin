import React from 'react';
import { useEffect } from 'react';
import CustomDataTable from '../components/CustomDataTable';
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from '../redux/bookings/bookingsSlice';
import { Box, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import MultiSelect from '../components/common/MultiSelect';

const headings = [
    {
        id: 'sl',
        align: "left",
        label: 'No.',
        hidden: true,
    },
    {
        id: 'BookingID',
        align: "left",
        label: 'Reference No.',
        required: true,
        details: true
    },
    {
        id: 'email',
        align: "left",
        label: 'User Email',
    },
    {
        id: 'fullName',
        align: "left",
        label: 'Full Name',
    },
    {
        id: 'locationPickUp',
        align: "left",
        label: 'Pickup Location',
    },
    {
        id: 'datePickUp',
        align: "left",
        label: 'Pickup Date',
    },
    {
        id: 'locationDropOff',
        align: "left",
        label: 'Drop-Off Location',
    },
    {
        id: 'dateDropOff',
        align: "left",
        label: 'Drop-Off Date',
    },
    {
        id: 'phoneNumber',
        align: "left",
        label: 'Phone Number',
    },
    {
        id: 'numberICPassport',
        align: "left",
        label: 'IC/Passport Number',
    }
];


const Bookings = () => {
    const localStorageKey = "bookings-column"
    const [currentBookings, setCurrentBookings] = useState("all");
    const [columns, setColumns] = useState(JSON.parse(localStorage.getItem(localStorageKey) || '["sl", "BookingID", "email", "fullName"]'))
    const dispatch = useDispatch();
    const { bookings, activeBookings, endedBookings, isLoading, isError, error } = useSelector(state => state.bookings);
    useEffect(() => {
        dispatch(fetchBookings())
    }, [dispatch])
    const data = {
        all: bookings,
        active: activeBookings,
        ended: endedBookings
    }

    const handleChange = ({ target }) => {
        setCurrentBookings(target.value)
    }
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <MultiSelect localStorageKey={localStorageKey} columns={columns} setColumns={setColumns} totalColumns={headings} />
                <TextField onChange={handleChange} value={currentBookings} select fullWidth sx={{ maxWidth: 300 }}>
                    <MenuItem value={"all"}>All Bookings</MenuItem>
                    <MenuItem value={"active"}>Active Bookings</MenuItem>
                    <MenuItem value={"ended"}>Ended Bookings</MenuItem>
                </TextField>
            </Box>
            <CustomDataTable
                columns={columns}
                rows={data[currentBookings]}
                isError={isError}
                error={error}
                headings={headings}
                loading={isLoading}
                uniqueField="BookingID"
                detailsPath="booking-details"
            />
        </>
    );
};

export default Bookings;


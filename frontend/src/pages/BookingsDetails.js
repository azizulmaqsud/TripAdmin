import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../components/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingDetails } from '../redux/bookings/bookingsSlice';
const BookingsDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { bookingDetails: booking, isLoading } = useSelector(state => state.bookings);
    useEffect(() => {
        dispatch(fetchBookingDetails(id));
    }, [id, dispatch])
    console.log(booking, "booking");
    return (
        <>

            {
                isLoading ? <Preloader /> :
                    <Paper sx={{ mt: 5, px: 3, py: 2 }} elevation={0}>
                        <Typography variant='h6' color="primary">General Information:</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Grid container rowSpacing={0} columnSpacing={8}>
                            <Grid item lg={12} xs={12}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                        Reference No. <br />
                                        User Email <br />
                                        Booking Finished <br />
                                        Date Drop Off
                                    </Typography>
                                    <Typography>
                                        {booking.BookingID} <br />
                                        {booking.email} <br />
                                        {booking.bookingFinished ? "Yes" : "No"} <br />
                                        {booking.dateDropOff}
                                    </Typography>
                                </Box>



                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                        Date PickUp <br />
                                        Duration <br />
                                        Fare
                                    </Typography>
                                    <Typography>
                                        {booking.datePickUp} <br />
                                        {booking.duration} <br />
                                        {booking.fare}
                                    </Typography>
                                </Box>

                            </Grid>
                            <Grid item lg={12} xs={12}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 700, mr: 2, minWidth: "200px" }}>
                                        Location DropOff <br />
                                        Location PickUp <br />
                                        Vehicle Type <br/>
                                        IC/Passport Number <br/>
                                        Full Name <br/>
                                        Phone Number
                                    </Typography>
                                    <Typography>
                                        {booking.locationDropOff} <br />
                                        {booking.locationPickUp} <br />
                                        {booking.vehicleType} <br/>
                                        {booking.numberICPassport} <br/>
                                        {booking.fullName} <br/>
                                        {booking.phoneNumber}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
            }

        </>
    );
};

export default BookingsDetails;
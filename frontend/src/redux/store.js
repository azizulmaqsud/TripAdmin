import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import chargingStationSlice from './chargingStation/chargingStationSlice';
import registeredVehiclesSlice from './registeredVehicles/registeredVehiclesSlice';
import themeSlice from './theme/themeSlice';
import usersSlice from './users/usersSlice';
import bookingsSlice from './bookings/bookingsSlice';
import notificationSlice from './notification/notificationSlice';

const reducer = {
    users: usersSlice,
    auth: authSlice,
    theme: themeSlice,
    chargingStation: chargingStationSlice,
    registeredVehicles: registeredVehiclesSlice,
    bookings: bookingsSlice,
    notification: notificationSlice
}


export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})
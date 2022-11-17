import React, { useEffect } from 'react';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Bookings from './pages/Bookings';
import Vehicles from './pages/Vehicles';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import Home from './pages/Home';
import PrivateRoute from './components/Auth/PrivateRoute';
import MuiThemeProvider from './theme/MuiThemeProvider';
import { useDispatch } from 'react-redux';
import { loadCurrentUser } from './redux/auth/authSlice';
import VehiclesDetails from './pages/VehicleDetails';
import ChargingStation from './pages/ChargingStation';
import ChargingStationDetails from './pages/ChargingStationDetails';
import RydEFleet from './pages/RydEFleet';
import BookingsDetails from './pages/BookingsDetails';
import Notification from './components/common/Notification';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch])

  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="users" element={<Users />} />
            <Route path="user-details/:id" element={<UserDetails />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="booking-details/:id" element={<BookingsDetails />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="vehicle-details/:id" element={<VehiclesDetails />} />
            <Route path="ryd-e-fleet" element={<RydEFleet />} />
            <Route path="charging-stations" element={<ChargingStation />} />
            <Route path="chargingStation-details/:id" element={<ChargingStationDetails />} />
            {/* <Route index element={<Users />} /> */}
          </Route>
        </Routes>
        <Notification />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
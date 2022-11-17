const routes = (app) => {
    app.use('/api/users', require('./_users'))
    app.use('/api/auth', require('./_auth'))
    app.use('/api/vehicles', require('./_vehicles'))
    app.use('/api/charging-station', require('./_chargingStation'))
    app.use('/api/bookings', require('./_bookings'))
    app.use('/api/reset-password', require('./_resetPassword'))
}


module.exports = routes
const express = require('express');
const auth = require('../helper/auth');
const { getCollection, getItemFromCollection } = require('../helper/firebase');
const router = express.Router()
// const auth = require('../helper/auth')

// Get all bookings
router.get('/get-bookings', auth, async (req, res) => {
    try {
        const data = await getCollection('Bookings')
        res.json(data)
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
});


// get single booking
router.get('/get-booking', auth, async (req, res) => {
    try {
        const { BookingID } = req.query;
        const data = await getItemFromCollection('Bookings', BookingID)
        res.json(data || {})
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})


module.exports = router
const express = require('express');
const { getCollection, getItemFromCollection } = require('../helper/firebase');
const router = express.Router()
// const auth = require('../helper/auth')

// Get all vehicles
router.get('/get-vehicles', async (req, res) => {
    try {
        const data = await getCollection('registeredVehicle')
        res.json(data)
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
});


// get single vehicle
router.get('/get-vehicle', async (req, res) => {
    try {
        const { email } = req.query;
        const data = await getItemFromCollection('registeredVehicle', email)
        res.json(data || {})
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})


module.exports = router
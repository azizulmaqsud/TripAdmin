const express = require('express');
const auth = require('../helper/auth');
const { getCollection, getItemFromCollection, updateItemFromCollection } = require('../helper/firebase');
const router = express.Router()
// const auth = require('../helper/auth')

// Get all charging station
router.get('/get-charging-station', auth, async (req, res) => {
    try {
        const data = await getCollection('chargingStations')
        res.json(data)
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
});

// get single charging station
router.get('/get-chargingStation', auth, async (req, res) => {
    try {
        const { documentName } = req.query;
        const data = await getItemFromCollection('chargingStations', documentName);
        res.json(data || {})
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
});


module.exports = router
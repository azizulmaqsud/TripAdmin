const express = require('express');
const auth = require('../helper/auth');
const { getCollection, getItemFromCollection, updateItemFromCollection } = require('../helper/firebase');
const router = express.Router()
// const auth = require('../helper/auth')

// Get all users
router.get('/get-users', auth, async (req, res) => {
    try {
        const data = await getCollection('Users')
        res.json(data)
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
});


// get single user
router.get('/get-user', auth, async (req, res) => {
    try {
        const { email } = req.query;
        const data = await getItemFromCollection('Users', email)
        res.json(data || {})
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})

// verify user
router.post("/verify-user", auth, async (req, res) => {
    try {
        const { email, verification } = req.body;
        const data = await updateItemFromCollection("Users", email, verification);
        res.json(data)
    } catch (error) {
        res.status(400).json({ status: false, message: error.message })
    }
})

module.exports = router
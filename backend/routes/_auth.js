const express = require('express');
const { getCollection } = require('../helper/firebase');
const { reHashing } = require('../helper/hashing');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../helper/auth');

// Trigger User Login
router.get('/', auth, async (req, res) => {
    const user = req.user
    if (user) {
        return res.status(200).json({
            email: user.email,
            fullName: user.fullName,
        });
    }
    return res.status(400).send("Authentication Failed")
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) return res.status(400).send("Missing Values")
    let filters = {}
    if (email) filters.email = email
    const data = await getCollection('Operators', filters)
    const user = data[0]
    const hashedPassword = reHashing(password)
    if (user?.password === hashedPassword) {
        return jwt.sign(
            {
                email: user.email,
                fullName: user.fullName,
            },
            process.env.JWT_SECRET,
            { expiresIn: 7200 },
            async (_err, token) => {
                if (_err) throw _err;
                res.status(200).json({
                    token,
                    user: {
                        email: user.email,
                        fullName: user.fullName,
                    },
                });
            }
        );
    }
    return res.status(400).send("Authentication Failed")
});


module.exports = router
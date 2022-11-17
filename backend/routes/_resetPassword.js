const express = require('express');
const { getItemFromCollection, updateItemFromCollection } = require('../helper/firebase');
const { reHashing } = require('../helper/hashing');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../helper/auth');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const Mailer = require('../helper/nodeMailer');
const SendMail = require('../helper/mailer');



router.post('/reset-request', auth, async (req, res) => {
    const { email } = req.body
    console.log(email, "email");
    // if (email) filters.email = email
    const user = await getItemFromCollection('Users', email)
    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    const id = uuidv4();
    await updateItemFromCollection("Users", email, { requestId: id });

    const validity = 3600;

    jwt.sign(
        {
            email: email,
            fullName: user.fullName,
            requestId: id
        },
        process.env.JWT_SECRET,
        { expiresIn: validity },
        async (_err, token) => {
            if (_err) throw _err;
            const filePath = path.resolve(
                'template',
                'resetPassword.html'
            );
            const htmlFile = fs.readFileSync(filePath);
            const html = Mustache.render(htmlFile.toString(), {
                url: `${process.env.BASE_URL}reset-password/${token}`,
                validity: validity / (60 * 60),
            });
            await SendMail(email, 'Password Reset', html)
            // await Mailer.sendMail(email, 'Password Reset', html);
            console.log(`${process.env.BASE_URL}reset-password/${token}`);

            res.json({ message: 'Recovery Email Sent' });
        }
    );
});


router.post('/verify', async (req, res) => {
    const { token } = req.body
    // Check for token
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied',
        });
    }
    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        if (decoded.email) {
            const user = await getItemFromCollection('Users', decoded.email);
            if (user.requestId === decoded.requestId) {
                res.json({ message: 'Verification Successful!' });
            } else {
                res.status(400).json({
                    message: 'Verification Failed',
                });
            }
        } else {
            res.status(400).json({
                message: 'Email missing',
            });
        }

    } catch (e) {
        res.status(400).json({
            message: 'Token is not Valid',
        });
    }
});


router.post('/', async (req, res) => {
    const { token, password, confirmPassword } = req.body
    // Check for token
    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied',
        });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords doesn't match",
        });
    }
    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        if (decoded.email) {
            const user = await getItemFromCollection('Users', decoded.email);
            if (user.requestId === decoded.requestId) {

                const hashedPassword = reHashing(password)
                await updateItemFromCollection("Users", decoded.email, { password: hashedPassword });

                res.json({ message: 'Password Reset Successfully!' });
            } else {
                res.status(400).json({
                    message: 'Verification Failed',
                });
            }
        } else {
            res.status(400).json({
                message: 'Email missing',
            });
        }

    } catch (e) {
        res.status(400).json({
            message: 'Token is not Valid',
        });
    }
});

module.exports = router
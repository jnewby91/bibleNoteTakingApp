'use strict';
const express = require('express');
// To learn more about the jsonwebtoken standard, see:
// https://jwt.io/introduction/
const jwt = require('jsonwebtoken');

const { localPassportMiddleware, jwtPassportMiddleware } = require('../auth/strategies');
const { JWT_SECRET, JWT_EXPIRY } = require('../config.js');

const authRouter = express.Router();

function createJwtToken(user) {
    return jwt.sign({ user }, JWT_SECRET, {
        subject: user.userName,
        expiresIn: JWT_EXPIRY,
        algorithm: 'HS256'
    });
}

authRouter.post('/login', localPassportMiddleware, (req, res) => {
    console.log(req.body.username);
    const user = req.user.serialize();
    const jwtToken = createJwtToken(user);
    res.json({ jwtToken, user });
});

authRouter.post('/refresh', jwtPassportMiddleware, (req, res) => {
    const user = req.userName;
    const jwtToken = createJwtToken(user);
    res.json({ jwtToken, user });
});

module.exports =  authRouter;
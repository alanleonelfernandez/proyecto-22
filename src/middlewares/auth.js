const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.sendStatus(403);
            }
            req.user = user;
            console.log('Authenticated user:', user);
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;
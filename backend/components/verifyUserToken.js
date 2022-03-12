const getUserId = require('./getUserId');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = require('../index').PRIVATE_KEY;

module.exports = async (req) => {

    let verified = false;
    jwt.verify(req.headers['x-user-token'], PRIVATE_KEY, (err, res) => {
        if (err) {
            console.log(err);
            return false;
        }
        if (res.id === req.headers.userId)
            verified = true;
    });
    return verified;
}
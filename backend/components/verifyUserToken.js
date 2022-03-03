const getUserId = require('./getUserId');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = require('../index').PRIVATE_KEY;

module.exports = async (req) => {
    const userId = await getUserId(req)
        .catch(err => console.log(err));
    let verified = false;
    jwt.verify(req.body.token, PRIVATE_KEY, (err, res) => {
        if (err)
            return false;
        if (res.id === userId)
            verified = true;
    });
    return verified;
}
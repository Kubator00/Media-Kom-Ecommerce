const express = require('express');
const router = express.Router();
const verifyUserToken = require('../../components/verifyUserToken')
const verifyIsAdmin = require('../../components/verifyIsAdmin')
const getUserId = require('../../components/getUserId');
router.use(auth)


async function auth(req, res, next) {
    try {
        req.headers['userId'] = await getUserId(req)
    } catch (err) {
        console.error(err);
        return res.status(500).send("Nie znaleziono uzytkownika w bazie");
    }

    if (!await verifyUserToken(req))
        return res.status(500).send("Blad autentykacji");

    try {
        if (!await verifyIsAdmin(req))
            return res.status(500).send("Uzytkownik nie jest administratorem");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Blad autentykacji");
    }
    next();
}

const orderRoute = require('./order')
router.use('/order',orderRoute);

const productRoute = require('./product')
router.use('/product',productRoute);

module.exports = router;
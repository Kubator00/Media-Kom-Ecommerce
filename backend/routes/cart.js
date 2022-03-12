const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');



router.use(auth)
async function auth(req, res, next) {
    try {
        req.headers['userId'] = await getUserId(req)
    }
    catch (err) {
        console.error(err);
        return res.status(400).send("Nie znaleziono uzytkownika w bazie");
    }
    if (!await verifyUserToken(req))
        return res.status(400).send("Blad autentykacji");
    next();
}

router.post('/add', async (req, res) => {
    connection.query(
        `IF (SELECT COUNT(*) FROM user_cart WHERE user_id = ${req.headers.userId} AND product_id=${req.body.productId} > 0) THEN
            UPDATE user_cart SET product_amount=product_amount+${req.body.amount};
        ELSE
            INSERT INTO user_cart (user_id, product_id, product_amount) VALUES (${req.headers.userId}, ${req.body.productId}, ${req.body.amount});
        END IF;`,
        (error) => {
            if (error)
                return res.status(400).send('Błąd dodania do koszyka');
            else
                return res.send('Dodano do koszyka');
        }
    );
})




router.post('/editamount', async (req, res) => {
    let query = `UPDATE user_cart SET product_amount=${req.body.amount} where user_id=${req.headers.userId} AND product_id=${req.body.productId}`;
    if (req.body.amount < 1)
        query = `DELETE FROM user_cart where user_id=${req.headers.userId} AND product_id=${req.body.productId}`;

    try {
        connection.query(query,
            (err) => {
                if (err)
                    throw err;
            });
    } catch (err) {
        console.log(err);
        return res.status(400).send('Błąd aktualizacji');
    }

    res.send('Zaktualizowano');
});


module.exports = router;
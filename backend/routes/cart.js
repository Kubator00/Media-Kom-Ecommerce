const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');
const {poolConnection} = require("../index");
const userAuthorization = require ('../components/userAuthorization')

router.use(userAuthorization)



router.post('/add', async (req, res) => {

    poolConnection.getConnection((err, connection) => {
        connection.query(
            `IF (SELECT COUNT(*) FROM user_cart WHERE userId = ${req.headers.userId} AND productId=${req.body.productId} > 0) THEN
            UPDATE user_cart SET productAmount=productAmount+${req.body.amount};
        ELSE
            INSERT INTO user_cart (userId, productId, productAmount) VALUES (${req.headers.userId}, ${req.body.productId}, ${req.body.amount});
        END IF;`,
            (error) => {
                connection.release();
                if (error)
                    return res.status(400).send('Błąd dodania do koszyka');
                return res.send('Dodano do koszyka');
            }
        );
    });
})


router.post('/editamount', async (req, res) => {
    let query = `UPDATE user_cart SET productAmount=${req.body.productAmount} where userId=${req.headers.userId} AND productId=${req.body.productId}`;
    if (req.body.productAmount < 1)
        query = `DELETE FROM user_cart where userId=${req.headers.userId} AND productId=${req.body.productId}`;

    poolConnection.getConnection((err, connection) => {
        if (err)
            return res.status(400).send('Błąd aktualizacji');
        connection.query(query,
            (err) => {
                connection.release();
                if (err)
                    return res.status(400).send('Błąd aktualizacji');
                res.send('Zaktualizowano');
            });
    });

});


module.exports = router;
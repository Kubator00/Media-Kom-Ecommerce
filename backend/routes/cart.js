const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');



router.post('/add', async (req, res) => {
    console.log('Dodanie do koszyka');
    if (!await verifyUserToken(req))
        return res.send({ 'status': false });
    let userId = await getUserId(req);
    connection.query(
        `IF (SELECT COUNT(*) FROM user_cart WHERE user_id = ${userId} AND product_id=${req.body.productId} > 0) THEN
            UPDATE user_cart SET product_amount=product_amount+${req.body.amount};
        ELSE
            INSERT INTO user_cart (user_id, product_id, product_amount) VALUES (${userId}, ${req.body.productId}, ${req.body.amount});
        END IF;`,
        (error, res) => {
            if (error)
                return res.send({ 'status': false });
            console.log(res);
        });
})




router.post('/editamount', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send({ 'status': false });
    let userId = await getUserId(req);

    const deleteProduct = async () => {
        return new Promise((resolve) => {
            connection.query(`DELETE FROM user_cart where user_id=${userId} AND product_id=${req.body.productId}`,
                (error) => {
                    if (error) {
                        console.log(error);
                        return false;
                    }
                    resolve();
                }
            );
        })
    };

    const updateAmount = async () => {
        return new Promise((resolve) => {
            connection.query(`UPDATE user_cart SET product_amount=${req.body.amount} where user_id=${userId} AND product_id=${req.body.productId}`,
                (error) => {
                    if (error) {
                        console.log(error);
                        return false;
                    }
                    resolve();
                }
            );
        })
    };

    if (req.body.amount < 1)
        await deleteProduct();
    else
        await updateAmount();

    res.send({ status: 'ok' });
});


module.exports = router;
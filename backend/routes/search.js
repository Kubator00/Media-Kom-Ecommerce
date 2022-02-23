const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');



router.post('/', async (req, res) => {
    console.log(req.body);
    const searchProducts = () => {
        let query = `SELECT * from products`;
        if (req.body.category)
            query = `SELECT * from products where category='${req.body.category}';`
        return new Promise((resolve, reject) => {
            connection.query(query,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res);
                });
        })
    };
    const products = await searchProducts();
    let result = [];

    for (product of products) {
        if (req.body.keyword) {
            if ((product.title.toLowerCase()).includes(req.body.keyword.toLowerCase()))
                result.push(product);
        }
        else
            result.push(product);
    }

    res.send({ status: 'ok', products: result });
})

module.exports = router;
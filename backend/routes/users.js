const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');
const PRIVATE_KEY = require('../index').PRIVATE_KEY;


router.post('/myaccount', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send({ 'isAuth': false });
    else
        return res.send({ 'isAuth': true, 'username': 'example' });

})

router.post('/login', (req, res) => {
    connection.query(`SELECT * from users WHERE username='${req.body.username}' AND password='${req.body.password}'`,
        (error, results) => {
            if (error)
                return res.send({ 'isAuth': false })
            if (results.length > 0) {
                const token = jwt.sign({ id: results[0].id }, PRIVATE_KEY, { expiresIn: 20000 });
                res.send({ isAuth: true, username: results[0].username, token: token, isAdmin: results[0].isAdmin })
            }
            else {
                res.send({ isAuth: false })
            }
        });
})



router.post('/orders', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send({ 'status': 'failed' });
    const userId = await getUserId(req);


    const getOrders = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, user_id, date, status, delivery_cost FROM orders where user_id=${userId} ORDER BY date DESC;`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res);
                });
        })
    };

    const orders = await getOrders().catch(err => console.log(err));
    if (!getOrders)
        return res.send({ status: 'failed' });

    const getProductsId = (orderId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT product_id, product_amount, product_price FROM orders_product where order_id=${orderId};`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res);
                });
        })
    };
    const getProductDetails = (product_id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT id, title,title_img FROM products where id=${product_id};`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res[0]);
                });
        })
    };

    let result = [];
    for (order of orders) {
        let orderDetails = order;
        let products = [];
        let totalAmount = order.delivery_cost;
        const orderProductsId = await getProductsId(order.id);
        for (orderProductId of orderProductsId) {
            const tmp = await getProductDetails(orderProductId.product_id);
            let product = Object.assign(tmp);
            product['amount'] = orderProductId.product_amount;
            product['price'] = orderProductId.product_price;
            totalAmount += orderProductId.product_price;
            products.push(product);
        }
        orderDetails['products'] = products;
        orderDetails['totalAmount'] = totalAmount;
        result.push(orderDetails);
    }
    res.send({ status: 'ok', orders: result });
})


router.post('/cart', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send({ 'status': false });
    let userId = await getUserId(req);
    const getProductsId = async () => {
        return new Promise((resolve) => {
            connection.query(`SELECT product_id,product_amount from user_cart WHERE user_id=${userId}`, (error, result) => {
                if (error)
                    return false;
                return resolve(result);
            })
        });
    };
    const productsId = await getProductsId();
    const getProductDetails = async (productId) => {
        return new Promise((resolve) => {
            connection.query(`SELECT title, price, title_img from products WHERE id=${productId}`, (error, result) => {
                if (error) {
                    console.log(error);
                    return false;
                }
                if (result.length > 0)
                    return resolve(result[0]);
                return false;

            })
        });
    };
    let productsDetails = [];
    for (i of productsId) {
        productsDetails.push(await getProductDetails(i.product_id));
        productsDetails.at(-1)['id'] = i.product_id;
        productsDetails.at(-1)['amount'] = i.product_amount;
    }
    console.log(productsDetails);
    res.send(productsDetails);

})

module.exports = router;
const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const verifyIsAdmin = require('../components/verifyIsAdmin')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');

router.post('/allorders', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send({ 'status': 'failed' });
    if (!await verifyIsAdmin(req))
        return res.send({ 'status': 'failed' });

    let statusQuery = '';
    if (req.body.status) {
        if (req.body.status.length > 0)
            statusQuery = `'${req.body.status[0]}'`;
        if (req.body.status.length > 1)
            req.body.status.forEach(element => {
                statusQuery += ` OR status='${element}'`
            })
    }

    const getOrders = () => {
        let query = `SELECT * FROM orders ORDER BY date DESC LIMIT ${req.body.limit1},${req.body.limit2};`;
        if (req.body.status)
            query = `SELECT * FROM orders WHERE status=${statusQuery} ORDER BY date DESC LIMIT ${req.body.limit1},${req.body.limit2};`;
        return new Promise((resolve, reject) => {
            connection.query(query,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res);
                });
        })
    };


    const countRows = () => {
        let query = `SELECT COUNT(*) FROM orders;`;
        if (req.body.status)
            query = `SELECT COUNT(*) FROM orders  WHERE status=${statusQuery};`;
        return new Promise((resolve, reject) => {
            connection.query(query,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res[0]['COUNT(*)']);
                });
        })
    };

    const foundRows = await countRows();

    const orders = await getOrders().catch(err => console.log(err));
    if (!getOrders)
        return res.send({ status: 'failed' });

    const getProductsId = (orderId) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM orders_product where order_id=${orderId};`,
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
    res.send({ status: 'ok', rowsFound: foundRows, orders: result });
})



router.post('/order/newstatus', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send({ 'status': 'failed' });
    if (!await verifyIsAdmin(req))
        return res.send({ 'status': 'failed' });

    const newStatus = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `UPDATE orders SET status='${req.body.newStatus}' where id=${req.body.orderId};`,
                (err) => {
                    if (err)
                        return reject(err);
                    return resolve();
                });
        })
    };
    await newStatus();
    res.send({ status: 'ok' })
})


router.post('/orders/details', async (req, res) => {

    if (!await verifyUserToken(req))
        return res.send({ 'status': 'failed' });
    if (!await verifyIsAdmin(req))
        return res.send({ 'status': 'failed' });


    let userId = await getUserId(req);

    const getUserData = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT username, email FROM users where id=${userId};`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res[0]);
                });
        })
    }
    let userData = await getUserData().catch(err => { console.log(err) });


    const getOrders = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT * FROM orders where id=${req.body.orderId};`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res[0]);
                });
        })
    };

    let order = await getOrders().catch(err => console.log(err));
    if (!order || order.length < 1)
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
    orderDetails['userEmail'] = userData.email;
    orderDetails['username'] = userData.username;
    orderDetails['products'] = products;
    orderDetails['totalAmount'] = totalAmount;


    res.send({ status: 'ok', order: orderDetails });


});

module.exports = router;
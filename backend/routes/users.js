const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');
const PRIVATE_KEY = require('../index').PRIVATE_KEY;
const bcrypt = require('bcrypt');
const Joi = require('joi');
const login = require('../components/loginUser');
const register = require('../components/registerUser');

router.post('/token', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.send(false);
    else
        return res.send(true);
})


router.post('/login', async (req, res) => {
    const schemaValidate = login.schema.validate({ username: req.body.username, password: req.body.password });
    if (schemaValidate.error)
        return res.send('Niepoprawne dane');
    const user = await login.find(req.body, res);
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.send('Niepoparwne hasło');
    const token = jwt.sign({ id: user.id }, PRIVATE_KEY, { expiresIn: 20000 });
    res.header('token', token).send({ 'username': user.username, 'token': token, 'isAdmin': user.isAdmin });
})

router.post('/register', async (req, res) => {
    const schemaValidate = register.schema.validate(
        { username: req.body.username, password: req.body.password, email: req.body.email }
    );
    if (schemaValidate.error)
        return res.status(400).send('Niepoprawne dane');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await register.register(req.body, hashedPassword, res);
});



router.post('/orders', async (req, res) => {
    if (!await verifyUserToken(req))
        return res.status(401).send('Unauthorized');
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
    res.send({orders: result });
})


router.post('/cart', async (req, res) => {
    console.log(req.body);
    if (!await verifyUserToken(req))
        return res.status(401).send('Unauthorized');
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
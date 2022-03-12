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
const selectQuery = require('../components/selectQuery')


router.post('/token', async (req, res) => {
    try {
        req.headers['userId'] = await getUserId(req)
    } catch (err) {
        console.error(err);
    }
    if (!await verifyUserToken(req))
        return res.send(false);
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

router.post('/orders', async (req, res) => {
    let rowsFound, orders, ordersProducts;
    try {
        rowsFound = (await selectQuery(`SELECT COUNT(*) FROM orders where user_id=${req.headers.userId};`))[0]['COUNT(*)'];
        orders = await selectQuery(`SELECT id, date, status FROM orders where user_id=${req.headers.userId} ORDER BY date DESC LIMIT ${req.body.beginning},${req.body.numOfRows};`);
        ordersProducts = await selectQuery(
            `SELECT o.order_id,o.product_id, o.product_amount as amount, o.product_price as price, p.title, p.title_img
            FROM orders_product as o join products as p on o.product_id=p.id 
            where o.order_id BETWEEN ${orders[orders.length - 1].id} AND ${orders[0].id}`);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Blad pobierania danych');
    }

    for (order of orders) {
        order['products'] = [];
        order.products.push(...ordersProducts.filter(i => order.id === i.order_id));
    }
    res.send({ rowsFound: rowsFound, orders: orders });
})


router.post('/cart', async (req, res) => {
    let cart;
    try {
        cart = await selectQuery(
            `SELECT c.product_id as id, c.product_amount as amount, p.title, p.title_img, p.price 
        FROM user_cart as c join products as p 
        on c.product_id=p.id WHERE user_id=${req.headers.userId}`);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Blad pobierania danych');
    }
    res.send(cart);
})

module.exports = router;
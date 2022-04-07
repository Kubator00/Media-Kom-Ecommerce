const express = require('express');
const router = express.Router();
const poolConnection = require("../index").poolConnection;
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
        req.headers['userId'] = await getUserId(req);
    } catch (err) {
        console.error(err);
        return res.send(false);
    }

    if (!await verifyUserToken(req))
        return res.send(false);

    return res.send(true);
})

router.post('/login', async (req, res) => {
    const schemaValidate = login.schema.validate({ email: req.body.email, password: req.body.password });
    if (schemaValidate.error)
        return res.send('Niepoprawne dane');

    try {
        var user = await login.find(req.body);
    } catch (err) {
        return res.status(500).send("Błąd połączenia z bazą danych");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.send('Niepoparwne hasło');
    const token = jwt.sign({ id: user.userId }, PRIVATE_KEY, { expiresIn: 20000 });
    res.header('token', token).send({ 'email': user.email, 'name': user.name, 'token': token, 'isAdmin': user.isAdmin });
    console.log(poolConnection);
})

router.post('/register', async (req, res) => {
    const schemaValidate = register.schema.validate(
        { name: req.body.name, surname: req.body.name, password: req.body.password, email: req.body.email }
    );
    if (schemaValidate.error)
        return res.status(400).send('Niepoprawne dane');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    let msg;
    try {
        msg = await register.register(req.body, hashedPassword, res);
    } catch (err) {
        return res.status(500).send("Błąd połączenia z bazą danych");
    }
    res.send(msg);
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
        rowsFound = (await selectQuery(`SELECT COUNT(*) FROM orders where userId=${req.headers.userId};`))[0]['COUNT(*)'];
        if (rowsFound < 1)
            return res.send({ orders: [] });
        orders = await selectQuery(`SELECT orderId, date, status FROM orders where userId=${req.headers.userId} ORDER BY date DESC LIMIT ${req.body.beginning},${req.body.numOfRows};`);
        ordersProducts = await selectQuery(
            `SELECT o.orderId,o.productId, o.productAmount, o.productPrice, p.title, p.titleImg
            FROM orders_product as o join products as p on o.productId=p.productId 
            where o.orderId BETWEEN ${orders[orders.length - 1].orderId} AND ${orders[0].orderId}`);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Blad pobierania danych');
    }

    for (order of orders) {
        order['products'] = [];
        order.products.push(...ordersProducts.filter(i => order.orderId === i.orderId));
    }
    res.send({ rowsFound: rowsFound, orders: orders });
})


router.post('/cart', async (req, res) => {
    let cart;
    try {
        cart = await selectQuery(
            `SELECT c.productId, c.productAmount, p.title, p.titleImg, p.price 
        FROM user_cart as c join products as p 
        on c.productId=p.productId WHERE userId=${req.headers.userId}`);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Blad pobierania danych');
    }
    res.send(cart);
})

module.exports = router;
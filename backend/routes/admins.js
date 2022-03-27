const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const verifyIsAdmin = require('../components/verifyIsAdmin')
const getUserId = require('../components/getUserId');
const selectQuery = require('../components/selectQuery')



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

    try {
        if (!await verifyIsAdmin(req))
            return res.status(400).send("Uzytkownik nie jest administratorem");
    }
    catch (err) {
        console.error(err);
        return res.status(400).send("Blad autentykacji");
    }
    next();
}


router.post('/allorders', async (req, res) => {
    let orders, rowsFound, ordersProducts;
    try {
        orders = await selectQuery(`SELECT * FROM orders ORDER BY date DESC LIMIT ${req.body.beginning},${req.body.numOfRows};`)
        rowsFound = (await selectQuery(`SELECT COUNT(*) FROM orders;`))[0]['COUNT(*)'];
        ordersProducts = await selectQuery(
            `SELECT o.orderId,o.productId ,p.title, p.titleImg, o.productAmount, o.productPrice
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



router.post('/order/newstatus', async (req, res) => {
    try {
        connection.query(
            `UPDATE orders SET status='${req.body.newStatus}' where orderId=${req.body.orderId};`,
            (err) => {
                if (err)
                    throw err;
            });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send('Blad aktualizacji danych');
    }
    res.send("Zaktualizowano")
})



router.post('/orders/details', async (req, res) => {
    let user, orders, products;
    try {
        user = (await selectQuery(`SELECT email FROM users where userId=${req.headers.userId};`))[0];
        orders = (await selectQuery(
            `SELECT o.orderId, o.userId, o.date, o.status, o.name, o.surname, o.town, o.postalCode, o.street,
            o.phone, d.name as deliveryName, d.price as deliveryPrice  FROM orders as o join 
            delivery_types as d on o.deliveryId=d.deliveryId where o.orderId=${req.body.orderId}`))[0];
        products = await selectQuery(
            `SELECT o.productId as id, o.productAmount, o.productPrice, p.title ,p.titleImg
        FROM orders_product as o join products as p on p.productId=o.productId where orderId=${req.body.orderId}`);
    } catch (err) {
        return res.status(400).send('Blad pobierania danych');
    }
    let orderDetails = {
        ...orders,
        userEmail: user.email,
        products: products
    }
    res.send(orderDetails);
});


module.exports = router;
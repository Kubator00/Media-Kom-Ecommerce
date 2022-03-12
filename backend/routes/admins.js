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
            `SELECT o.order_id,o.product_id ,p.title, p.title_img 
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



router.post('/order/newstatus', async (req, res) => {
    try {
        connection.query(
            `UPDATE orders SET status='${req.body.newStatus}' where id=${req.body.orderId};`,
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
        user = (await selectQuery(`SELECT username, email FROM users where id=${req.headers.userId};`))[0];
        orders = (await selectQuery(
            `SELECT o.id, o.user_id, o.date, o.status, o.name, o.surname, o.town, o.postal_code, o.street,
            o.phone, d.name as deliveryName, d.price as deliveryPrice  FROM orders as o join 
            delivery_types as d on o.delivery_type_id=d.id where o.id=${req.body.orderId}`))[0];
        products = await selectQuery(
            `SELECT o.product_id as id, o.product_amount as amount, o.product_price as price, p.title ,p.title_img
        FROM orders_product as o join products as p on p.id=o.product_id where order_id=${req.body.orderId}`);
    } catch (err) {
        return res.status(400).send('Blad pobierania danych');
    }
    let orderDetails = {
        ...orders,
        username: user.username,
        userEmail: user.email,
        products: products
    }
    res.send(orderDetails);
});


module.exports = router;
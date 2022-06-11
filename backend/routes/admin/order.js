const express = require('express');
const router = express.Router();
const selectQuery = require('../../components/selectQuery')
const {poolConnection} = require("../../index");



router.post('/all', async (req, res) => {
    let orders, rowsFound, ordersProducts;

    try {
        if (req.body.filter?.status && req.body.filter.status.length > 0) {
            const filter = req.body.filter.status.map(i => `'${i}'`);
            orders = await selectQuery(`SELECT * FROM orders WHERE STATUS IN (${filter}) ORDER BY date DESC LIMIT ${req.body.limit.beginning},${req.body.limit.numOfRows} `);
            rowsFound = (await selectQuery(`SELECT COUNT(*) FROM orders WHERE STATUS IN (${filter}) `))[0]['COUNT(*)'];
        } else {
            orders = await selectQuery(`SELECT * FROM orders ORDER BY date DESC LIMIT ${req.body.limit.beginning},${req.body.limit.numOfRows};`);
            rowsFound = (await selectQuery(`SELECT COUNT(*) FROM orders;`))[0]['COUNT(*)'];
        }
        ordersProducts = await selectQuery(
            `SELECT o.orderId,o.productId ,p.title, p.titleImg, o.productAmount, o.productPrice
            FROM orders_product as o join products as p on o.productId=p.productId 
            where o.orderId BETWEEN ${orders[orders.length - 1].orderId} AND ${orders[0].orderId}`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Blad pobierania danych');
    }

    for (let order of orders) {
        order['products'] = [];
        order.products.push(...ordersProducts.filter(i => order.orderId === i.orderId));
    }
    res.send({rowsFound: rowsFound, orders: orders});
})


router.post('/status', async (req, res) => {
    try {
        poolConnection.getConnection(async (err, connection) => {
            if (err) throw err;
            connection.query(
                `UPDATE orders SET status='${req.body.newStatus}' where orderId=${req.body.orderId};`,
                (err) => {
                    if (err)
                        throw err;
                });
            connection.release();
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send('Blad aktualizacji danych');
    }
    res.send("Zaktualizowano")
})


router.post('/details', async (req, res) => {
    let orders, products;
    try {
        orders = (await selectQuery(
            `SELECT o.orderId, o.userId, u.email, o.date, o.status, o.name, o.surname, o.town, o.postalCode, o.street,
            o.phone, d.name as deliveryName, d.price as deliveryPrice  FROM orders as o join 
            delivery_types as d on o.deliveryId=d.deliveryId join users as u on o.userId=u.userId 
            where o.orderId=${req.body.orderId}`))[0];
        products = await selectQuery(
            `SELECT o.productId as id, o.productAmount, o.productPrice, p.title ,p.titleImg
        FROM orders_product as o join products as p on p.productId=o.productId where orderId=${req.body.orderId}`);
    } catch (err) {
        return res.status(500).send('Blad pobierania danych');
    }
    let orderDetails = {
        ...orders,
        products: products
    }
    res.send(orderDetails);
});

module.exports = router;
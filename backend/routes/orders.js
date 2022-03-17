const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
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
    next();
}


router.post('/new', async (req, res) => {
    const { name, surname, town, postalCode, street, phone, deliveryTypeId, products } = req.body.orderData;
    let delivery, prices;
    let productsIds = '';
    console.log(products)
    products.forEach(product => {
        productsIds += `${product.productId},`
    });
    productsIds = productsIds.slice(0,-1);

    try{
        delivery = (await selectQuery(`SELECT * from delivery_types WHERE deliveryId='${deliveryTypeId}'`))[0];
        prices = (await selectQuery(`SELECT productId, price FROM products where productId in(${productsIds})`));
    }
    catch(err){
        console.log(err);
       return res.status(400).send("Blad polaczenia z baza");
    }
    products.forEach(product => {
        product['price'] = (prices.find((i) => i.id == product.id)).price;
    })


    connection.beginTransaction((err) => {
        if (err)
            throw err;
        connection.query(
            `INSERT INTO orders 
        (userId, status, deliveryId, name, surname, town, postalCode, street, phone) 
        VALUES (${req.headers.userId},'w przygotowaniu',${deliveryTypeId}, '${name}', '${surname}',
        '${town}', '${postalCode}', '${street}', '${phone}');`, (err, res) => {

            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
     
            products.forEach(prod => {
                connection.query(`INSERT INTO orders_product VALUES (${res.insertId},${prod.productId},${prod.productAmount},${prod.price})`, function (error) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                });
            });
            connection.commit(function (err) {
                if (err) {
                    return connection.rollback(function () {
                        throw err;
                    });
                }
            });
        });
    });

    return res.send('Zamówienie złożono pomyślnie');

});

router.post('/details', async (req, res) => {

    let orders, products;
    try {
        orders = (await selectQuery(
            `SELECT o.orderId, o.userId, o.date, o.status, o.name, o.surname, o.town, o.postalCode, o.street,
            o.phone, d.name as deliveryName, d.price as deliveryPrice  FROM orders as o join 
            delivery_types as d on o.deliveryId=d.deliveryId where o.orderId=${req.body.orderId}`))[0];
        products = await selectQuery(
            `SELECT o.productId, o.productAmount, o.productPrice, p.title ,p.titleImg
        FROM orders_product as o join products as p on p.productId=o.productId where orderId=${req.body.orderId}`);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Blad pobierania danych');
    }
    if (orders.userId != req.headers.userId)
        return res.status(400).send('Zamówienie nie należy do użytkownika');

    res.send({
        ...orders,
        products: products
    });

});
module.exports = router;
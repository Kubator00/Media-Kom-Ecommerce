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
    products.forEach(product => {
        productsIds += `${product.id},`
    });
    productsIds = productsIds.slice(0,-1);

    try{
        delivery = (await selectQuery(`SELECT * from delivery_types WHERE id='${deliveryTypeId}'`))[0];
        prices = (await selectQuery(`SELECT id, price FROM products where id in(${productsIds})`));
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
        (user_id, status, delivery_type_id, name, surname, town, postal_code, street, phone) 
        VALUES (${req.headers.userId},'w przygotowaniu',${delivery.id}, '${name}', '${surname}',
        '${town}', '${postalCode}', '${street}', '${phone}');`, (err, res) => {

            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            console.log(products);
            products.forEach(prod => {
                connection.query(`INSERT INTO orders_product VALUES (${res.insertId},${prod.id},${prod.amount},${prod.price})`, function (error) {
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
            `SELECT o.id, o.user_id as userId, o.date, o.status, o.name, o.surname, o.town, o.postal_code, o.street,
            o.phone, d.name as deliveryName, d.price as deliveryPrice  FROM orders as o join 
            delivery_types as d on o.delivery_type_id=d.id where o.id=${req.body.orderId}`))[0];
        products = await selectQuery(
            `SELECT o.product_id as id, o.product_amount as amount, o.product_price as price, p.title ,p.title_img as titleImg
        FROM orders_product as o join products as p on p.id=o.product_id where order_id=${req.body.orderId}`);
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
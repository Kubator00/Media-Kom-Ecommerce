const express = require('express');
const router = express.Router();
const selectQuery = require('../components/selectQuery')
const userAuthorization = require ('../components/userAuthorization')
const newOrder = require('../components/newOrder')


router.use(userAuthorization)

router.post('/new', async (req, res) => {
    const { name, surname, town, postalCode, street, phone, deliveryTypeId, products } = req.body.orderData;
    let delivery, prices;
    let productsIds = '';
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
       return res.status(500).send("Blad polaczenia z baza");
    }
    products.forEach(product => {
        product['price'] = (prices.find((i) => i.productId === product.productId))?.price;
    })

    await newOrder(req);

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
        return res.status(500).send('Blad pobierania danych');
    }
    if (orders.userId !== req.headers.userId)
        return res.status(400).send('Zamówienie nie należy do użytkownika');

    res.send({
        ...orders,
        products: products
    });

});
module.exports = router;
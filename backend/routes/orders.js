const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const verifyUserToken = require('../components/verifyUserToken')
const jwt = require('jsonwebtoken');
const getUserId = require('../components/getUserId');
const getDelivery = require('../components/getDeliveryType');





router.post('/new', async (req, res) => {
    const { name, surname, town, postalCode, street, phone, deliveryTypeId, products } = req.body.orderData;

    if (!await verifyUserToken(req))
        return res.status(401).send('Unauthorized');
    let userId = await getUserId(req);
    let delivery = await getDelivery(deliveryTypeId);


    const insertOrder = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `INSERT INTO orders 
                (user_id, status, delivery_type_id, delivery_cost, name, surname, town, postal_code, street, phone) 
                VALUES (${userId},'w przygotowaniu',${delivery.id},${delivery.price}, '${name}', '${surname}', '${town}', '${postalCode}', '${street}', '${phone}');`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res.insertId);
                });
        })
    };
    const orderId = await insertOrder().catch(err => console.log(err));
    if (!orderId)
        return res.status(400).send('Błąd w składaniu zamówienia');



    const insertProduct = (productId, productAmount, productPrice) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO orders_product (order_id, product_id, product_amount, product_price)
             VALUES (${orderId},${productId},${productAmount},${productPrice});`,
                (err) => {
                    if (err)
                        return reject(err);
                    resolve();
                });
        })
    };

    const getProductPrice = (productId) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT price FROM products where id=${productId};`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    resolve(res[0].price);
                });
        })
    };


    for (product of products) {
        const price = await getProductPrice(product.id).catch(err => console.log(err));
        await insertProduct(product.id, product.amount, price).catch(
            err => {
                console.log(err);
                return res.status(400).send('Błąd w składaniu zamówienia');
            }
        );
    }

    return res.send('Zamówienie złożono pomyślnie');

});

router.post('/details', async (req, res) => {

    if (!await verifyUserToken(req))
        return res.status(401).send('Unauthorized');

    let userId = await getUserId(req);

    const checkIfOrderIsThisUser = () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT user_id from orders where id=${req.body.orderId};`,
                (err, res) => {
                    if (err)
                        return reject(err);
                    return resolve(res[0]);
                });
        })
    };
    const check = await checkIfOrderIsThisUser();

    if (check['user_id'] != userId)
        return res.status(400).send('Zamówienie nie należy do użytkownika');


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
        return res.status(400).send('Zamówienie nie istnieje');

    const deliveryType = await getDelivery(order.delivery_type_id);

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
        totalAmount += orderProductId.product_price * orderProductId.product_amount;
        products.push(product);
    }
    orderDetails['products'] = products;
    orderDetails['totalAmount'] = totalAmount;
    orderDetails['deliveryName'] = deliveryType.name;


    res.send({ order: orderDetails });


});
module.exports = router;
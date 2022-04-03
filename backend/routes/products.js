const express = require('express');
const router = express.Router();
const selectQuery = require("../components/selectQuery");



router.post('/details', async (req, res) => {
    let product, parameters;
    try {
        product = (await selectQuery(`SELECT * from products WHERE productId=${req.body.productId}`))[0];
        parameters = await selectQuery(`SELECT parameterName, parameter from products_details WHERE productId=${req.body.productId} ORDER BY displayNumber ASC`);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send('Błąd pobierania danych');
    }
    return res.send({ product: product, productParameters: parameters });
})

router.post('/recommended', async (req, res) => {
    let products;
    try {
        products = await selectQuery(`SELECT p.productId, p.title, p.price, p.titleImg FROM recommended_products as r join products as p on r.productId=p.productId`);
    }
    catch {
        return res.status(400).send('Błąd pobierania danych');
    }
    return res.send(products);
})


module.exports = router;
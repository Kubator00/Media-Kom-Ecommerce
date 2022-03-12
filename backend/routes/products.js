const express = require('express');
const router = express.Router();
const selectQuery = require("../components/selectQuery");



router.post('/details', async (req, res) => {
    let product;
    try {
        product = (await selectQuery(`SELECT * from products WHERE id=${req.body.id}`))[0];
    }
    catch(err) {
        console.log(err);
        return res.status(400).send('Błąd pobierania danych');
    }
    return res.send(product);
})

router.post('/recommended', async (req, res) => {
    let products;
    try {
        products = await selectQuery(`SELECT p.id, p.title, p.price, p.title_img FROM recommended_products as r join products as p on r.product_id=p.id`);
    }
    catch {
        return res.status(400).send('Błąd pobierania danych');
    }
    return res.send(products);
})


module.exports = router;
const express = require('express');
const router = express.Router();
const selectQuery = require('../components/selectQuery');


router.post('/', async (req, res) => {
    let query = `SELECT * from products`;
    if (req.body.category)
        query = `SELECT * from products as p join categories as c
        on p.categoryId = c.categoryId where c.categoryName='${req.body.category.toLowerCase()}';`
    let products;
    try {
        products = await selectQuery(query);
    } catch (err) {
        return res.status(400).send("Blad laczenia z baza");
    }
    let result = [];
    for (let product of products) {
        if (req.body.keyword) {
            if ((product.title.toLowerCase()).includes(req.body.keyword.toLowerCase()))
                result.push(product);
        }
        else
            result.push(product);
    }
    res.send(result);
})

module.exports = router;
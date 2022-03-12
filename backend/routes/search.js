const express = require('express');
const router = express.Router();
const selectQuery = require('../components/selectQuery');


router.post('/', async (req, res) => {
    let query = `SELECT * from products`;
    if (req.body.category)
        query = `SELECT * from products where category='${req.body.category}';`
    let products;
    try {
        products = await selectQuery(query);
    } catch (err) {
        if(err=='No rows found')
            return res.status(200).send("Brak wyników");
        return res.status(400).send("Blad laczenia z baza");
    }
    let result = [];
    for (product of products) {
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
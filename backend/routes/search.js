const express = require('express');
const router = express.Router();
const selectQuery = require('../components/selectQuery');


router.post('/', async (req, res) => {

    let query = `SELECT * from products as p `;
    let queryRowsFound = `SELECT COUNT(*) FROM products as p `;
    if (req.body.category) {
        query = `SELECT * from products as p join categories as c
        on p.categoryId = c.categoryId where c.categoryName='${req.body.category.toLowerCase()}' `;

        queryRowsFound = `SELECT COUNT(*) from products as p join categories as c
        on p.categoryId = c.categoryId where c.categoryName='${req.body.category.toLowerCase()}'`;
        if (req.body.keyword) {
            query += `AND p.title like'%${req.body.keyword}%' `;
            queryRowsFound += `AND p.title like'%${req.body.keyword}%' `;
        }
    }
    else if(req.body.keyword) {
        query += `WHERE p.title like '%${req.body.keyword}%' `;
        queryRowsFound += `WHERE p.title like'%${req.body.keyword}%' `;
    }

    if (req.body.filter) {
        let filter = req.body.filter;
        if (filter.price && filter.price.to>0) {
            query += `AND price BETWEEN ${filter.price.from} AND ${filter.price.to} `;
            queryRowsFound += `AND price BETWEEN ${filter.price.from} AND ${filter.price.to} `;
        }
        if (filter.sort)
            query += `ORDER BY ${filter.sort} `;
    }

    if (req.body.limit)
        query += `LIMIT ${req.body.limit.beginning},${req.body.limit.numOfRows} `;

    let products, rowsFound;
    try {
        rowsFound = (await selectQuery(queryRowsFound))[0]['COUNT(*)'];
        products = await selectQuery(query);
    } catch (err) {
        return res.status(400).send("Blad laczenia z baza");
    }

    res.send({'products': products, 'rowsFound': rowsFound});
})

module.exports = router;
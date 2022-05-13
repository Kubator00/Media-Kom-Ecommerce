const express = require('express');
const router = express.Router();
const selectQuery = require('../components/selectQuery');


router.get('/', async (req, res) => {
    let query = `SELECT * from products as p `;
    let queryRowsFound = `SELECT COUNT(*) FROM products as p `;

    if (req.query.category) {
        query = `SELECT * from products as p join categories as c
        on p.categoryId = c.categoryId where c.categoryName='${req.query.category.toLowerCase()}' `;

        queryRowsFound = `SELECT COUNT(*) from products as p join categories as c
        on p.categoryId = c.categoryId where c.categoryName='${req.query.category.toLowerCase()}'`;
        if (req.query.keyword) {
            query += `AND p.title like'%${req.query.keyword}%' `;
            queryRowsFound += `AND p.title like'%${req.query.keyword}%' `;
        }
    } else if (req.query.keyword) {
        query += `WHERE p.title like '%${req.query.keyword}%' `;
        queryRowsFound += `WHERE p.title like'%${req.query.keyword}%' `;
    }

    if (req.query.priceTo) {
        query += `AND price BETWEEN ${req.query.priceFrom} AND ${req.query.priceTo} `;
        queryRowsFound += `AND price BETWEEN ${req.query.priceFrom} AND ${req.query.priceTo} `;
    }

    if (req.query.sort)
        query += `ORDER BY ${req.query.sort} `;

    if (req.query.beginning && req.query.numOfRows)
        query += `LIMIT ${req.query.beginning},${req.query.numOfRows} `;
    else if (req.query.numOfRows)
        query += `LIMIT 0,${req.query.numOfRows} `;

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
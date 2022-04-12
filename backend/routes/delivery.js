const express = require('express');
const router = express.Router();
const connection = require("../index").connection;
const selectQuery = require("../components/selectQuery");

router.post('/types', async (req, res) => {
    let result;
    try {
        result = await selectQuery(`SELECT * FROM delivery_types where available=1`);
    } catch (err) {
        return res.status(400).send('Błąd pobierania danych');
    }
    return res.send({deliveryTypes: result});
})

module.exports = router;
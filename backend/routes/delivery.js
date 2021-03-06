const express = require('express');
const router = express.Router();
const selectQuery = require("../components/selectQuery");

router.get('/types', async (req, res) => {
    let result;
    try {
        result = await selectQuery(`SELECT * FROM delivery_types where available=1`);
    } catch (err) {
        return res.status(500).send('Błąd pobierania danych');
    }
    return res.send({deliveryTypes: result});
})

module.exports = router;
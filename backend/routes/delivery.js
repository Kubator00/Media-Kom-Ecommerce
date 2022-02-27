const express = require('express');
const router = express.Router();
const connection = require("../index").connection;


router.post('/types', async (req, res) => {
    connection.query(
        `SELECT * FROM delivery_types where available=1`,
        (error, result) => {
            if (error)
                return res.status(400).send('Błąd pobierania danych');
            else
                return res.send({ deliveryTypes: result });
        }
    );
})

module.exports = router;
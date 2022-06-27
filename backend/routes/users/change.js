const express = require('express');
const router = express.Router();
const checkUserPassword = require("../../components/checkUserPassword");
const {poolConnection} = require("../../index");
const bcrypt = require("bcrypt");
const changeEmailSchema = require("../../components/validationSchemas/users/changeEmailSchema");
const changePasswordSchema = require("../../components/validationSchemas/users/changePasswordSchema");


router.put('/email', async (req, res) => {
    const schemaValidate = changeEmailSchema.validate(
        {password: req.body.password, newEmail: req.body.newEmail}
    );
    if (schemaValidate.error)
        return res.status(400).send('Niepoprawne dane');

    let query = `UPDATE users SET email='${req.body.newEmail}' where userId=${req.headers['userId']}`;

    if (!(await checkUserPassword(req.headers['userId'], req.body.password)))
        return res.status(400).send('Wpisano błędne hasło');

    poolConnection.getConnection((err, connection) => {
        if (err)
            return res.status(500).send('Błąd połączenia z bazą danych');
        connection.query(query,
            (err) => {
                connection.release();
                if (err)
                    return res.status(500).send('Błąd aktualizacji');
                res.send('Zaktualizowano');
            });
    });
})

router.put('/password', async (req, res) => {
    const schemaValidate = changePasswordSchema.validate(
        {password: req.body.password, newPassword: req.body.newPassword}
    );
    if (schemaValidate.error)
        return res.status(400).send('Niepoprawne dane');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    let query = `UPDATE users SET password='${hashedPassword}' where userId=${req.headers['userId']}`;

    if (!(await checkUserPassword(req.headers['userId'], req.body.password)))
        return res.status(400).send('Wpisano błędne hasło');

    poolConnection.getConnection((err, connection) => {
        if (err)
            return res.status(500).send('Błąd połączenia z bazą danych');
        connection.query(query,
            (err) => {
                connection.release();
                if (err)
                    return res.status(500).send('Błąd aktualizacji');
                res.send('Zaktualizowano');
            });
    });
})

module.exports = router;
const connection = require("../index").connection;
const Joi = require('joi');

module.exports.schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .alphanum()
        .min(3)
        .required(),
});

module.exports.find = async (data, res) => {
    return new Promise((resolve) => {
        connection.query(`SELECT * from users WHERE email='${data.email}';`,
            (error, results) => {
                if (error)
                    return res.status(400).send('Wystąpił błąd');
                if (results.length > 0) {
                    resolve(results[0]);
                }
                else {
                    return res.send('Niepoprawny email');
                }
            });
    })
}
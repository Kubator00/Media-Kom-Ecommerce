const connection = require("../index").connection;
const Joi = require('joi');

module.exports.schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    email: Joi.string()
        .min(6)
        .required(),
});

module.exports.register = async (data, hashedPassword, res) => {
    return new Promise(() => {
        connection.query(`INSERT INTO users (username, password, email) VALUES('${data.username}','${hashedPassword}','${data.email}');`,
            (error) => {
                if (error)
                    return res.status(400).send('Wystąpił błąd');
                return res.status(200).send('Zarejestrowano pomyślnie');
            });
    })
}
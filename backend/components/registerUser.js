const connection = require("../index").connection;
const Joi = require('joi');

module.exports.schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    surname: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
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
        connection.query(`INSERT INTO users (name, surname, password, email) VALUES('${data.name}','${data.surname}','${hashedPassword}','${data.email}');`,
            (error) => {
                if (error)
                    return res.status(400).send('Wystąpił błąd');
                return res.status(200).send('Zarejestrowano pomyślnie');
            });
    })
}
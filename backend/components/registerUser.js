const {poolConnection} = require('../index');
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

module.exports.register = async (data, hashedPassword) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection(async (err, connection) => {
            if (err)
                reject(err);
            connection.query(`INSERT INTO users (name, surname, password, email) VALUES('${data.name}','${data.surname}','${hashedPassword}','${data.email}');`,
                (err) => {
                    connection.release();
                    if (err)
                        reject(err);
                    resolve('Zarejstrowano pomyślnie');
                });
        });
    });
}
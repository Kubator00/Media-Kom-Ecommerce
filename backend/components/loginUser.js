const Joi = require('joi');
const poolConnection = require('../index').poolConnection;

module.exports.schema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .alphanum()
        .min(3)
        .required(),
});

module.exports.find = async (data) => {
    return new Promise((resolve, reject) => {
    poolConnection.getConnection(async (err, connection) => {
        if (err) {
            reject(err);
        }
        connection.query(`SELECT * from users WHERE email='${data.email}';`,
            (error, results) => {
                connection.release();
                if (error)
                    reject(error);
                if (results.length > 0)
                    resolve(results[0]);
                resolve(null);
            });
        });
    })
}
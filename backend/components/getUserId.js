const connection = require('../index').connection;

module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id from users WHERE username='${req.headers['x-username']}'`, (error, result) => {
            if (error)
                return reject(error);
            if (result.length < 1)
                return reject("Rows not found");
            return resolve(result[0].id);
        })
    })
}
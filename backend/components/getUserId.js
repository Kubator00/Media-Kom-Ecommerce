const connection = require('../index').connection;

module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT userId from users WHERE email='${req.headers['x-email']}'`, (error, result) => {
            if (error)
                return reject(error);
            if (result.length < 1)
                return reject("User authentication failed");
            return resolve(result[0].userId);
        })
    })
}
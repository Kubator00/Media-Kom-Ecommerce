const connection = require('../index').connection;

module.exports = async (req) => {
    return new Promise((resolve,reject) => {
        connection.query(`SELECT id from users WHERE username='${req.body.username}'`, (error, result) => {
            if (error)
                return reject(error);
            if (result.length > 0)
                return resolve(result[0].id);
            return resolve(false);
        })
    })
}
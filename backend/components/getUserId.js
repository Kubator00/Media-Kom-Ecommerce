const connection = require('../index').connection;

module.exports = async (req) => {
    return new Promise((resolve) => {
        connection.query(`SELECT id from users WHERE username='${req.body.username}'`, (error, result) => {
            if (error)
                return false;
            if (result.length > 0)
                return resolve(result[0].id);
            return false;
        })
    })
}
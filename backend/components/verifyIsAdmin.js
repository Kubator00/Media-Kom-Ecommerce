const connection = require('../index').connection;
module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT isAdmin from users WHERE email='${req.headers['x-email']}'`, (error, result) => {
            if (error)
                return reject(error);
            if (result.length < 1)
                return reject("Rows not found");
                console.log(result);
            resolve(result[0].isAdmin);
        })
    })
}



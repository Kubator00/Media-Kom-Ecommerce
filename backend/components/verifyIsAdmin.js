const connection = require('../index').connection;
module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT isAdmin from users WHERE username='${req.headers['x-username']}'`, (error, result) => {
            if (error)
                return reject(error);
            if (result.length < 1)
                return reject("Rows not found");
                console.log(result);
            resolve(result[0].isAdmin);
        })
    })
}



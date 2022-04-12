const {poolConnection} = require("../index");
module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection(async (err, connection) => {
            if (err) reject(err);
            connection.query(`SELECT isAdmin from users WHERE email='${req.headers['x-email']}'`, (error, result) => {
                if (error)
                    return reject(error);
                if (result.length < 1)
                    return reject("Rows not found");
                resolve(result[0].isAdmin);
            })
        })
    })
}



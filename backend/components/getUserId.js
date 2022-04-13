const {poolConnection} = require('../index');


module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            if (err)
                reject(err);
            connection.query(`SELECT userId from users WHERE email='${req.headers['x-email']}'`, (error, result) => {
                connection.release();
                if (error)
                    reject(error);
                if (result?.length < 1)
                    reject("User authentication failed");
                resolve(result[0]?.userId);
            });
        });
    })
}
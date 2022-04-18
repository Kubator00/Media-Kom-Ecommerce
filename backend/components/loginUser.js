const {poolConnection} = require('../index');


module.exports.find = async (data) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            if (err)
                reject(err);
            connection.query(`SELECT * from users WHERE email='${data.email}';`,
                (error, results) => {
                    connection.release();
                    if (error)
                        reject(error);
                    if (results?.length > 0)
                        resolve(results[0]);
                    resolve(null);
                });
        });
    })
}
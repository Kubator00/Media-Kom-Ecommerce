const {poolConnection} = require("../index");

module.exports = (productId) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(`DELETE FROM products where productId=${productId};`, (err, res) => {
                connection.release();
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(res);
            })
        });
    });
}
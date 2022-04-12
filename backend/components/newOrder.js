const {poolConnection} = require("../index");

module.exports = async (req) => {
    return new Promise((resolve, reject) => {
        const {name, surname, town, postalCode, street, phone, deliveryTypeId, products} = req.body.orderData;
        poolConnection.getConnection(async (err, connection) => {
            if (err) reject(err);
            connection.beginTransaction((err) => {
                if (err) {
                    console.log(err);
                    connection.release();
                    reject(err);
                }

                connection.query(`INSERT INTO orders 
                 (userId, status, deliveryId, name, surname, town, postalCode, street, phone) 
                  VALUES (${req.headers.userId},'w przygotowaniu',${deliveryTypeId}, '${name}', '${surname}',
                 '${town}', '${postalCode}', '${street}', '${phone}');`, (err, res) => {
                    if (err) {
                        console.log(err);
                        connection.release();
                        return connection.rollback(function () {
                            reject(err);
                        });
                    }

                    connection.query('INSERT INTO orders_product VALUES ? ',
                        [products.map(i => [res.insertId, i.productId, i.productAmount, i.price])],
                        function (err, res) {
                            if (err) {
                                console.log(err);
                                return connection.rollback(function () {
                                    reject(err);
                                });
                            }
                            console.log(res);
                        })

                })
                connection.commit(function (err) {
                    if (err) {
                        return connection.rollback(function () {
                            throw err;
                        });
                    }
                });
                connection.release();
                resolve();
            })
        })

    })
}
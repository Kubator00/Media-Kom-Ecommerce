const {poolConnection} = require("../index");

module.exports = (req) => {
    return new Promise((resolve, reject) => {
            poolConnection.getConnection((err, connection) => {
                let productId;
                if (err) reject(err);
                connection.beginTransaction((err) => {
                    if (err) {
                        console.log(err);
                        connection.release();
                        reject(err);
                    }

                    connection.query(`DELETE FROM products_details WHERE productId=${req.body.productId}`, (err, res) => {
                        if (err) {
                            console.log(err);
                            connection.release();
                            return connection.rollback(function () {
                                reject(err);
                            });
                        }

                        connection.query(`UPDATE products SET title='${req.body.name}', categoryId=${req.body.categoryId},
                        description='${req.body.description}', price=${req.body.price},titleImg='${req.body.titleImagePath}'
                        WHERE productId=${req.body.productId};`, (err, res) => {
                            if (err) {
                                console.log(err);
                                connection.release();
                                return connection.rollback(function () {
                                    reject(err);
                                });
                            }
                            productId = res.insertId;
                            if (req.body.parameters?.length > 0)
                                connection.query('INSERT INTO products_details (productId,displayNumber,name, description) VALUES ? ',
                                    [req.body.parameters.map((p, index) => [req.body.productId, index, p.name, p.description])],
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
                    })
                    connection.commit(function (err) {
                        if (err) {
                            return connection.rollback(function () {
                                throw err;
                            });
                        }
                        connection.release();
                        resolve(productId);
                    });

                })
            })

        }
    )
}

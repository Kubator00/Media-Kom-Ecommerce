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

                connection.query(`INSERT INTO products 
                 (title, categoryId, description, price, titleImg) 
                  VALUES ('${req.body.name}',${req.body.categoryId}, '${req.body.description}', ${req.body.price},
                 '${req.body.titleImagePath}');`, (err, res) => {
                    if (err) {
                        console.log(err);
                        connection.release();
                        return connection.rollback(function () {
                            reject(err);
                        });
                    }
                    productId = res.insertId;
                    connection.query('INSERT INTO products_details (productId,displayNumber,name, description) VALUES ? ',
                        [req.body.parameters.map((p, index) => [res.insertId, index, p.name, p.description])],
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
                    connection.release();
                    resolve(productId);
                });

            })
        })

    })
}

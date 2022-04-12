const {poolConnection} = require("../index");

module.exports = async (query) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection((err, connection) => {
            if(err)
                throw err;
            connection.query(query,
                (err, res) => {
                connection.release();
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    return resolve(res);
                });
        })
    })
}
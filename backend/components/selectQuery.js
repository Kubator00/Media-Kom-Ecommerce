const connection = require("../index").connection;
module.exports = async (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query,
            (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(res);
            });
    })
}
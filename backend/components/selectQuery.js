const connection = require("../index").connection;
module.exports = async (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query,
            (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if (res.length < 1)
                    return reject("No rows found");
                return resolve(res);
            });
    })
}
const pool = require("../index").pool;
module.exports = async (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query,
            (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(res);
            });
    })
}
const connection = require('../index').connection;

module.exports = async (id) => {
    return new Promise((resolve) => {
        connection.query(`SELECT * from delivery_types WHERE id='${id}'`, (error, result) => {
            if (error)
                return false;
            if (result.length > 0)
                return resolve(result[0]);
            return false;
        })
    })
}
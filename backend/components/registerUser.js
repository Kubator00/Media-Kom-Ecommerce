const {poolConnection} = require('../index');

module.exports.register = async (data, hashedPassword) => {
    return new Promise((resolve, reject) => {
        poolConnection.getConnection(async (err, connection) => {
            if (err)
                reject(err);
            connection.query(`INSERT INTO users (name, surname, password, email) VALUES('${data.name}','${data.surname}','${hashedPassword}','${data.email}');`,
                (err) => {
                    connection.release();
                    if (err)
                        reject(err);
                    resolve('Zarejstrowano pomyślnie');
                });
        });
    });
}
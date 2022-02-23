const connection = require('../index').connection;
module.exports = async (req) => {
    const getAdminData = () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT isAdmin from users WHERE username='${req.body.username}'`, (error, result) => {
                if (error)
                    return reject(error);
                if (result.length > 0)
                    return resolve(result[0].isAdmin);
                return resolve('failed');
            })
        })
    }
    const isAdmin = await getAdminData();
    return isAdmin;
}



const bcrypt = require("bcrypt");
const selectQuery = require('./selectQuery')

module.exports = async (userId, passwordToCompare) => {
    let user;
    try {
        user = (await selectQuery(`SELECT password  FROM users where userId=${userId}`))[0];
    } catch (err) {
        return false;
    }
    return await bcrypt.compare(passwordToCompare,user.password);
}

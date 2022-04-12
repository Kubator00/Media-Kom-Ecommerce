const getUserId = require("./getUserId");
const verifyUserToken = require("./verifyUserToken");
module.exports = async (req, res, next) => {
    try {
        req.headers['userId'] = await getUserId(req)
    }
    catch (err) {
        console.error(err);
        return res.status(400).send("Nie znaleziono uzytkownika w bazie");
    }
    if (!await verifyUserToken(req))
        return res.status(400).send("Blad autentykacji");
    next();
}

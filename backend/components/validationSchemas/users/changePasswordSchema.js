const Joi = require('joi');

module.exports = Joi.object({
    password: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    newPassword: Joi.string()
        .alphanum()
        .min(3)
        .required(),
});
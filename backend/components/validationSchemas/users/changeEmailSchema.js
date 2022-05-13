const Joi = require('joi');

module.exports = Joi.object({
    password: Joi.string()
        .alphanum()
        .min(3)
        .required(),
    newEmail: Joi.string()
        .min(6)
        .required(),
});
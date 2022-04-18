const Joi = require("joi");
module.exports = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .alphanum()
        .min(3)
        .required(),
});
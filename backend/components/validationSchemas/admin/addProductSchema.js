const Joi = require("joi");
module.exports = Joi.object({
    categoryName: Joi.string()
        .min(3)
        .max(100)
        .required(),
    name: Joi.string()
        .min(5)
        .max(256)
        .required(),
    description: Joi.string()
        .min(5)
        .max(4096)
        .required(),
    price: Joi.number()
        .required(),
    titleImagePath: Joi.string()
        .min(6)
        .max(128)
        .required(),

});
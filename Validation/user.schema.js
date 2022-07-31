const Joi = require("joi");

const schema = {
  user: Joi.object({
    name: Joi.string().max(100).required(),
    age: Joi.number()
      .integer()
      .min(5)
      .message("age should be more than 5")
      .max(60)
      .message("age can not be more than 60")
      .required(),
  }),
};

module.exports = schema;

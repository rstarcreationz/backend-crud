const { user } = require("./user.schema");

module.exports = {
  addUserValidation: async (req, res, next) => {
    const value = await user.validate(req.body);
    errorMessage(value, res, next);
  },
};

const errorMessage = (value, res, next) => {
  if (value.error) {
    return res.json({
      status: false,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

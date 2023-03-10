const { error } = require("../../../helpers/error");
const { userSchema } = require("../../../schemas/users");

const userValidation = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, validationResult.error.message);
  }

  next();
};

module.exports = {
  userValidation,
};

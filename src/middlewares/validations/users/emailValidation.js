const { error } = require("../../../helpers/error");
const { emailSchema } = require("../../../schemas/users");

const emailValidation = (req, res, next) => {
  const validationResult = emailSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, validationResult.error.message);
  }

  next();
};

module.exports = {
  emailValidation,
};

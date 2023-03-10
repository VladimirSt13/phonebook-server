const { error } = require("../../../helpers/error");
const { subscriptionSchema } = require("../../../schemas/users");

const subscriptionValidation = (req, res, next) => {
  const validationResult = subscriptionSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, validationResult.error.message);
  }

  next();
};

module.exports = {
  subscriptionValidation,
};

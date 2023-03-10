const { updateContactSchema } = require("../../../schemas/contacts");

const updateContactValidation = (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
};

module.exports = { updateContactValidation };

const { error } = require("../../../helpers/error");
const { addContactSchema } = require("../../../schemas/contacts");

const addContactValidation = (req, res, next) => {
  console.log(
    "🚀 ~ file: addContactValidation.js:5 ~ addContactValidation ~ req:",
    req.body
  );
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, JSON.stringify(validationResult.error.details));
  }

  next();
};

module.exports = { addContactValidation };

import { error } from "../../../helpers/error.js";
import { addContactSchema } from "../../../schemas/contacts/index.js";

export const addContactValidation = (req, res, next) => {
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, JSON.stringify(validationResult.error.details));
  }

  next();
};

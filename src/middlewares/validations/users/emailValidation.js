import { error } from "../../../helpers/error.js";
import { emailSchema } from "../../../schemas/users/index.js";

export const emailValidation = (req, res, next) => {
  const validationResult = emailSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, validationResult.error.message);
  }

  next();
};

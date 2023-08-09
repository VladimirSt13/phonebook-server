import { error } from "../../../helpers/error.js";
import { userSchema } from "../../../schemas/users/index.js";

export const userValidation = (req, res, next) => {
  const validationResult = userSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, validationResult.error.message);
  }

  next();
};

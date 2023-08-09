import { error } from "../../../helpers/error.js";
import { subscriptionSchema } from "../../../schemas/users/index.js";

export const subscriptionValidation = (req, res, next) => {
  const validationResult = subscriptionSchema.validate(req.body);

  if (validationResult.error) {
    throw error(400, validationResult.error.message);
  }

  next();
};

import { updateStatusContactSchema } from "../../../schemas/contacts/index.js";

export const updateStatusContactValidation = (req, res, next) => {
  const validationResult = updateStatusContactSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(500).json({ message: "missing field favorite" });
  }

  next();
};

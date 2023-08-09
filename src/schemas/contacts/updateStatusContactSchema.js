import Joi from "joi";

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

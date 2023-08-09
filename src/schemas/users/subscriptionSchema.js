import Joi from "joi";

import { subscriptionTypes } from "../../models/userModel.js";

export const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

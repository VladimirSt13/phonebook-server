const Joi = require("joi");
const { subscriptionTypes } = require("../../models/userModel");

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

module.exports = { subscriptionSchema };

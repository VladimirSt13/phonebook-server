const { authValidation } = require("./authVlaidation");
const { userValidation } = require("./userValidation");
const { emailValidation } = require("./emailValidation");
const { subscriptionValidation } = require("./subscriptionValidation");

module.exports = {
  userValidation,
  authValidation,
  subscriptionValidation,
  emailValidation,
};

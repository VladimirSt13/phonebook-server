const { signupController } = require("./signupController");
const {
  signupVerificationController,
} = require("./signupVerificationController");
const { verificationController } = require("./verificationController");
const { loginController } = require("./loginController");
const { currentController } = require("./currentController");
const {
  updateSubscriptionController,
} = require("./updateSubscriptionController");
const { logoutController } = require("./logoutController");
const { uploadAvatarController } = require("./uploadAvatarController");
module.exports = {
  signupController,
  signupVerificationController,
  verificationController,
  loginController,
  currentController,
  logoutController,
  updateSubscriptionController,
  uploadAvatarController,
};

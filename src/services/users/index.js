const { signup } = require("./signup");
const { signupVerification } = require("./signupVerification");
const { verification } = require("./verification");
const { login } = require("./login");
const { current } = require("./current");
const { updateSubscription } = require("./updateSubscription");
const { logout } = require("./logout");
const { uploadAvatar } = require("./uploadAvatar");

module.exports = {
  signup,
  signupVerification,
  verification,
  login,
  current,
  logout,
  updateSubscription,
  uploadAvatar,
};

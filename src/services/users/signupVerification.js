const { User } = require("../../models/userModel");
const { error } = require("../../helpers/error");
const { sendMail } = require("../../helpers/sendMail");

const signupVerification = async (verificationToken) => {
  const user = await User.findOne({
    verificationToken,
    verify: false,
  });

  if (!user) {
    throw error(404, "User not found");
  }

  user.verify = true;
  user.verificationToken = "null";

  await user.save();

  const subject = "Thank you for your registration!";
  const message = "Registration successful";

  await sendMail(user.email, subject, message);
};

module.exports = {
  signupVerification,
};

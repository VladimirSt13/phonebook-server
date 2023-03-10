const sha256 = require("sha256");
const { error } = require("../../helpers/error");
const { User } = require("../../models/userModel");

const { sendMail } = require("../../helpers/sendMail");

const verification = async (email) => {
  const user = await User.findOne({ email });

  if (user.verify) {
    throw error(400, "Verification has already been passed");
  }

  const verificationToken = sha256(email + process.env.JWT_SECRET);

  user.verificationToken = verificationToken;

  await user.save();

  const subject = "Thank you for registration";
  const message = `Please, confirm your email address
      http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`;

  await sendMail(user.email, subject, message);
};

module.exports = {
  verification,
};

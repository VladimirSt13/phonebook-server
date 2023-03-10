const sha256 = require("sha256");
const gravatar = require("gravatar");
const { error } = require("../../helpers/error");
const { User } = require("../../models/userModel");
const { sendMail } = require("../../helpers/sendMail");

const signup = async (email, password, data) => {
  const avatarURL = gravatar.url(email, { s: "200" });
  const verificationToken = sha256(email + process.env.JWT_SECRET);

  try {
    const user = new User({
      email,
      password,
      avatarURL,
      verificationToken,
      ...data,
    });

    await user.save();

    const subject = "Thank you for registration";
    const message = `Please, confirm your email address
      http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`;

    await sendMail(user.email, subject, message);

    return user;
  } catch (err) {
    if (err.code === 11000) {
      throw error(409, `Email in use, code:${err.code}`);
    }
    throw error(404, err);
  }
};

module.exports = { signup };

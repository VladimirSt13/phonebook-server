const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error } = require("../../helpers/error");
const { User } = require("../../models/userModel");

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw error(401, `No user with email '${email}' found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw error(401, "Wrong password");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { token });

  user.token = token;

  return user;
};

module.exports = { login };

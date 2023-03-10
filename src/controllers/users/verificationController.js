const { error } = require("../../helpers/error");
const { verification } = require("../../services/users");

const verificationController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw error(400, "missing required field email");
  }

  await verification(email);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  verificationController,
};

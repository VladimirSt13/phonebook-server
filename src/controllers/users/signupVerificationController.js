const { signupVerification } = require("../../services/users");

const signupVerificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await signupVerification(verificationToken);

  res.status(200).json({ message: "Verification successful" });
};

module.exports = {
  signupVerificationController,
};

const { logout } = require("../../services/users");

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await logout(_id);

  res.status(204).json("");
};

module.exports = {
  logoutController,
};

const { current } = require("../../services/users");

const currentController = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription } = await current(_id);

  res.status(200).json({ email, subscription });
};

module.exports = {
  currentController,
};

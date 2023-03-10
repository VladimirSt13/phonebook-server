const { updateSubscription } = require("../../services/users");

const updateSubscriptionController = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription: newSubscription } = req.body;

  const { email, subscription } = await updateSubscription({
    userId,
    newSubscription,
  });

  res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = {
  updateSubscriptionController,
};

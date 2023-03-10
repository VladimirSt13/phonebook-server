const { error } = require("../../helpers/error");
const { User } = require("../../models/userModel");

const updateSubscription = async ({ userId, newSubscription }) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { subscription: newSubscription } },
    { new: true }
  );

  if (!user) {
    throw error(404, "Not found");
  }
  
  return user;
};

module.exports = { updateSubscription };

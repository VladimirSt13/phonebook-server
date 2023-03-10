const { uploadAvatar } = require("../../services/users");

const uploadAvatarController = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: temporaryName, originalname } = req.file;

  const { avatarURL } = await uploadAvatar(userId, {
    temporaryName,
    originalname,
  });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  uploadAvatarController,
};

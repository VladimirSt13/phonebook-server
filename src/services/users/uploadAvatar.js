const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");
const { createFolderIsNotExist } = require("../../helpers/apiHelpers");
const { error } = require("../../helpers/error");
const { User } = require("../../models");

const STORE_AVATARS = path.join(process.cwd(), "public/avatars");

const uploadAvatar = async (userId, { temporaryName, originalname }) => {
  await createFolderIsNotExist(STORE_AVATARS);

  const [fileName, extension] = originalname.split(".");
  const newFileName = `${fileName}-${userId}.${extension}`;
  const newFilePath = path.join(STORE_AVATARS, newFileName);

  Jimp.read(temporaryName, (err, userAvatar) => {
    if (err) throw err;
    userAvatar
      .resize(250, 250) // resize
      .quality(100) // set JPEG quality
      .write(newFilePath); // save
    fs.unlink(temporaryName, (err) => {
      if (err) throw err;
    });
  });

  const avatarURL = path.join("/avatars", newFileName);

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { avatarURL } },
    { new: true }
  );

  if (!user) {
    throw error(404, "Not found");
  }

  return user;
};

module.exports = {
  uploadAvatar,
};

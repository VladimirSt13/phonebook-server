import bcrypt from "bcrypt";
import fs from "fs/promises";
import * as gravatar from "gravatar";
import Jimp from "jimp";
import jwt from "jsonwebtoken";
import path from "path";
import sha256 from "sha256";

import { createFolderIsNotExist } from "../helpers/apiHelpers.js";
import { error } from "../helpers/error.js";
import { sendMail } from "../helpers/sendMail.js";
import { User } from "../models/index.js";

export const userServices = {
  signup: async (email, password, data) => {
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
  },

  login: async (email, password) => {
    const user = await User.findOne({ email: email });

    // if(!user.verify) {
    //   throw error(401, `Please verify your email before accessing this resource.`);
    // }

    if (!user) {
      throw error(401, `No user with email '${email}' found`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw error(401, "Wrong password");
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET);

    await User.findByIdAndUpdate(user._id, { token });

    user.token = token;

    return user;
  },

  logout: async (_id) => {
    const result = await User.findByIdAndUpdate(_id, { token: null });

    if (!result) {
      throw error(401, "Not authorized");
    }
  },

  current: async (_id) => {
    const result = await User.findById(_id);

    if (!result) {
      throw error(401, "Not authorized");
    }

    return result;
  },

  signupVerification: async (verificationToken) => {
    const user = await User.findOne({
      verificationToken,
      verify: false,
    });

    if (!user) {
      throw error(404, "User not found");
    }

    user.verify = true;
    user.verificationToken = "null";

    await user.save();

    const subject = "Thank you for your registration!";
    const message = "Registration successful";

    await sendMail(user.email, subject, message);
  },

  verification: async (email) => {
    const user = await User.findOne({ email });

    if (user.verify) {
      throw error(400, "Verification has already been passed");
    }

    const verificationToken = sha256(email + process.env.JWT_SECRET);

    user.verificationToken = verificationToken;

    await user.save();

    const subject = "Thank you for registration";
    const message = `Please, confirm your email address
      http://localhost:${process.env.PORT}/api/users/verify/${verificationToken}`;

    await sendMail(user.email, subject, message);
  },

  updateSubscription: async ({ userId, newSubscription }) => {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { subscription: newSubscription } },
      { new: true }
    );

    if (!user) {
      throw error(404, "Not found");
    }

    return user;
  },

  uploadAvatar: async (userId, { temporaryName, originalname }) => {
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

    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { avatarURL } }, { new: true });

    if (!user) {
      throw error(404, "Not found");
    }

    return user;
  },
};

import { userServices } from "../services/userServices.js";

export const userController = {
  signup: async (req, res) => {
    const { email, password, ...data } = req.body;

    const user = await userServices.signup(email, password, data);

    return res.status(201).json({
      token: user.token,
      user: {
        email: user.email,
        subscription,
      },
    });
  },

  signupVerification: async (req, res) => {
    const { verificationToken } = req.params;

    await userServices.signupVerification(verificationToken);

    res.status(200).json({ message: "Verification successful" });
  },

  verification: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      throw error(400, "missing required field email");
    }

    await userServices.verification(email);

    res.status(200).json({ message: "Verification email sent" });
  },

  login: async (req, res) => {
    const { email, password, ...data } = req.body;
    const { token, subscription } = await userServices.login(email, password, data);

    res.status(200).json({
      token,
      user: {
        email,
        subscription,
      },
    });
  },

  current: async (req, res) => {
    const { _id } = req.user;

    const { email, subscription } = await userServices.current(_id);

    res.status(200).json({ email, subscription });
  },

  logout: async (req, res) => {
    const { _id } = req.user;

    await userServices.logout(_id);

    res.status(204).json("");
  },

  updateSubscription: async (req, res) => {
    const { _id: userId } = req.user;
    const { subscription: newSubscription } = req.body;

    const { email, subscription } = await userServices.updateSubscription({
      userId,
      newSubscription,
    });

    res.status(200).json({
      user: {
        email,
        subscription,
      },
    });
  },

  uploadAvatar: async (req, res) => {
    const { _id: userId } = req.user;
    const { path: temporaryName, originalname } = req.file;

    const { avatarURL } = await userServices.uploadAvatar(userId, {
      temporaryName,
      originalname,
    });

    res.status(200).json({
      avatarURL,
    });
  },
};

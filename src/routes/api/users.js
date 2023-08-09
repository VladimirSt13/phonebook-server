import express from "express";
import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { userController } from "../../controllers/usersController.js";

import {
  authValidation,
  emailValidation,
  subscriptionValidation,
  userValidation,
} from "../../middlewares/validations/users/index.js";

import { uploadMiddleware } from "../../middlewares/uploadMiddleware.js";

export const usersRouter = express.Router();

usersRouter.post("/signup", userValidation, asyncWrapper(userController.signup));
usersRouter.post("/verify", emailValidation, asyncWrapper(userController.verification));
usersRouter.get("/verify/:verificationToken", asyncWrapper(userController.signupVerification));
usersRouter.post("/login", userValidation, asyncWrapper(userController.login));
usersRouter.get("/current", authValidation, asyncWrapper(userController.current));
usersRouter.patch("/", authValidation, subscriptionValidation, asyncWrapper(userController.updateSubscription));
usersRouter.patch(
  "/avatars",
  authValidation,
  uploadMiddleware.single("avatar"),
  asyncWrapper(userController.uploadAvatar)
);
usersRouter.post("/logout", authValidation, asyncWrapper(userController.logout));

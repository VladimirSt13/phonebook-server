import express from "express";

import { contactsController } from "../../controllers/contactsControllers.js";

import { asyncWrapper } from "../../helpers/apiHelpers.js";
import {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} from "../../middlewares/validations/contacts/index.js";
import { authValidation } from "../../middlewares/validations/users/index.js";

export const router = express.Router();

router.use(authValidation);

router.get("/", asyncWrapper(contactsController.get));
router.get("/:contactId", asyncWrapper(contactsController.getById));
router.post("/", addContactValidation, asyncWrapper(contactsController.add));
router.put("/:contactId", updateContactValidation, asyncWrapper(contactsController.update));
router.patch("/:contactId/favorite", updateStatusContactValidation, asyncWrapper(contactsController.updateStatusById));
router.delete("/:contactId", asyncWrapper(contactsController.removeById));

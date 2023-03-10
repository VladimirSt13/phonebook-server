const express = require("express");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactByIdController,
  updateStatusContactByIdController,
  removeContactByIdController,
} = require("../../controllers/contacts");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} = require("../../middlewares/validations/contacts");
const { authValidation } = require("../../middlewares/validations/users");

const router = express.Router();

router.use(authValidation);

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", addContactValidation, asyncWrapper(addContactController));
router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(updateContactByIdController)
);
router.patch(
  "/:contactId/favorite",
  updateStatusContactValidation,
  asyncWrapper(updateStatusContactByIdController)
);
router.delete("/:contactId", asyncWrapper(removeContactByIdController));

module.exports = { router };

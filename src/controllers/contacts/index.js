const { getContactsController } = require("./getContactsController");
const { getContactByIdController } = require("./getContactByIdController");
const { addContactController } = require("./addContactController");
const { updateContactByIdController } = require("./updateContactByIdController");
const { updateStatusContactByIdController } = require("./updateStatusContactByIdController");
const { removeContactByIdController } = require("./removeContactByIdController");

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactByIdController,
  updateStatusContactByIdController,
  removeContactByIdController,
};

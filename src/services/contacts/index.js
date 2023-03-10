const { getContacts } = require("./getContacts");
const { getContactById } = require("./getContactById");
const { addContact } = require("./addContact");
const { updateContactById } = require("./updateContactById");
const { updateStatusContactById } = require("./updateStatusContactById");
const { removeContactById } = require("./removeContactById");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContactById,
  removeContactById,
};

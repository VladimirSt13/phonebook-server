const { error } = require("../../helpers/error");
const { Contact } = require("../../models/contactModel");

const getContactById = async (contactId, owner) => {
  const contact = await Contact.find({ _id: contactId, owner });

  if (!contact) {
    throw error(404, "Not found");
  }

  return contact;
};

module.exports = { getContactById };

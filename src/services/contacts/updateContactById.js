const { error } = require("../../helpers/error");
const { Contact } = require("../../models/contactModel");

const updateContactById = async (contactId, owner, body) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: body },
    { new: true }
  );

  if (!contact) {
    throw error(404, "Not found");
  }

  return contact;
};

module.exports = { updateContactById };

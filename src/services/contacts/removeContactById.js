const { Contact } = require("../../models/contactModel");

const removeContactById = async (contactId, owner) => {
  const contact = await Contact.findOneAndRemove({ _id: contactId, owner });
  

  return contact;
};

module.exports = { removeContactById };

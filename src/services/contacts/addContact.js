const { Contact } = require("../../models/contactModel");

const addContact = async (body, owner) => {
  const newContact = new Contact({ ...body, owner });

  await newContact.save();

  return newContact;
};

module.exports = { addContact };

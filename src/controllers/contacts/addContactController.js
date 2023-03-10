const { addContact } = require("../../services/contacts");

const addContactController = async (req, res) => {
  const contact = req.body;
  const { _id: owner } = req.user;

  await addContact(contact, owner);

  res.status(201).json({ contact, message: "Success, contact added" });
};

module.exports = { addContactController };

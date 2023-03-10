const { updateContactById } = require("../../services/contacts");

const updateContactByIdController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const updatedContactData = req.body;
  const { _id: owner } = req.user;

  const contact = await updateContactById(id, owner, updatedContactData);

  res.status(200).json({ contact, message: "Success, contact updated" });
};

module.exports = { updateContactByIdController };

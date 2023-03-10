const { updateStatusContactById } = require("../../services/contacts");

const updateStatusContactByIdController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const newStatus = req.body;
  const { _id: owner } = req.user;

  const contact = await updateStatusContactById(id, owner, newStatus);

  res.json({ contact, message: "Success, contact's status updated" });
};

module.exports = { updateStatusContactByIdController };

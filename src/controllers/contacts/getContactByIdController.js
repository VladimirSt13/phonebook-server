const { getContactById } = require("../../services/contacts");

const getContactByIdController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(id, owner);

  res.json({ contact, message: "success" });
};

module.exports = { getContactByIdController };

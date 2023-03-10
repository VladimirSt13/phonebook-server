const { error } = require("../../helpers/error");
const { removeContactById } = require("../../services/contacts");

const removeContactByIdController = async (req, res, next) => {
  const { contactId: id } = req.params;
  const { _id: owner } = req.user;

  const contact = await removeContactById(id, owner);

  if (!contact) {
    throw error(404, "Not found");
  }

  res.status(200).json({ contact, message: "contact deleted" });
};

module.exports = { removeContactByIdController };

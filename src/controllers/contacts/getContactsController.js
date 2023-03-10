const { getContacts } = require("../../services/contacts");

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user;
  let { skip = 0, limit = 5, favorite } = req.query;
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
  skip = parseInt(skip);

  const contacts = await getContacts({ owner, favorite }, { skip, limit });

  res.status(200).json({ contacts, message: "success", skip, limit });
};

module.exports = { getContactsController };

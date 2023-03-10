const { error } = require("../../helpers/error");
const { Contact } = require("../../models/contactModel");

const getContacts = async ({ owner, favorite }, { skip, limit }) => {
  const filter = !favorite ? { owner } : { owner, favorite: favorite };

  const contacts = await Contact.find(filter)
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);

  if (!contacts) {
    throw error(400, "fail, something wrong");
  }

  return contacts;
};

module.exports = { getContacts };

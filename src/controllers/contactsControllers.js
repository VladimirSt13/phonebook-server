import { contactsServices } from "../services/contactsServices.js";

export const contactsController = {
  get: async (req, res, next) => {
    const { _id: owner } = req.user;
    let { skip = 0, limit = 5, favorite } = req.query;
    limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
    skip = parseInt(skip);

    const contacts = await contactsServices.get({ owner, favorite }, { skip, limit });

    res.status(200).json({ contacts, message: "success", skip, limit });
  },

  getById: async (req, res, next) => {
    const { contactId: id } = req.params;
    const { _id: owner } = req.user;
    const contact = await contactsServices.getById(id, owner);

    res.json({ contact, message: "success" });
  },

  add: async (req, res) => {
    const contact = req.body;
    const { _id: owner } = req.user;

    const newContact = await contactsServices.add(contact, owner);

    res.status(201).json({ newContact, message: "Success, contact added" });
  },

  update: async (req, res, next) => {
    const { contactId: id } = req.params;
    const updatedContactData = req.body;
    const { _id: owner } = req.user;

    const contact = await contactsServices.updateById(id, owner, updatedContactData);

    res.status(200).json({ contact, message: "Success, contact updated" });
  },

  updateStatusById: async (req, res, next) => {
    const { contactId: id } = req.params;
    const newStatus = req.body;
    const { _id: owner } = req.user;

    const contact = await contactsServices.updateStatusById(id, owner, newStatus);

    res.json({ contact, message: "Success, contact's status updated" });
  },

  removeById: async (req, res, next) => {
    const { contactId: id } = req.params;
    const { _id: owner } = req.user;

    const contact = await contactsServices.removeById(id, owner);

    if (!contact) {
      throw error(404, "Not found");
    }

    res.status(200).json({ contact, message: "contact deleted" });
  },
};

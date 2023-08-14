import { Contact } from "../models/index.js";

export const contactsServices = {
  get: async ({ owner, favorite }, { skip, limit }) => {
    const filter = !favorite ? { owner } : { owner, favorite: favorite };

    const contacts = await Contact.find(filter).select({ __v: 0 }).skip(skip).limit(limit);

    if (!contacts) {
      throw error(400, "fail, something wrong");
    }

    return contacts;
  },

  getById: async (contactId, owner) => {
    const contact = await Contact.find({ _id: contactId, owner });

    if (!contact) {
      throw error(404, "Not found");
    }

    return contact;
  },

  add: async (body, owner) => {
    const newContact = new Contact({ ...body, owner });

    const createdContact = await newContact.save();

    return createdContact;
  },

  updateById: async (contactId, owner, body) => {
    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner }, { $set: body }, { new: true });

    if (!contact) {
      throw error(404, "Not found");
    }

    return contact;
  },

  updateStatusById: async (contactId, owner, body) => {
    const contact = await Contact.findOneAndUpdate({ _id: contactId, owner }, { $set: body }, { new: true });

    if (!contact) {
      throw error(404, "Not found");
    }

    return contact;
  },

  removeById: async (contactId, owner) => {
    const contact = await Contact.findOneAndRemove({ _id: contactId, owner });

    return contact;
  },
};

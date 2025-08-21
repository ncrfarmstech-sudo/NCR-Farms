const ContactUs = require('../models/ContactUs');

const createContact = async (payload) => {
	const contact = new ContactUs(payload);
	return await contact.save();
};

const listContacts = async () => {
	return await ContactUs.find().sort({ createdAt: -1 });
};

const deleteContact = async (id) => {
	return await ContactUs.findByIdAndDelete(id);
};

module.exports = { createContact, listContacts, deleteContact };

const contactService = require('../services/contactUsService');

const createContact = async (req, res) => {
	try {
		const { name, email, message } = req.body;
		if (!name || !email || !message) {
			return res.status(400).json({ error: 'name, email and message are required' });
		}
		const contact = await contactService.createContact({ name, email, message });
		res.status(201).json(contact);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const getContacts = async (req, res) => {
	try {
		const contacts = await contactService.listContacts();
		res.json(contacts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const removeContact = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await contactService.deleteContact(id);
		if (!deleted) return res.status(404).json({ error: 'Not found' });
		res.json({ message: 'Deleted' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = { createContact, getContacts, removeContact };

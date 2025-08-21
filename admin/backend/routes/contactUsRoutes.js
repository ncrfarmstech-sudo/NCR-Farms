const express = require('express');
const router = express.Router();
const { createContact, getContacts, removeContact } = require('../controllers/contactUsController');

router.post('/', createContact);
router.get('/', getContacts);
router.delete('/:id', removeContact);

module.exports = router;

const express = require('express');
const router = express.Router();
const { contactMailService } = require('../services/mailService');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
  await contactMailService({ name, email, message });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Mail send error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;

const { sendContactMail } = require('../utils/mail');

/**
 * Service to handle contact mail logic
 * @param {Object} param0 { name, email, message }
 * @returns {Promise}
 */
async function contactMailService({ name, email, message }) {
  // You can add more business logic here if needed
  return sendContactMail({ name, email, message });
}

module.exports = { contactMailService };

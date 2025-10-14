const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address
    pass: process.env.GMAIL_PASS  // App password or Gmail password
  }
});

/**
 * Send contact form message to your Gmail
 * @param {Object} param0 { name, email, message }
 * @returns {Promise}
 */
async function sendContactMail({ name, email, message }) {
  return transporter.sendMail({
    from: `NCR Farms Contact <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER, // Send to yourself
    subject: `New Contact Message from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
  });
}

module.exports = { sendContactMail };

import React, { useState, useEffect } from "react";
import { useContactUs } from '../context/ContactUsContext';
import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const { submitContact, loading, error, success } = useContactUs();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitContact(form);
  };

  useEffect(() => {
    if (success) {
      setForm({ name: '', email: '', message: '' });
    }
  }, [success]);

  return (
    <div className="bg-gray-50 pt-24 pb-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Contact Info */}
        <div className="bg-[#2D5D4F] text-white p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <p className="text-gray-200 text-sm">
            Have questions or need support? We’re here to help you anytime.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-lg" />
              <span>+91 00000 00000</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-lg" />
              <span>support@affordindia.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaClock className="text-lg" />
              <span>Mon-Sat: 10:00 AM - 05:00 PM</span>
            </div>
          </div>
        </div>
        {/* Right Section - Form */}
        <div className="p-8 bg-[#F8F4EC]">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Send Us a Message
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4a3f]"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4a3f]"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4b4a3f]"
              required
            ></textarea>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">Thank you for contacting us!</div>}
            <button
              type="submit"
              className="bg-[#2D5D4F] text-white w-full py-2 text-sm font-medium rounded-md hover:bg-[#333] transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      {/* Bottom Sentence */}
      <p className="text-center text-sm text-gray-600 mt-8">
        Thank you for reaching out to us — we’ll get back to you shortly.
      </p>
    </div>
  );
};

export default ContactUs;
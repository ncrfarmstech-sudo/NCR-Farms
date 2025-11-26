import React, { useState, useEffect } from "react";
import { useContactUs } from "../context/ContactUsContext";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { FaShieldAlt, FaTags, FaHeart } from "react-icons/fa";
import bgImage from "../assets/contactus.png";
import WhychooseNcr from "../components/common/WhychooseNcr";

const ContactUs = () => {
    const { submitContact, loading, error, success } = useContactUs();
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitContact(form);
    };

    useEffect(() => {
        if (success) {
            setForm({ name: "", email: "", message: "" });
        }
    }, [success]);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-64 flex items-center justify-center">
                <img
                    src={bgImage}
                    alt="Contact Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <h1 className="relative text-3xl md:text-4xl font-bold text-white z-10">
                    Get in Touch
                </h1>
            </div>

            {/* Contact Info Cards */}
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Call Us */}
                <div
                    className="bg-[#F8F4EC] shadow-md rounded-lg py-10 px-4 text-center flex flex-col items-center justify-center 
                  transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-[#e9e2d2] cursor-pointer"
                >
                    <FaPhoneAlt className="text-3xl text-[#2D5D4F] group-hover:text-[#1f3c34]" />
                    <h4 className="mt-3 text-sm font-semibold text-[#2D5D4F] uppercase">
                        Call Us
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                        Monday-Saturday 9AM-7PM
                    </p>
                    <p className="text-gray-800 font-bold mt-2">8920215863</p>
                </div>

                {/* Email Us */}
                <div
                    className="bg-[#F8F4EC] shadow-md rounded-lg py-10 px-4 text-center flex flex-col items-center justify-center 
                  transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-[#e9e2d2] cursor-pointer"
                >
                    <FaEnvelope className="text-3xl text-[#2D5D4F]" />
                    <h4 className="mt-3 text-sm font-semibold text-[#2D5D4F] uppercase">
                        Email Us
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Quick Response</p>
                    <p className="text-gray-800 font-bold mt-2">
                        ravinderofficial@gmail.com
                    </p>
                </div>

                {/* Visit Us */}
                <div
                    className="bg-[#F8F4EC] shadow-md rounded-lg py-10 px-4 text-center flex flex-col items-center justify-center 
                  transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-[#e9e2d2] cursor-pointer"
                >
                    <FaMapMarkerAlt className="text-3xl text-[#2D5D4F]" />
                    <h4 className="mt-3 text-sm font-semibold text-[#2D5D4F] uppercase">
                        Visit Us
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">Gurugram</p>
                    <p className="text-gray-800 font-bold mt-2">
                        Vipul Business Park, Sector 48
                    </p>
                </div>

                {/* WhatsApp */}
                <div
                    className="bg-[#F8F4EC] shadow-md rounded-lg py-10 px-4 text-center flex flex-col items-center justify-center 
                  transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-[#e9e2d2] cursor-pointer"
                >
                    <FaPhoneAlt className="text-3xl text-[#2D5D4F]" />
                    <h4 className="mt-3 text-sm font-semibold text-[#2D5D4F] uppercase">
                        WhatsApp
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                        Monday-Saturday 9AM-7PM
                    </p>
                    <p className="text-gray-800 font-bold mt-2">8920215863</p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto bg-[#1D3C33] shadow-md rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-[#F8F4EC]">
                    Send Us a Message
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full  bg-[#2D5D4F] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5D4F] text-[#F8F4EC]"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full  bg-[#2D5D4F] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5D4F] text-[#F8F4EC]"
                        required
                    />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="4"
                        className="w-full  bg-[#2D5D4F] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5D4F] text-[#F8F4EC]"
                        required
                    ></textarea>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    {success && (
                        <div className="text-green-600 text-sm">
                            Thank you for contacting us!
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-[#EAE0D2] text-[#1D3C33] px-6 py-2 text-sm font-medium rounded-md shadow-sm hover:bg-[#d9c9b6] transition disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Bottom Sentence */}
            <p className="text-center text-sm text-gray-600 mt-8 mb-12">
                Thank you for reaching out to us — we’ll get back to you
                shortly.
            </p>

            {/* Why Choose NCR Farms Section */}
            <WhychooseNcr />

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto px-6 pb-16">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#2D5D4F]">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                    <div className="bg-white shadow-sm p-2">
                        <h4 className="font-semibold text-[#2D5D4F]">
                            How can I place an order?
                        </h4>
                        <p className="text-sm text-black mt-1">
                            You can place an order directly through our website
                            or call us for assistance.
                        </p>
                    </div>

                    <div className="bg-white shadow-sm p-2">
                        <h4 className="font-semibold text-[#2D5D4F]">
                            Do you provide home delivery?
                        </h4>
                        <p className="text-sm text-black mt-1">
                            Yes, we deliver across NCR regions within 24 hours.
                        </p>
                    </div>

                    <div className="bg-white shadow-sm p-2">
                        <h4 className="font-semibold text-[#2D5D4F]">
                            Is your produce organic?
                        </h4>
                        <p className="text-sm text-black mt-1">
                            Absolutely, all our produce is 100% organic and
                            chemical-free.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

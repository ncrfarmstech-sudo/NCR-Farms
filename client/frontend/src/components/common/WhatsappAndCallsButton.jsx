import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const WhatsappAndCallsButton = () => {
  return (
    <>
      {/* Desktop buttons - bottom right sticky */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-8 right-8 z-50 items-end">
        {/* Call Button */}
        <a
          href="tel:+919999999999"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-green-900 font-semibold shadow-md hover:bg-yellow-500 transition-all duration-300"
          aria-label="Call"
        >
          <FaPhoneAlt size={18} />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={20} />
          <span>Chat</span>
        </a>
      </div>

      {/* Mobile buttons - bottom right sticky, same as desktop */}
      <div className="flex md:hidden flex-col gap-3 fixed bottom-4 right-4 z-50 items-end">
        {/* Call Button */}
        <a
          href="tel:+919999999999"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-green-900 font-semibold shadow-md hover:bg-yellow-500 transition-all duration-300"
          aria-label="Call"
        >
          <FaPhoneAlt size={18} />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={20} />
          <span>Chat</span>
        </a>
      </div>
    </>
  );
};

export default WhatsappAndCallsButton;

import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { createPhoneURL, openWhatsApp } from "../../config/contact";

const WhatsappAndCallsButton = ({ 
  whatsappMessage, 
  customPhoneNumber, 
  customWhatsappNumber 
}) => {
  // Generate URLs using the configuration
  const phoneURL = createPhoneURL(customPhoneNumber);

  const handleWhatsAppClick = () => {
    openWhatsApp(whatsappMessage, customWhatsappNumber);
  };

  return (
    <>
      {/* Desktop buttons - bottom right sticky */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-8 right-8 z-50 items-end">
        
        {/* Call Button */}
        <a
          href={phoneURL}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-yellow-400 text-green-900 font-semibold shadow-md 
          transition-all duration-300
          hover:bg-green-600 hover:text-yellow-400"
          aria-label="Call NCR Farms"
        >
          <FaPhoneAlt size={18} />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-green-600 text-white font-semibold shadow-md 
          transition-all duration-300 cursor-pointer border-none
          hover:bg-white hover:text-green-600"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={20} />
          <span>Chat</span>
        </button>
      </div>

      {/* Mobile buttons - bottom right sticky */}
      <div className="flex md:hidden flex-col gap-3 fixed bottom-4 right-4 z-50 items-end">

        {/* Call Button */}
        <a
          href={phoneURL}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-yellow-400 text-green-900 font-semibold shadow-md 
          transition-all duration-300
          hover:bg-green-600 hover:text-yellow-400"
          aria-label="Call NCR Farms"
        >
          <FaPhoneAlt size={18} />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2 px-4 py-2 rounded-full 
          bg-green-600 text-white font-semibold shadow-md 
          transition-all duration-300 cursor-pointer border-none
          hover:bg-white hover:text-green-600"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={20} />
          <span>Chat</span>
        </button>
      </div>
    </>
  );
};

export default WhatsappAndCallsButton;

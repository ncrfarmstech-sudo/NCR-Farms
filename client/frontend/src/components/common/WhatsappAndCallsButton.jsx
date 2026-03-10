import React, { useState } from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { createPhoneURL, openWhatsApp } from "../../config/contact";

const WhatsappAndCallsButton = ({ 
  whatsappMessage, 
  customPhoneNumber, 
  customWhatsappNumber 
}) => {
  const [showCallPopup, setShowCallPopup] = useState(false);
  // Generate URLs using the configuration
  const phoneURL = createPhoneURL(customPhoneNumber);
  const displayNumber = (customPhoneNumber || import.meta.env.VITE_PHONE_NUMBER || "918920215863").replace(/^[+]/, "");

  const handleWhatsAppClick = () => {
    openWhatsApp(whatsappMessage, customWhatsappNumber);
  };

  return (
    <>
      {/* Desktop buttons - bottom right sticky */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-8 right-8 z-50 items-end">
        
        {/* Call Button */}
        <button
          onClick={() => setShowCallPopup(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full 
          bg-yellow-400 text-green-900 font-semibold shadow-md 
          transition-all duration-300 cursor-pointer border-none
          hover:bg-green-600 hover:text-yellow-400 text-sm"
          aria-label="Show call number"
        >
          <FaPhoneAlt size={20} />
          <span>Call</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full 
          bg-green-600 text-white font-semibold shadow-md 
          transition-all duration-300 cursor-pointer border-none
          hover:bg-white hover:text-green-600 text-sm"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={20} />
          <span>Chat</span>
        </button>

        {/* Desktop Call Popup */}
        {showCallPopup && (
          <div className="mt-2 w-56 rounded-lg shadow-lg bg-white border border-gray-200 p-4 text-[#1D3C33]">
            <div className="text-sm text-gray-600 mb-1">Call Number</div>
            <div className="text-xl font-semibold tracking-wide">{displayNumber.replace(/^91/, "")}</div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCallPopup(false)}
                className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile buttons - bottom right sticky */}
      <div className="flex md:hidden flex-col gap-3 fixed bottom-4 right-4 z-50 items-end">

        {/* Call Button */}
        <a
          href={phoneURL}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full 
          bg-yellow-400 text-green-900 font-semibold shadow-md 
          transition-all duration-300
          hover:bg-green-600 hover:text-yellow-400 text-sm"
          aria-label="Call NCR Farms"
        >
          <FaPhoneAlt size={20} />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full 
          bg-green-600 text-white font-semibold shadow-md 
          transition-all duration-300 cursor-pointer border-none
          hover:bg-white hover:text-green-600 text-sm"
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

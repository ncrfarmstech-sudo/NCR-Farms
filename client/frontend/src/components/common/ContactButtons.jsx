import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { createPhoneURL, openWhatsApp, CONTACT_CONFIG } from "../../config/contact";

const ContactButtons = ({ 
  propertyTitle = '',
  propertyId = '',
  message = '',
  className = '',
  showPhone = true,
  showWhatsApp = true,
  customWhatsappNumber = '',
  customPhoneNumber = '',
  size = 'md' // sm, md, lg
}) => {
  // Create custom message for property inquiry
  const propertyMessage = message || 
    (propertyTitle 
      ? `Hello! I am interested in "${propertyTitle}" (ID: ${propertyId}). Please provide more details.`
      : CONTACT_CONFIG.defaultMessages.general
    );

  const phoneURL = createPhoneURL(customPhoneNumber);

  const handleWhatsAppClick = () => {
    openWhatsApp(propertyMessage, customWhatsappNumber);
  };

  // Size variations
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {showPhone && (
        <a
          href={phoneURL}
          className={`${sizeClasses[size]} flex items-center gap-2 rounded-lg bg-yellow-400 text-green-900 font-semibold shadow-md hover:bg-yellow-500 transition-all duration-300`}
          aria-label="Call NCR Farms"
        >
          <FaPhoneAlt size={iconSizes[size]} />
          <span>Call Now</span>
        </a>
      )}
      
      {showWhatsApp && (
        <button
          onClick={handleWhatsAppClick}
          className={`${sizeClasses[size]} flex items-center gap-2 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-300 cursor-pointer border-none`}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={iconSizes[size]} />
          <span>WhatsApp</span>
        </button>
      )}
    </div>
  );
};

export default ContactButtons;
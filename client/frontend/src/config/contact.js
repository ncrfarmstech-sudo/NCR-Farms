// Contact configuration with fallback values
export const CONTACT_CONFIG = {
  // WhatsApp number from environment or fallback
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999',
  
  // Phone number from environment or fallback
  phoneNumber: import.meta.env.VITE_PHONE_NUMBER || '919999999999',
  
  // Default WhatsApp message templates
  defaultMessages: {
    general: 'Hello! I am interested in NCR Farms properties. Please provide more information.',
    property: 'Hello! I am interested in this property. Please provide more details.',
    callback: 'Hello! Please call me back regarding NCR Farms properties.',
  },
  
  // Business hours (optional)
  businessHours: {
    start: '09:00',
    end: '18:00',
    timezone: 'Asia/Kolkata',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
};

// Utility function to create WhatsApp URL that opens app directly
export const createWhatsAppURL = (message = CONTACT_CONFIG.defaultMessages.general, number = CONTACT_CONFIG.whatsappNumber) => {
  const cleanNumber = number.replace(/[^\d]/g, ''); // Remove any non-digit characters
  const encodedMessage = encodeURIComponent(message);
  
  // Always use wa.me which automatically redirects to the app if available
  // This is the most reliable method used by major companies
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};

// Advanced WhatsApp handler with app detection (for click handlers)
export const openWhatsApp = (message = CONTACT_CONFIG.defaultMessages.general, number = CONTACT_CONFIG.whatsappNumber) => {
  const cleanNumber = number.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  // Detect device type
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS) {
    // For iOS: Try app first, then fallback
    const appURL = `whatsapp://send?phone=${cleanNumber}&text=${encodedMessage}`;
    const webURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    // Try to open app, fallback to web
    window.location.href = appURL;
    setTimeout(() => {
      window.open(webURL, '_blank');
    }, 500);
  } else if (isAndroid) {
    // For Android: Use intent URL with fallback
    const intentURL = `intent://send?phone=${cleanNumber}&text=${encodedMessage}#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url=https://wa.me/${cleanNumber}?text=${encodedMessage};end`;
    window.location.href = intentURL;
  } else {
    // For desktop: Use WhatsApp Web
    const webURL = `https://web.whatsapp.com/send?phone=${cleanNumber}&text=${encodedMessage}`;
    window.open(webURL, '_blank');
  }
};

// Utility function to create phone URL
export const createPhoneURL = (number = CONTACT_CONFIG.phoneNumber) => {
  const cleanNumber = number.replace(/[^\d]/g, '');
  return `tel:+${cleanNumber}`;
};
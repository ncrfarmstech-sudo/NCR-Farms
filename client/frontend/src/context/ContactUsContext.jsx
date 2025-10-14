import React, { createContext, useState } from 'react';
import { sendContactMessage } from '../api/contactus';

export const ContactUsContext = createContext();

export const ContactUsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitContact = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await sendContactMessage(data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactUsContext.Provider value={{ submitContact, loading, error, success }}>
      {children}
    </ContactUsContext.Provider>
  );
};



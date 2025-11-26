import React, { createContext, useContext, useState } from 'react';
import axios from '../api/axios';

const ContactUsContext = createContext();

export const useContactUs = () => useContext(ContactUsContext);

export const ContactUsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitContact = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post('/contactus', data);
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



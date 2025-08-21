import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchContacts as apiFetchContacts, deleteContact as apiDeleteContact } from '../api/contactus';

const ContactUsContext = createContext();

export const useContactUs = () => useContext(ContactUsContext);

export const ContactUsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await apiFetchContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
    }
    setLoading(false);
  };

  const deleteContact = async (id) => {
    try {
      await apiDeleteContact(id);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactUsContext.Provider value={{ contacts, loading, error, fetchContacts, deleteContact }}>
      {children}
    </ContactUsContext.Provider>
  );
};

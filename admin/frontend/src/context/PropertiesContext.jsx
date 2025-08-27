import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchProperties, createProperty, updateProperty, deleteProperty } from '../api/property';

const PropertiesContext = createContext();

export const useProperties = () => useContext(PropertiesContext);

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties');
    }
    setLoading(false);
  };

  const addProperty = async (formData) => {
    await createProperty(formData);
    await loadProperties();
  };

  const editProperty = async (id, formData) => {
    await updateProperty(id, formData);
    await loadProperties();
  };

  const removeProperty = async (id) => {
    await deleteProperty(id);
    await loadProperties();
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <PropertiesContext.Provider value={{ properties, loading, error, addProperty, editProperty, removeProperty, loadProperties }}>
      {children}
    </PropertiesContext.Provider>
  );
};

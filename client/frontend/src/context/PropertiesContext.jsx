import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProperties } from '../api/property';

const PropertiesContext = createContext();

export const useProperties = () => useContext(PropertiesContext);

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <PropertiesContext.Provider value={{ properties, setProperties, loading, error }}>
      {children}
    </PropertiesContext.Provider>
  );
};

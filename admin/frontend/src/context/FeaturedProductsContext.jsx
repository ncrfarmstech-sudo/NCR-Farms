import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFeaturedProducts } from '../api/featuredProduct';

const FeaturedProductsContext = createContext();

export const useFeaturedProducts = () => useContext(FeaturedProductsContext);

export const FeaturedProductsProvider = ({ children }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts();
        setFeaturedProducts(data);
      } catch (err) {
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <FeaturedProductsContext.Provider value={{ featuredProducts, setFeaturedProducts, loading, error }}>
      {children}
    </FeaturedProductsContext.Provider>
  );
};

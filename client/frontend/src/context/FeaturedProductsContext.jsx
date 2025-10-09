import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchFeaturedProducts } from '../api/featuredProduct';

const FeaturedProductsContext = createContext();

export const useFeaturedProducts = () => useContext(FeaturedProductsContext);

export const FeaturedProductsProvider = ({ children }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeaturedProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchFeaturedProducts();
      setFeaturedProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch featured products');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  return (
    <FeaturedProductsContext.Provider value={{ featuredProducts, loading, error, reload: loadFeaturedProducts }}>
      {children}
    </FeaturedProductsContext.Provider>
  );
};

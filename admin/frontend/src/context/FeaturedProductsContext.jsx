import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchFeaturedProducts,
  createFeaturedProduct,
  updateFeaturedProduct,
  patchFeaturedProduct,
  deleteFeaturedProduct
} from '../api/featuredProduct';

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

  const addFeaturedProduct = async (formData) => {
    setError(null);
    try {
      await createFeaturedProduct(formData);
      await loadFeaturedProducts();
    } catch (err) {
      setError('Failed to add featured product');
      throw err;
    }
  };

  const editFeaturedProduct = async (id, formData) => {
    setError(null);
    try {
      await updateFeaturedProduct(id, formData);
      await loadFeaturedProducts();
    } catch (err) {
      setError('Failed to edit featured product');
      throw err;
    }
  };

  const patchFeaturedProductFn = async (id, formData) => {
    setError(null);
    try {
      await patchFeaturedProduct(id, formData);
      await loadFeaturedProducts();
    } catch (err) {
      setError('Failed to update featured product');
      throw err;
    }
  };

  const removeFeaturedProduct = async (id) => {
    setError(null);
    try {
      await deleteFeaturedProduct(id);
      await loadFeaturedProducts();
    } catch (err) {
      setError('Failed to delete featured product');
      throw err;
    }
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  return (
    <FeaturedProductsContext.Provider value={{ featuredProducts, loading, error, addFeaturedProduct, editFeaturedProduct, patchFeaturedProduct: patchFeaturedProductFn, removeFeaturedProduct, loadFeaturedProducts }}>
      {children}
    </FeaturedProductsContext.Provider>
  );
};

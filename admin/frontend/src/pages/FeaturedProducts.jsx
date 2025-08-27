import React, { useState } from 'react';
import { useFeaturedProducts } from '../context/FeaturedProductsContext';
import FeaturedProductForm from '../components/featuredProduct/FeaturedProductForm';
import FeaturedProductList from '../components/featuredProduct/FeaturedProductList';
import { toast } from 'react-toastify';

const FeaturedProducts = () => {
  const { featuredProducts, loading, error, addFeaturedProduct, editFeaturedProduct, removeFeaturedProduct } = useFeaturedProducts();
  const [editProduct, setEditProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);



  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editProduct) {
        await editFeaturedProduct(editProduct._id, formData);
        toast.success('Featured product updated successfully!');
      } else {
        await addFeaturedProduct(formData);
        toast.success('Featured product added successfully!');
      }
      setEditProduct(null);
    } catch (err) {
      toast.error('Failed to save featured product. It may have been deleted or there was a network error.');
    }
    setFormLoading(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    setFormLoading(true);
    try {
      await removeFeaturedProduct(id);
      toast.success('Featured product deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete featured product. It may have already been deleted or there was a network error.');
    }
    setFormLoading(false);
  };

  return (
    <div className="p-8 min-h-screen ml-56 bg-[#f3e9db]" style={{ background: '#F3E9DB' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D5D4F] mb-4 md:mb-0">Featured Products</h1>
        <button
          className="bg-[#2D5D4F] hover:bg-[#24493e] text-white px-6 py-2 rounded-lg font-semibold shadow"
          onClick={() => setEditProduct(null)}
        >
          Add Featured Product
        </button>
      </div>
      <div className="max-w-6xl mx-auto mb-8 w-full">
        <FeaturedProductForm
          onSubmit={handleFormSubmit}
          loading={formLoading}
          initialData={editProduct}
          isEdit={!!editProduct}
          onCancel={() => setEditProduct(null)}
        />
      </div>
      <FeaturedProductList
        products={featuredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={formLoading}
      />
    </div>
  );
};

export default FeaturedProducts;

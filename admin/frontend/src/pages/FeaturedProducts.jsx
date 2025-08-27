import React from 'react';
import { useFeaturedProducts } from '../context/FeaturedProductsContext';
import { useState } from 'react';
import FeaturedProductForm from '../components/featuredProduct/FeaturedProductForm';
import FeaturedProductList from '../components/featuredProduct/FeaturedProductList';
import { toast } from 'react-toastify';

const FeaturedProducts = () => {
  const { featuredProducts, loading, error, addFeaturedProduct, editFeaturedProduct, removeFeaturedProduct } = useFeaturedProducts();
  const [modalOpen, setModalOpen] = useState(false);
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
      setModalOpen(false);
    } catch (err) {
      toast.error('Failed to save featured product. It may have been deleted or there was a network error.');
    }
    setFormLoading(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
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
    <div className="pt-20 pb-12 px-2 md:px-10 bg-[#f3e9db] min-h-screen ml-56">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">Featured Products</h1>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          onClick={() => { setEditProduct(null); setModalOpen(true); }}
        >
          Add Featured Product
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => { setModalOpen(false); setEditProduct(null); }}
            >
              ×
            </button>
            <FeaturedProductForm
              onSubmit={handleFormSubmit}
              loading={formLoading}
              initialData={editProduct}
              isEdit={!!editProduct}
              onCancel={() => { setModalOpen(false); setEditProduct(null); }}
            />
          </div>
        </div>
      )}
      {/* Remove loading and error messages for a cleaner UI */}
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

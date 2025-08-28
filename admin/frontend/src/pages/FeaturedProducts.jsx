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
    <div className="p-8 min-h-screen ml-56 bg-gradient-to-br from-green-50 to-white" >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
							<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
							Features Properties
						</h2>
       
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

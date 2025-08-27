import React from 'react';

const FeaturedProductList = ({ products, onEdit, onDelete, loading }) => {
  const safeProducts = Array.isArray(products) ? products : [];
  if (loading) return null;
  if (!safeProducts.length) return <div className="text-gray-500">No featured products found.</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {safeProducts.map((p) => (
        <div
          key={p._id}
          className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
        >
          {Array.isArray(p.images) && p.images.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto">
              {p.images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={p.title + ' image ' + (idx + 1)}
                  className="w-32 h-32 object-cover rounded-xl border border-gray-300 shadow-sm"
                />
              ))}
            </div>
          )}
          <h3 className="text-xl font-bold text-green-900 bg-green-50 rounded px-2 py-1 mb-2 shadow-sm border-l-4 border-green-400">
            {p.title}
          </h3>
          <p className="text-base text-gray-700 mt-2 mb-4 whitespace-pre-line min-h-[3.5rem]">
            {typeof p.description === 'string' ? p.description : '[No description]'}
          </p>
          <div className="flex gap-4 text-gray-600 text-sm mb-2">
            <span>🛏 {p.features?.bedrooms || 0} Beds</span>
            <span>🛁 {p.features?.bathrooms || 0} Baths</span>
            <span>📐 {p.features?.area || 0} sqft</span>
          </div>
          <div className="text-gray-600 text-sm mb-2">
            {p.features?.furnished ? '🛋️ Furnished' : 'Unfurnished'}
          </div>
          <div className="text-gray-600 text-sm mb-2">
            {p.address?.city}, {p.address?.state}
          </div>
          <div className="flex justify-between items-center mt-auto gap-3">
            <p className="text-green-900 font-bold">Rs. {p.price || 'N/A'}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(p)}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow transition-colors duration-150"
                title="Edit Featured Product"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p._id)}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow transition-colors duration-150"
                title="Delete Featured Product"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProductList;

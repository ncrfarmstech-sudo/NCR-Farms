import React, { useState } from 'react';
import { useFeaturedProducts } from '../context/FeaturedProductsContext';

const FeaturedProducts = () => {
  const { featuredProducts, loading, error } = useFeaturedProducts();
  const [expanded, setExpanded] = useState(null);

  if (loading) return <div className="text-center py-10">Loading featured products...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="pt-20 pb-12 px-2 md:px-10 bg-[#f3e9db] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {featuredProducts.map((p, idx) => (
          <div
            key={p._id || p.id}
            className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col animate-fade-in${expanded === idx ? ' ring-2 ring-green-400' : ''}`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="relative">
              <img
                src={Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'}
                alt={p.title || 'Featured Product'}
                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-green-900 transition-colors duration-300">{p.title || 'Featured Product'}</h3>
              <p className="text-gray-500 text-sm mb-3">{p.address?.city || ''}, {p.address?.state || ''}</p>
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                <span>🛏 {p.features?.bedrooms || 0} Beds</span>
                <span>🛁 {p.features?.bathrooms || 0} Baths</span>
                <span>📐 {p.features?.area || 0} sqft</span>
              </div>
              <div className="text-gray-600 text-sm mb-4">
                {p.features?.furnished ? '🛋️ Furnished' : 'Unfurnished'}
              </div>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-green-900 font-bold">
                  Rs. {p.price || 'N/A'}
                  <span className="text-gray-500 text-sm"> /night</span>
                </p>
                <button
                  className={`bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-800 transition ${expanded === idx ? 'scale-95' : ''}`}
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                >
                  {expanded === idx ? 'Hide Details' : 'View Details'}
                </button>
              </div>
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expanded === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {expanded === idx && (
                  <div className="mt-4 border-t pt-4 animate-slide-down">
                    <div className="text-gray-700 mb-2">{p.description || 'No description available.'}</div>
                    <div className="flex gap-2 flex-wrap text-sm text-gray-600 mb-2">
                      <span>Status: {p.status || 'N/A'}</span>
                      <span>Type: {p.productType || 'N/A'}</span>
                      <span>Address: {p.address?.street || ''} {p.address?.city || ''} {p.address?.state || ''} {p.address?.pincode || ''}</span>
                    </div>
                    {Array.isArray(p.images) && p.images.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {p.images.map((img, i) => (
                          <img key={i} src={img} alt="Featured Product" className="w-16 h-16 object-cover rounded" />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

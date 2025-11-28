
import React from "react";
import { useFeaturedProducts } from '../../context/FeaturedProductsContext';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProperties() {
  const { featuredProducts, loading, error } = useFeaturedProducts();
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 md:px-10 bg-[#D9D9D9]">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
        Our Featured Properties
      </h2>
      <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
        Explore our handpicked selection of premium farmhouses available for rent and sale across Delhi NCR.
      </p>

      {/* Loading/Error */}
      {loading && <div className="text-center text-green-700">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {featuredProducts && featuredProducts.length > 0 ? (
          featuredProducts.map((p) => (
            <div
              key={p._id || p.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (p.imageUrl || p.img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c')}
                  alt={p.title || 'Property'}
                  className="w-full h-44 object-cover"
                />
                {p.tag && (
                  <span className="absolute top-2 right-2 bg-[#F3C218D9] text-white px-2 py-1 rounded-md shadow text-xs font-bold uppercase tracking-wider">
                    {p.tag}
                  </span>
                )}
                {p.rating && (
                  <span className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md shadow text-sm font-semibold flex items-center">
                    ⭐ {p.rating}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-green-900">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{p.locationName || (p.address && p.address.city) || ''}</p>

                <div className="flex items-center gap-4 text-gray-600 text-sm mb-1">
                  {p.features && p.features.area && <span>� {p.features.area} sqft</span>}
                </div>
                <div className="text-gray-600 text-sm mb-3">
                  {p.description ? p.description.slice(0, 60) + (p.description.length > 60 ? '...' : '') : 'No description'}
                </div>

                {/* Bottom Section */}
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-green-900 font-bold">
                    Rs. {p.price}
                    
                  </p>
                  <button
                    className="bg-[#2D5D4F] text-white px-4 py-2 rounded-md hover:bg-[#3D7F6C] transition"
                    onClick={() => navigate(`/properties/${p._id || p.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : !loading && (
          <div className="col-span-4 text-center text-gray-500">No featured properties found.</div>
        )}
      </div>

      {/* Explore More Button
      <div className="text-center mt-12">
        <button className="bg-green-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-800 transition">
          EXPLORE MORE
        </button>
      </div>
 */}

    </section>
  );
}

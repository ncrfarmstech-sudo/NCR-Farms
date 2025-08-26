

import React, { useState } from 'react';
import { useProperties } from '../context/PropertiesContext';


const Properties = () => {
  const { properties, setProperties, loading, error } = useProperties();
  const [filter, setFilter] = useState({
    propertyType: '',
    city: '',
    state: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnished: false,
    status: '',
  });

  // Filtering logic
  const filtered = properties.filter((p) => {
    const price = parseInt(p.price) || 0;
    const min = parseInt(filter.minPrice) || 0;
    const max = parseInt(filter.maxPrice) || 1e9;
    const bedrooms = parseInt(filter.bedrooms) || 0;
    const bathrooms = parseInt(filter.bathrooms) || 0;
    const area = parseInt(filter.area) || 0;
    // Address fields
    const city = p.address && p.address.city ? p.address.city : '';
    const state = p.address && p.address.state ? p.address.state : '';
    // Features fields
    const pBedrooms = p.features && p.features.bedrooms ? p.features.bedrooms : 0;
    const pBathrooms = p.features && p.features.bathrooms ? p.features.bathrooms : 0;
    const pArea = p.features && p.features.area ? p.features.area : 0;
    const pFurnished = p.features && typeof p.features.furnished === 'boolean' ? p.features.furnished : false;
    return (
      (!filter.propertyType || p.propertyType === filter.propertyType) &&
      (!filter.city || (city && city.toLowerCase().includes(filter.city.toLowerCase()))) &&
      (!filter.state || (state && state.toLowerCase().includes(filter.state.toLowerCase()))) &&
      (!filter.minPrice || price >= min) &&
      (!filter.maxPrice || price <= max) &&
      (!filter.bedrooms || pBedrooms >= bedrooms) &&
      (!filter.bathrooms || pBathrooms >= bathrooms) &&
      (!filter.area || pArea >= area) &&
      (!filter.furnished || pFurnished === true) &&
      (!filter.status || p.status === filter.status)
    );
  });

  // Helper to safely render only strings/numbers
  const safe = (val) => {
    if (val == null) return '';
    if (typeof val === 'object') return '';
    return val;
  };

  return (
    <div className="pt-20 pb-12 px-2 md:px-10 bg-[#f3e9db] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">Available Properties</h1>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        Browse our curated list of premium farmhouses and properties available for rent and sale across Delhi NCR.
      </p>

      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow p-4 mb-6 md:mb-0 md:mr-6 flex-shrink-0">
          <h3 className="text-lg font-bold mb-4 text-green-900">Filter Properties</h3>
          <div className="flex flex-col gap-3">
            <select
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.propertyType}
              onChange={e => setFilter(f => ({ ...f, propertyType: e.target.value }))}
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="land">Land</option>
              <option value="office">Office</option>
            </select>
            <input
              type="text"
              placeholder="City"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.city}
              onChange={e => setFilter(f => ({ ...f, city: e.target.value }))}
            />
            <input
              type="text"
              placeholder="State"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.state}
              onChange={e => setFilter(f => ({ ...f, state: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Min Price"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.minPrice}
              onChange={e => setFilter(f => ({ ...f, minPrice: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.maxPrice}
              onChange={e => setFilter(f => ({ ...f, maxPrice: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Bedrooms"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.bedrooms}
              onChange={e => setFilter(f => ({ ...f, bedrooms: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Bathrooms"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.bathrooms}
              onChange={e => setFilter(f => ({ ...f, bathrooms: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Min Area (sqft)"
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.area}
              onChange={e => setFilter(f => ({ ...f, area: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filter.furnished}
                onChange={e => setFilter(f => ({ ...f, furnished: e.target.checked }))}
              />
              Furnished
            </label>
            <select
              className="px-3 py-2 rounded border border-gray-300 text-sm"
              value={filter.status}
              onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
            >
              <option value="">Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
          </div>
        </aside>

        {/* Property Listing */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center text-lg text-gray-500 py-20">Loading properties...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-20">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-20">No properties found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filtered.map((p, idx) => {
                const showDetails = p._showDetails || false;
                return (
                  <div
                    key={p._id || p.id}
                    className={
                      `bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col animate-fade-in` +
                      (showDetails ? ' ring-2 ring-green-400' : '')
                    }
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : (safe(p.imageUrl) || safe(p.img) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c')}
                        alt={safe(p.title) || 'Property'}
                        className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {safe(p.rating) && (
                        <span className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md shadow text-sm font-semibold flex items-center">
                          ⭐ {safe(p.rating)}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-green-900 transition-colors duration-300">{safe(p.title) || 'Farmhouse'}</h3>
                      <p className="text-gray-500 text-sm mb-3">{safe(p.address && p.address.city) || ''}, {safe(p.address && p.address.state) || ''}</p>

                      <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                        <span>🛏 {p.features && p.features.bedrooms ? p.features.bedrooms : 0} Beds</span>
                        <span>🛁 {p.features && p.features.bathrooms ? p.features.bathrooms : 0} Baths</span>
                        <span>📐 {p.features && p.features.area ? p.features.area : 0} sqft</span>
                      </div>
                      <div className="text-gray-600 text-sm mb-4">
                        {p.features && p.features.furnished ? '🛋️ Furnished' : 'Unfurnished'}
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-green-900 font-bold">
                          Rs. {safe(p.price) || 'N/A'}
                          <span className="text-gray-500 text-sm"> /night</span>
                        </p>
                        <button
                          className={
                            'bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-800 transition ' +
                            (showDetails ? 'scale-95' : '')
                          }
                          onClick={() => {
                            setProperties(prev => prev.map((item, i) => i === idx ? { ...item, _showDetails: !item._showDetails } : { ...item, _showDetails: false }));
                          }}
                        >
                          {showDetails ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>

                      {/* Inline Details */}
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${showDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        {showDetails && (
                          <div className="mt-4 border-t pt-4 animate-slide-down">
                            <div className="text-gray-700 mb-2">{safe(p.description) || 'No description available.'}</div>
                            <div className="flex gap-2 flex-wrap text-sm text-gray-600 mb-2">
                              <span>Status: {safe(p.status) || 'N/A'}</span>
                              <span>Type: {safe(p.propertyType) || 'N/A'}</span>
                              <span>Address: {safe(p.address && p.address.street) || ''} {safe(p.address && p.address.city) || ''} {safe(p.address && p.address.state) || ''} {safe(p.address && p.address.pincode) || ''}</span>
                            </div>
                            {Array.isArray(p.images) && p.images.length > 0 && (
                              <div className="flex gap-2 flex-wrap mt-2">
                                {p.images.map((img, i) => (
                                  <img key={i} src={img} alt="Property" className="w-16 h-16 object-cover rounded" />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
/* Add to your global CSS (e.g., index.css or App.css) if not already present: */
/*
.animate-fade-in {
  animation: fadeIn 0.7s both;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}
.animate-slide-down {
  animation: slideDown 0.5s cubic-bezier(.4,0,.2,1) both;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: none; }
}
*/
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;

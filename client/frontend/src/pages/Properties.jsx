

import React, { useState, useEffect } from 'react';
import { useProperties } from '../context/PropertiesContext';
import { useLocation } from 'react-router-dom';

// Define possible values for smart extraction
// Map synonyms to canonical property types (expanded)
const PROPERTY_TYPE_SYNONYMS = {
  "built up farmhouse": ["built up farmhouse", "builtup farmhouse", "farmhouse", "house", "home", "villa", "bungalow", "bunglow"],
  "gated farmhouse": ["gated farmhouse", "gated house", "gated villa"],
  "agricultural land": ["agricultural land", "agriculture land", "agri land", "land", "plot", "field", "acre", "hectare", "open land", "farm plot"],
  "farmland": ["farmland", "farm land", "farm plot", "farm", "field"]
};
const STATE_SYNONYMS = [
  "haryana", "delhi", "uttar pradesh", "rajasthan", "punjab", "madhya pradesh", "maharashtra", "gujarat"
];
const PROPERTY_TYPES = Object.values(PROPERTY_TYPE_SYNONYMS).flat();
// Add more city synonyms and variations
const CITIES = [
  "delhi", "new delhi", "gurgaon", "gurugram", "sohna", "noida", "greater noida", "alwar", "neemrana", "faridabad", "ghaziabad", "manesar", "palwal", "bhiwadi", "rewari"
];
const LOCATIONS = [
  "gurgaon", "sohna", "noida", "alwar", "neemrana", "faridabad", "ghaziabad", "manesar", "palwal", "bhiwadi", "rewari"
];
// (Removed duplicate LOCATIONS declaration)

function extractFiltersFromSentence(sentence, allCities = []) {
  // ...existing code...
  const lower = sentence.toLowerCase();
  // ...existing code...
  // Find canonical property type by matching any synonym
  let propertyType = "";
  for (const [canonical, synonyms] of Object.entries(PROPERTY_TYPE_SYNONYMS)) {
    if (synonyms.some(syn => lower.includes(syn))) {
      propertyType = canonical;
      break;
    }
  }
  // Use allCities from loaded data if provided, else fallback to static CITIES
  let city = "";
  if (allCities && allCities.length > 0) {
    city = allCities.find(c => lower.includes(c.toLowerCase()));
  } else {
    city = CITIES.find(city => lower.includes(city));
  }
  // State extraction (case-insensitive)
  const state = STATE_SYNONYMS.find(state => lower.includes(state.toLowerCase()));
  // Location extraction (case-insensitive)
  const locationName = LOCATIONS.find(loc => lower.includes(loc.toLowerCase()));
  // Extract price (e.g., "under 1 crore", "below 5000000", etc.)
  let minPrice = "";
  let maxPrice = "";
  // Support crore/lakh/number
  const priceMatch = lower.match(/(under|below|less than|upto|up to)\s*(\d+)(\s*crore|\s*lakh|\s*lac)?/);
  if (priceMatch) {
    let num = parseInt(priceMatch[2]);
    if (priceMatch[3]) {
      if (priceMatch[3].includes('crore')) num *= 10000000;
      if (priceMatch[3].includes('lakh') || priceMatch[3].includes('lac')) num *= 100000;
    }
    maxPrice = num.toString();
  }
  const minMatch = lower.match(/(above|over|more than|greater than)\s*(\d+)(\s*crore|\s*lakh|\s*lac)?/);
  if (minMatch) {
    let num = parseInt(minMatch[2]);
    if (minMatch[3]) {
      if (minMatch[3].includes('crore')) num *= 10000000;
      if (minMatch[3].includes('lakh') || minMatch[3].includes('lac')) num *= 100000;
    }
    minPrice = num.toString();
  }
  // Extract area (e.g., "2000 sqft", "area 5000")
  let area = "";
  const areaMatch = lower.match(/(\d+)\s*(sqft|sq ft|square feet|area|sq\.ft|sq. ft)/);
  if (areaMatch) {
    area = areaMatch[1];
  }
  const extracted = {
    propertyType: propertyType || "",
    city: city || "",
    state: state || "",
    locationName: locationName || "",
    minPrice,
    maxPrice,
    area
  };
  // ...existing code...
  return extracted;
}

const Properties = () => {
  const { properties, setProperties, loading, error } = useProperties();
  // Debug: log all property types and cities
  useEffect(() => {
  // ...existing code...
  }, [properties]);
  const location = useLocation();
  const [filter, setFilter] = useState({
    propertyType: '',
    locationName: '',
    city: '',
    state: '',
    minPrice: '',
    maxPrice: '',
    area: '',
    search: '',
  });

  // Read ?search= from URL and update filter.search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    if (search) {
      // Use all cities from loaded data for extraction
      const allCities = Array.from(new Set(properties.map(p => p.address && p.address.city ? p.address.city : '').filter(Boolean)));
  const extracted = extractFiltersFromSentence(search, allCities);
      setFilter(f => ({ ...f, search, ...extracted }));
    }
  }, [location.search, properties]);

  // Filter properties by all fields (exact match for all non-empty fields)
  // Helper to normalize propertyType using synonyms
  function normalizePropertyType(type) {
    if (!type) return '';
    const lower = type.toLowerCase();
    for (const [canonical, synonyms] of Object.entries(PROPERTY_TYPE_SYNONYMS)) {
      if (synonyms.some(syn => lower.includes(syn))) {
        return canonical;
      }
    }
    return lower;
  }

  let filtered = properties.filter((p) => {
    // If any smart filter is extracted, skip plain text search filtering
    const hasSmartFilter = filter.propertyType || filter.city || filter.state || filter.locationName || filter.minPrice || filter.maxPrice || filter.area;
    if (!hasSmartFilter && filter.search && filter.search.trim().length > 0) {
      const s = filter.search.trim().toLowerCase();
      // Check all relevant fields for a match
      const matches = [
        p.title,
        p.description,
        p.price,
        p.propertyType,
        p.locationName,
        p.address?.street,
        p.address?.city,
        p.address?.state,
        p.features?.area
      ].some(val => val && String(val).toLowerCase().includes(s));
      if (!matches) return false;
    }
    // Apply sidebar filters (OR logic for all extracted fields)
    const price = parseInt(p.price) || 0;
    const min = parseInt(filter.minPrice) || 0;
    const max = parseInt(filter.maxPrice) || 1e9;
    const area = parseInt(filter.area) || 0;
    const city = p.address && p.address.city ? p.address.city : '';
    const state = p.address && p.address.state ? p.address.state : '';
    const pArea = p.features && p.features.area ? p.features.area : 0;
    // Normalize propertyType for robust matching
    const normalizedPropertyType = normalizePropertyType(p.propertyType);
    const normalizedFilterType = normalizePropertyType(filter.propertyType);
    const propertyTypeMatch = filter.propertyType && normalizedPropertyType ? normalizedPropertyType === normalizedFilterType : false;
    const cityMatch = filter.city && city ? city.toLowerCase().includes(filter.city.toLowerCase()) : false;
    const stateMatch = filter.state && state ? state.toLowerCase().includes(filter.state.toLowerCase()) : false;
    const locationNameMatch = filter.locationName && p.locationName ? p.locationName.toLowerCase().includes(filter.locationName.toLowerCase()) : false;
    const minPriceMatch = filter.minPrice ? price >= min : false;
    const maxPriceMatch = filter.maxPrice ? price <= max : false;
    const areaMatch = filter.area ? pArea >= area : false;
    // Debug: log all comparisons for this property
  // ...existing code...
    // If no filters, show all
    if (!filter.propertyType && !filter.city && !filter.state && !filter.locationName && !filter.minPrice && !filter.maxPrice && !filter.area) {
      return true;
    }
    // OR logic: show property if any extracted field matches
    return (
      propertyTypeMatch ||
      cityMatch ||
      stateMatch ||
      locationNameMatch ||
      minPriceMatch ||
      maxPriceMatch ||
      areaMatch
    );
  });
  // Helper to safely render only strings/numbers
  const safe = (val) => {
    if (val == null) return '';
    if (typeof val === 'object') return '';
    return val;
  };
  return (
      <div>
        <div className="pt-20 pb-12 px-2 md:px-10 bg-[#f3e9db] min-h-screen">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">Available Properties</h1>
          {filter.search && (
            <div className="text-center text-xs text-gray-500 mb-2">
              Search: <b>{filter.search}</b>
            </div>
          )}
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
                  <option value="Built up farmhouse">Built up farmhouse</option>
                  <option value="Gated Farmhouse">Gated Farmhouse</option>
                  <option value="Agricultural land">Agricultural land</option>
                  <option value="Farmland">Farmland</option>
                </select>
                <select
                  className="px-3 py-2 rounded border border-gray-300 text-sm"
                  value={filter.locationName}
                  onChange={e => setFilter(f => ({ ...f, locationName: e.target.value }))}
                >
                  <option value="">Location</option>
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Sohna">Sohna</option>
                  <option value="Noida">Noida</option>
                  <option value="Alwar">Alwar</option>
                  <option value="Neemrana">Neemrana</option>
                  <option value="Faridabad">Faridabad</option>
                </select>
                <input
                  type="text"
                  placeholder="Search by keyword, phrase, or sentence"
                  className="px-3 py-2 rounded border border-gray-300 text-sm"
                  value={filter.search}
                  onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
                />
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
                {/* Bedrooms and Bathrooms removed as per new requirements */}
                <input
                  type="number"
                  placeholder="Min Area (sqft)"
                  className="px-3 py-2 rounded border border-gray-300 text-sm"
                  value={filter.area}
                  onChange={e => setFilter(f => ({ ...f, area: e.target.value }))}
                />
                {/* Furnished and Status removed as per new requirements */}
              </div>
            </aside>

            {/* Property Listing */}
            <main className="flex-1">
              {loading ? (
                <div className="text-center text-lg text-gray-500 py-20">Loading properties...</div>
              ) : error ? (
                <div className="text-center text-red-500 py-20">{error}</div>
              ) : filtered.length === 0 ? (
                <div className="text-center text-xs text-gray-500 py-20">No properties found.</div>
              ) : (
                <div>
                  {/* ...existing code... */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {filtered.map((p, idx) => {
                      // Defensive: always return a div, even if data is missing
                      if (!p) {
                        return <div key={idx} style={{color:'red'}}>DEBUG: Empty property object at index {idx}</div>;
                      }
                      const showDetails = p._showDetails || false;
                      // Use a fallback key if _id/id missing
                      const key = p._id || p.id || idx;
                      return (
                        <div
                          key={key}
                          className={
                            `bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col animate-fade-in`+
                            (showDetails ? ' ring-2 ring-green-400' : '')
                          }
                          style={{ animationDelay: `${idx * 80}ms` }}
                        >
                          <div>
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
                        </div>
                      );
                    })}
                    {/* If filtered has items but nothing renders, show debug */}
                    {/* ...existing code... */}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
};

export default Properties;

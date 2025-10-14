import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFeaturedProductById } from '../api/featuredProduct';
import { fetchPropertyById } from '../api/property';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const data = await fetchPropertyById(id);
        if (data && data._id) {
          setProperty(data);
          setError(null);
        } else {
          const featured = await fetchFeaturedProductById(id);
          setProperty(featured);
          setError(null);
        }
      } catch (err) {
        try {
          const featured = await fetchFeaturedProductById(id);
          setProperty(featured);
          setError(null);
        } catch (err2) {
          setError('Failed to fetch property details');
        }
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!property) return <div className="text-center mt-10">No property found.</div>;

  const imageUrl =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : property.imageUrl ||
        property.img ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] md:h-[650px]">
        <img
          src={imageUrl}
          alt={property.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content moved further down */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white px-6 pb-28 md:pb-36">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {property.title || 'Property Title'}
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            {property.locationName ||
              (property.address && property.address.city) ||
              'Location'}
          </p>

          {/* Smaller Info Box */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 bg-black/30 border border-yellow-500 rounded-lg px-6 py-3 md:px-10 md:py-4 backdrop-blur-sm">
            {/* Land Area */}
            <div className="flex flex-col items-center text-center px-3">
              <p className="text-xs md:text-sm uppercase text-gray-300 tracking-wide">
                Land Area
              </p>
              <h4 className="text-base md:text-lg font-semibold text-white">
                {property.features?.area
                  ? `${property.features.area} Acre`
                  : 'N/A'}
              </h4>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>

            {/* Possession */}
            <div className="flex flex-col items-center text-center px-3">
              <p className="text-xs md:text-sm uppercase text-gray-300 tracking-wide">
                Possession
              </p>
              <h4 className="text-base md:text-lg font-semibold text-white">
                {property.status || 'Ready-to-Move'}
              </h4>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>

            {/* About Project */}
            <div className="flex flex-col items-center text-center px-3">
              <p className="text-xs md:text-sm uppercase text-gray-300 tracking-wide">
                About Project
              </p>
              <h4 className="text-base md:text-lg font-semibold text-white">
                {property.units || 'N/A'} Unit
              </h4>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>

            {/* Price */}
            <div className="flex flex-col items-center text-center px-3">
              <p className="text-xs md:text-sm uppercase text-gray-300 tracking-wide">
                Price
              </p>
              <h4 className="text-base md:text-lg font-semibold text-white">
                ₹{property.pricePerSqft || property.price || 'N/A'} / sq. ft.
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Property Gallery Section */}
      {Array.isArray(property.images) && property.images.length > 1 && (
        <div className="max-w-6xl mx-auto mt-12 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Property Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {property.images.slice(1).map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md hover:scale-105 transform transition duration-300"
              >
                <img
                  src={img}
                  alt={`Property view ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description Section */}
      <div className="max-w-5xl mx-auto p-6 mt-12 text-gray-800">
        <h2 className="text-2xl font-semibold mb-4">About this Property</h2>
        <p className="text-gray-600 mb-4">
          {property.description || 'No description available.'}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Address:</span>{' '}
          {property.locationName ||
            (property.address && property.address.city) ||
            'N/A'}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
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
        // Try to fetch as a normal property first using the correct API
        const data = await fetchPropertyById(id);
        if (data && data._id) {
          setProperty(data);
          setError(null);
        } else {
          // If not found, try as featured property
          const featured = await fetchFeaturedProductById(id);
          setProperty(featured);
          setError(null);
        }
      } catch (err) {
        // Try as featured property if not found as normal property
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-green-900">{property.title}</h2>
      <div className="mb-4">
        <img src={Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : (property.imageUrl || property.img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c')} alt={property.title} className="w-full h-80 object-cover rounded" />
      </div>
      <div className="mb-2 text-gray-700">{property.description}</div>
      <div className="mb-2 text-gray-700">Location: {property.locationName || (property.address && property.address.city) || ''}</div>
      <div className="mb-2 text-gray-700">Price: Rs. {property.price}</div>
      <div className="mb-2 text-gray-700">Area: {property.features && property.features.area ? property.features.area + ' sqft' : 'N/A'}</div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default PropertyDetails;

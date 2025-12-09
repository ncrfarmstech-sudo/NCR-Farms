import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFeaturedProductById } from '../api/featuredProduct';
import { FaArrowLeft, FaCheckCircle, FaTree, FaHome, FaStar, FaMapMarkerAlt, FaShieldAlt, FaLeaf, FaHeart, FaAward, FaCrown } from 'react-icons/fa';
import '../blog.css';

const FeaturedProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="pt-20 text-center text-gray-600">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="pt-20 text-center text-red-600">{error || 'Product not found'}</div>;
  }

  const imageUrl =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[currentImageIndex]
      : product.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c';

  return (
    <div className="min-h-screen bg-white">
      {/* ------------------- HERO SECTION ------------------- */}
      <div className="relative w-full h-[500px] md:h-[650px]">
        <img
          src={imageUrl}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white px-6 pb-28 md:pb-36">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {product.title || 'Featured Product'}
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            {product.locationName || (product.address && product.address.city) || 'Location'}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 bg-black/30 border border-yellow-500 rounded-lg px-6 py-3 md:px-10 md:py-4 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase text-gray-300">Location</p>
              <h4 className="text-lg font-semibold">
                {product.locationName || product.address?.city || 'N/A'}
              </h4>
            </div>
            <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase text-gray-300">Size</p>
              <h4 className="text-lg font-semibold">
                {product.features?.area || 'N/A'} Acre
              </h4>
            </div>
            <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase text-gray-300">Price</p>
              <h4 className="text-lg font-semibold">
                ₹{product.price || product.pricePerSqft || 'N/A'}
              </h4>
            </div>
            <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase text-gray-300">Property Type</p>
              <h4 className="text-lg font-semibold">
                {product.type || product.propertyType || 'N/A'}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------- Main Content Section ------------------- */}
      <div className="bg-[#f5efe6] py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* ============= BLOCK 1: DETAILED SECTION ============= */}
          {product.block1?.heading || product.block1?.description || (product.block1?.images && product.block1.images.length > 0) ? (
            <div className="bg-[#e9dfce] px-8 py-6 rounded-xl shadow-md mb-8 border-2 border-yellow-400">
              {/* BLOCK 1 HEADING */}
              <h2 className="text-2xl font-bold text-[#2d5d4f] mb-4 text-center">
                {product.block1?.heading || "PRODUCT HIGHLIGHTS"}
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 py-4">
                {/* LEFT SIDE: BLOCK 1 TEXT CONTENT */}
                <div className="flex-1">
                  {product.block1?.description ? (
                    <div className="blog-content text-gray-700" dangerouslySetInnerHTML={{ __html: product.block1.description }} />
                  ) : (
                    <ul className="text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
                      <li>Premium quality construction</li>
                      <li>Strategic location advantage</li>
                      <li>Modern amenities</li>
                      <li>Investment growth potential</li>
                      <li>Professional management</li>
                    </ul>
                  )}
                </div>

                {/* RIGHT SIDE: BLOCK 1 IMAGES */}
                {product.block1?.images && product.block1.images.length > 0 && (
                  <div className="flex-1 flex justify-center gap-3">
                    {product.block1.images.slice(0, 2).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Block 1 Image ${idx + 1}`}
                        className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* ============= BLOCK 2: DETAILED SECTION ============= */}
          {product.block2?.heading || product.block2?.description || (product.block2?.images && product.block2.images.length > 0) ? (
            <div className="bg-[#e9dfce] px-8 py-6 rounded-xl shadow-md mb-8 border-2 border-green-500">
              {/* BLOCK 2 HEADING */}
              <h2 className="text-2xl font-bold text-[#2d5d4f] mb-4 text-center">
                {product.block2?.heading || "BLOCK 2"}
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 py-4">
                {/* LEFT SIDE: BLOCK 2 TEXT CONTENT */}
                <div className="flex-1">
                  {product.block2?.description ? (
                    <div className="blog-content text-gray-700" dangerouslySetInnerHTML={{ __html: product.block2.description }} />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">No description available</p>
                  )}
                </div>

                {/* RIGHT SIDE: BLOCK 2 IMAGES */}
                {product.block2?.images && product.block2.images.length > 0 && (
                  <div className="flex-1 flex justify-center gap-3">
                    {product.block2.images.slice(0, 2).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Block 2 Image ${idx + 1}`}
                        className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* ============= BLOCK 3: DETAILED SECTION ============= */}
          {product.block3?.heading || product.block3?.description || (product.block3?.images && product.block3.images.length > 0) ? (
            <div className="bg-[#e9dfce] px-8 py-6 rounded-xl shadow-md mb-8 border-2 border-blue-500">
              {/* BLOCK 3 HEADING */}
              <h2 className="text-2xl font-bold text-[#2d5d4f] mb-4 text-center">
                {product.block3?.heading || "BLOCK 3"}
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 py-4">
                {/* LEFT SIDE: BLOCK 3 TEXT CONTENT */}
                <div className="flex-1">
                  {product.block3?.description ? (
                    <div className="blog-content text-gray-700" dangerouslySetInnerHTML={{ __html: product.block3.description }} />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">No description available</p>
                  )}
                </div>

                {/* RIGHT SIDE: BLOCK 3 IMAGES */}
                {product.block3?.images && product.block3.images.length > 0 && (
                  <div className="flex-1 flex justify-center gap-3">
                    {product.block3.images.slice(0, 2).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Block 3 Image ${idx + 1}`}
                        className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Why Choose Section - Dynamic from Backend */}
          {product.highlights && (product.highlights.heading || (product.highlights.items && product.highlights.items.length > 0)) ? (
            <div className="bg-[#2d5d4f] text-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {product.highlights.heading || 'WHY CHOOSE THIS PROPERTY'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
                {product.highlights.items && product.highlights.items.slice(0, 3).map((item, idx) => {
                  const iconMap = {
                    FaCheckCircle,
                    FaTree,
                    FaHome,
                    FaStar,
                    FaMapMarkerAlt,
                    FaShieldAlt,
                    FaLeaf,
                    FaHeart,
                    FaAward,
                    FaCrown,
                  };
                  const IconComponent = iconMap[item.icon] || FaCheckCircle;
                  
                  return (
                    <div key={idx} className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
                      <IconComponent className="text-4xl text-yellow-400" />
                      <p>{item.text || 'Highlight text'}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-[#2d5d4f] text-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Why Choose {product.title || "This Property"}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
                <div className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
                  <FaCheckCircle className="text-4xl text-yellow-400" />
                  <p>Premium quality construction</p>
                </div>
                <div className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
                  <FaTree className="text-4xl text-yellow-400" />
                  <p>Strategic location advantage</p>
                </div>
                <div className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
                  <FaHome className="text-4xl text-yellow-400" />
                  <p>High investment growth potential</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ------------------- Product Gallery Section ------------------- */}
      {Array.isArray(product.images) && product.images.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16 px-6">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <p className="text-green-700 uppercase tracking-widest font-semibold">Gallery</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Product Images</h2>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {product.images.map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-md hover:scale-105 transform transition duration-300 cursor-pointer"
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Address Section 
          {product.address && (
            <div className="bg-[#2F5D50] mt-12 rounded-t-3xl text-white p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Location Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.address.street && (
                  <div>
                    <p className="text-yellow-400 font-semibold">Street</p>
                    <p className="text-gray-100">{product.address.street}</p>
                  </div>
                )}
                {product.address.city && (
                  <div>
                    <p className="text-yellow-400 font-semibold">City</p>
                    <p className="text-gray-100">{product.address.city}</p>
                  </div>
                )}
                {product.address.state && (
                  <div>
                    <p className="text-yellow-400 font-semibold">State</p>
                    <p className="text-gray-100">{product.address.state}</p>
                  </div>
                )}
                {product.address.pincode && (
                  <div>
                    <p className="text-yellow-400 font-semibold">Pincode</p>
                    <p className="text-gray-100">{product.address.pincode}</p>
                  </div>
                )}
              </div>
            </div>
          )}*/}
        </div>
      )}

      {/* ------------------- Back Button & Description ------------------- */}
      <div className="max-w-7xl mx-auto mt-16 px-6 pb-16">
        {product.description && (
          <div className="mb-8 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );
};

export default FeaturedProductDetails;

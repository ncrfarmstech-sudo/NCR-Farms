import React from 'react';
import { FaShieldAlt, FaClock, FaTags, FaHeart } from 'react-icons/fa';

const WhychooseNcr = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2D5D4F]">
        Why Choose NCR Farms?
      </h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
        We’re committed to providing you with the best farmhouse rental and buying
        experience in Delhi NCR.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {/* Card 1 */}
        <div className="bg-[#F8F4EC] p-8 rounded-lg shadow text-center">
          <FaShieldAlt className="mx-auto text-3xl text-[#2D5D4F] mb-3" />
          <h3 className="font-semibold text-[#2D5D4F]">
            Verified Properties
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            All our farmhouses are personally inspected and verified for quality
            and safety.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F8F4EC] p-8 rounded-lg shadow text-center">
          <FaClock className="mx-auto text-3xl text-[#2D5D4F] mb-3" />
          <h3 className="font-semibold text-[#2D5D4F]">24/7 Support</h3>
          <p className="text-sm text-gray-600 mt-2">
            Round-the-clock customer support to assist you before, during, and after
            your stay.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F8F4EC] p-8 rounded-lg shadow text-center">
          <FaTags className="mx-auto text-3xl text-[#2D5D4F] mb-3" />
          <h3 className="font-semibold text-[#2D5D4F]">
            Best Price Guarantee
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            We guarantee the best prices for farmhouse rentals across Delhi NCR.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#F8F4EC] p-8 rounded-lg shadow text-center">
          <FaHeart className="mx-auto text-3xl text-[#2D5D4F] mb-3" />
          <h3 className="font-semibold text-[#2D5D4F]">
            Memorable Experiences
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Create unforgettable memories with your loved ones in our curated
            properties.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhychooseNcr;
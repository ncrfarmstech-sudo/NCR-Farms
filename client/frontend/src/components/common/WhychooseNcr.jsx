import React from "react";
import { FaShieldAlt, FaClock, FaTags, FaHeart } from "react-icons/fa";

const WhychooseNcr = () => {
  return (
    <section className="bg-[#EDE0D4] py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-[#2D5D4F] mb-3">
          Why Choose NCR Farms?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We’re committed to providing you with the best farmhouse rental and buying
          experience in Delhi NCR.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {/* Card 1 */}
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaShieldAlt className="mx-auto text-2xl md:text-3xl text-[#2D5D4F] mb-2 md:mb-4" />
            <h3 className="font-semibold text-[#2D5D4F] mb-1 md:mb-2 text-sm md:text-base">
              Verified Properties
            </h3>
            <p className="text-[10px] md:text-sm text-gray-600">
              All our farmhouses are personally inspected and verified for quality and safety.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaClock className="mx-auto text-2xl md:text-3xl text-[#2D5D4F] mb-2 md:mb-4" />
            <h3 className="font-semibold text-[#2D5D4F] mb-1 md:mb-2 text-sm md:text-base">
              24/7 Support
            </h3>
            <p className="text-[10px] md:text-sm text-gray-600">
              Round-the-clock customer support to assist you before, during, and after your stay.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaTags className="mx-auto text-2xl md:text-3xl text-[#2D5D4F] mb-2 md:mb-4" />
            <h3 className="font-semibold text-[#2D5D4F] mb-1 md:mb-2 text-sm md:text-base">
              Best Price Guarantee
            </h3>
            <p className="text-[10px] md:text-sm text-gray-600">
              We guarantee the best prices for farmhouse rentals across Delhi NCR.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaHeart className="mx-auto text-2xl md:text-3xl text-[#2D5D4F] mb-2 md:mb-4" />
            <h3 className="font-semibold text-[#2D5D4F] mb-1 md:mb-2 text-sm md:text-base">
              Memorable Experiences
            </h3>
            <p className="text-[10px] md:text-sm text-gray-600">
              Create unforgettable memories with your loved ones in our curated properties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhychooseNcr;

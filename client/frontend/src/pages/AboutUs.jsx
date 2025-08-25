import React from "react";
import aboutus from "../assets/aboutus.png"; // Ensure you have an appropriate image in the assets folder

const AboutUs = () => {
  return (
    <div className="w-full">
      {/* Top Section with Responsive Background Image */}
      <div className="relative h-[220px] sm:h-[280px] md:h-[400px] w-full">
        <img
          src={aboutus}
          alt="Farmland"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center px-2 sm:px-4">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            NCR Farms: Your Trusted Farmland Consultants
          </h1>
          <p className="mt-2 text-gray-200 max-w-xs sm:max-w-md md:max-w-2xl text-xs sm:text-sm md:text-base">
            Premier partners in farmland consultancy, dedicated to helping individuals and families
            realize their dream of owning land.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white px-3 xs:px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-12 text-center">
        <p className="max-w-md sm:max-w-2xl md:max-w-4xl mx-auto text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          NCR Farms is your premier partner in farmland consultancy, dedicated to helping
          individuals and families realize their dream of owning land. Founded on the principles of
          sustainability, accessibility, and a deep connection to nature, we are a team of
          experienced consultants, legal experts, and agricultural specialists committed to making
          land ownership straightforward and fulfilling.
          <br />
          <br />
          Whether you’re seeking a full-time residence in a serene farmhouse setting or a weekend
          getaway, we bridge the gap between urban life and rural bliss.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

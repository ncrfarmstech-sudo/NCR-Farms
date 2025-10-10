import React from "react";
import heroImg from "../../assets/Home/Banner.png";
import heroImgDesktop from "../../assets/Home/Banner-desktop.png";
import statsImg from "../../assets/Home/Banner2.png";
import statsImgDesktop from "../../assets/Home/Banner2-desktop.png";
import FeaturedProducts from "./FeaturedProducts";
import WhychooseNcr from "../common/WhychooseNcr";
import "../../index.css"; // make sure global CSS is imported

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        {/* Mobile Banner */}
        <img
          src={heroImg}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 block md:hidden animate-zoom"
        />
        {/* Desktop Banner */}
        <img
          src={heroImgDesktop}
          alt="Banner Desktop"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 hidden md:block animate-zoom"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Centered Content */}
        <div className="relative z-20 text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Easy Way to Own Managed Farmland and Enjoy Growth
          </h1>
          <button className="px-8 py-3 border border-yellow-400 text-yellow-400 text-sm md:text-base font-medium rounded-md hover:bg-white hover:text-green-900 transition-all duration-300">
            FIND YOUR DREAM FARM PLOT
          </button>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-5 py-8 text-center bg-[#f9f5ef]">
        <h3 className="text-2xl font-bold text-gray-900">
          LEAVE CITY NOISE & FIND PEACE
        </h3>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Live Close To Nature With The Best Managed Farmland Company In Delhi NCR
        </p>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          We help you reconnect with nature and enjoy a calm, happy life. With our managed farmlands, 
          where you can build your dream farmhouse, we monitor and design your farm area for fully documented titles, 
          eco-friendly living, and a 100% clear title.
        </p>
        <p className="mt-4 text-green-700 font-bold text-xl">
          Welcome to NCR Farms
        </p>
      </section>

     
   {/* Stats Section */}
<section className="relative text-white text-center px-6 py-32 md:py-64 overflow-hidden min-h-[60vh] md:min-h-[80vh] lg:min-h-[100vh]">
  {/* Mobile background */}
  <img
    src={statsImg}
    alt="Stats Banner"
    className="absolute inset-0 w-full h-full object-cover object-center z-0 block md:hidden"
  />

  {/* Desktop background */}
  <img
    src={statsImgDesktop}
    alt="Stats Banner Desktop"
    className="absolute inset-0 w-full h-full object-cover object-center z-0 hidden md:block"
  />

  {/* Overlay for darker text contrast */}
  <div className="absolute inset-0 bg-black/40 z-0"></div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto">
    <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight">
      Find Your Perfect Farmhouse <br /> in <span className="text-gray-200">Delhi NCR</span>
    </h2>

    <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
      Escape in luxury farmhouses surrounded by nature’s beauty. Perfect for weekend getaways,
      family gatherings, and unforgettable celebrations across Gurgaon, Noida, Faridabad, and Greater Noida.
    </p>

    {/* Stats Cards — Always 3 columns */}
    <div className="grid grid-cols-3 gap-3 md:gap-6 mt-12 justify-center items-stretch max-w-3xl mx-auto">
      {/* Box 1 */}
      <div className="bg-white/10 border border-white/30 rounded-2xl py-4 md:py-6 px-2 md:px-4 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">500+</h3>
        <p className="mt-1 md:mt-2 text-gray-100 text-xs sm:text-sm md:text-base">Verified Properties</p>
      </div>

      {/* Box 2 */}
      <div className="bg-white/10 border border-white/30 rounded-2xl py-4 md:py-6 px-2 md:px-4 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">50k+</h3>
        <p className="mt-1 md:mt-2 text-gray-100 text-xs sm:text-sm md:text-base">Happy Customers</p>
      </div>

      {/* Box 3 */}
      <div className="bg-white/10 border border-white/30 rounded-2xl py-4 md:py-6 px-2 md:px-4 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">4.8★</h3>
        <p className="mt-1 md:mt-2 text-gray-100 text-xs sm:text-sm md:text-base">Average Rating</p>
      </div>
    </div>
  </div> {/* ✅ This closing div was missing */}
</section>




      {/* Why Choose NCR Farms */}
      <WhychooseNcr />

      {/* Featured Properties */}
      <FeaturedProducts />
    </div>
  );
};

export default Home;

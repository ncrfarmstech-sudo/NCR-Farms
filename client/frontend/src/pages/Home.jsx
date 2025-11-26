import React from "react";
import heroImg from "../assets/Home/Banner.png";
import heroImgDesktop from "../assets/Home/Banner-desktop.png";
import statsImg from "../assets/Home/Banner2.png";
import statsImgDesktop from "../assets/Home/Banner2-desktop.png";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import WhychooseNcr from "../components/common/WhychooseNcr";
import "../index.css";

// ✅ Correct name here
import WhatsappAndCallsButton from "../components/common/WhatsappAndCallsButton";

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
            Rooted in Nature, Driven by Trust<br />
          </h1>
          <button className="px-8 py-3 border border-yellow-400 text-yellow-400 text-sm md:text-base font-medium rounded-md hover:bg-white hover:text-green-900 transition-all duration-300">
            FIND YOUR DREAM FARM PLOT
          </button>
        </div>

        
        
      </section>

      {/* Intro Section */}
<section className="px-5 py-10 text-center bg-[#f9f5ef]">
  <div className="max-w-6xl mx-auto">
   <h3 className="text-2xl font-bold text-gray-900">
  Welcome to <span className="text-green-700">NCR Farms</span>
</h3>

    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
      At NCR Farms, we believe land is more than property — it’s peace, purpose, and prosperity.
      Our mission is to help you own your perfect farmland, farmhouse, or weekend home near Delhi NCR,
      Gurgaon, Sohna, or Noida, where comfort meets countryside.
    </p>

    <p className="mt-5 text-sm md:text-base text-gray-700 leading-relaxed">
      With years of expertise in real estate and agricultural land investment,
      NCR Farms connects people to green spaces that grow in both value and vitality.
    </p>

    <p className="mt-5 text-sm md:text-base text-gray-800 leading-relaxed font-medium">
      Our vision: To make farmland ownership simple, secure, and sustainable. 
      <br />
      Our promise: Verified properties, transparent deals, and lifelong support.
    </p>
  </div>
</section>


      {/* Stats Section */}
      <section className="relative text-white text-center px-6 py-32 md:py-64 overflow-hidden min-h-[60vh] md:min-h-[80vh] lg:min-h-[100vh]">
        <img
          src={statsImg}
          alt="Stats Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 block md:hidden"
        />
        <img
          src={statsImgDesktop}
          alt="Stats Banner Desktop"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 hidden md:block"
        />
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight">
            Our Services -  <br /> in{" "}
            <span className="text-gray-200">Complete Support from Selection to Ownership</span>
          </h2>
         

          <div className="grid grid-cols-3 gap-3 md:gap-6 mt-12 justify-center items-stretch max-w-5xl mx-auto">
            <div className="bg-white/10 border border-white/30 rounded-2xl py-4 md:py-6 px-2 md:px-4 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-2xl sm:text-2xl md:text-2xl font-bold text-yellow-400">Property Consultation</h3>
              <p className="mt-1 md:mt-2 text-gray-100 text-xs sm:text-sm md:text-base">Our experts help you find the right property that fits your budget, location, and lifestyle.</p>
            </div>
            <div className="bg-white/10 border border-white/30 rounded-2xl py-4 md:py-6 px-2 md:px-4 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-2xl sm:text-2xl md:text-2xl font-bold text-yellow-400">Legal Assistance</h3>
              <p className="mt-1 md:mt-2 text-gray-100 text-xs sm:text-sm md:text-base">Every project we list is title clear, verified, and RERA-compliant, ensuring your investment is 100% secure</p>
            </div>
            <div className="bg-white/10 border border-white/30 rounded-2xl py-4 md:py-6 px-2 md:px-4 backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-2xl sm:text-2xl md:text-2xl font-bold text-yellow-400">Architecture & Development</h3>
              <p className="mt-1 md:mt-2 text-gray-100 text-xs sm:text-sm md:text-base">From design to delivery, we assist you in building your dream farmhouse or eco-retreat with trusted professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose NCR Farms */}
      <WhychooseNcr />

      {/* Featured Properties */}
      <FeaturedProducts />
    </div>
  );
};

export default Home;
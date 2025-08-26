import React from "react";
import heroImg from "../../assets/Home/Banner.png";
import heroImgDesktop from "../../assets/Home/Banner-desktop.png";
import statsImg from "../../assets/Home/Banner2.png";
import statsImgDesktop from "../../assets/Home/Banner2-desktop.png";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
                {/* Mobile Banner */}
                <img
                    src={heroImg}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0 block md:hidden"
                />
                {/* Desktop Banner */}
                <img
                    src={heroImgDesktop}
                    alt="Banner Desktop"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0 hidden md:block"
                />
                {/* Optional: Overlay for darkening or color effect */}
                {/* <div className="absolute inset-0 bg-black/30 z-10" /> */}
                {/* Hero content can go here, z-20 */}
            </section>

            {/* Intro Section */}
            <section className="px-5 py-8 text-center bg-[#f9f5ef]">
                <h3 className="text-2xl font-bold text-gray-900">
                    LEAVE CITY NOISE & FIND PEACE
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Live Close To Nature With The Best Managed Farmland Company
                    In Delhi NCR
                </p>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          We help you reconnect with nature and enjoy a calm, happy
          life. With our managed farmlands, where you can build your
          dream farmhouse, we monitor and design your farm area for
          fully documented titles, eco-friendly living, and a 100% clear title.
        </p>
                <p className="mt-4  text-green-700 font-bold text-xl">
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
                <div className="relative z-10">
                    <div className="grid grid-cols-3 gap-4 mt-10 text-base md:text-lg font-semibold"></div>
                </div>
            </section>

            {/* Why Choose NCR Farms */}
<section className="px-6 py-16 bg-[#f3e9db] text-center">
  <div className="flex justify-center mb-2">
   
  </div>
  <h2 className="text-3xl font-bold text-gray-800 mb-4">
    Why Choose NCR Farms?
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto mb-10">
    We're committed to providing you with the best farmhouse rental and buying experience in Delhi NCR.
  </p>

  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center max-w-6xl mx-auto">
    {[
      {
        icon: "fa-shield-alt",
        title: "Verified Properties",
        desc: "All our farmhouses are personally inspected and verified for quality and safety.",
      },
      {
        icon: "fa-clock",
        title: "24/7 Support",
        desc: "Round-the-clock customer support to assist you before, during, and after your stay.",
      },
      {
        icon: "fa-tag",
        title: "Best Price Guarantee",
        desc: "We guarantee the best prices for farmhouse rentals across Delhi NCR.",
      },
      {
        icon: "fa-heart",
        title: "Memorable Experiences",
        desc: "Create unforgettable memories with your loved ones in our curated properties.",
      },
    ].map((card, idx) => (
      <div key={card.title} className="bg-white w-40 h-40 md:w-64 md:h-64 p-4 md:p-8 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center justify-between overflow-hidden">
        <div className="text-green-700 text-4xl mb-4">
          <i className={`fas ${card.icon}`}></i>
        </div>
        <h4 className="font-semibold text-sm md:text-base lg:text-lg mb-1 md:mb-2 text-green-800 leading-tight text-center">
          {card.title}
        </h4>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base text-center leading-tight md:leading-snug lg:leading-normal">
          {typeof card.desc === 'object' ? JSON.stringify(card.desc) : card.desc}
        </p>
      </div>
    ))}
  </div>
</section>


            {/* Featured Properties */}
            <FeaturedProducts />
        </div>
    );
};

export default Home;

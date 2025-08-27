import React from "react";
import heroImg from "../../assets/Home/Banner.png";
import heroImgDesktop from "../../assets/Home/Banner-desktop.png";
import statsImg from "../../assets/Home/Banner2.png";
import statsImgDesktop from "../../assets/Home/Banner2-desktop.png";
import FeaturedProducts from "./FeaturedProducts";
import WhychooseNcr from "../common/WhychooseNcr";

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
            <WhychooseNcr />


            {/* Featured Properties */}
            <FeaturedProducts />
        </div>
    );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/Home/Banner.png";
import heroImgDesktop from "../assets/Home/Banner-desktop.png";
import statsImg from "../assets/Home/Banner2.png";
import statsImgDesktop from "../assets/Home/Banner2-desktop.png";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import WhychooseNcr from "../components/common/WhychooseNcr";
import Faq from "../components/common/Faq";
import "../index.css";

// ✅ Correct name here
import WhatsappAndCallsButton from "../components/common/WhatsappAndCallsButton";
import FAQ from "../components/common/Faq";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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
                <div className="relative z-20 text-center text-white px-6">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5 cormorant">
                        Own Land. Grow Wealth. Live Better
                    </h1>

                    <p className="text-md md:text-lg text-[#F8F4EC] max-w-2xl mx-auto mb-14 leading-relaxed lato">
                        Buy high potential farmhouse plots, agricultural land
                        and built-up farmhouses – with complete transparency and
                        end-to-end support.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => navigate("/properties")}
                            className="px-12 py-3 border border-yellow-400  bg-yellow-400  text-green-900  text-sm md:text-base font-medium rounded-md transition-all duration-300  lato hover:bg-white/10 hover:backdrop-blur-md hover:text-white hover:border-white"
                        >
                            EXPLORE PROPERTIES
                        </button>

                        <button 
                            onClick={() => navigate("/contactus")}
                            className="px-4 py-3 border border-yellow-400  text-yellow-400 text-sm md:text-base  font-medium rounded-md transition-all duration-300 lato hover:bg-white/10hover:backdrop-blur-md hover:text-white hover:border-white"
                        >
                            BOOK A FREE CONSULTATION
                        </button>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="px-5 py-10 text-center bg-[#F2ECE3]">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 lato mb-4">
                        Welcome to{" "}
                        <span className="text-green-700 lato">NCR Farms</span>
                    </h3>

                    <p className="text-sm md:text-base text-gray-700 leading-relaxed lato">
                        At NCR Farms, we help you buy agricultural land,
                        farmhouse plots, and ready farmhouses across Delhi NCR
                        with clear titles, transparent pricing, and end-to-end
                        support. Whether you want a farmhouse near Gurgaon, or
                        an agricultural land, our team ensures every property is
                        legally vetted and value-driven. With a customer centric
                        approach, NCR Farms has become a trusted farmland
                        consulting company in the NCR region.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative text-white text-center px-6 py-16 md:py-24 overflow-hidden">
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

                <div className="relative z-10 max-w-6xl mx-auto ">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight cormorant text-[#F8F4EC]">
                        What We Offer
                    </h2>
                    {/*sub heading */}
                    <p className="text-lg md:text-xl text-[#F8F4EC] font-semibold cormorant">
                        Farmland, farmland plots, built-up farmhouses, and
                        agricultural investment opportunities across Delhi NCR-
                        vetted and ready for ownership
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-6 mt-12 justify-center items-stretch max-w-9xl mx-auto ">
                        <div
                            className="bg-white/10 border border-white/30 rounded-2xl py-5 px-6 backdrop-blur-md shadow-lg 
                  w-full max-w-[420px] mx-auto flex flex-col items-start justify-start h-full"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-yellow-400 text-left w-full whitespace-nowrap">
                                Farmland for Sale
                            </h3>
                            <p className="mt-1 text-[#F8F4EC] text-xs sm:text-sm md:text-sm text-left leading-snug lato">
                                Investment-ready farmland parcels in
                                appreciation corridors – ideal for farming or
                                long-term hold.
                            </p>
                        </div>

                        <div
                            className="bg-white/10 border border-white/30 rounded-2xl py-5 px-6 backdrop-blur-md shadow-lg 
                  w-full max-w-[420px] mx-auto flex flex-col items-start justify-start h-full"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-yellow-400 text-left w-full whitespace-nowrap">
                                Farmhouse Plots
                            </h3>
                            <p className="mt-1 text-[#F8F4EC] text-xs sm:text-sm md:text-sm text-left leading-snug">
                                Fully demarcated plots to build your weekend
                                home or rent out for premium stays.
                            </p>
                        </div>

                        <div
                            className="bg-white/10 border border-white/30 rounded-2xl py-5 px-6 backdrop-blur-md shadow-lg 
                  w-full max-w-[420px] mx-auto flex flex-col items-start justify-start h-full"
                        >
                            <h3 className="text-lg md:text-xl font-bold text-yellow-400 text-left w-full whitespace-nowrap">
                                Built-Up Farmhouses & Investments
                            </h3>
                            <p className="mt-1 text-[#F8F4EC] text-xs sm:text-sm md:text-sm text-left leading-snug">
                                Move-in ready farmhouses and structured
                                agricultural investments for high-net-worth
                                buyers.
                            </p>
                        </div>
                    </div>

                    <h2 className="text-base md:text-lg font-semibold mt-12 leading-none cormorant text-[#F8F4EC] text-center">
                        At NCR Farms, we simplify every step of your property journey.
                    </h2>
                </div>
            </section>

            {/* Why Choose NCR Farms */}
            <WhychooseNcr />

            {/* Featured Properties */}
            <FeaturedProducts />

            {/* How It Works - Simple 3 Steps */}
            <section className="bg-[#F7EEDD] py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-16">
                        How It Works - Simple 3 Steps
                    </h2>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
                        {/* Step 1 */}
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                            <span className="text-4xl font-bold text-[#3D7F6C]">
                                1
                            </span>
                            <h3 className="text-lg md:text-xl font-semibold mt-3 text-[#2D5D4F]">
                                Schedule a Consultation
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base mt-2 leading-relaxed max-w-xs">
                                Tell us your goals and budget, we recommend the
                                best options.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                            <span className="text-4xl font-bold text-[#3D7F6C]">
                                2
                            </span>
                            <h3 className="text-lg md:text-xl font-semibold mt-3 text-[#2D5D4F]">
                                Site Visit & Due Diligence
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base mt-2 leading-relaxed max-w-xs">
                                We show only legally clean properties and
                                accompany you to visits.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                            <span className="text-4xl font-bold text-[#3D7F6C]">
                                3
                            </span>
                            <h3 className="text-lg md:text-xl font-semibold mt-3 text-[#2D5D4F]">
                                Hassle-Free Ownership
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base mt-2 leading-relaxed max-w-xs">
                                We handle documentation, registration, and
                                post-purchase support.
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-12">
                        <button
                            onClick={() => navigate("/contactus")}
                            className="bg-[#3D7F6C] text-white px-10 py-3 rounded-md font-medium hover:bg-green-800 transition"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#3D7F6C]">
                        Frequently Asked Questions
                    </h2>

                    <Faq />
                </div>
            </section>
        </div>
    );
};

export default Home;

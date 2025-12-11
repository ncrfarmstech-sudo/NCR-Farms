import React from "react";
import aboutus from "../assets/aboutus.png";
import forestBg from "../assets/aboutvision.png"; // Import the forest background image

const AboutUs = () => {
    return (
        <div className="w-full p overflow-x-hidden">

            {/* Hero Section */}
            <div className="relative h-[270px] sm:h-[380px] md:h-[400px] w-full">
                <img
                    src={aboutus}
                    alt="Farmland"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                        NCR Farms: Your Trusted Farmland Consultants
                    </h1>
                    <p className="mt-2 text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg">
                        Premier partners in farmland consultancy, dedicated to
                        helping individuals and families realize their dream of
                        owning land.
                    </p>
                </div>
            </div>

            {/* Who We Are */}
            <div className="bg-[#f3e9db] py-8 px-4">
                <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6 text-justify">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3C33] mb-4 text-center">
                        Who We Are
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-8">
                        NCR Farms is your premier partner in farmland
                        consultancy, dedicated to helping individuals and
                        families realize their dream of owning land.
                        <br />
                        Founded on the principles of sustainability,
                        accessibility, and a deep connection to nature, we are a
                        team of experienced consultants, legal experts, and
                        agricultural specialists committed to making land
                        ownership straightforward and fulfilling.
                        <br />
                        Whether you’re seeking a full-time residence in a serene
                        farmhouse setting or a weekend getaway, we bridge the
                        gap between urban life and rural bliss.
                    </p>
                </div>
            </div>

            {/* What We Do */}
            <div className="bg-white py-12 px-4 text-center">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3C33] mb-4">
                    What We Do
                </h2>

                <p className="mx-auto text-gray-600 text-sm sm:text-base mb-8 max-w-xl">
                    We serve as a comprehensive one-stop solution for all your
                    farmland needs, guiding you from initial consultation to
                    long-term management.
                </p>

                {/* Core Offerings */}
                <div className="max-w-5xl mx-auto mt-10">
                    <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#1D3C33] mb-8">
                        Our core offerings include
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                            <h3 className="font-semibold text-[#1D3C33] mb-2">
                                Property Recommendation and Acquisition:
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                We assess your requirements and suggest suitable
                                options, such as agricultural land, individual
                                farmhouse plots, or properties in managed
                                farmhouse communities.
                            </p>
                        </div>

                        <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Legal and Administrative Support:
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Full assistance with property transfer,
                                mutation, and all regulatory processes to ensure
                                a seamless transaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Specialized Services */}
            <div className="bg-white py-12 px-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#1D3C33] mb-8">
                    Specialized Services
                </h2>

                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            CLU Assistance:
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                            We navigate the Change of Land Use (CLU) process
                            efficiently, helping you convert land without hassle.
                        </p>
                    </div>

                    <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            Prefabricated Farmhouse Setup:
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                            Quick, customizable, and eco-friendly prefabricated
                            structures for fast farmhouse development.
                        </p>
                    </div>

                    <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            ROI Optimization:
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                            Strategies to generate returns from your land,
                            including hydroponics or organic farms.
                        </p>
                    </div>

                    <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                        <h3 className="font-semibold text-gray-800 mb-2">
                            Solar Power Solutions:
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                            Integration of solar systems to reduce environmental
                            impact and power your farm efficiently.
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <div className="relative text-white py-16 px-6 overflow-hidden">
                <img
                    src={forestBg}
                    alt="Forest background"
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                />

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-6">
                    <div className="bg-[#e6decd]/95 text-[#1D3C33] p-6 rounded-md shadow-md md:w-1/2">
                        <h3 className="font-semibold mb-2">Our Vision:</h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                            To empower every individual to own a piece of land,
                            reconnecting them with nature and sustainable living.
                        </p>
                    </div>

                    <div className="bg-[#e6decd]/90 text-[#1D3C33] p-6 rounded-md shadow-md md:w-1/2">
                        <h3 className="font-semibold mb-2">Our Mission:</h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                            To deliver expert farmland consultancy that makes
                            owning and managing agriculture properties easy,
                            legal, and profitable.
                        </p>
                    </div>
                </div>

                <p className="relative z-10 text-center text-white mt-10 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    We strive to create personalized solutions that align with
                    our clients’ lifestyles while advocating for eco-conscious
                    land practices.
                </p>
            </div>

            {/* What Makes Us Different */}
            <div className="py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3C33] mb-6">
                        What Makes Us Different from Others?
                    </h2>

                    <p className="text-gray-700 text-sm sm:text-base mb-10 leading-relaxed">
                        In a crowded real estate market, NCR Farms stands out through our specialized focus and client-first approach:
                    </p>

                    <div className="flex flex-col gap-4 text-left">
                        <div className="bg-[#e6decd] border-l-8 border-[#1D3C33] p-4 rounded-md shadow-sm">
                            <p className="text-gray-800 text-sm sm:text-base">
                                <span className="font-semibold">Exclusive Expertise in Farmland:</span>
                                We specialize only in agricultural and farmhouse properties backed by deep rural knowledge.
                            </p>
                        </div>

                        <div className="bg-[#e6decd] border-l-8 border-[#1D3C33] p-4 rounded-md shadow-sm">
                            <p className="text-gray-800 text-sm sm:text-base">
                                <span className="font-semibold">Comprehensive, Tailored Services:</span>
                                From legal aid to hydroponics and solar setups — a complete ecosystem.
                            </p>
                        </div>

                        <div className="bg-[#e6decd] border-l-8 border-[#1D3C33] p-4 rounded-md shadow-sm">
                            <p className="text-gray-800 text-sm sm:text-base">
                                <span className="font-semibold">Commitment to Sustainability & ROI:</span>
                                Eco-friendly solutions that grow value long-term.
                            </p>
                        </div>

                        <div className="bg-[#e6decd] border-l-8 border-[#1D3C33] p-4 rounded-md shadow-sm">
                            <p className="text-gray-800 text-sm sm:text-base">
                                <span className="font-semibold">Transparent & Personalized Process:</span>
                                Clear communication and unbiased recommendations.
                            </p>
                        </div>

                        <div className="bg-[#e6decd] border-l-8 border-[#1D3C33] p-4 rounded-md shadow-sm">
                            <p className="text-gray-800 text-sm sm:text-base">
                                <span className="font-semibold">Proven Track Record:</span>
                                Successful CLU conversions, property transfers and happy clients.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;

import React from "react";
import aboutus from "../assets/aboutus.png"; // Add your farmland background image

const AboutUs = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative h-[220px] sm:h-[280px] md:h-[400px] w-full">
                <img
                    src={aboutus}
                    alt="Farmland"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
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
<div className="bg-[#f3e9db] py-8 px-4"> {/* reduced py-12 → py-8 */}
  <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6 text-justify"> {/* reduced p-8 → p-6 */}
    <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3C33] mb-4 text-center">
      Who We Are
    </h2>
    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-10"> {/* leading-relaxed → leading-normal */}
      NCR Farms is your premier partner in farmland consultancy, dedicated to helping individuals and families realize their dream of owning land.
      <br />
      Founded on the principles of sustainability, accessibility, and a deep connection to nature, we are a team of experienced consultants, legal experts, and agricultural specialists committed to making land ownership straightforward and fulfilling.
      <br />
      Whether you’re seeking a full-time residence in a serene farmhouse setting or a weekend getaway, we bridge the gap between urban life and rural bliss.
    </p>
  </div>
</div>


            {/* What We Do */}
            <div className="bg-white py-12 px-4 text-center">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1D3C33] mb-4">
                    What We Do
                </h2>
                <p className="mx-auto text-gray-600 text-sm sm:text-base mb-8 whitespace-nowrap">
                    We serve as a comprehensive one-stop solution for all your
                    farmland needs, guiding you from initial consultation to
                    long-term management.
                </p>

                {/* Core Offerings */}
                <div className="bg-white py-12 px-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-center text-[#1D3C33] mb-8">
                        Our core offerings include
                    </h2>
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                efficiently, helping you convert land for
                                residential or other purposes without hassle.
                            </p>
                        </div>

                        <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Prefabricated Farmhouse Setup:
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Quick, customizable, and eco-friendly
                                prefabricated structures to get your farmhouse
                                up and running in no time.
                            </p>
                        </div>

                        <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                ROI Optimization:
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Strategies to generate returns from your land,
                                including setting up hydroponics systems or
                                organic farms for sustainable income.
                            </p>
                        </div>

                        <div className="bg-[#f3e9db] p-6 rounded-md shadow-md">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Solar Power Solutions:
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base">
                                Integration of renewable energy systems to power
                                your farm cost-effectively and reduce
                                environmental impact.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

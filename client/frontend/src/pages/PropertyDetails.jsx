import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById } from "../api/property";
import axios from "../api/axios";
import ContactButtons from "../components/common/ContactButtons";
import img1 from "../assets/istockphoto1.jpg";
import img2 from "../assets/pexels1.jpg";

import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaHome,
    FaExpand,
    FaBed,
    FaBath,
    FaCar,
    FaWifi,
    FaSwimmingPool,
    FaTree,
    FaCheckCircle,
} from "react-icons/fa";

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            try {
                const data = await fetchPropertyById(id);
                setProperty(data);
                setError(null);
            } catch (propertyError) {
                try {
                    const response = await axios.get(
                        `/featured-products/${id}`
                    );
                    setProperty(response.data);
                    setError(null);
                } catch {
                    setError("Property or featured product not found");
                }
            }
            setLoading(false);
        };
        fetchProperty();
    }, [id]);

    if (loading)
        return (
            <div className="pt-20 text-center text-gray-600">
                Loading property details...
            </div>
        );

    if (error || !property)
        return (
            <div className="pt-20 text-center text-red-600">
                {error || "Property not found"}
            </div>
        );

    const imageUrl =
        Array.isArray(property.images) && property.images.length > 0
            ? property.images[currentImageIndex]
            : property.imageUrl ||
              property.img ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

    return (
        <div className="min-h-screen bg-white">
            {/* ------------------- HERO SECTION ------------------- */}
            <div className="relative w-full h-[500px] md:h-[650px]">
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex flex-col items-center justify-end h-full text-center text-white px-6 pb-28 md:pb-36">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">
                        {property.title || "Property Title"}
                    </h1>
                    <p className="text-lg md:text-xl mb-10 opacity-90">
                        {property.locationName ||
                            (property.address && property.address.city) ||
                            "Location"}
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 bg-black/30 border border-yellow-500 rounded-lg px-6 py-3 md:px-10 md:py-4 backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                            <p className="text-xs uppercase text-gray-300">
                                Land Area
                            </p>
                            <h4 className="text-lg font-semibold">
                                {property.features?.area || "N/A"} Acre
                            </h4>
                        </div>
                        <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>
                        <div className="flex flex-col items-center">
                            <p className="text-xs uppercase text-gray-300">
                                Possession
                            </p>
                            <h4 className="text-lg font-semibold">
                                {property.status || "Ready-to-Move"}
                            </h4>
                        </div>
                        <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>
                        <div className="flex flex-col items-center">
                            <p className="text-xs uppercase text-gray-300">
                                About Project
                            </p>
                            <h4 className="text-lg font-semibold">
                                {property.units || "N/A"} Unit
                            </h4>
                        </div>
                        <div className="hidden md:block h-8 w-[1px] bg-yellow-500"></div>
                        <div className="flex flex-col items-center">
                            <p className="text-xs uppercase text-gray-300">
                                Price
                            </p>
                            <h4 className="text-lg font-semibold">
                                ₹
                                {property.pricePerSqft ||
                                    property.price ||
                                    "N/A"}{" "}
                                / sq. ft.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------- Figma Section ------------------- */}
            <div className="bg-[#f5efe6] py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    {/* Section 1: The Sanctuaries */}
                    <div className="bg-[#e9dfce] px-8 py-6 rounded-xl shadow-md mb-8">
                        {/* Heading centered across the section */}
                        <h2 className="text-2xl font-bold text-[#2d5d4f] mb-4 text-center">
                            THE SANCTUARIES BY 32ND
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 py-4">
                            {/* Left: Text */}
                            <div className="flex-1">
                                <ul className="text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
                                    <li>
                                        Ready to Move | 1-Acre Freehold
                                        Farmhouse Plots
                                    </li>
                                    <li>
                                        Limited inventory | Allotment on
                                        First-Come, First-Served Basis
                                    </li>
                                    <li>Price $3.433 / sq.ft</li>
                                    <li>
                                        Infrastructure Ready: Wide internal
                                        roads & secured boundary
                                    </li>
                                    <li>
                                        Lifestyle Canvas: Build your signature
                                        bunglow, pool, landscaped lawns &
                                        private orchards
                                    </li>
                                </ul>
                            </div>

                            {/* Right: Images */}
                            <div className="flex-1 flex justify-center gap-3">
                                <img
                                    src={img1}
                                    alt="Sanctuaries 1"
                                    className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                                />
                                <img
                                    src={img2}
                                    alt="Sanctuaries 2"
                                    className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Location Highlights */}
                    <div className="bg-[#e9dfce] px-10 py-14 rounded-3xl shadow-md mb-10">
                        {/* Heading centered across the section */}
                        <h2 className="text-2xl font-bold text-[#2d5d4f] mb-4 text-center">
                            THE SANCTUARIES BY 32ND
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
                            
                            {/* Left Side - Text Content */}
                            <div className="flex-1">
                                <ul className="text-gray-800 list-disc list-inside space-y-3 leading-relaxed">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#2d5d4f] text-lg mt-1">
                                            ✔️
                                        </span>
                                        <p>
                                            Seamless connectivity via NH-48,
                                            Dwarka Expressway & KMP Expressway
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#2d5d4f] text-lg mt-1">
                                            ✔️
                                        </span>
                                        <p>
                                            Kherki Daula Toll shifting →
                                            hassle-free drives
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#2d5d4f] text-lg mt-1">
                                            ✔️
                                        </span>
                                        <p>
                                            Upcoming NH-8 flyovers → faster,
                                            smoother travel
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#2d5d4f] text-lg mt-1">
                                            ✔️
                                        </span>
                                        <p>
                                            Located in the premium Manesar
                                            farmhouse belt, surrounded by luxury
                                            resorts, retreats & golf courses
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Side - Map Image */}
                            <div className="flex-1 flex justify-center">
                                <img
                                    src="/assets/location-map.jpg"
                                    alt="Location Map"
                                    className="w-full md:w-[500px] rounded-2xl shadow-md object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Why Choose */}
                  <div className="bg-[#2d5d4f] text-white p-8 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-6 text-center">
    WHY CHOOSE THE SANCTUARIES
  </h2>
  <div className="grid md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
    <div className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
      <FaCheckCircle className="text-4xl text-yellow-400" />
      <p>Backed by 32nd – Iconic lifestyle destinations</p>
    </div>
    <div className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
      <FaTree className="text-4xl text-yellow-400" />
      <p>Rare 1-acre plots close to Gurgaon</p>
    </div>
    <div className="bg-[#376b5d] p-6 rounded-lg flex flex-col items-center gap-3">
      <FaHome className="text-4xl text-yellow-400" />
      <p>Peaceful living with high investment growth</p>
    </div>
  </div>
</div>

                </div>
            </div>

         {/* ------------------- Property Gallery Section ------------------- */}
{Array.isArray(property.images) && property.images.length > 1 && (
  <div className="max-w-7xl mx-auto mt-16 px-6">
    {/* Section Heading */}
    <div className="text-center mb-10">
      <p className="text-green-700 uppercase tracking-widest font-semibold">Gallery</p>
      <h2 className="text-4xl font-bold text-gray-900 mt-2">Project Images</h2>
    </div>

    {/* Image Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {property.images.slice(1, 5).map((img, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl shadow-md hover:scale-105 transform transition duration-300"
        >
          <img
            src={img}
            alt={`Property view ${index + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>

    {/* Brochure Section */}
    <div className="bg-[#2F5D50] mt-12 rounded-t-3xl text-center py-16 px-4 text-white">
      <h3 className="text-2xl md:text-3xl font-semibold mb-3">
        Download {property.title || "Project"} Brochure
      </h3>
      <p className="text-gray-200 mb-8">
        Get complete details, floor plans, amenities & pricing
      </p>
      <button className="bg-[#417C68] hover:bg-[#376c59] text-white font-bold py-3 px-8 rounded-md shadow-md transition">
        BROCHURE
      </button>
    </div>
  </div>
)}


            {/* ------------------- Contact Section ------------------- */}
            <div className="max-w-5xl mx-auto p-6 mt-12">
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Interested in this Property?
                    </h2>
                    <p className="text-green-100 mb-6 text-lg">
                        Get in touch with us for more details, site visits, or booking assistance
                    </p>
                    <ContactButtons 
                        propertyTitle={property.title}
                        propertyId={property._id}
                        size="lg"
                        className="justify-center"
                    />
                </div>
            </div>

            {/* ------------------- Description Section ------------------- */}
            <div className="max-w-5xl mx-auto p-6 mt-12 text-gray-800">
                <h2 className="text-2xl font-semibold mb-4">
                    About this Property
                </h2>
                <p className="text-gray-600 mb-4">
                    {property.description || "No description available."}
                </p>
            </div>
        </div>
    );
};

export default PropertyDetails;

import React from "react";

const properties = [
  {
    id: 1,
    title: "Farmhouse",
    location: "Sector 58, Gurgaon",
    people: 12,
    beds: 4,
    price: "40,000",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    title: "Farmhouse",
    location: "Sohna Road, Gurgaon",
    people: 12,
    beds: 4,
    price: "60,000",
    rating: 3.9,
    img: "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
  },
  {
    id: 3,
    title: "Farmhouse",
    location: "Greater Noida West",
    people: 12,
    beds: 4,
    price: "40,000",
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1600585154084-4e0b94d69f26",
  },
  {
    id: 4,
    title: "Farmhouse",
    location: "Noida",
    people: 12,
    beds: 4,
    price: "40,000",
    rating: 4.1,
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-16 px-4 md:px-10 bg-[#f3e9db]">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
        Our Featured Properties
      </h2>
      <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
        Explore our handpicked selection of premium farmhouses available for rent and sale across Delhi NCR.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {properties.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition flex flex-col"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-56 object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md shadow text-sm font-semibold flex items-center">
                ⭐ {p.rating}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-green-900">{p.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{p.location}</p>

              <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                <span>👥 {p.people} People</span>
                <span>🛏 {p.beds} Beds</span>
              </div>
              <div className="text-gray-600 text-sm mb-4">
                🏊 Swimming Pool · Wifi · +2 more
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center mt-auto">
                <p className="text-green-900 font-bold">
                  Rs. {p.price}
                  <span className="text-gray-500 text-sm"> /night</span>
                </p>
                <button className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="text-center mt-12">
        <button className="bg-green-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-800 transition">
          EXPLORE MORE
        </button>
      </div>
    </section>
  );
}

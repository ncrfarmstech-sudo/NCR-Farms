import React from "react";

const WhychooseNcr = () => {
  const locations = [
    {
      name: "Gurgaon",
      description:
        "Premium farmhouse communities with high appreciation potential.",
    },
    {
      name: "Sohna",
      description: "Scenic, peaceful plots perfect for weekend living.",
    },
    {
      name: "Noida",
      description:
        "Investment-ready farmlands near expressways and business hubs.",
    },
    {
      name: "Naugaon",
      description:
        "Serene agricultural lands for organic farming and leisure retreats.",
    },
  ];

  return (
    <section className="bg-[#EDE0D4] py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
          Why Choose NCR Farms?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We're committed to providing you with the best farmhouse rental and buying experience in Delhi NCR.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-10">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-[#2D5D4F] font-semibold text-lg mb-2 flex justify-center items-center gap-2">
                <span className="text-[#2D5D4F] text-xl">•</span>
                {loc.name}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {loc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhychooseNcr;

import React from "react";
import farmhouse1 from "../../assets/Home/house.png";
import farmhouse2 from "../../assets/Home/house.png";
import farmhouse3 from "../../assets/Home/house.png";
import farmhouse4 from "../../assets/Home/house.png";

const FeaturedProducts = () => {
	return (
		<section className="px-5 py-10">
			<h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
				Our Featured Properties
			</h3>

			{/* Property Cards */}
			{[farmhouse1, farmhouse2, farmhouse3, farmhouse4].map((img, idx) => (
				<div
					key={idx}
					className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
				>
					<img src={img} alt="Farmhouse" className="w-full h-40 object-cover" />
					<div className="p-4">
						<h4 className="font-semibold text-gray-800">Farmhouse</h4>
						<p className="text-sm text-gray-600 mt-1">
							3 Bedrooms • 2 Baths <br /> 2500 sq. ft area
						</p>
						<p className="mt-2 font-bold text-gray-900">Rs. 85,00,000/-</p>
						<button className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium text-white">
							View Details
						</button>
					</div>
				</div>
			))}
		</section>
	);
};

export default FeaturedProducts;

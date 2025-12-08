	import React, { useEffect, useState } from "react";
	import { fetchProperties, createProperty, patchProperty, deleteProperty } from "../api/property";
	import PropertyForm from "../components/property/PropertyForm";
	import Modal from "../components/Modal";
	import { Plus, Edit2, Trash2 } from "lucide-react";
	import { toast } from 'react-toastify';

	const Properties = () => {
		const [properties, setProperties] = useState([]);
		const [editProperty, setEditProperty] = useState(null);
			// Remove modalOpen, always show form inline
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState("");

		const loadProperties = async () => {
			setLoading(true);
			try {
				const data = await fetchProperties();
				setProperties(Array.isArray(data) ? data : []);
			} catch {
				setError("Failed to load properties");
				toast.error("Failed to load properties");
			}
			setLoading(false);
		};

		useEffect(() => {
			loadProperties();
		}, []);

			const handleFormSubmit = async (formData) => {
				setLoading(true);
				try {
					if (editProperty) {
						await patchProperty(editProperty._id, formData);
						toast.success("Property updated successfully");
					} else {
						await createProperty(formData);
						toast.success("Property added successfully");
					}
					setEditProperty(null);
					await loadProperties();
				} catch {
					setError("Failed to save property.");
					toast.error("Failed to save property");
				}
				setLoading(false);
			};

		const handleEdit = (property) => {
			// Always use the latest property object from the properties array
			const latest = properties.find((p) => p._id === property._id) || property;
			console.log('Edit Property Data:', latest); // Debug log
			setEditProperty({
				...latest,
				images: Array.isArray(latest.images) ? latest.images : [],
				address: latest.address || {},
				features: latest.features || {},
				block1: latest.block1 || {},
				block2: latest.block2 || {},
				block3: latest.block3 || {},
			});
			// No modal, just set editProperty
		};		const handleDelete = async (id) => {
			if (!window.confirm("Delete this property?")) return;
			setLoading(true);
			try {
				await deleteProperty(id);
				toast.success("Property deleted successfully");
				await loadProperties();
			} catch {
				setError("Failed to delete property");
				toast.error("Failed to delete property");
			}
			setLoading(false);
		};

			const handleCancel = () => {
				setEditProperty(null);
			};

			return (
				<div className="p-8 min-h-screen ml-56 bg-gradient-to-br from-green-50 to-white">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
							<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
							Manage Properties
						</h2>
					</div>

					   {/* Inline Property Form - now in main box, not a separate card */}
					   <div className="w-full flex justify-center">
						   <div className="w-full max-w-4xl overflow-y-auto" style={{ maxHeight: '600px' }}>
							   <PropertyForm
								   initialData={editProperty || {}}
								   onSubmit={handleFormSubmit}
								   loading={loading}
								   isEdit={!!editProperty}
								   onCancel={handleCancel}
								   className="w-full"
							   />
						   </div>
					   </div>
					   {editProperty ? (
						   <div className="text-sm text-gray-500 mt-2">
							   Editing property: <b>{editProperty.title}</b>
						   </div>
					   ) : (
						   <div className="text-sm text-gray-500 mt-2">
							   Create a new property listing
						   </div>
					   )}

					{error && <div className="text-red-500 mb-3">{error}</div>}
					{loading && <div className="text-gray-500 mb-3">Loading...</div>}

					{/* Property Grid */}
					   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						   {properties.map((p) => (
							   <div
								   key={p._id}
								   className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
							   >
								   {Array.isArray(p.images) && p.images.length > 0 && (
									   <div className="flex gap-2 mb-3 overflow-x-auto">
										   {p.images.map((img, idx) => (
											   <img
												   key={idx}
												   src={img}
												   alt={p.title + ' image ' + (idx + 1)}
												   className="w-32 h-32 object-cover rounded-xl border border-gray-300 shadow-sm"
											   />
										   ))}
									   </div>
								   )}
								   <h3 className="text-xl font-bold text-green-900 bg-green-50 rounded px-2 py-1 mb-2 shadow-sm border-l-4 border-green-400">
									   {p.title}
								   </h3>
								   <p className="text-base text-gray-700 mt-2 mb-4 whitespace-pre-line min-h-[3.5rem]">
									   {typeof p.description === 'string' ? p.description : '[No description]'}
								   </p>
								   <div className="flex gap-4 text-gray-600 text-sm mb-2">
									   <span>Type: <b>{p.propertyType}</b></span>
									   <span>Price: <b>₹{p.price}</b></span>
									   <span>City: <b>{p.address?.city}</b></span>
									   <span>Status: <b>{p.status}</b></span>
								   </div>
								   <div className="text-gray-600 text-sm mb-2">
									   {p.address?.state}
								   </div>
								   <div className="flex justify-between items-center mt-auto gap-3">
									   <p className="text-green-900 font-bold">Rs. {p.price || 'N/A'}</p>
									   <div className="flex gap-2">
										   <button
											   onClick={() => handleEdit(p)}
											   className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow transition-colors duration-150"
											   title="Edit Property"
										   >
											   Edit
										   </button>
										   <button
											   onClick={() => handleDelete(p._id)}
											   className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow transition-colors duration-150"
											   title="Delete Property"
										   >
											   Delete
										   </button>
									   </div>
								   </div>
							   </div>
						   ))}
					   </div>
				</div>
			);
	};

	export default Properties;

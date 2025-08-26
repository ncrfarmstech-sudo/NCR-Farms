	import React, { useEffect, useState } from "react";
	import { fetchProperties, createProperty, patchProperty, deleteProperty } from "../api/property";
	import PropertyForm from "../components/property/PropertyForm";
	import Modal from "../components/Modal";
	import { Plus, Edit2, Trash2 } from "lucide-react";
	import { toast } from 'react-toastify';

	const Properties = () => {
		const [properties, setProperties] = useState([]);
		const [editProperty, setEditProperty] = useState(null);
		const [modalOpen, setModalOpen] = useState(false);
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
				setModalOpen(false);
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
					setEditProperty({
						...latest,
						images: Array.isArray(latest.images) ? latest.images : [],
					});
					setModalOpen(true);
				};

		const handleDelete = async (id) => {
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
			setModalOpen(false);
		};

		return (
			<div className="p-8 min-h-screen ml-56 bg-gradient-to-br from-green-50 to-white">
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
						<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
						Manage Properties
					</h2>
					<button
						className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
						onClick={() => {
							setEditProperty(null);
							setModalOpen(true);
						}}
					>
						<Plus className="w-5 h-5" /> Add Property
					</button>
				</div>

				{error && <div className="text-red-500 mb-3">{error}</div>}
				{loading && <div className="text-gray-500 mb-3">Loading...</div>}

				{/* Property Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{properties.map((p) => (
						<div
							key={p._id}
							className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-3 hover:shadow-2xl transition"
						>
							{Array.isArray(p.images) && p.images.length > 0 && (
								<div className="flex gap-2 mb-4 overflow-x-auto">
									{p.images.map((img, idx) => (
										<img
											key={idx}
											src={img}
											alt={p.title + ' image ' + (idx + 1)}
											className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-sm"
										/>
									))}
								</div>
							)}
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								{p.title}
							</h3>
							<p className="text-gray-600 text-sm flex-1 mb-2">
								{p.description ? p.description.substring(0, 120) + (p.description.length > 120 ? '...' : '') : ''}
							</p>
							<div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
								<span>Type: <b>{p.propertyType}</b></span>
								<span>Price: <b>₹{p.price}</b></span>
								<span>City: <b>{p.address?.city}</b></span>
								<span>Status: <b>{p.status}</b></span>
							</div>
							{/* Action buttons */}
							<div className="flex gap-2">
								<button
									className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm"
									onClick={() => handleEdit(p)}
								>
									<Edit2 className="w-4 h-4" /> Edit
								</button>
								<button
									className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 text-sm"
									onClick={() => handleDelete(p._id)}
								>
									<Trash2 className="w-4 h-4" /> Delete
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Modal */}
				<Modal isOpen={modalOpen} onClose={handleCancel}>
					<PropertyForm
						initialData={editProperty || {}}
						onSubmit={handleFormSubmit}
						loading={loading}
						isEdit={!!editProperty}
						onCancel={handleCancel}
					/>
					{editProperty ? (
						<div className="text-sm text-gray-500 mt-2">
							Editing property: <b>{editProperty.title}</b>
						</div>
					) : (
						<div className="text-sm text-gray-500 mt-2">
							Create a new property listing
						</div>
					)}
				</Modal>
			</div>
		);
	};

	export default Properties;

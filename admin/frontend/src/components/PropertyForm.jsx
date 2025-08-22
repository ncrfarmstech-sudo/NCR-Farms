import React, { useState } from 'react';
const initialState = {
  title: '',
  description: '',
  price: '',
  propertyType: 'apartment',
  address: {
    street: '',
    city: '',
    state: '',
    pincode: ''
  },
  features: {
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnished: false
  }
};



const PropertyForm = ({ onSubmit, loading, initialData, isEdit, onCancel }) => {
  // Always merge initialData with initialState to avoid missing fields
  const getMergedState = (data) => ({
    ...initialState,
    ...data,
    address: { ...initialState.address, ...(data?.address || {}) },
    features: { ...initialState.features, ...(data?.features || {}) },
  });
  const [form, setForm] = useState(getMergedState(initialData));


  // Unified image state: { url, file, isNew }
  const [images, setImages] = useState(() => {
    if (Array.isArray(initialData?.images)) {
      return initialData.images.map(url => ({ url, isNew: false }));
    }
    return [];
  });



  React.useEffect(() => {
    setForm(getMergedState(initialData));
    setImages(Array.isArray(initialData?.images) ? initialData.images.map(url => ({ url, isNew: false })) : []);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'images') {
      // Add new files to images state
      const newImgs = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file,
        isNew: true
      }));
      setImages(prev => [...prev, ...newImgs]);
    } else if (name.startsWith('address.')) {
      setForm({
        ...form,
        address: { ...form.address, [name.split('.')[1]]: value }
      });
    } else if (name.startsWith('features.')) {
      setForm({
        ...form,
        features: { ...form.features, [name.split('.')[1]]: type === 'checkbox' ? checked : value }
      });
    } else if (name === 'furnished') {
      setForm({ ...form, features: { ...form.features, furnished: checked } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const isEditMode = !!isEdit;
    // Only send changed or non-empty fields on edit, all fields on create
    if (isEditMode && initialData) {
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (!initialData[key] || initialData[key][subKey] !== subValue) {
              formData.append(`${key}.${subKey}`, subValue);
            }
          });
        } else {
          if (initialData[key] !== value) {
            formData.append(key, value);
          }
        }
      });
    } else {
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`${key}.${subKey}`, subValue);
          });
        } else {
          formData.append(key, value);
        }
      });
    }
    // Send all kept old images (only real URLs, not blob:)
    images.filter(img => !img.isNew && img.url && !img.url.startsWith('blob:')).forEach(img => {
      formData.append('existingImages[]', img.url);
    });
    // Send all new images (only files)
    images.filter(img => img.isNew && img.file).forEach(img => {
      formData.append('images', img.file);
    });
    await onSubmit(formData);
    // Reset images after submit
    setImages(Array.isArray(initialData?.images) ? initialData.images.map(url => ({ url, isNew: false })) : []);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-green-700">{isEdit ? 'Edit Property' : 'Add Property'}</h3>
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Area (sqft)</label>
          <input name="features.area" value={form.features.area} onChange={handleChange} placeholder="Area (sqft)" type="number" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Bedrooms</label>
          <input name="features.bedrooms" value={form.features.bedrooms} onChange={handleChange} placeholder="Bedrooms" type="number" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Bathrooms</label>
          <input name="features.bathrooms" value={form.features.bathrooms} onChange={handleChange} placeholder="Bathrooms" type="number" className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="col-span-2 flex items-center gap-2 mt-2">
          <input name="features.furnished" type="checkbox" checked={form.features.furnished} onChange={handleChange} className="mr-2" />
          <label className="text-sm font-medium">Furnished</label>
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Street</label>
          <input name="address.street" value={form.address.street} onChange={handleChange} placeholder="Street" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input name="address.city" value={form.address.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input name="address.state" value={form.address.state} onChange={handleChange} placeholder="State" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input name="address.pincode" value={form.address.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border px-3 py-2 rounded" />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Property Images</label>
        <div
          className="w-full border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-green-400 transition"
          onClick={() => document.getElementById('property-image-input').click()}
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={e => {
            e.preventDefault();
            e.stopPropagation();
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            if (files.length > 0) {
              const newImgs = files.map(file => ({ url: URL.createObjectURL(file), file, isNew: true }));
              setImages(prev => [...prev, ...newImgs]);
            }
          }}
        >
          <span className="text-gray-500">Drag & drop images here or </span>
          <span className="text-green-700 font-semibold underline">click to add images</span>
          <input
            id="property-image-input"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
        {images.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img src={img.url} alt={`img-${idx}`} className="w-16 h-16 object-cover rounded border" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                  onClick={e => { e.stopPropagation(); setImages(prev => prev.filter((_, i) => i !== idx)); }}
                  title="Remove image"
                >
                  ×
                </button>
                {img.isNew && <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">New</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? (isEdit ? 'Saving...' : 'Saving...') : isEdit ? 'Update Property' : 'Add Property'}
        </button>
        {isEdit && (
          <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PropertyForm;

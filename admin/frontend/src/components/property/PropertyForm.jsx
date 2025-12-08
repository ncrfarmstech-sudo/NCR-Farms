import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const initialState = {
  title: '',
  description: '',
  price: '',
  propertyType: 'Built up farmhouse',
  locationName: '',
  address: {
    street: '',
    city: '',
    state: '',
    pincode: ''
  },
  features: {
    area: ''
  },
  block1: {
    heading: '',
    description: ''
  },
  block2: {
    heading: '',
    description: ''
  },
  block3: {
    heading: '',
    description: ''
  }
};



const PropertyForm = ({ onSubmit, loading, initialData, isEdit, onCancel, className }) => {
  // Always merge initialData with initialState to avoid missing fields
  const getMergedState = (data) => ({
    ...initialState,
    ...data,
    address: { ...initialState.address, ...(data?.address || {}) },
    features: { ...initialState.features, ...(data?.features || {}) },
    block1: { ...initialState.block1, ...(data?.block1 || {}) },
    block2: { ...initialState.block2, ...(data?.block2 || {}) },
    block3: { ...initialState.block3, ...(data?.block3 || {}) },
  });
  const [form, setForm] = useState(getMergedState(initialData));

  // Separate state for regular property images
  const [images, setImages] = useState(() => {
    if (Array.isArray(initialData?.images)) {
      return initialData.images.map(url => ({ 
        url, 
        isNew: false
      }));
    }
    return [];
  });

  // Separate state for Block 1 images
  const [block1Images, setBlock1Images] = useState(() => {
    if (Array.isArray(initialData?.block1?.images)) {
      return initialData.block1.images.map(url => ({ 
        url, 
        isNew: false
      }));
    }
    return [];
  });

  // Separate state for Block 2 images
  const [block2Images, setBlock2Images] = useState(() => {
    if (Array.isArray(initialData?.block2?.images)) {
      return initialData.block2.images.map(url => ({ 
        url, 
        isNew: false
      }));
    }
    return [];
  });

  // Separate state for Block 3 images
  const [block3Images, setBlock3Images] = useState(() => {
    if (Array.isArray(initialData?.block3?.images)) {
      return initialData.block3.images.map(url => ({ 
        url, 
        isNew: false
      }));
    }
    return [];
  });

  React.useEffect(() => {
    console.log('PropertyForm initialData changed:', initialData); // Debug log
    if (initialData && Object.keys(initialData).length > 0) {
      const mergedData = getMergedState(initialData);
      console.log('Merged form data:', mergedData); // Debug log
      setForm(mergedData);
      // Load regular property images
      if (Array.isArray(initialData?.images)) {
        setImages(initialData.images.map(url => ({ 
          url, 
          isNew: false
        })));
      } else {
        setImages([]);
      }
      // Load Block 1 images
      if (Array.isArray(initialData?.block1?.images)) {
        setBlock1Images(initialData.block1.images.map(url => ({ 
          url, 
          isNew: false
        })));
      } else {
        setBlock1Images([]);
      }
      // Load Block 2 images
      if (Array.isArray(initialData?.block2?.images)) {
        setBlock2Images(initialData.block2.images.map(url => ({ 
          url, 
          isNew: false
        })));
      } else {
        setBlock2Images([]);
      }
      // Load Block 3 images
      if (Array.isArray(initialData?.block3?.images)) {
        setBlock3Images(initialData.block3.images.map(url => ({ 
          url, 
          isNew: false
        })));
      } else {
        setBlock3Images([]);
      }
    }
  }, [JSON.stringify(initialData)]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('handleChange called:', name, '=', value); // Debug log
    if (name === 'images') {
      // Add new files to regular property images
      const newImgs = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file,
        isNew: true
      }));
      setImages(prev => [...prev, ...newImgs]);
    } else if (name === 'block1-images') {
      // Handle Block 1 images
      const newImgs = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file,
        isNew: true
      }));
      setBlock1Images(prev => [...prev, ...newImgs]);
    } else if (name === 'block2-images') {
      // Handle Block 2 images
      const newImgs = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file,
        isNew: true
      }));
      setBlock2Images(prev => [...prev, ...newImgs]);
    } else if (name === 'block3-images') {
      // Handle Block 3 images
      const newImgs = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        file,
        isNew: true
      }));
      setBlock3Images(prev => [...prev, ...newImgs]);
    } else if (name.startsWith('address.')) {
      setForm({
        ...form,
        address: { ...form.address, [name.split('.')[1]]: value }
      });
    } else if (name.startsWith('features.')) {
      // Only allow area
      const key = name.split('.')[1];
      if (key === 'area') {
        setForm({
          ...form,
          features: { ...form.features, [key]: value }
        });
      }
      // furnished removed
    } else if (name.startsWith('block1.')) {
      const key = name.split('.')[1];
      setForm({
        ...form,
        block1: { ...form.block1, [key]: value }
      });
    } else if (name.startsWith('block2.')) {
      const key = name.split('.')[1];
      setForm({
        ...form,
        block2: { ...form.block2, [key]: value }
      });
    } else if (name.startsWith('block3.')) {
      const key = name.split('.')[1];
      setForm({
        ...form,
        block3: { ...form.block3, [key]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const isEditMode = !!isEdit;
    // Always send all fields to ensure updates work properly
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`${key}.${subKey}`, subValue || '');
        });
      } else {
        formData.append(key, value || '');
      }
    });
    console.log('=== PropertyForm Submit ===');
    console.log('Form state:', form);
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0], '=', pair[1]);
    }
    // Send all kept old images (only real URLs, not blob:)
    images.filter(img => !img.isNew && img.url && !img.url.startsWith('blob:')).forEach(img => {
      formData.append('existingImages[]', img.url);
    });
    // Send all new images (only files)
    images.filter(img => img.isNew && img.file).forEach(img => {
      formData.append('images', img.file);
    });
    // Send Block 1 images - existing
    block1Images.filter(img => !img.isNew && img.url && !img.url.startsWith('blob:')).forEach(img => {
      formData.append('existingBlock1Images[]', img.url);
    });
    // Send Block 1 images - new
    block1Images.filter(img => img.isNew && img.file).forEach(img => {
      formData.append('block1Images', img.file);
    });
    // Send Block 2 images - existing
    block2Images.filter(img => !img.isNew && img.url && !img.url.startsWith('blob:')).forEach(img => {
      formData.append('existingBlock2Images[]', img.url);
    });
    // Send Block 2 images - new
    block2Images.filter(img => img.isNew && img.file).forEach(img => {
      formData.append('block2Images', img.file);
    });
    // Send Block 3 images - existing
    block3Images.filter(img => !img.isNew && img.url && !img.url.startsWith('blob:')).forEach(img => {
      formData.append('existingBlock3Images[]', img.url);
    });
    // Send Block 3 images - new
    block3Images.filter(img => img.isNew && img.file).forEach(img => {
      formData.append('block3Images', img.file);
    });
    await onSubmit(formData);
    // Reset images after submit
    setImages(Array.isArray(initialData?.images) ? initialData.images.map(url => ({ 
      url, 
      isNew: false
    })) : []);
    setBlock1Images(Array.isArray(initialData?.block1?.images) ? initialData.block1.images.map(url => ({ 
      url, 
      isNew: false
    })) : []);
    setBlock2Images(Array.isArray(initialData?.block2?.images) ? initialData.block2.images.map(url => ({ 
      url, 
      isNew: false
    })) : []);
    setBlock3Images(Array.isArray(initialData?.block3?.images) ? initialData.block3.images.map(url => ({ 
      url, 
      isNew: false
    })) : []);
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-white p-4 rounded shadow w-full ${typeof className === 'string' ? className : ''}`}>
      <h3 className="text-2xl font-bold mb-4 text-green-700">{isEdit ? 'Edit Property' : 'Add Property'}</h3>
      <div className="mb-3 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="locationName"
            value={form.locationName}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input name="price" value={typeof form.price === 'number' ? form.price : String(form.price).replace(/[^\d.]/g, '')} onChange={handleChange} placeholder="Price" type="number" className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="Built up farmhouse">Built up farmhouse</option>
            <option value="Gated Farmhouse">Gated Farmhouse</option>
            <option value="Agricultural land">Agricultural land</option>
            <option value="Farmland">Farmland</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Area (sqft)</label>
          <input name="features.area" value={form.features.area} onChange={handleChange} placeholder="Area (sqft)" type="number" className="w-full border px-3 py-2 rounded" />
        </div>
        {/* Bedrooms and Bathrooms fields removed as requested */}
        {/* Furnished option removed as requested */}
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" />
      </div>

      {/* ============================================ */}
      {/* BLOCK 1 SECTION - HEADING, DESCRIPTION & IMAGES */}
      {/* ============================================ */}
      <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-500 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-900 mb-4">📌 BLOCK 1 - Section</h3>
        
        {/* Block 1 Heading */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Heading</label>
          <input 
            type="text" 
            name="block1.heading" 
            value={(form?.block1?.heading) || ''} 
            onChange={handleChange} 
            placeholder="e.g., PROJECT HIGHLIGHTS" 
            className="w-full border px-3 py-2 rounded" 
          />
        </div>

        {/* Block 1 Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div style={{ minHeight: 250 }}>
            <CKEditor
              key={`block1-${initialData?._id || 'new'}`}
              editor={ClassicEditor}
              data={(form?.block1?.description) || ''}
              onReady={editor => {
                // This will be called when the editor is ready
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setForm({ ...form, block1: { ...form.block1, description: data } });
              }}
            />
          </div>
        </div>

        {/* Block 1 Images Upload */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-yellow-900 mb-2">
            Block 1 Images (2 Images)
          </label>
          <div
            className="w-full border-2 border-dashed border-yellow-400 rounded p-4 text-center cursor-pointer hover:border-yellow-600 transition bg-white"
            onClick={() => document.getElementById('block1-image-input').click()}
            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={e => {
              e.preventDefault();
              e.stopPropagation();
              const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
              if (files.length > 0) {
                const newImgs = files.map(file => ({ url: URL.createObjectURL(file), file, isNew: true }));
                setBlock1Images(prev => [...prev, ...newImgs]);
              }
            }}
          >
            <span className="text-gray-500">Drag & drop images here or </span>
            <span className="text-yellow-700 font-semibold underline">click to add</span>
            <input
              id="block1-image-input"
              name="block1-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>
          {block1Images.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {block1Images.map((img, idx) => (
                <div key={idx} className="relative group flex flex-col items-center">
                  <div className="relative">
                    <img src={img.url} alt={`block1-${idx}`} className="w-16 h-16 object-cover rounded border-2 border-yellow-400" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                      onClick={e => { 
                        e.stopPropagation(); 
                        setBlock1Images(prev => prev.filter((_, i) => i !== idx)); 
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                    {img.isNew && <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">New</span>}
                  </div>
                  <span className="text-xs font-bold mt-1 text-center px-1">
                    {idx === 0 && "📌 Image 1"}
                    {idx === 1 && "📌 Image 2"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BLOCK 2 Section */}
      <div className="border-4 border-green-500 p-6 rounded mb-6 bg-white">
        <h3 className="text-2xl font-bold text-green-700 mb-4">📦 Block 2</h3>

        {/* Block 2 Heading */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-green-700 mb-2">
            Block 2 Heading
          </label>
          <input
            type="text"
            name="block2.heading"
            value={form?.block2?.heading || ''}
            onChange={handleChange}
            placeholder="Enter block 2 heading"
            className="w-full border-2 border-green-400 px-3 py-2 rounded focus:outline-none focus:border-green-600"
          />
        </div>

        {/* Block 2 Description */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-green-700 mb-2">
            Block 2 Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            key={`block2-${initialData?._id || 'new'}`}
            data={(form?.block2?.description) || ''}
            onReady={editor => {
              // This will be called when the editor is ready
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setForm({ ...form, block2: { ...form.block2, description: data } });
            }}
          />
        </div>

        {/* Block 2 Images Upload */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-green-700 mb-2">
            Block 2 Images (2 Images)
          </label>
          <div
            className="w-full border-2 border-dashed border-green-400 rounded p-4 text-center cursor-pointer hover:border-green-600 transition bg-white"
            onClick={() => document.getElementById('block2-image-input').click()}
            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={e => {
              e.preventDefault();
              e.stopPropagation();
              const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
              if (files.length > 0) {
                const newImgs = files.map(file => ({ url: URL.createObjectURL(file), file, isNew: true }));
                setBlock2Images(prev => [...prev, ...newImgs]);
              }
            }}
          >
            <span className="text-gray-500">Drag & drop images here or </span>
            <span className="text-green-700 font-semibold underline">click to add</span>
            <input
              id="block2-image-input"
              name="block2-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>
          {block2Images.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {block2Images.map((img, idx) => (
                <div key={idx} className="relative group flex flex-col items-center">
                  <div className="relative">
                    <img src={img.url} alt={`block2-${idx}`} className="w-16 h-16 object-cover rounded border-2 border-green-400" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                      onClick={e => { 
                        e.stopPropagation(); 
                        setBlock2Images(prev => prev.filter((_, i) => i !== idx)); 
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                    {img.isNew && <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">New</span>}
                  </div>
                  <span className="text-xs font-bold mt-1 text-center px-1">
                    {idx === 0 && "📌 Image 1"}
                    {idx === 1 && "📌 Image 2"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BLOCK 3 Section */}
      <div className="border-4 border-blue-500 p-6 rounded mb-6 bg-white">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">📦 Block 3</h3>

        {/* Block 3 Heading */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-blue-700 mb-2">
            Block 3 Heading
          </label>
          <input
            type="text"
            name="block3.heading"
            value={form?.block3?.heading || ''}
            onChange={handleChange}
            placeholder="Enter block 3 heading"
            className="w-full border-2 border-blue-400 px-3 py-2 rounded focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Block 3 Description */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-blue-700 mb-2">
            Block 3 Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            key={`block3-${initialData?._id || 'new'}`}
            data={(form?.block3?.description) || ''}
            onReady={editor => {
              // This will be called when the editor is ready
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setForm({ ...form, block3: { ...form.block3, description: data } });
            }}
          />
        </div>

        {/* Block 3 Images Upload */}
        <div className="mb-3">
          <label className="block text-sm font-bold text-blue-700 mb-2">
            Block 3 Images (2 Images)
          </label>
          <div
            className="w-full border-2 border-dashed border-blue-400 rounded p-4 text-center cursor-pointer hover:border-blue-600 transition bg-white"
            onClick={() => document.getElementById('block3-image-input').click()}
            onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={e => {
              e.preventDefault();
              e.stopPropagation();
              const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
              if (files.length > 0) {
                const newImgs = files.map(file => ({ url: URL.createObjectURL(file), file, isNew: true }));
                setBlock3Images(prev => [...prev, ...newImgs]);
              }
            }}
          >
            <span className="text-gray-500">Drag & drop images here or </span>
            <span className="text-blue-700 font-semibold underline">click to add</span>
            <input
              id="block3-image-input"
              name="block3-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>
          {block3Images.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {block3Images.map((img, idx) => (
                <div key={idx} className="relative group flex flex-col items-center">
                  <div className="relative">
                    <img src={img.url} alt={`block3-${idx}`} className="w-16 h-16 object-cover rounded border-2 border-blue-400" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                      onClick={e => { 
                        e.stopPropagation(); 
                        setBlock3Images(prev => prev.filter((_, i) => i !== idx)); 
                      }}
                      title="Remove image"
                    >
                      ×
                    </button>
                    {img.isNew && <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">New</span>}
                  </div>
                  <span className="text-xs font-bold mt-1 text-center px-1">
                    {idx === 0 && "📌 Image 1"}
                    {idx === 1 && "📌 Image 2"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Section - Kept as it was */}
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
        <label className="block text-sm font-medium font-bold text-lg mb-2">
          🖼️ Property Images
        </label>
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
              <div key={idx} className="relative group flex flex-col items-center">
                <div className="relative">
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
                <span className="text-xs font-bold mt-1 text-center px-1">
                  {idx === 0 && "🎬 Hero"}
                  {idx >= 1 && `🖼️ Gallery ${idx}`}
                </span>
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

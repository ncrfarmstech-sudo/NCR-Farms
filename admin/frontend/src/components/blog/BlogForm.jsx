
import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';

const BlogForm = ({ initial = {}, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Unified image state: { url, file, isNew }
  const [images, setImages] = useState(() => Array.isArray(initial.imageUrls) ? initial.imageUrls.map(url => ({ url, isNew: false })) : []);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initial.title || '');
    setContent(initial.content || '');
    setImages(Array.isArray(initial.imageUrls) ? initial.imageUrls.map(url => ({ url, isNew: false })) : []);
  }, [initial]);

  const handleImageInput = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(file => ({ url: URL.createObjectURL(file), file, isNew: true }));
    setImages(prev => [...prev, ...newImgs]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      const newImgs = files.map(file => ({ url: URL.createObjectURL(file), file, isNew: true }));
      setImages(prev => [...prev, ...newImgs]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!initial && !!initial._id;
    if (!isEdit && (!title.trim() || !content.trim())) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    const fd = new FormData();
    if (!isEdit || title !== initial.title) fd.append('title', title);
    if (!isEdit || content !== initial.content) fd.append('content', content);
    // Send all kept old images (only real URLs, not blob:)
    images.filter(img => !img.isNew && img.url && !img.url.startsWith('blob:')).forEach(img => {
      fd.append('existingImageUrls', img.url);
    });
    // Send all new images (only files)
    images.filter(img => img.isNew && img.file).forEach(img => {
      fd.append('images', img.file);
    });
    onSubmit(fd);
    // Optionally reset images after submit
    // setImages(Array.isArray(initial.imageUrls) ? initial.imageUrls.map(url => ({ url, isNew: false })) : []);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-3">
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Images (optional)</label>
        <div
          className="w-full border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-green-400 transition"
          onClick={() => document.getElementById('blog-image-input').click()}
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={handleDrop}
        >
          <span className="text-gray-500">Drag & drop images here or </span>
          <span className="text-green-700 font-semibold underline">click to add images</span>
          <input
            id="blog-image-input"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageInput}
            className="hidden"
          />
        </div>
        {images.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2" style={{ maxWidth: '100%' }}>
            {images.map((img, idx) => (
              <div key={idx} className="relative group flex-shrink-0">
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
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default BlogForm;

import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';


const BlogForm = ({ initial = {}, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setContent(initial.content || '');
      setExistingImages(Array.isArray(initial.imageUrls) ? initial.imageUrls : []);
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For create: require title and content. For edit: allow partial update.
    const isEdit = !!initial && !!initial._id;
    if (!isEdit && (!title.trim() || !content.trim())) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    const fd = new FormData();
    // For edit, only append fields that changed or are not empty
    if (!isEdit || title !== initial.title) fd.append('title', title);
    if (!isEdit || content !== initial.content) fd.append('content', content);
    if (isEdit && existingImages.length > 0) {
      existingImages.forEach(url => fd.append('existingImageUrls', url));
    }
    if (images && images.length > 0) {
      for (let img of images) {
        fd.append('images', img);
      }
    }
    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-3">
        <label className="block text-sm font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          name="images"
          multiple
          onChange={e => setImages(Array.from(e.target.files))}
        />
        {existingImages.length > 0 && (
          <div className="flex gap-2 mt-2">
            {existingImages.map((url, idx) => (
              <div key={idx} className="relative group">
                <img src={url} alt={`existing-${idx}`} className="w-16 h-16 object-cover rounded border" />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-80 group-hover:opacity-100"
                  onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                  title="Remove image"
                >
                  ×
                </button>
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

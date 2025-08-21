
import { stripHtml } from '../../utils/stripHtml';

const BlogList = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((b) => (
        <div
          key={b._id}
          className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg border border-gray-200 p-5 transition-transform hover:-translate-y-1 hover:shadow-2xl flex flex-col"
        >
          {Array.isArray(b.imageUrls) && b.imageUrls.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto">
              {b.imageUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={b.title + ' image ' + (idx + 1)}
                  className="w-32 h-32 object-cover rounded-xl border border-gray-300 shadow-sm"
                />
              ))}
            </div>
          )}
          <h3 className="text-xl font-bold text-blue-700 bg-blue-50 rounded px-2 py-1 mb-2 shadow-sm border-l-4 border-blue-400">
            {b.title}
          </h3>
          {/* {console.log('Blog content:', b.content)} */}
          <p className="text-base text-gray-700 mt-2 mb-4 whitespace-pre-line min-h-[3.5rem]">
            {typeof b.content === 'string' ? stripHtml(b.content) : '[No content]'}
          </p>
          <div className="mt-auto flex gap-3">
            <button
              onClick={() => onEdit(b)}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg shadow transition-colors duration-150"
              title="Edit Blog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z" /></svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(b._id)}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow transition-colors duration-150"
              title="Delete Blog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

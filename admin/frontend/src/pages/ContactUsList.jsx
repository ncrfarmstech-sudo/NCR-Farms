import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useContactUs } from '../context/ContactUsContext';

function getInitials(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const ContactUsList = () => {
  const { contacts, loading, error, deleteContact } = useContactUs();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      setDeletingId(id);
      try {
        await deleteContact(id);
        toast.success('Contact deleted successfully');
      } catch {
        toast.error('Failed to delete contact');
      }
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8 min-h-screen ml-56 bg-gradient-to-br from-green-50 to-white">
      <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2 mb-8">
							<svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
							CintactUs Details
						</h2>
      {loading ? (
        <div className="text-lg text-gray-500">Loading...</div>
      ) : error ? (
        <>
          <div className="text-lg text-red-500">{error}</div>
          {error && toast.error(error)}
        </>
      ) : contacts.length === 0 ? (
        <div className="text-gray-500">No submissions found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-3 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 shadow">
                  {getInitials(c.name)}
                </div>
                <div>
                  <div className="font-semibold text-lg text-blue-800">{c.name}</div>
                  <div className="text-gray-500 text-sm">{c.email}</div>
                </div>
              </div>
              <div className="bg-blue-50 rounded p-3 text-gray-700 min-h-[60px]">
                {c.message}
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className={`px-4 py-1.5 rounded-lg text-white font-semibold shadow transition-colors duration-150 ${deletingId === c._id ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                  onClick={() => handleDelete(c._id)}
                  disabled={deletingId === c._id}
                >
                  {deletingId === c._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactUsList;

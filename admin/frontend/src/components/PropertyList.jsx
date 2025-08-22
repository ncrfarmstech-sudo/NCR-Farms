import React from 'react';

const PropertyList = ({ properties, onDelete, onEdit }) => {
  const safeProperties = Array.isArray(properties) ? properties : [];
  if (!safeProperties.length) return <div className="text-gray-500">No properties found.</div>;
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">All Properties</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="p-2 border">Images</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">City</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeProperties.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">
                  {Array.isArray(p.images) && p.images.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {p.images.slice(0, 3).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Property"
                          className="w-12 h-12 object-cover rounded border"
                        />
                      ))}
                      {p.images.length > 3 && (
                        <span className="ml-1 text-xs text-gray-500">+{p.images.length - 3} more</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">{p.propertyType}</td>
                <td className="p-2 border">₹{p.price}</td>
                <td className="p-2 border">{p.address?.city}</td>
                <td className="p-2 border">{p.status}</td>
                <td className="p-2 border flex gap-2">
                  <button onClick={() => onEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => onDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyList;

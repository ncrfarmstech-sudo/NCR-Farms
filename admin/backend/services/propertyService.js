const cloudinary = require('../config/cloudinary');


async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "properties" }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(file.buffer);
  });
}
exports.uploadToCloudinary = uploadToCloudinary;

exports.partialUpdateProperty = async (id, data, files) => {
  const property = await Property.findById(id);
  if (!property) return null;

  // Update only provided fields (partial update)
  if (typeof data.title !== 'undefined') property.title = data.title;
  if (typeof data.description !== 'undefined') property.description = data.description;
  if (typeof data.price !== 'undefined') property.price = data.price;
  if (typeof data.propertyType !== 'undefined') property.propertyType = data.propertyType;
  // Address
  if (typeof data['address.street'] !== 'undefined') property.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') property.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') property.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') property.address.pincode = data['address.pincode'];
  // Features
  // bedrooms and bathrooms removed as per new requirements
  if (typeof data['features.area'] !== 'undefined') property.features.area = data['features.area'];
  // furnished removed as per new requirements

  // Merge existing image URLs from frontend with new uploads
  let existingImages = [];
  if (typeof data['existingImages'] !== 'undefined') {
    if (Array.isArray(data['existingImages'])) {
      existingImages = data['existingImages'];
    } else if (typeof data['existingImages'] === 'string') {
      existingImages = [data['existingImages']];
    }
  } else if (typeof data['existingImages[]'] !== 'undefined') {
    if (Array.isArray(data['existingImages[]'])) {
      existingImages = data['existingImages[]'];
    } else if (typeof data['existingImages[]'] === 'string') {
      existingImages = [data['existingImages[]']];
    }
  }
  let newImages = [];
  if (files && files.length > 0) {
    for (const file of files) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        newImages.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }
  property.images = [...existingImages, ...newImages];

  property.updatedAt = new Date();
  await property.save();
  // Always return the latest property from the DB
  return await Property.findById(id);
};
const Property = require('../models/Property');

exports.createProperty = async (data) => {
  const property = new Property(data);
  return await property.save();
};

exports.getProperties = async (filter = {}) => {
  return await Property.find(filter);
};

exports.getPropertyById = async (id) => {
  return await Property.findById(id);
};

exports.updateProperty = async (id, data, files) => {
  const property = await Property.findById(id);
  if (!property) return null;

  // Update only provided fields (partial update)
  if (typeof data.title !== 'undefined') property.title = data.title;
  if (typeof data.description !== 'undefined') property.description = data.description;
  if (typeof data.price !== 'undefined') property.price = data.price;
  if (typeof data.propertyType !== 'undefined') property.propertyType = data.propertyType;
  // Address
  if (typeof data['address.street'] !== 'undefined') property.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') property.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') property.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') property.address.pincode = data['address.pincode'];
  // Features
  // bedrooms and bathrooms removed as per new requirements
  if (typeof data['features.area'] !== 'undefined') property.features.area = data['features.area'];
  if (typeof data['features.furnished'] !== 'undefined') property.features.furnished = data['features.furnished'] === 'true' || data['features.furnished'] === true;

  // Merge existing image URLs from frontend with new uploads
  let existingImages = [];
  if (typeof data['existingImages'] !== 'undefined') {
    if (Array.isArray(data['existingImages'])) {
      existingImages = data['existingImages'];
    } else if (typeof data['existingImages'] === 'string') {
      existingImages = [data['existingImages']];
    }
  } else if (typeof data['existingImages[]'] !== 'undefined') {
    if (Array.isArray(data['existingImages[]'])) {
      existingImages = data['existingImages[]'];
    } else if (typeof data['existingImages[]'] === 'string') {
      existingImages = [data['existingImages[]']];
    }
  }
  let newImages = [];
  if (files && files.length > 0) {
    if (files[0].buffer) {
      // Cloudinary upload (memory storage)
      for (const file of files) {
        try {
          const uploadRes = await uploadToCloudinary(file);
          newImages.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary upload error:', err);
        }
      }
    } else {
      // Disk storage fallback
      newImages = files.map(file => file.path);
    }
  }
  property.images = [...existingImages, ...newImages];

  property.updatedAt = new Date();
  await property.save();
  // Always return the latest property from the DB
  return await Property.findById(id);
};

exports.deleteProperty = async (id) => {
  return await Property.findByIdAndDelete(id);
};

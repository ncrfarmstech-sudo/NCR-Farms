const FeaturedProduct = require('../models/FeaturedProduct');

exports.createFeaturedProduct = async (data) => {
  const product = new FeaturedProduct(data);
  return await product.save();
};

exports.getFeaturedProducts = async (filter = {}) => {
  return await FeaturedProduct.find(filter);
};

exports.getFeaturedProductById = async (id) => {
  return await FeaturedProduct.findById(id);
};

exports.updateFeaturedProduct = async (id, data, files) => {
  const product = await FeaturedProduct.findById(id);
  if (!product) return null;

  if (typeof data.title !== 'undefined') product.title = data.title;
  if (typeof data.description !== 'undefined') product.description = data.description;
  if (typeof data.price !== 'undefined') product.price = data.price;
  if (typeof data.productType !== 'undefined') product.productType = data.productType;
  if (typeof data['address.street'] !== 'undefined') product.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') product.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') product.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') product.address.pincode = data['address.pincode'];
  if (typeof data['features.bedrooms'] !== 'undefined') product.features.bedrooms = data['features.bedrooms'];
  if (typeof data['features.bathrooms'] !== 'undefined') product.features.bathrooms = data['features.bathrooms'];
  if (typeof data['features.area'] !== 'undefined') product.features.area = data['features.area'];
  if (typeof data['features.furnished'] !== 'undefined') product.features.furnished = data['features.furnished'] === 'true' || data['features.furnished'] === true;

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
        const uploadRes = await require('../services/propertyService').uploadToCloudinary(file);
        newImages.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }
  product.images = [...existingImages, ...newImages];
  product.updatedAt = new Date();
  await product.save();
  return await FeaturedProduct.findById(id);
};

exports.deleteFeaturedProduct = async (id) => {
  return await FeaturedProduct.findByIdAndDelete(id);
};

// PATCH: Partial update featured product (only changed fields)
const { uploadToCloudinary } = require('./propertyService');
exports.partialUpdateFeaturedProduct = async (id, data, files) => {
  console.log('--- partialUpdateFeaturedProduct called ---');
  console.log('Received data:', data);
  console.log('Received files:', files);
  const product = await FeaturedProduct.findById(id);
  if (!product) return null;

  // Only update provided fields
  if (typeof data.title !== 'undefined') product.title = data.title;
  if (typeof data.tag !== 'undefined') product.tag = data.tag;
  if (typeof data.description !== 'undefined') product.description = data.description;
  if (typeof data.price !== 'undefined') product.price = data.price;
  if (typeof data.locationName !== 'undefined') product.locationName = data.locationName;
  if (typeof data.productType !== 'undefined') product.productType = data.productType;
  if (typeof data['address.street'] !== 'undefined') product.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') product.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') product.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') product.address.pincode = data['address.pincode'];
  if (typeof data['features.area'] !== 'undefined') product.features.area = data['features.area'];

  // Handle images (merge existing and new)
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
  console.log('Parsed existingImages:', existingImages);
  let newImages = [];
  // Always expect files as an object with .images (from multer.fields)
  let imageFiles = [];
  if (files && files.images) {
    if (Array.isArray(files.images)) {
      imageFiles = files.images;
    } else if (typeof files.images === 'object') {
      imageFiles = [files.images];
    }
  }
  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        newImages.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }
  console.log('Parsed newImages:', newImages);
  product.images = [...existingImages, ...newImages];
  console.log('Final product.images:', product.images);
  product.updatedAt = new Date();
  await product.save();
  return await FeaturedProduct.findById(id);
};
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
  console.log('--- updateFeaturedProduct called ---');
  console.log('Received data:', data);
  console.log('Received files:', files);
  const product = await FeaturedProduct.findById(id);
  if (!product) return null;

  if (typeof data.title !== 'undefined') product.title = data.title;
  if (typeof data.tag !== 'undefined') product.tag = data.tag;
  if (typeof data.description !== 'undefined') product.description = data.description;
  if (typeof data.price !== 'undefined') product.price = data.price;
  if (typeof data.locationName !== 'undefined') product.locationName = data.locationName;
  if (typeof data.productType !== 'undefined') product.productType = data.productType;
  if (typeof data['address.street'] !== 'undefined') product.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') product.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') product.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') product.address.pincode = data['address.pincode'];
  if (typeof data['features.area'] !== 'undefined') product.features.area = data['features.area'];

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
  console.log('Parsed existingImages:', existingImages);
  let newImages = [];
  // Accept both array and object for files.images (multer can send either)
  let imageFiles = [];
  if (files && files.images) {
    if (Array.isArray(files.images)) {
      imageFiles = files.images;
    } else if (typeof files.images === 'object') {
      imageFiles = [files.images];
    }
  }
  if (imageFiles.length > 0) {
    for (const file of imageFiles) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        newImages.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }
  console.log('Parsed newImages:', newImages);
  product.images = [...existingImages, ...newImages];
  console.log('Final product.images:', product.images);
  product.updatedAt = new Date();
  await product.save();
  return await FeaturedProduct.findById(id);
};

exports.deleteFeaturedProduct = async (id) => {
  return await FeaturedProduct.findByIdAndDelete(id);
};

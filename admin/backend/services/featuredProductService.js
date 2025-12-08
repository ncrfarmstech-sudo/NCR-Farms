// PATCH: Partial update featured product (only changed fields)
const { uploadToCloudinary } = require('./propertyService');
exports.partialUpdateFeaturedProduct = async (id, data, files, block1Files, block2Files, block3Files) => {
  console.log('--- partialUpdateFeaturedProduct called ---');
  console.log('Received data:', data);
  console.log('Received files:', files);
  console.log('Received block1Files:', block1Files);
  console.log('Received block2Files:', block2Files);
  console.log('Received block3Files:', block3Files);
  const product = await FeaturedProduct.findById(id);
  if (!product) return null;

  // Only update provided fields
  if (typeof data.title !== 'undefined') product.title = data.title;
  if (typeof data.tag !== 'undefined') product.tag = data.tag;
  if (typeof data.description !== 'undefined') product.description = data.description;
  if (typeof data.price !== 'undefined') product.price = data.price;
  if (typeof data.locationName !== 'undefined') product.locationName = data.locationName;
  if (typeof data.propertyType !== 'undefined') product.propertyType = data.propertyType;
  if (typeof data['address.street'] !== 'undefined') product.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') product.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') product.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') product.address.pincode = data['address.pincode'];
  if (typeof data['features.area'] !== 'undefined') product.features.area = data['features.area'];

  // Handle block1 fields
  if (typeof data['block1.heading'] !== 'undefined') {
    if (!product.block1) product.block1 = {};
    product.block1.heading = data['block1.heading'];
  }
  if (typeof data['block1.description'] !== 'undefined') {
    if (!product.block1) product.block1 = {};
    product.block1.description = data['block1.description'];
  }

  // Handle block2 fields
  if (typeof data['block2.heading'] !== 'undefined') {
    if (!product.block2) product.block2 = {};
    product.block2.heading = data['block2.heading'];
  }
  if (typeof data['block2.description'] !== 'undefined') {
    if (!product.block2) product.block2 = {};
    product.block2.description = data['block2.description'];
  }

  // Handle block3 fields
  if (typeof data['block3.heading'] !== 'undefined') {
    if (!product.block3) product.block3 = {};
    product.block3.heading = data['block3.heading'];
  }
  if (typeof data['block3.description'] !== 'undefined') {
    if (!product.block3) product.block3 = {};
    product.block3.description = data['block3.description'];
  }

  // Handle block1 images
  if (block1Files && block1Files.length > 0) {
    if (!product.block1) product.block1 = {};
    let existingBlock1Images = [];
    if (typeof data['existingBlock1Images[]'] !== 'undefined') {
      if (Array.isArray(data['existingBlock1Images[]'])) {
        existingBlock1Images = data['existingBlock1Images[]'];
      } else if (typeof data['existingBlock1Images[]'] === 'string') {
        existingBlock1Images = [data['existingBlock1Images[]']];
      }
    }
    let newBlock1Images = [];
    for (const file of block1Files) {
      try {
        const uploadRes = await uploadToCloudinary(file, 'featured-products');
        newBlock1Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block1 upload error:', err);
      }
    }
    product.block1.images = [...existingBlock1Images, ...newBlock1Images];
  }

  // Handle block2 images
  if (block2Files && block2Files.length > 0) {
    if (!product.block2) product.block2 = {};
    let existingBlock2Images = [];
    if (typeof data['existingBlock2Images[]'] !== 'undefined') {
      if (Array.isArray(data['existingBlock2Images[]'])) {
        existingBlock2Images = data['existingBlock2Images[]'];
      } else if (typeof data['existingBlock2Images[]'] === 'string') {
        existingBlock2Images = [data['existingBlock2Images[]']];
      }
    }
    let newBlock2Images = [];
    for (const file of block2Files) {
      try {
        const uploadRes = await uploadToCloudinary(file, 'featured-products');
        newBlock2Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block2 upload error:', err);
      }
    }
    product.block2.images = [...existingBlock2Images, ...newBlock2Images];
  }

  // Handle block3 images
  if (block3Files && block3Files.length > 0) {
    if (!product.block3) product.block3 = {};
    let existingBlock3Images = [];
    if (typeof data['existingBlock3Images[]'] !== 'undefined') {
      if (Array.isArray(data['existingBlock3Images[]'])) {
        existingBlock3Images = data['existingBlock3Images[]'];
      } else if (typeof data['existingBlock3Images[]'] === 'string') {
        existingBlock3Images = [data['existingBlock3Images[]']];
      }
    }
    let newBlock3Images = [];
    for (const file of block3Files) {
      try {
        const uploadRes = await uploadToCloudinary(file, 'featured-products');
        newBlock3Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block3 upload error:', err);
      }
    }
    product.block3.images = [...existingBlock3Images, ...newBlock3Images];
  }

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

exports.updateFeaturedProduct = async (id, data, files, block1Files, block2Files, block3Files) => {
  console.log('--- updateFeaturedProduct called ---');
  console.log('Received data:', data);
  console.log('Received files:', files);
  console.log('Received block1Files:', block1Files);
  console.log('Received block2Files:', block2Files);
  console.log('Received block3Files:', block3Files);
  const product = await FeaturedProduct.findById(id);
  if (!product) return null;

  if (typeof data.title !== 'undefined') product.title = data.title;
  if (typeof data.tag !== 'undefined') product.tag = data.tag;
  if (typeof data.description !== 'undefined') product.description = data.description;
  if (typeof data.price !== 'undefined') product.price = data.price;
  if (typeof data.locationName !== 'undefined') product.locationName = data.locationName;
  if (typeof data.propertyType !== 'undefined') product.propertyType = data.propertyType;
  if (typeof data['address.street'] !== 'undefined') product.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') product.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') product.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') product.address.pincode = data['address.pincode'];
  if (typeof data['features.area'] !== 'undefined') product.features.area = data['features.area'];

  // Handle block1 fields
  if (typeof data['block1.heading'] !== 'undefined') {
    if (!product.block1) product.block1 = {};
    product.block1.heading = data['block1.heading'];
  }
  if (typeof data['block1.description'] !== 'undefined') {
    if (!product.block1) product.block1 = {};
    product.block1.description = data['block1.description'];
  }

  // Handle block2 fields
  if (typeof data['block2.heading'] !== 'undefined') {
    if (!product.block2) product.block2 = {};
    product.block2.heading = data['block2.heading'];
  }
  if (typeof data['block2.description'] !== 'undefined') {
    if (!product.block2) product.block2 = {};
    product.block2.description = data['block2.description'];
  }

  // Handle block3 fields
  if (typeof data['block3.heading'] !== 'undefined') {
    if (!product.block3) product.block3 = {};
    product.block3.heading = data['block3.heading'];
  }
  if (typeof data['block3.description'] !== 'undefined') {
    if (!product.block3) product.block3 = {};
    product.block3.description = data['block3.description'];
  }

  // Handle block1 images
  if (block1Files && block1Files.length > 0) {
    if (!product.block1) product.block1 = {};
    let existingBlock1Images = [];
    if (typeof data['existingBlock1Images[]'] !== 'undefined') {
      if (Array.isArray(data['existingBlock1Images[]'])) {
        existingBlock1Images = data['existingBlock1Images[]'];
      } else if (typeof data['existingBlock1Images[]'] === 'string') {
        existingBlock1Images = [data['existingBlock1Images[]']];
      }
    }
    let newBlock1Images = [];
    for (const file of block1Files) {
      try {
        const uploadRes = await uploadToCloudinary(file, 'featured-products');
        newBlock1Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block1 upload error:', err);
      }
    }
    product.block1.images = [...existingBlock1Images, ...newBlock1Images];
  }

  // Handle block2 images
  if (block2Files && block2Files.length > 0) {
    if (!product.block2) product.block2 = {};
    let existingBlock2Images = [];
    if (typeof data['existingBlock2Images[]'] !== 'undefined') {
      if (Array.isArray(data['existingBlock2Images[]'])) {
        existingBlock2Images = data['existingBlock2Images[]'];
      } else if (typeof data['existingBlock2Images[]'] === 'string') {
        existingBlock2Images = [data['existingBlock2Images[]']];
      }
    }
    let newBlock2Images = [];
    for (const file of block2Files) {
      try {
        const uploadRes = await uploadToCloudinary(file, 'featured-products');
        newBlock2Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block2 upload error:', err);
      }
    }
    product.block2.images = [...existingBlock2Images, ...newBlock2Images];
  }

  // Handle block3 images
  if (block3Files && block3Files.length > 0) {
    if (!product.block3) product.block3 = {};
    let existingBlock3Images = [];
    if (typeof data['existingBlock3Images[]'] !== 'undefined') {
      if (Array.isArray(data['existingBlock3Images[]'])) {
        existingBlock3Images = data['existingBlock3Images[]'];
      } else if (typeof data['existingBlock3Images[]'] === 'string') {
        existingBlock3Images = [data['existingBlock3Images[]']];
      }
    }
    let newBlock3Images = [];
    for (const file of block3Files) {
      try {
        const uploadRes = await uploadToCloudinary(file, 'featured-products');
        newBlock3Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block3 upload error:', err);
      }
    }
    product.block3.images = [...existingBlock3Images, ...newBlock3Images];
  }

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

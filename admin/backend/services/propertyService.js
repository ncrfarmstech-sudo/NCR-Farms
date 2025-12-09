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

exports.partialUpdateProperty = async (id, data, files, block1Files, block2Files, block3Files) => {
  const property = await Property.findById(id);
  if (!property) return null;

  // Update only provided fields (partial update)
  if (typeof data.title !== 'undefined') property.title = data.title;
  if (typeof data.description !== 'undefined') property.description = data.description;
  if (typeof data.price !== 'undefined') property.price = data.price;
  if (typeof data.locationName !== 'undefined') property.locationName = data.locationName;
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

  // Update Block 1 fields
  if (typeof data['block1.heading'] !== 'undefined' || typeof data['block1Heading'] !== 'undefined') {
    property.block1.heading = data['block1.heading'] || data['block1Heading'] || '';
  }
  if (typeof data['block1.description'] !== 'undefined' || typeof data['block1Description'] !== 'undefined') {
    property.block1.description = data['block1.description'] || data['block1Description'] || '';
  }

  // Update Block 2 fields
  if (typeof data['block2.heading'] !== 'undefined' || typeof data['block2Heading'] !== 'undefined') {
    if (!property.block2) property.block2 = {};
    property.block2.heading = data['block2.heading'] || data['block2Heading'] || '';
  }
  if (typeof data['block2.description'] !== 'undefined' || typeof data['block2Description'] !== 'undefined') {
    if (!property.block2) property.block2 = {};
    property.block2.description = data['block2.description'] || data['block2Description'] || '';
  }

  // Update Block 3 fields
  if (typeof data['block3.heading'] !== 'undefined' || typeof data['block3Heading'] !== 'undefined') {
    if (!property.block3) property.block3 = {};
    property.block3.heading = data['block3.heading'] || data['block3Heading'] || '';
  }
  if (typeof data['block3.description'] !== 'undefined' || typeof data['block3Description'] !== 'undefined') {
    if (!property.block3) property.block3 = {};
    property.block3.description = data['block3.description'] || data['block3Description'] || '';
  }

  // Update Highlights fields
  if (typeof data['highlights.heading'] !== 'undefined') {
    if (!property.highlights) property.highlights = { items: [] };
    property.highlights.heading = data['highlights.heading'];
  }
  // Handle highlights items (expecting highlights.items.0.text, highlights.items.0.icon, etc.)
  const highlightItems = [];
  for (let i = 0; i < 3; i++) {
    const text = data[`highlights.items.${i}.text`];
    const icon = data[`highlights.items.${i}.icon`];
    if (text !== undefined || icon !== undefined) {
      highlightItems.push({
        text: text || '',
        icon: icon || 'FaCheckCircle'
      });
    }
  }
  if (highlightItems.length > 0) {
    if (!property.highlights) property.highlights = {};
    property.highlights.items = highlightItems;
  }

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

  // Handle Block 1 images separately
  let existingBlock1Images = [];
  if (typeof data['existingBlock1Images'] !== 'undefined') {
    if (Array.isArray(data['existingBlock1Images'])) {
      existingBlock1Images = data['existingBlock1Images'];
    } else if (typeof data['existingBlock1Images'] === 'string') {
      existingBlock1Images = [data['existingBlock1Images']];
    }
  } else if (typeof data['existingBlock1Images[]'] !== 'undefined') {
    if (Array.isArray(data['existingBlock1Images[]'])) {
      existingBlock1Images = data['existingBlock1Images[]'];
    } else if (typeof data['existingBlock1Images[]'] === 'string') {
      existingBlock1Images = [data['existingBlock1Images[]']];
    }
  }

  // Handle Block 2 images
  let existingBlock2Images = [];
  if (typeof data['existingBlock2Images'] !== 'undefined') {
    if (Array.isArray(data['existingBlock2Images'])) {
      existingBlock2Images = data['existingBlock2Images'];
    } else if (typeof data['existingBlock2Images'] === 'string') {
      existingBlock2Images = [data['existingBlock2Images']];
    }
  } else if (typeof data['existingBlock2Images[]'] !== 'undefined') {
    if (Array.isArray(data['existingBlock2Images[]'])) {
      existingBlock2Images = data['existingBlock2Images[]'];
    } else if (typeof data['existingBlock2Images[]'] === 'string') {
      existingBlock2Images = [data['existingBlock2Images[]']];
    }
  }

  // Handle Block 3 images
  let existingBlock3Images = [];
  if (typeof data['existingBlock3Images'] !== 'undefined') {
    if (Array.isArray(data['existingBlock3Images'])) {
      existingBlock3Images = data['existingBlock3Images'];
    } else if (typeof data['existingBlock3Images'] === 'string') {
      existingBlock3Images = [data['existingBlock3Images']];
    }
  } else if (typeof data['existingBlock3Images[]'] !== 'undefined') {
    if (Array.isArray(data['existingBlock3Images[]'])) {
      existingBlock3Images = data['existingBlock3Images[]'];
    } else if (typeof data['existingBlock3Images[]'] === 'string') {
      existingBlock3Images = [data['existingBlock3Images[]']];
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

  let newBlock1Images = [];
  if (block1Files && block1Files.length > 0) {
    for (const file of block1Files) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        newBlock1Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary upload error:', err);
      }
    }
  }

  let newBlock2Images = [];
  if (block2Files && block2Files.length > 0) {
    for (const file of block2Files) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        newBlock2Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block2 upload error:', err);
      }
    }
  }

  let newBlock3Images = [];
  if (block3Files && block3Files.length > 0) {
    for (const file of block3Files) {
      try {
        const uploadRes = await uploadToCloudinary(file);
        newBlock3Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block3 upload error:', err);
      }
    }
  }

  property.images = [...existingImages, ...newImages];
  property.block1.images = [...existingBlock1Images, ...newBlock1Images];
  
  // Update Block 2 and Block 3 images
  if (block2Files?.length > 0 || existingBlock2Images.length > 0) {
    if (!property.block2) property.block2 = {};
    property.block2.images = [...existingBlock2Images, ...newBlock2Images];
  }
  
  if (block3Files?.length > 0 || existingBlock3Images.length > 0) {
    if (!property.block3) property.block3 = {};
    property.block3.images = [...existingBlock3Images, ...newBlock3Images];
  }

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

exports.updateProperty = async (id, data, files, block1Files, block2Files, block3Files) => {
  const property = await Property.findById(id);
  if (!property) return null;

  // Update only provided fields (partial update)
  if (typeof data.title !== 'undefined') property.title = data.title;
  if (typeof data.description !== 'undefined') property.description = data.description;
  if (typeof data.price !== 'undefined') property.price = data.price;
  if (typeof data.locationName !== 'undefined') property.locationName = data.locationName;
  if (typeof data.propertyType !== 'undefined') property.propertyType = data.propertyType;
  if (typeof data.detailedHeading !== 'undefined') property.detailedHeading = data.detailedHeading;
  if (typeof data.detailedContent !== 'undefined') property.detailedContent = data.detailedContent;
  
  // Address
  if (typeof data['address.street'] !== 'undefined') property.address.street = data['address.street'];
  if (typeof data['address.city'] !== 'undefined') property.address.city = data['address.city'];
  if (typeof data['address.state'] !== 'undefined') property.address.state = data['address.state'];
  if (typeof data['address.pincode'] !== 'undefined') property.address.pincode = data['address.pincode'];
  
  // Features
  if (typeof data['features.area'] !== 'undefined') property.features.area = data['features.area'];
  if (typeof data['features.furnished'] !== 'undefined') property.features.furnished = data['features.furnished'] === 'true' || data['features.furnished'] === true;

  // Handle block1 fields
  if (typeof data['block1.heading'] !== 'undefined') {
    if (!property.block1) property.block1 = {};
    property.block1.heading = data['block1.heading'];
  }
  if (typeof data['block1.description'] !== 'undefined') {
    if (!property.block1) property.block1 = {};
    property.block1.description = data['block1.description'];
  }

  // Handle block2 fields
  if (typeof data['block2.heading'] !== 'undefined') {
    if (!property.block2) property.block2 = {};
    property.block2.heading = data['block2.heading'];
  }
  if (typeof data['block2.description'] !== 'undefined') {
    if (!property.block2) property.block2 = {};
    property.block2.description = data['block2.description'];
  }

  // Handle block3 fields
  if (typeof data['block3.heading'] !== 'undefined') {
    if (!property.block3) property.block3 = {};
    property.block3.heading = data['block3.heading'];
  }
  if (typeof data['block3.description'] !== 'undefined') {
    if (!property.block3) property.block3 = {};
    property.block3.description = data['block3.description'];
  }

  // Update Highlights fields for updateProperty
  if (typeof data['highlights.heading'] !== 'undefined') {
    if (!property.highlights) property.highlights = { items: [] };
    property.highlights.heading = data['highlights.heading'];
  }
  const highlightItems = [];
  for (let i = 0; i < 3; i++) {
    const text = data[`highlights.items.${i}.text`];
    const icon = data[`highlights.items.${i}.icon`];
    if (text !== undefined || icon !== undefined) {
      highlightItems.push({
        text: text || '',
        icon: icon || 'FaCheckCircle'
      });
    }
  }
  if (highlightItems.length > 0) {
    if (!property.highlights) property.highlights = {};
    property.highlights.items = highlightItems;
  }

  // Handle block1 images
  if (block1Files && block1Files.length > 0) {
    if (!property.block1) property.block1 = {};
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
        const uploadRes = await uploadToCloudinary(file);
        newBlock1Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block1 upload error:', err);
      }
    }
    property.block1.images = [...existingBlock1Images, ...newBlock1Images];
  }

  // Handle block2 images
  if (block2Files && block2Files.length > 0) {
    if (!property.block2) property.block2 = {};
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
        const uploadRes = await uploadToCloudinary(file);
        newBlock2Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block2 upload error:', err);
      }
    }
    property.block2.images = [...existingBlock2Images, ...newBlock2Images];
  }

  // Handle block3 images
  if (block3Files && block3Files.length > 0) {
    if (!property.block3) property.block3 = {};
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
        const uploadRes = await uploadToCloudinary(file);
        newBlock3Images.push(uploadRes.secure_url);
      } catch (err) {
        console.error('Cloudinary block3 upload error:', err);
      }
    }
    property.block3.images = [...existingBlock3Images, ...newBlock3Images];
  }

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

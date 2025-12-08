// PATCH: Partial update property
exports.partialUpdateProperty = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const block1Files = req.files && req.files['block1Images'] ? req.files['block1Images'] : [];
    const block2Files = req.files && req.files['block2Images'] ? req.files['block2Images'] : [];
    const block3Files = req.files && req.files['block3Images'] ? req.files['block3Images'] : [];
    const property = await propertyService.partialUpdateProperty(req.params.id, req.body, files, block1Files, block2Files, block3Files);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const propertyService = require('../services/propertyService');

exports.createProperty = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const block1Files = req.files && req.files['block1Images'] ? req.files['block1Images'] : [];
    const block2Files = req.files && req.files['block2Images'] ? req.files['block2Images'] : [];
    const block3Files = req.files && req.files['block3Images'] ? req.files['block3Images'] : [];
    console.log('=== createProperty Called ===');
    console.log('Images files:', files.length, 'items');
    console.log('Block1 files:', block1Files.length, 'items');
    console.log('Block2 files:', block2Files.length, 'items');
    console.log('Block3 files:', block3Files.length, 'items');
    console.log('Form data:', Object.keys(req.body));
    // Use the same upload logic as PATCH
    let imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const uploadRes = await propertyService.uploadToCloudinary(file);
          imageUrls.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary upload error:', err);
        }
      }
    }
    let block1ImageUrls = [];
    if (block1Files && block1Files.length > 0) {
      for (const file of block1Files) {
        try {
          const uploadRes = await propertyService.uploadToCloudinary(file);
          block1ImageUrls.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary upload error:', err);
        }
      }
    }
    let block2ImageUrls = [];
    if (block2Files && block2Files.length > 0) {
      for (const file of block2Files) {
        try {
          const uploadRes = await propertyService.uploadToCloudinary(file);
          block2ImageUrls.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary block2 upload error:', err);
        }
      }
    }
    let block3ImageUrls = [];
    if (block3Files && block3Files.length > 0) {
      for (const file of block3Files) {
        try {
          const uploadRes = await propertyService.uploadToCloudinary(file);
          block3ImageUrls.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary block3 upload error:', err);
        }
      }
    }
    const block1Data = req.body['block1.heading'] || req.body['block1Heading'] ? {
      heading: req.body['block1.heading'] || req.body['block1Heading'] || '',
      description: req.body['block1.description'] || req.body['block1Description'] || '',
      images: block1ImageUrls
    } : undefined;
    const block2Data = req.body['block2.heading'] || req.body['block2Heading'] ? {
      heading: req.body['block2.heading'] || req.body['block2Heading'] || '',
      description: req.body['block2.description'] || req.body['block2Description'] || '',
      images: block2ImageUrls
    } : undefined;
    const block3Data = req.body['block3.heading'] || req.body['block3Heading'] ? {
      heading: req.body['block3.heading'] || req.body['block3Heading'] || '',
      description: req.body['block3.description'] || req.body['block3Description'] || '',
      images: block3ImageUrls
    } : undefined;
    const propertyData = { 
      ...req.body, 
      images: imageUrls,
      ...(block1Data && { block1: block1Data }),
      ...(block2Data && { block2: block2Data }),
      ...(block3Data && { block3: block3Data })
    };
    const property = await propertyService.createProperty(propertyData);
    res.status(201).json(property);
  } catch (err) {
    try {
      console.error('Property creation error:', JSON.stringify(err, null, 2));
    } catch (jsonErr) {
      console.error('Property creation error (non-serializable):', err);
    }
    res.status(400).json({ error: err.message, details: err });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await propertyService.getProperties();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const block1Files = req.files && req.files['block1Images'] ? req.files['block1Images'] : [];
    const block2Files = req.files && req.files['block2Images'] ? req.files['block2Images'] : [];
    const block3Files = req.files && req.files['block3Images'] ? req.files['block3Images'] : [];
    const property = await propertyService.updateProperty(req.params.id, req.body, files, block1Files, block2Files, block3Files);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await propertyService.deleteProperty(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH: Partial update featured product
exports.partialUpdateFeaturedProduct = async (req, res) => {
  console.log('ROUTE HIT: partialUpdateFeaturedProduct');
  console.log('BODY:', req.body);
  console.log('FILES:', req.files);
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const block1Files = req.files && req.files['block1Images'] ? req.files['block1Images'] : [];
    const block2Files = req.files && req.files['block2Images'] ? req.files['block2Images'] : [];
    const block3Files = req.files && req.files['block3Images'] ? req.files['block3Images'] : [];
    const product = await featuredProductService.partialUpdateFeaturedProduct(req.params.id, req.body, files, block1Files, block2Files, block3Files);
    if (!product) return res.status(404).json({ error: 'Featured Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const featuredProductService = require('../services/featuredProductService');

exports.createFeaturedProduct = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const block1Files = req.files && req.files['block1Images'] ? req.files['block1Images'] : [];
    const block2Files = req.files && req.files['block2Images'] ? req.files['block2Images'] : [];
    const block3Files = req.files && req.files['block3Images'] ? req.files['block3Images'] : [];
    let imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const uploadRes = await require('../services/propertyService').uploadToCloudinary(file);
          imageUrls.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary upload error:', err);
        }
      }
    }
    let block1Images = [];
    if (block1Files && block1Files.length > 0) {
      for (const file of block1Files) {
        try {
          const uploadRes = await require('../services/propertyService').uploadToCloudinary(file, 'featured-products');
          block1Images.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary block1 upload error:', err);
        }
      }
    }
    let block2Images = [];
    if (block2Files && block2Files.length > 0) {
      for (const file of block2Files) {
        try {
          const uploadRes = await require('../services/propertyService').uploadToCloudinary(file, 'featured-products');
          block2Images.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary block2 upload error:', err);
        }
      }
    }
    let block3Images = [];
    if (block3Files && block3Files.length > 0) {
      for (const file of block3Files) {
        try {
          const uploadRes = await require('../services/propertyService').uploadToCloudinary(file, 'featured-products');
          block3Images.push(uploadRes.secure_url);
        } catch (err) {
          console.error('Cloudinary block3 upload error:', err);
        }
      }
    }
    const block1Data = req.body['block1.heading'] || req.body['block1.description'] ? {
      heading: req.body['block1.heading'] || '',
      description: req.body['block1.description'] || '',
      images: block1Images
    } : undefined;
    const block2Data = req.body['block2.heading'] || req.body['block2.description'] ? {
      heading: req.body['block2.heading'] || '',
      description: req.body['block2.description'] || '',
      images: block2Images
    } : undefined;
    const block3Data = req.body['block3.heading'] || req.body['block3.description'] ? {
      heading: req.body['block3.heading'] || '',
      description: req.body['block3.description'] || '',
      images: block3Images
    } : undefined;
    const data = { ...req.body, images: imageUrls };
    if (block1Data) data.block1 = block1Data;
    if (block2Data) data.block2 = block2Data;
    if (block3Data) data.block3 = block3Data;
    const product = await featuredProductService.createFeaturedProduct(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await featuredProductService.getFeaturedProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeaturedProductById = async (req, res) => {
  try {
    const product = await featuredProductService.getFeaturedProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Featured Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFeaturedProduct = async (req, res) => {
  console.log('ROUTE HIT: updateFeaturedProduct');
  console.log('BODY:', req.body);
  console.log('FILES:', req.files);
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
    const block1Files = req.files && req.files['block1Images'] ? req.files['block1Images'] : [];
    const block2Files = req.files && req.files['block2Images'] ? req.files['block2Images'] : [];
    const block3Files = req.files && req.files['block3Images'] ? req.files['block3Images'] : [];
    const product = await featuredProductService.updateFeaturedProduct(req.params.id, req.body, files, block1Files, block2Files, block3Files);
    if (!product) return res.status(404).json({ error: 'Featured Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFeaturedProduct = async (req, res) => {
  try {
    const product = await featuredProductService.deleteFeaturedProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'Featured Product not found' });
    res.json({ message: 'Featured Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

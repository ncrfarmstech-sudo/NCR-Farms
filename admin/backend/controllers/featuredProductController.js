const featuredProductService = require('../services/featuredProductService');

exports.createFeaturedProduct = async (req, res) => {
  try {
    const files = req.files && req.files['images'] ? req.files['images'] : [];
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
    const data = { ...req.body, images: imageUrls };
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
  try {
    const files = req.files || [];
    const product = await featuredProductService.updateFeaturedProduct(req.params.id, req.body, files);
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

const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});
const featuredProductController = require('../controllers/featuredProductController');

router.post('/', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'block1Images', maxCount: 2 },
  { name: 'files', maxCount: 20 },
  { name: 'file', maxCount: 20 }
]), featuredProductController.createFeaturedProduct);
router.get('/', featuredProductController.getFeaturedProducts);
router.get('/:id', featuredProductController.getFeaturedProductById);
router.put('/:id', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'block1Images', maxCount: 2 },
  { name: 'files', maxCount: 20 },
  { name: 'file', maxCount: 20 }
]), featuredProductController.updateFeaturedProduct);

// PATCH: Partial update (only changed fields)
router.patch('/:id', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'block1Images', maxCount: 2 },
  { name: 'files', maxCount: 20 },
  { name: 'file', maxCount: 20 }
]), featuredProductController.partialUpdateFeaturedProduct);
router.delete('/:id', featuredProductController.deleteFeaturedProduct);

module.exports = router;

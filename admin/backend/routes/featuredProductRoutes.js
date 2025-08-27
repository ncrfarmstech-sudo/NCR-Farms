const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const featuredProductController = require('../controllers/featuredProductController');

router.post('/', upload.fields([
  { name: 'images', maxCount: 10 }
]), featuredProductController.createFeaturedProduct);
router.get('/', featuredProductController.getFeaturedProducts);
router.get('/:id', featuredProductController.getFeaturedProductById);
router.put('/:id', upload.fields([
  { name: 'images', maxCount: 10 }
]), featuredProductController.updateFeaturedProduct);

// PATCH: Partial update (only changed fields)
router.patch('/:id', upload.fields([
  { name: 'images', maxCount: 10 }
]), featuredProductController.partialUpdateFeaturedProduct);
router.delete('/:id', featuredProductController.deleteFeaturedProduct);

module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});
const propertyController = require('../controllers/propertyController');

// Create property with image upload - accept all file fields
router.post('/', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'block1Images', maxCount: 2 },
  { name: 'block2Images', maxCount: 2 },
  { name: 'block3Images', maxCount: 2 },
  { name: 'files', maxCount: 20 },
  { name: 'file', maxCount: 20 }
]), propertyController.createProperty);
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'block1Images', maxCount: 2 },
  { name: 'block2Images', maxCount: 2 },
  { name: 'block3Images', maxCount: 2 },
  { name: 'files', maxCount: 20 },
  { name: 'file', maxCount: 20 }
]), propertyController.updateProperty);
router.patch('/:id', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'block1Images', maxCount: 2 },
  { name: 'block2Images', maxCount: 2 },
  { name: 'block3Images', maxCount: 2 },
  { name: 'files', maxCount: 20 },
  { name: 'file', maxCount: 20 }
]), propertyController.partialUpdateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;

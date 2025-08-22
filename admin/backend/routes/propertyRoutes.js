
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const propertyController = require('../controllers/propertyController');

// Create property with image upload
router.post('/', upload.fields([
	{ name: 'images', maxCount: 10 }
]), propertyController.createProperty);
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.put('/:id', upload.fields([
	{ name: 'images', maxCount: 10 }
]), propertyController.updateProperty);
router.patch('/:id', upload.fields([
	{ name: 'images', maxCount: 10 }
]), propertyController.partialUpdateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;


const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Simple GET route to verify reachability
router.get('/upload', (req, res) => {
  res.json({ message: 'Upload route is reachable' });
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'properties',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// Upload multiple images
router.post('/upload', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      console.error('No files received:', req.files);
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const urls = req.files.map(file => file.path);
    res.json({ urls });
  } catch (err) {
    console.error('Image upload error:', err);
    if (err instanceof Error) {
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
    } else {
      try {
        console.error('Error details:', JSON.stringify(err, null, 2));
      } catch (jsonErr) {
        console.error('Error (non-serializable):', err);
      }
    }
    res.status(500).json({ error: err.message || 'Unknown error', details: err });
  }
});

module.exports = router;

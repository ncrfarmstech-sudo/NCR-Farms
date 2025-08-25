


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactUsRoutes');
const blogRoutes = require('./routes/blogRoutes'); // ✅ import blog routes
const propertyRoutes = require('./routes/propertyRoutes');
// ensure cloudinary config is loaded (optional)
require('./config/cloudinary');

const app = express();


const allowedOrigins = [
  'http://localhost:5173',
  'https://ncr-farms.onrender.com',
  'https://ncr-farms-rx04.onrender.com' // <-- your actual frontend domain
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to verify server and routing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// API routes
app.use('/api/contactus', contactRoutes);
app.use('/api/blogs', blogRoutes); // ✅ register blog routes
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server', err);
  });

// Global error handler for better error logging (must be after all routes)
app.use((err, req, res, next) => {
  try {
    console.error('Global error:', JSON.stringify(err, null, 2));
  } catch (jsonErr) {
    console.error('Global error (non-serializable):', err);
  }
  res.status(500).json({ error: err.message || 'Internal Server Error', details: err });
});

module.exports = app;

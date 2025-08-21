require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactUsRoutes');
const blogRoutes = require('./routes/blogRoutes'); // ✅ import blog routes
// ensure cloudinary config is loaded (optional)
require('./config/cloudinary');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/contactus', contactRoutes);
app.use('/api/blogs', blogRoutes); // ✅ register blog routes

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server', err);
  });

module.exports = app;

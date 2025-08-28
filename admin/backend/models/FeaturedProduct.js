const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  propertyType: { type: String, enum: ['Built up farmhouse', 'Gated Farmhouse', 'Agricultural land', 'Farmland'], required: true },
  locationName: {
    type: String,
    enum: ['Gurgaon', 'Sohna', 'Noida', 'Alwar', 'Neemrana', 'Faridabad'],
    required: true
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  // location field removed
  features: {
    area: { type: Number }
    // bedrooms, bathrooms, furnished removed as per property model changes
  },
  images: [{ type: String }],
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('FeaturedProduct', featuredProductSchema);

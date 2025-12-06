const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  propertyType: { type: String, enum: ['Built up farmhouse', 'Gated Farmhouse', 'Agricultural land', 'Farmland'], required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  locationName: {
    type: String,
    required: true
  },
  // location field removed
  features: {

    area: { type: Number },
    // furnished removed as per new requirements
  },
  images: [{ type: String }],
  block1: {
    heading: { type: String },
    description: { type: String },
    images: [{ type: String }]
  },
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Property', propertySchema);

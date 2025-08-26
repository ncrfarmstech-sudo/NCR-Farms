const mongoose = require('mongoose');

const featuredProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  productType: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  features: {
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: Number },
    furnished: { type: Boolean }
  },
  images: [{ type: String }],
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

featuredProductSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('FeaturedProduct', featuredProductSchema);

const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true,
    ref: 'Product'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  images_list: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: null
  },
  sku: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for faster queries
productVariantSchema.index({ id: 1 }, { unique: true });
productVariantSchema.index({ product_id: 1 });
productVariantSchema.index({ price: 1 });
productVariantSchema.index({ stock: 1 });
productVariantSchema.index({ name: 'text' }); // Text index for search

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports = ProductVariant;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  brand_id: {
    type: Number,
    required: true,
    ref: 'Brand'
  },
  category_id: {
    type: Number,
    required: true,
    ref: 'Category'
  },
  product_name: {
    type: String,
    required: true,
    trim: true
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
productSchema.index({ id: 1 }, { unique: true });
productSchema.index({ brand_id: 1 });
productSchema.index({ category_id: 1 });
productSchema.index({ product_name: 'text' }); // Text index for search

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

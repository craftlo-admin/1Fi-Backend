const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  category_id: {
    type: Number,
    required: true,
    ref: 'Category'
  },
  brand_name: {
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
brandSchema.index({ id: 1 }, { unique: true });
brandSchema.index({ category_id: 1 });
brandSchema.index({ brand_name: 1 });

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;

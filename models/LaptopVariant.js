const mongoose = require('mongoose');

const laptopVariantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  product_variant_id: {
    type: Number,
    required: true,
    ref: 'ProductVariant'
  },
  product_id: {
    type: Number,
    required: true,
    ref: 'Product'
  },
  ram: {
    type: String,
    default: null
  },
  ram_type: {
    type: String,
    default: null
  },
  storage: {
    type: String,
    default: null
  },
  screen_size: {
    type: String,
    default: null
  },
  screen_resolution: {
    type: String,
    default: null
  },
  operating_system: {
    type: String,
    default: null
  },
  weight: {
    type: String,
    default: null
  },
  processor: {
    type: String,
    default: null
  },
  graphics_type: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  product_dimension: {
    type: String,
    default: null
  },
  package: {
    type: String,
    default: null
  },
  warranty_period: {
    type: String,
    default: null
  },
  country_of_origin: {
    type: String,
    default: null
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
laptopVariantSchema.index({ id: 1 }, { unique: true });
laptopVariantSchema.index({ product_variant_id: 1 });
laptopVariantSchema.index({ product_id: 1 });
laptopVariantSchema.index({ processor: 1 });
laptopVariantSchema.index({ operating_system: 1 });

const LaptopVariant = mongoose.model('LaptopVariant', laptopVariantSchema);

module.exports = LaptopVariant;

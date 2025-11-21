const mongoose = require('mongoose');

const mobileVariantSchema = new mongoose.Schema({
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
  color: {
    type: String,
    default: null
  },
  storage_gb: {
    type: Number,
    default: null
  },
  ram_gb: {
    type: Number,
    default: null
  },
  front_camera: {
    type: String,
    default: null
  },
  rear_camera: {
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
  screen_type: {
    type: String,
    default: null
  },
  processor: {
    type: String,
    default: null
  },
  core: {
    type: String,
    default: null
  },
  operating_system: {
    type: String,
    default: null
  },
  sim_type: {
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
mobileVariantSchema.index({ id: 1 }, { unique: true });
mobileVariantSchema.index({ product_variant_id: 1 });
mobileVariantSchema.index({ product_id: 1 });
mobileVariantSchema.index({ color: 1 });
mobileVariantSchema.index({ storage_gb: 1 });
mobileVariantSchema.index({ ram_gb: 1 });

const MobileVariant = mongoose.model('MobileVariant', mobileVariantSchema);

module.exports = MobileVariant;

const mongoose = require('mongoose');

const tvVariantSchema = new mongoose.Schema({
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
  screen_size: {
    type: String,
    default: null
  },
  tv_type: {
    type: String,
    default: null
  },
  screen_resolution: {
    type: String,
    default: null
  },
  hdmi_ports: {
    type: Number,
    default: null
  },
  usb_ports: {
    type: Number,
    default: null
  },
  display_technology: {
    type: String,
    default: null
  },
  supported_apps: {
    type: String,
    default: null
  },
  refresh_rate: {
    type: String,
    default: null
  },
  ram: {
    type: String,
    default: null
  },
  storage: {
    type: String,
    default: null
  },
  model_no: {
    type: String,
    default: null
  },
  product_dimension: {
    type: String,
    default: null
  },
  weight: {
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
tvVariantSchema.index({ id: 1 }, { unique: true });
tvVariantSchema.index({ product_variant_id: 1 });
tvVariantSchema.index({ product_id: 1 });
tvVariantSchema.index({ screen_size: 1 });
tvVariantSchema.index({ tv_type: 1 });

const TVVariant = mongoose.model('TVVariant', tvVariantSchema);

module.exports = TVVariant;

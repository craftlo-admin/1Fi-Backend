const mongoose = require('mongoose');

const emiVariantSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  emi_id: {
    type: Number,
    required: true,
    ref: 'EMI'
  },
  monthly_payment: {
    type: Number,
    required: true,
    min: 0
  },
  tenure: {
    type: Number,
    required: true,
    min: 1
  },
  interest_rate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  cashback: {
    type: Number,
    default: 0.0,
    min: 0
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
emiVariantSchema.index({ id: 1 }, { unique: true });
emiVariantSchema.index({ emi_id: 1 });
emiVariantSchema.index({ tenure: 1 });
emiVariantSchema.index({ monthly_payment: 1 });

const EMIVariant = mongoose.model('EMIVariant', emiVariantSchema);

module.exports = EMIVariant;

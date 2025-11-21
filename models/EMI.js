const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true,
    ref: 'Product'
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
emiSchema.index({ id: 1 }, { unique: true });
emiSchema.index({ product_id: 1 });

const EMI = mongoose.model('EMI', emiSchema);

module.exports = EMI;

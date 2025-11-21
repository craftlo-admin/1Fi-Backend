const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  category_type: {
    type: String,
    required: true,
    enum: ['TV', 'Mobile', 'Laptop']
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

// Index for faster queries
categorySchema.index({ id: 1 }, { unique: true });
categorySchema.index({ category_type: 1 });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

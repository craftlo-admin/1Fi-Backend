// Export all models from a central location
const Category = require('./Category');
const Brand = require('./Brand');
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');
const MobileVariant = require('./MobileVariant');
const TVVariant = require('./TVVariant');
const LaptopVariant = require('./LaptopVariant');
const EMI = require('./EMI');
const EMIVariant = require('./EMIVariant');

module.exports = {
  Category,
  Brand,
  Product,
  ProductVariant,
  MobileVariant,
  TVVariant,
  LaptopVariant,
  EMI,
  EMIVariant
};

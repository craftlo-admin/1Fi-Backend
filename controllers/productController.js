const {
  Category,
  Brand,
  Product,
  ProductVariant,
  MobileVariant,
  TVVariant,
  LaptopVariant,
  EMI,
  EMIVariant
} = require('../models');

const { removeNullValues, formatSpecifications, calculateBestPrice } = require('../utils/helpers');

/**
 * Get all products with variants info
 * @route GET /api/products
 */
exports.getAllProducts = async (req, res) => {
  try {
    // Get all products
    const products = await Product.find().lean();

    // Enrich each product with variant information
    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        // Manually fetch brand and category using numeric IDs
        const brand = await Brand.findOne({ id: product.brand_id }).lean();
        const category = await Category.findOne({ id: product.category_id }).lean();

        // Get all variants for this product
        const variants = await ProductVariant.find({ product_id: product.id })
          .select('id name images_list price stock description')
          .lean();

        // Calculate price range
        const prices = variants.map(v => v.price);
        const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

        // Check stock availability
        const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
        const inStock = totalStock > 0;

        // Get the first variant's image as thumbnail
        const thumbnail = variants.length > 0 && variants[0].images_list.length > 0 
          ? variants[0].images_list[0] 
          : null;

        return {
          id: product.id,
          name: product.product_name,
          brand: brand?.brand_name || 'Unknown',
          category: category?.category_type || 'Unknown',
          thumbnail,
          priceRange: {
            min: minPrice,
            max: maxPrice,
            display: minPrice === maxPrice 
              ? `₹${minPrice.toLocaleString()}` 
              : `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`
          },
          variants: {
            count: variants.length,
            available: variants.filter(v => v.stock > 0).length
          },
          stock: {
            total: totalStock,
            inStock
          },
          _links: {
            self: `/api/products/${product.id}`,
            variants: `/api/products/${product.id}/variants`
          }
        };
      })
    );

    res.json({
      success: true,
      count: enrichedProducts.length,
      data: enrichedProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single product by ID with complete details
 * @route GET /api/products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Get product
    const product = await Product.findOne({ id: productId }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Manually fetch brand and category using numeric IDs
    const brand = await Brand.findOne({ id: product.brand_id }).lean();
    const category = await Category.findOne({ id: product.category_id }).lean();

    // Get all variants for this product
    const variants = await ProductVariant.find({ product_id: productId }).lean();

    // Get category-specific variant details
    const categoryType = category?.category_type;
    let detailedVariants = [];

    for (const variant of variants) {
      let specificDetails = null;

      // Fetch category-specific details based on product category
      if (categoryType === 'Mobile') {
        specificDetails = await MobileVariant.findOne({ 
          product_variant_id: variant.id 
        }).lean();
      } else if (categoryType === 'TV') {
        specificDetails = await TVVariant.findOne({ 
          product_variant_id: variant.id 
        }).lean();
      } else if (categoryType === 'Laptop') {
        specificDetails = await LaptopVariant.findOne({ 
          product_variant_id: variant.id 
        }).lean();
      }

      detailedVariants.push({
        id: variant.id,
        name: variant.name,
        images: variant.images_list || [],
        description: variant.description,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        inStock: variant.stock > 0,
        specifications: specificDetails ? formatSpecifications(specificDetails, categoryType) : {}
      });
    }

    // Get EMI options for this product
    const emi = await EMI.findOne({ product_id: productId }).lean();
    let emiOptions = [];

    if (emi) {
      const emiVariants = await EMIVariant.find({ emi_id: emi.id })
        .sort({ tenure: 1 })
        .lean();

      emiOptions = emiVariants.map(ev => ({
        tenure: ev.tenure,
        monthlyPayment: ev.monthly_payment,
        interestRate: ev.interest_rate,
        cashback: ev.cashback,
        totalAmount: ev.monthly_payment * ev.tenure,
        display: `₹${ev.monthly_payment.toLocaleString()}/month for ${ev.tenure} months`
      }));
    }

    // Calculate price statistics
    const prices = variants.map(v => v.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Prepare EMI options for best price calculation (convert to snake_case format)
    const emiOptionsForCalc = emiOptions.map(emi => ({
      tenure: emi.tenure,
      monthly_payment: emi.monthlyPayment,
      interest_rate: emi.interestRate,
      cashback: emi.cashback
    }));

    // Calculate best price from EMI options
    const bestPriceDetails = calculateBestPrice(emiOptionsForCalc, minPrice);

    // Prepare response
    const response = {
      success: true,
      data: {
        product: {
          id: product.id,
          name: product.product_name,
          brand: brand?.brand_name || 'Unknown',
          category: category?.category_type || 'Unknown'
        },
        pricing: {
          min: minPrice,
          max: maxPrice,
          currency: 'INR',
          display: minPrice === maxPrice 
            ? `₹${minPrice.toLocaleString()}` 
            : `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`
        },
        best_price: {
          effectivePrice: bestPriceDetails.effectivePrice,
          savings: bestPriceDetails.savings,
          recommendedEMI: bestPriceDetails.tenure ? {
            tenure: bestPriceDetails.tenure,
            monthlyPayment: bestPriceDetails.monthlyPayment,
            interestRate: bestPriceDetails.interestRate,
            cashback: bestPriceDetails.cashback,
            totalAmount: bestPriceDetails.totalAmount,
            display: `₹${bestPriceDetails.monthlyPayment.toLocaleString()}/month for ${bestPriceDetails.tenure} months`
          } : null,
          display: bestPriceDetails.savings > 0 
            ? `₹${bestPriceDetails.effectivePrice.toLocaleString()} (Save ₹${bestPriceDetails.savings.toLocaleString()})` 
            : `₹${bestPriceDetails.effectivePrice.toLocaleString()}`
        },
        variants: {
          count: detailedVariants.length,
          items: detailedVariants
        },
        emi: {
          available: emiOptions.length > 0,
          options: emiOptions
        },
        availability: {
          totalStock: variants.reduce((sum, v) => sum + v.stock, 0),
          inStock: variants.some(v => v.stock > 0),
          variantsAvailable: variants.filter(v => v.stock > 0).length
        }
      }
    };

    // Remove all null values from response
    const cleanedResponse = removeNullValues(response);

    res.json(cleanedResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

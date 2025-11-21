const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * ============================================================================
 * API DOCUMENTATION
 * ============================================================================
 * 
 * BASE URL: http://localhost:3000/api
 * 
 * Available Endpoints:
 * 1. GET /api/products          - Get all products with variants info
 * 2. GET /api/products/:id      - Get single product with complete details
 * 
 * ============================================================================
 */

/**
 * ============================================================================
 * ENDPOINT 1: GET ALL PRODUCTS
 * ============================================================================
 * 
 * API CALL: GET /api/products
 * 
 * REQUEST:
 * - Method: GET
 * - URL: http://localhost:3000/api/products
 * - Headers: None required
 * - Body: None
 * - Query Parameters: None
 * 
 * RESPONSE:
 * - Status: 200 OK
 * - Content-Type: application/json
 * - Body: {
 *     success: true,
 *     count: number,
 *     data: [
 *       {
 *         id: number,
 *         name: string,
 *         brand: string,
 *         category: "TV" | "Mobile" | "Laptop",
 *         thumbnail: string (image URL),
 *         priceRange: {
 *           min: number,
 *           max: number,
 *           display: string (formatted price)
 *         },
 *         variants: {
 *           count: number,
 *           available: number (in stock)
 *         },
 *         stock: {
 *           total: number,
 *           inStock: boolean
 *         },
 *         _links: {
 *           self: string (API URL),
 *           variants: string (API URL)
 *         }
 *       }
 *     ]
 *   }
 * 
 * ERROR RESPONSE:
 * - Status: 500 Internal Server Error
 * - Body: { success: false, message: string }
 * 
 * USAGE:
 * - For product listing/grid pages
 * - For homepage product displays
 * - For search results
 * 
 * ============================================================================
 */
router.get('/products', productController.getAllProducts);

/**
 * ============================================================================
 * ENDPOINT 2: GET SINGLE PRODUCT BY ID
 * ============================================================================
 * 
 * API CALL: GET /api/products/:id
 * 
 * REQUEST:
 * - Method: GET
 * - URL: http://localhost:3000/api/products/{id}
 * - Headers: None required
 * - Body: None
 * - URL Parameters: 
 *   - id (required): Product ID (integer)
 *   - Example: /api/products/7
 * 
 * RESPONSE:
 * - Status: 200 OK
 * - Content-Type: application/json
 * - Body: {
 *     success: true,
 *     data: {
 *       product: {
 *         id: number,
 *         name: string,
 *         brand: string,
 *         category: "TV" | "Mobile" | "Laptop"
 *       },
 *       pricing: {
 *         min: number,
 *         max: number,
 *         currency: "INR",
 *         display: string
 *       },
 *       variants: {
 *         count: number,
 *         items: [
 *           {
 *             id: number,
 *             name: string,
 *             images: string[],
 *             description: string,
 *             sku: string,
 *             price: number,
 *             stock: number,
 *             inStock: boolean,
 *             specifications: {
 *               // For Mobile: display, storage, camera, processor, other
 *               // For TV: display, connectivity, smart, memory, other
 *               // For Laptop: display, performance, design, software, other
 *             }
 *           }
 *         ]
 *       },
 *       emi: {
 *         available: boolean,
 *         options: [
 *           {
 *             tenure: number (months),
 *             monthlyPayment: number,
 *             interestRate: number,
 *             cashback: number,
 *             totalAmount: number,
 *             display: string
 *           }
 *         ]
 *       },
 *       availability: {
 *         totalStock: number,
 *         inStock: boolean,
 *         variantsAvailable: number
 *       }
 *     }
 *   }
 * 
 * ERROR RESPONSES:
 * - Status: 404 Not Found
 *   Body: { success: false, message: "Product not found" }
 * 
 * - Status: 500 Internal Server Error
 *   Body: { success: false, message: string }
 * 
 * USAGE:
 * - For product detail pages
 * - For variant selection
 * - For EMI calculator
 * - For add-to-cart functionality
 * 
 * ============================================================================
 */
router.get('/products/:id', productController.getProductById);

module.exports = router;

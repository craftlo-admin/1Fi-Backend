# Documentation Consolidated

This document was consolidated. Full and up-to-date documentation is now in `README.md` at the repo root. Please open `README.md` for installation, API, EMI and best-price details.

Note: This file has been intentionally shortened and replaced to avoid duplicate documentation in the repository.

**Example URLs:**
```
http://localhost:3000/api/products/7
http://localhost:3000/api/products/1
http://localhost:3000/api/products/11
```

### 📥 Response

**Status Code:** `200 OK`

**Content-Type:** `application/json`

**Response Body (Mobile Example):**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": 7,
      "name": "Apple iPhone 17 Pro (Silver, 256 GB)",
      "brand": "Apple",
      "category": "Mobile"
    },
    "pricing": {
      "min": 134900,
      "max": 134900,
      "currency": "INR",
      "display": "₹1,34,900"
    },
    "variants": {
      "count": 3,
      "items": [
        {
          "id": 7,
          "name": "Apple iPhone 17 Pro (Silver, 256 GB)",
          "images": [
            "https://images.snapmint.com/product_assets/images/001/154/806/large/open-uri20251021-2855301-v0364x?1761017558"
          ],
          "description": null,
          "sku": null,
          "price": 134900,
          "stock": 8,
          "inStock": true,
          "specifications": {
            "display": {
              "screenSize": null,
              "screenResolution": null,
              "screenType": null
            },
            "storage": {
              "ram": null,
              "storage": "256 GB"
            },
            "camera": {
              "front": null,
              "rear": null
            },
            "processor": {
              "name": null,
              "core": null
            },
            "other": {
              "color": "Silver",
              "operatingSystem": null,
              "simType": null
            }
          }
        },
        {
          "id": 8,
          "name": "Apple iPhone 17 Pro (Deep Blue, 256 GB)",
          "images": ["https://..."],
          "price": 134900,
          "stock": 8,
          "inStock": true,
          "specifications": {
            "display": {...},
            "storage": {...},
            "camera": {...},
            "processor": {...},
            "other": {
              "color": "Deep Blue",
              ...
            }
          }
        }
      ]
    },
    "emi": {
      "available": true,
      "options": [
        {
          "tenure": 3,
          "monthlyPayment": 46523,
          "interestRate": 14.0,
          "cashback": 0.0,
          "totalAmount": 139569,
          "display": "₹46,523/month for 3 months"
        },
        {
          "tenure": 6,
          "monthlyPayment": 24046,
          "interestRate": 14.0,
          "cashback": 0.0,
          "totalAmount": 144276,
          "display": "₹24,046/month for 6 months"
        },
        {
          "tenure": 9,
          "monthlyPayment": 16396,
          "interestRate": 14.0,
          "cashback": 1349.0,
          "totalAmount": 147564,
          "display": "₹16,396/month for 9 months"
        },
        {
          "tenure": 12,
          "monthlyPayment": 12692,
          "interestRate": 14.0,
          "cashback": 1349.0,
          "totalAmount": 152304,
          "display": "₹12,692/month for 12 months"
        }
      ]
    },
    "availability": {
      "totalStock": 24,
      "inStock": true,
      "variantsAvailable": 3
    }
  }
}
```

### 📊 Response Fields

#### Product Section
| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Request success status |
| `data.product.id` | number | Product ID |
| `data.product.name` | string | Product name |
| `data.product.brand` | string | Brand name |
| `data.product.category` | string | Category (TV/Mobile/Laptop) |

#### Pricing Section
| Field | Type | Description |
|-------|------|-------------|
| `data.pricing.min` | number | Minimum variant price |
| `data.pricing.max` | number | Maximum variant price |
| `data.pricing.currency` | string | Currency code (INR) |
| `data.pricing.display` | string | Formatted price display |

#### Variants Section
| Field | Type | Description |
|-------|------|-------------|
| `data.variants.count` | number | Number of variants |
| `data.variants.items` | array | Array of variant objects |
| `items[].id` | number | Variant ID |
| `items[].name` | string | Variant name |
| `items[].images` | array | Array of image URLs |
| `items[].description` | string | Product description |
| `items[].sku` | string | Stock keeping unit |
| `items[].price` | number | Variant price |
| `items[].stock` | number | Available quantity |
| `items[].inStock` | boolean | Stock availability |
| `items[].specifications` | object | Category-specific specs |

#### Specifications by Category

**Mobile Specifications:**
```json
{
  "display": {
    "screenSize": "6.7 inch",
    "screenResolution": "2796 x 1290",
    "screenType": "OLED"
  },
  "storage": {
    "ram": "8 GB",
    "storage": "256 GB"
  },
  "camera": {
    "front": "12 MP",
    "rear": "48 MP + 12 MP"
  },
  "processor": {
    "name": "Apple A18 Pro",
    "core": "Hexa Core"
  },
  "other": {
    "color": "Silver",
    "operatingSystem": "iOS 18",
    "simType": "Dual SIM"
  }
}
```

**TV Specifications:**
```json
{
  "display": {
    "screenSize": "43 inch",
    "resolution": "3840 x 2160",
    "displayTechnology": "LED",
    "tvType": "Smart TV",
    "refreshRate": "60 Hz"
  },
  "connectivity": {
    "hdmiPorts": 4,
    "usbPorts": 2
  },
  "smart": {
    "supportedApps": "Google TV, Netflix"
  },
  "memory": {
    "ram": "2 GB",
    "storage": "16 GB"
  },
  "other": {
    "modelNo": "KD-43X74L",
    "dimensions": "96.3 x 62.7 cm",
    "weight": "8.6 kg",
    "warranty": "1 Year",
    "countryOfOrigin": "India"
  }
}
```

**Laptop Specifications:**
```json
{
  "display": {
    "screenSize": "13.6 inch",
    "resolution": "2560 x 1664"
  },
  "performance": {
    "processor": "Apple M4",
    "ram": "16 GB",
    "ramType": "Unified Memory",
    "storage": "256 GB SSD",
    "graphics": "Integrated"
  },
  "design": {
    "color": "Midnight",
    "weight": "1.24 kg",
    "dimensions": "30.41 x 21.5 cm"
  },
  "software": {
    "operatingSystem": "macOS Sequoia"
  },
  "other": {
    "package": "Laptop, Cable, Adapter",
    "warranty": "1 Year",
    "countryOfOrigin": "India"
  }
}
```

#### EMI Section
| Field | Type | Description |
|-------|------|-------------|
| `data.emi.available` | boolean | EMI availability |
| `data.emi.options` | array | EMI plan options |
| `options[].tenure` | number | Loan duration (months) |
| `options[].monthlyPayment` | number | Monthly installment |
| `options[].interestRate` | number | Annual interest rate (%) |
| `options[].cashback` | number | Cashback amount |
| `options[].totalAmount` | number | Total payment amount |
| `options[].display` | string | Formatted EMI display |

#### Availability Section
| Field | Type | Description |
|-------|------|-------------|
| `data.availability.totalStock` | number | Total stock count |
| `data.availability.inStock` | boolean | Any variant in stock |
| `data.availability.variantsAvailable` | number | Variants with stock |

### ❌ Error Responses

**Product Not Found (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Error message details"
}
```

### 💡 Usage Examples

**JavaScript (Fetch API):**
```javascript
const productId = 7;

fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const product = data.data;
      console.log(`Product: ${product.product.name}`);
      console.log(`Price: ${product.pricing.display}`);
      console.log(`Variants: ${product.variants.count}`);
      console.log(`In Stock: ${product.availability.inStock}`);
      
      // Display EMI options
      if (product.emi.available) {
        product.emi.options.forEach(emi => {
          console.log(`EMI: ${emi.display}`);
        });
      }
    }
  })
  .catch(error => console.error('Error:', error));
```

**JavaScript (Axios):**
```javascript
const axios = require('axios');

async function getProductDetail(productId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Product not found');
    } else {
      console.error('Error:', error.message);
    }
  }
}

// Usage
const product = await getProductDetail(7);
```

**PowerShell:**
```powershell
# Get product details
$product = Invoke-RestMethod -Uri "http://localhost:3000/api/products/7" -Method Get

# Display product info
$product.data.product | Format-List
$product.data.pricing | Format-List

# Display variants
$product.data.variants.items | Format-Table id, name, price, stock

# Display EMI options
$product.data.emi.options | Format-Table tenure, monthlyPayment, interestRate, cashback
```

**cURL:**
```bash
curl http://localhost:3000/api/products/7
```

---

## 🧪 Test Product IDs

| ID | Product | Category | Variants | EMI |
|----|---------|----------|----------|-----|
| 1 | Samsung 32" TV | TV | 1 | ✅ |
| 2 | Samsung 43" TV | TV | 1 | ✅ |
| 5 | Sony 43" TV | TV | 1 | ✅ |
| 6 | Sony 65" TV | TV | 1 | ✅ |
| 7 | iPhone 17 Pro | Mobile | 3 | ✅ |
| 8 | iPhone 16 | Mobile | 4 | ✅ |
| 9 | Vivo V40 Pro | Mobile | 3 | ✅ |
| 11 | MacBook Air M4 | Laptop | 1 | ✅ |
| 12 | HP Laptop | Laptop | 1 | ✅ |

---

## 📋 Summary

### Endpoint 1: `/api/products`
- **Purpose:** Product listing pages
- **Returns:** Summary of all products
- **Use Case:** Homepage, shop grid, search results

### Endpoint 2: `/api/products/:id`
- **Purpose:** Product detail pages
- **Returns:** Complete product information
- **Use Case:** Detail page, variant selector, EMI calculator, cart

---

## 🔒 Notes

- All prices are in Indian Rupees (INR)
- No authentication required
- All endpoints use GET method
- Response format is always JSON
- CORS is enabled for all origins

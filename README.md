# 1Fi Backend (Express + MongoDB)

This repository contains a simple Express.js backend with Mongoose models for a sample e-commerce dataset (products, brands, categories, variants, EMI plans). The project includes seeding scripts and APIs for product listing and product detail pages. The product detail API now includes an automated `best_price` recommendation calculated from available EMI plans.

---

## Quick Start

1. Install dependencies

```powershell
npm install
```

2. Create a `.env` file (you can copy `.env.example`) and provide your MongoDB connection settings:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.q0dysfk.mongodb.net/property_database
PORT=3000
NODE_ENV=development
```

3. (Optional) Seed the database from the `Data/` folder

```powershell
npm run seed
```

4. Start the server

```powershell
# Production
npm start

# Development (with nodemon)
npm run dev
```

Server runs at: http://localhost:3000
API base: http://localhost:3000/api

---

## Project Structure (high-level)

- `config/` - database connection
- `models/` - Mongoose model definitions (Category, Brand, Product, ProductVariant, MobileVariant, TVVariant, LaptopVariant, EMI, EMIVariant)
- `controllers/` - controller logic (moved from routes)
- `routes/` - route definitions (thin layer that delegates to controllers)
- `utils/` - helper utilities (null filtering, spec formatting, best-price calculation)
- `scripts/` - helper scripts (seed, EMI updates, tests)
- `Data/` - original JSON data used for seeding

---

## Important APIs

All endpoints use the base `/api`.

### GET /api/products
Returns all products enriched with brand/category, thumbnails, price range, variant counts and stock.

Response shape (abridged):

```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 1,
      "name": "Samsung 32 inch LED Smart TV (Color)",
      "brand": "Samsung",
      "category": "TV",
      "thumbnail": "https://...",
      "priceRange": { "min": 15049, "max": 15049, "display": "₹15,049" },
      "variants": { "count": 1, "available": 1 },
      "stock": { "total": 4, "inStock": true },
      "_links": { "self": "/api/products/1" }
    }
  ]
}
```

### GET /api/products/:id
Returns a detailed product record with variants, specifications (category-specific), EMI options, availability and `best_price` recommendation.

Key response fields:
- `product` - id, name, brand, category
- `pricing` - min, max, currency, display
- `best_price` - computed recommendation (see EMI / Best Price below)
- `variants` - list of variants with `specifications` formatted via `utils/helpers.js`
- `emi` - list of emi options (tenure, monthlyPayment, interestRate, cashback, totalAmount)
- `availability` - totalStock, inStock, variantsAvailable

Example `best_price` (abridged):

```json
"best_price": {
  "effectivePrice": 14596.53,
  "savings": 452.47,
  "recommendedEMI": {
    "tenure": 3,
    "monthlyPayment": 5016,
    "interestRate": 0,
    "cashback": 451.47,
    "totalAmount": 15048
  },
  "display": "₹14,596.53 (Save ₹452.47)"
}
```

---

## EMI & Best Price Rules

- Tenures provided: `3, 6, 9, 12, 18, 24` months
- Interest rate rules:
  - Tenure <= 12 months: `0%` interest (No Cost EMI)
  - Tenure > 12 months: `10.5%` annual interest
- Cashback: `3%` of product price applied to all EMI plans

Best price calculation (implemented in `utils/helpers.js`):

```
effectivePrice = (monthlyPayment × tenure) - cashback
savings = basePrice - effectivePrice
```

The API selects the EMI option with the lowest `effectivePrice` and returns it in `best_price.recommendedEMI`. If multiple options tie on effective price, the shortest tenure is preferred.

---

## Scripts

- `npm start` - start server
- `npm run dev` - start server with `nodemon`
- `npm run seed` - seed database from `Data/`
- `node scripts/updateEMI.js` - recalculate EMI plans and update DB
- `node scripts/exportEMI.js` - export EMI data to `Data/emi_variants.json` and `Data/emis.json`
- `node scripts/testAPI.js <id>` - run an internal test for a single product (prints EMI and best_price analysis)
- `node scripts/testAPIEndpoint.js <id>` - calls the running API `/api/products/:id` and asserts `best_price` exists
- `node scripts/testListingAPI.js` - tests `/api/products`

---

## Development Notes & Conventions

- Models use numeric IDs (1,2,3...) rather than MongoDB ObjectId for domain IDs. Manual joins are used (no `populate`) for performance and to match the provided dataset.
- `formatSpecifications(details, categoryType)` in `utils/helpers.js` formats category-specific specifications and avoids producing nulls in responses.
- `removeNullValues(obj)` recursively removes `null`, `undefined`, empty objects, and empty arrays from API responses.
- Controllers are in `controllers/` for clearer separation of concerns (route definitions are thin and delegate to controllers).

---

## Testing & Verification

1. Start the server

```powershell
npm start
```

2. Verify listing

```powershell
node scripts/testListingAPI.js
```

3. Verify product detail + best price

```powershell
node scripts/testAPIEndpoint.js 1
# Or call the API directly
Invoke-WebRequest http://localhost:3000/api/products/1 -UseBasicParsing | ConvertFrom-Json
```

---

## Notes & Next Steps

- Consider exposing an EMI calculator endpoint if clients need on-the-fly calculations for custom down payments.
- Consider supporting dynamic cashback or promotional rates in the future.

---

If you want, I can now delete the separate documentation files and mark the task completed in the todo list.
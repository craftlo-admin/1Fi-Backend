require('dotenv').config();require('dotenv').config();const mongoose = require('mongoose');

const mongoose = require('mongoose');

const fs = require('fs');const mongoose = require('mongoose');const fs = require('fs');

const path = require('path');

const connectDB = require('../config/database');const fs = require('fs');const path = require('path');



const {const path = require('path');const connectDB = require('../config/database');

  Category,

  Brand,const connectDB = require('../config/database');require('dotenv').config();

  Product,

  ProductVariant,

  MobileVariant,

  TVVariant,// Import all models// Import models

  LaptopVariant,

  EMI,const {const {

  EMIVariant

} = require('../models');  Category,  Category,



async function seedDatabase() {  Brand,  Brand,

  try {

    await connectDB();  Product,  Product,

    console.log('Connected to database\n');

  ProductVariant,  ProductVariant,

    const dataDir = path.join(__dirname, '../Data');

  MobileVariant,  MobileVariant,

    console.log('Clearing existing data...');

    await Category.deleteMany({});  TVVariant,  TVVariant,

    await Brand.deleteMany({});

    await Product.deleteMany({});  LaptopVariant,  LaptopVariant,

    await ProductVariant.deleteMany({});

    await MobileVariant.deleteMany({});  EMI,  EMI,

    await TVVariant.deleteMany({});

    await LaptopVariant.deleteMany({});  EMIVariant  EMIVariant

    await EMI.deleteMany({});

    await EMIVariant.deleteMany({});} = require('../models');} = require('../models');

    console.log('Existing data cleared\n');



    const categoriesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8'));

    await Category.insertMany(categoriesData);async function seedDatabase() {// Function to read JSON file

    console.log(`Seeded ${categoriesData.length} categories`);

  try {const readJSONFile = (filename) => {

    const brandsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'brands.json'), 'utf8'));

    await Brand.insertMany(brandsData);    await connectDB();  try {

    console.log(`Seeded ${brandsData.length} brands`);

    console.log('Connected to database\n');    const filePath = path.join(__dirname, '..', 'Data', filename);

    const productsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8'));

    await Product.insertMany(productsData);    const data = fs.readFileSync(filePath, 'utf8');

    console.log(`Seeded ${productsData.length} products`);

    const dataDir = path.join(__dirname, '../Data');    return JSON.parse(data);

    const productVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'product_variants.json'), 'utf8'));

    await ProductVariant.insertMany(productVariantsData);  } catch (error) {

    console.log(`Seeded ${productVariantsData.length} product variants`);

    // Clear existing data    console.error(`❌ Error reading ${filename}:`, error.message);

    const mobileVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'mobile_variants.json'), 'utf8'));

    await MobileVariant.insertMany(mobileVariantsData);    console.log('Clearing existing data...');    return [];

    console.log(`Seeded ${mobileVariantsData.length} mobile variants`);

    await Category.deleteMany({});  }

    const tvVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'tv_variants.json'), 'utf8'));

    await TVVariant.insertMany(tvVariantsData);    await Brand.deleteMany({});};

    console.log(`Seeded ${tvVariantsData.length} TV variants`);

    await Product.deleteMany({});

    const laptopVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'laptop_variants.json'), 'utf8'));

    await LaptopVariant.insertMany(laptopVariantsData);    await ProductVariant.deleteMany({});// Function to clear all collections

    console.log(`Seeded ${laptopVariantsData.length} laptop variants`);

    await MobileVariant.deleteMany({});const clearDatabase = async () => {

    const emisData = JSON.parse(fs.readFileSync(path.join(dataDir, 'emis.json'), 'utf8'));

    await EMI.insertMany(emisData);    await TVVariant.deleteMany({});  console.log('🗑️  Clearing existing data...');

    console.log(`Seeded ${emisData.length} EMIs`);

    await LaptopVariant.deleteMany({});  try {

    const emiVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'emi_variants.json'), 'utf8'));

    await EMIVariant.insertMany(emiVariantsData);    await EMI.deleteMany({});    await Category.deleteMany({});

    console.log(`Seeded ${emiVariantsData.length} EMI variants`);

    await EMIVariant.deleteMany({});    await Brand.deleteMany({});

    console.log('\nDatabase seeding completed successfully!');

    console.log('Existing data cleared\n');    await Product.deleteMany({});

    mongoose.connection.close();

    process.exit(0);    await ProductVariant.deleteMany({});

  } catch (error) {

    console.error('Error seeding database:', error);    // Seed categories    await MobileVariant.deleteMany({});

    mongoose.connection.close();

    process.exit(1);    const categoriesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8'));    await TVVariant.deleteMany({});

  }

}    await Category.insertMany(categoriesData);    await LaptopVariant.deleteMany({});



seedDatabase();    console.log(`✅ Seeded ${categoriesData.length} categories`);    await EMI.deleteMany({});


    await EMIVariant.deleteMany({});

    // Seed brands    console.log('✅ Database cleared successfully');

    const brandsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'brands.json'), 'utf8'));  } catch (error) {

    await Brand.insertMany(brandsData);    console.error('❌ Error clearing database:', error.message);

    console.log(`✅ Seeded ${brandsData.length} brands`);    throw error;

  }

    // Seed products};

    const productsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8'));

    await Product.insertMany(productsData);// Function to seed data

    console.log(`✅ Seeded ${productsData.length} products`);const seedData = async () => {

  try {

    // Seed product variants    console.log('🌱 Starting data seeding process...\n');

    const productVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'product_variants.json'), 'utf8'));

    await ProductVariant.insertMany(productVariantsData);    // Connect to database

    console.log(`✅ Seeded ${productVariantsData.length} product variants`);    await connectDB();



    // Seed mobile variants    // Check if database is connected

    const mobileVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'mobile_variants.json'), 'utf8'));    if (mongoose.connection.readyState !== 1) {

    await MobileVariant.insertMany(mobileVariantsData);      console.error('❌ Database is not connected!');

    console.log(`✅ Seeded ${mobileVariantsData.length} mobile variants`);      process.exit(1);

    }

    // Seed TV variants

    const tvVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'tv_variants.json'), 'utf8'));    console.log('✅ Database connection verified\n');

    await TVVariant.insertMany(tvVariantsData);

    console.log(`✅ Seeded ${tvVariantsData.length} TV variants`);    // Clear existing data

    await clearDatabase();

    // Seed laptop variants

    const laptopVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'laptop_variants.json'), 'utf8'));    // Seed Categories

    await LaptopVariant.insertMany(laptopVariantsData);    console.log('📦 Seeding Categories...');

    console.log(`✅ Seeded ${laptopVariantsData.length} laptop variants`);    const categories = readJSONFile('categories.json');

    if (categories.length > 0) {

    // Seed EMIs      await Category.insertMany(categories);

    const emisData = JSON.parse(fs.readFileSync(path.join(dataDir, 'emis.json'), 'utf8'));      console.log(`✅ Inserted ${categories.length} categories`);

    await EMI.insertMany(emisData);    }

    console.log(`✅ Seeded ${emisData.length} EMIs`);

    // Seed Brands

    // Seed EMI variants    console.log('📦 Seeding Brands...');

    const emiVariantsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'emi_variants.json'), 'utf8'));    const brands = readJSONFile('brands.json');

    await EMIVariant.insertMany(emiVariantsData);    if (brands.length > 0) {

    console.log(`✅ Seeded ${emiVariantsData.length} EMI variants`);      await Brand.insertMany(brands);

      console.log(`✅ Inserted ${brands.length} brands`);

    console.log('\n✅ Database seeding completed successfully!');    }

    console.log(`\nTotal documents: ${

      categoriesData.length +     // Seed Products

      brandsData.length +     console.log('📦 Seeding Products...');

      productsData.length +     const products = readJSONFile('products.json');

      productVariantsData.length +     if (products.length > 0) {

      mobileVariantsData.length +       await Product.insertMany(products);

      tvVariantsData.length +       console.log(`✅ Inserted ${products.length} products`);

      laptopVariantsData.length +     }

      emisData.length + 

      emiVariantsData.length    // Seed Product Variants

    }`);    console.log('📦 Seeding Product Variants...');

    const productVariants = readJSONFile('product_variants.json');

    mongoose.connection.close();    if (productVariants.length > 0) {

    process.exit(0);      await ProductVariant.insertMany(productVariants);

  } catch (error) {      console.log(`✅ Inserted ${productVariants.length} product variants`);

    console.error('Error seeding database:', error);    }

    mongoose.connection.close();

    process.exit(1);    // Seed Mobile Variants

  }    console.log('📦 Seeding Mobile Variants...');

}    const mobileVariants = readJSONFile('mobile_variants.json');

    if (mobileVariants.length > 0) {

seedDatabase();      await MobileVariant.insertMany(mobileVariants);

      console.log(`✅ Inserted ${mobileVariants.length} mobile variants`);
    }

    // Seed TV Variants
    console.log('📦 Seeding TV Variants...');
    const tvVariants = readJSONFile('tv_variants.json');
    if (tvVariants.length > 0) {
      await TVVariant.insertMany(tvVariants);
      console.log(`✅ Inserted ${tvVariants.length} TV variants`);
    }

    // Seed Laptop Variants
    console.log('📦 Seeding Laptop Variants...');
    const laptopVariants = readJSONFile('laptop_variants.json');
    if (laptopVariants.length > 0) {
      await LaptopVariant.insertMany(laptopVariants);
      console.log(`✅ Inserted ${laptopVariants.length} laptop variants`);
    }

    // Seed EMIs
    console.log('📦 Seeding EMIs...');
    const emis = readJSONFile('emis.json');
    if (emis.length > 0) {
      await EMI.insertMany(emis);
      console.log(`✅ Inserted ${emis.length} EMIs`);
    }

    // Seed EMI Variants
    console.log('📦 Seeding EMI Variants...');
    const emiVariants = readJSONFile('emi_variants.json');
    if (emiVariants.length > 0) {
      await EMIVariant.insertMany(emiVariants);
      console.log(`✅ Inserted ${emiVariants.length} EMI variants`);
    }

    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log('==================');
    console.log(`Categories: ${categories.length}`);
    console.log(`Brands: ${brands.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Product Variants: ${productVariants.length}`);
    console.log(`Mobile Variants: ${mobileVariants.length}`);
    console.log(`TV Variants: ${tvVariants.length}`);
    console.log(`Laptop Variants: ${laptopVariants.length}`);
    console.log(`EMIs: ${emis.length}`);
    console.log(`EMI Variants: ${emiVariants.length}`);
    console.log('==================');
    
    const totalRecords = categories.length + brands.length + products.length + 
                        productVariants.length + mobileVariants.length + 
                        tvVariants.length + laptopVariants.length + 
                        emis.length + emiVariants.length;
    
    console.log(`\n🎉 Total records inserted: ${totalRecords}`);
    console.log('✅ Data seeding completed successfully!\n');

  } catch (error) {
    console.error('\n❌ Error during seeding:', error.message);
    console.error(error.stack);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding
seedData();

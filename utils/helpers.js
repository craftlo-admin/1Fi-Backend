/**
 * Helper function to remove null/undefined values from object
 * Also removes empty objects and empty arrays
 */
const removeNullValues = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(removeNullValues).filter(item => item !== null && item !== undefined);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value === null || value === undefined) {
        return acc;
      }
      const cleanedValue = removeNullValues(value);
      // Only include if the cleaned value is not an empty object or empty array
      if (
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0 && !Array.isArray(cleanedValue)) &&
        !(Array.isArray(cleanedValue) && cleanedValue.length === 0)
      ) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
  }
  return obj;
};

/**
 * Helper function to format specifications based on category type
 * Organizes product specifications into logical groups
 */
const formatSpecifications = (details, categoryType) => {
  if (!details) return {};

  // Remove MongoDB fields
  const { _id, __v, id, product_id, product_variant_id, created_at, updated_at, ...specs } = details;

  // Format based on category type
  if (categoryType === 'Mobile') {
    const formatted = {
      display: {},
      storage: {},
      camera: {},
      processor: {},
      other: {}
    };

    // Display
    if (specs.screen_size) formatted.display.screenSize = specs.screen_size;
    if (specs.screen_resolution) formatted.display.screenResolution = specs.screen_resolution;
    if (specs.screen_type) formatted.display.screenType = specs.screen_type;

    // Storage
    if (specs.ram_gb) formatted.storage.ram = `${specs.ram_gb} GB`;
    if (specs.storage_gb) formatted.storage.storage = `${specs.storage_gb} GB`;

    // Camera
    if (specs.front_camera) formatted.camera.front = specs.front_camera;
    if (specs.rear_camera) formatted.camera.rear = specs.rear_camera;

    // Processor
    if (specs.processor) formatted.processor.name = specs.processor;
    if (specs.core) formatted.processor.core = specs.core;

    // Other
    if (specs.color) formatted.other.color = specs.color;
    if (specs.operating_system) formatted.other.operatingSystem = specs.operating_system;
    if (specs.sim_type) formatted.other.simType = specs.sim_type;

    // Remove empty sections
    Object.keys(formatted).forEach(key => {
      if (Object.keys(formatted[key]).length === 0) {
        delete formatted[key];
      }
    });

    return formatted;
  } else if (categoryType === 'TV') {
    const formatted = {
      display: {},
      connectivity: {},
      smart: {},
      memory: {},
      other: {}
    };

    // Display
    if (specs.screen_size) formatted.display.screenSize = specs.screen_size;
    if (specs.screen_resolution) formatted.display.resolution = specs.screen_resolution;
    if (specs.display_technology) formatted.display.displayTechnology = specs.display_technology;
    if (specs.tv_type) formatted.display.tvType = specs.tv_type;
    if (specs.refresh_rate) formatted.display.refreshRate = specs.refresh_rate;

    // Connectivity
    if (specs.hdmi_ports) formatted.connectivity.hdmiPorts = specs.hdmi_ports;
    if (specs.usb_ports) formatted.connectivity.usbPorts = specs.usb_ports;

    // Smart
    if (specs.supported_apps) formatted.smart.supportedApps = specs.supported_apps;

    // Memory
    if (specs.ram) formatted.memory.ram = specs.ram;
    if (specs.storage) formatted.memory.storage = specs.storage;

    // Other
    if (specs.model_no) formatted.other.modelNo = specs.model_no;
    if (specs.product_dimension) formatted.other.dimensions = specs.product_dimension;
    if (specs.weight) formatted.other.weight = specs.weight;
    if (specs.warranty_period) formatted.other.warranty = specs.warranty_period;
    if (specs.country_of_origin) formatted.other.countryOfOrigin = specs.country_of_origin;

    // Remove empty sections
    Object.keys(formatted).forEach(key => {
      if (Object.keys(formatted[key]).length === 0) {
        delete formatted[key];
      }
    });

    return formatted;
  } else if (categoryType === 'Laptop') {
    const formatted = {
      display: {},
      performance: {},
      design: {},
      software: {},
      other: {}
    };

    // Display
    if (specs.screen_size) formatted.display.screenSize = specs.screen_size;
    if (specs.screen_resolution) formatted.display.resolution = specs.screen_resolution;

    // Performance
    if (specs.processor) formatted.performance.processor = specs.processor;
    if (specs.ram) formatted.performance.ram = specs.ram;
    if (specs.ram_type) formatted.performance.ramType = specs.ram_type;
    if (specs.storage) formatted.performance.storage = specs.storage;
    if (specs.graphics_type) formatted.performance.graphics = specs.graphics_type;

    // Design
    if (specs.color) formatted.design.color = specs.color;
    if (specs.weight) formatted.design.weight = specs.weight;
    if (specs.product_dimension) formatted.design.dimensions = specs.product_dimension;

    // Software
    if (specs.operating_system) formatted.software.operatingSystem = specs.operating_system;

    // Other
    if (specs.package) formatted.other.package = specs.package;
    if (specs.warranty_period) formatted.other.warranty = specs.warranty_period;
    if (specs.country_of_origin) formatted.other.countryOfOrigin = specs.country_of_origin;

    // Remove empty sections
    Object.keys(formatted).forEach(key => {
      if (Object.keys(formatted[key]).length === 0) {
        delete formatted[key];
      }
    });

    return formatted;
  }

  return specs;
};

/**
 * Calculate the best price from EMI options
 * Formula: (monthly_payment * tenure) - cashback
 * Returns the EMI option with the lowest effective price
 */
function calculateBestPrice(emiOptions, basePrice) {
  if (!emiOptions || emiOptions.length === 0) {
    return {
      effectivePrice: basePrice,
      tenure: null,
      monthlyPayment: null,
      interestRate: null,
      cashback: 0,
      savings: 0,
      totalAmount: basePrice
    };
  }

  // Calculate effective price for each EMI option
  const emiCalculations = emiOptions.map(emi => {
    const totalAmount = emi.monthly_payment * emi.tenure;
    const effectivePrice = totalAmount - emi.cashback;
    const savings = basePrice - effectivePrice;

    return {
      effectivePrice: Math.round(effectivePrice * 100) / 100,
      tenure: emi.tenure,
      monthlyPayment: emi.monthly_payment,
      interestRate: emi.interest_rate,
      cashback: emi.cashback,
      savings: Math.round(savings * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100
    };
  });

  // Find the EMI with the lowest effective price
  const bestEmi = emiCalculations.reduce((best, current) => 
    current.effectivePrice < best.effectivePrice ? current : best
  );

  return bestEmi;
}

module.exports = {
  removeNullValues,
  formatSpecifications,
  calculateBestPrice
};

// ============================================================
// AFRIGADGETS PRODUCT VARIANTS
// Storage + colour choices are shown ONLY on the product detail
// ("View Details") page. Product cards remain unchanged.
// ============================================================

const PRODUCT_VARIANT_CONFIG = [
  // iPhone 11
  {
    match: ["iphone 11"],
    storage: [
      { label: "64GB", increment: 0 },
      { label: "128GB", increment: 500 },
      { label: "256GB", increment: 1100 },
    ],
    colors: [
      ["Black", "#171717", "11-black.png"], ["White", "#f3f3f3", "11-white.png"], ["Green", "#8fa88c", "11-green.png"],
      ["Yellow", "#f2cf4a"], ["Purple", "#a78bca", "11-purple.png"], ["Red", "#e53935", "11-red.png"]
    ],
  },

  // iPhone 12
  {
    match: ["iphone 12"],
    storage: [
      { label: "64GB", increment: 0 },
      { label: "128GB", increment: 500 },
      { label: "256GB", increment: 1100 },
    ],
    colors: [
      ["Black", "#171717", "12-black.png"], ["White", "#f3f3f3", "12-white.png"], ["Blue", "#4c78c2", "12-blue.png"],
      ["Green", "#7fa58b", "12-green.png"], ["Purple", "#a889c6", "12-purple.png"], ["Red", "#e53935"]
    ],
  },

  // iPhone 13
  {
    match: ["iphone 13"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 700 },
      { label: "512GB", increment: 1600 },
    ],
    colors: [
      ["Midnight", "#1d2024", "13-mid.png"], ["Starlight", "#eee9dc", "13-star.png"], ["Blue", "#5579aa", "13-blue.png"],
      ["Pink", "#e7a8b9"], ["Red", "#c9272c", "13-red.png"], ["Green", "#7c9b83", "13-green.png"]
    ],
  },

  // iPhone 13 Pro
  {
    match: ["iphone 13 pro max"],
    exclude: ["max"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 700 },
      { label: "512GB", increment: 1600 },
    ],
    colors: [
      ["Midnight", "#1d2024", "13p-mid.png"], ["Starlight", "#eee9dc", "13p-red.png"], ["Blue", "#5579aa"],
      ["Pink", "#e7a8b9", "13p-pink.png"], ["Red", "#c9272c", "13p-red.png"], ["Green", "#7c9b83", "13p-green.png"]
    ],
  },

  // iPhone 13 Pro Max
  {
    match: ["iphone 13 pro max"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 700 },
      { label: "512GB", increment: 1600 },
    ],
    colors: [
      ["Midnight", "#1d2024", "13pm-mid.png"], ["Starlight", "#eee9dc"], ["Blue", "#5579aa", "13pm-blue.png"],
      ["Pink", "#e7a8b9", "13pm-pink.png"], ["Red", "#c9272c", "13pm-red.png"], ["Green", "#7c9b83", "13pm-green.png"]
    ],
  },

  // iPhone 14
  {
    match: ["iphone 14"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 800 },
      { label: "512GB", increment: 1700 },
    ],
    colors: [
      ["Midnight", "#1d2024", "14-midnight.png"], ["Starlight", "#eee9dc", "14-star.png"], ["Blue", "#6b8fc0"],
      ["Purple", "#b9a1d1", "14-purple.png"], ["Yellow", "#f2cf4a", "14-yellow.png"], ["Red", "#c9272c", "14-red.png"]
    ],
  },

  // iPhone 14 Pro
  {
    match: ["iphone 14 pro max"],
    exclude: ["max"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 800 },
      { label: "512GB", increment: 1700 },
    ],
    colors: [
      ["Midnight", "#1d2024", "14p-mid.png"], ["Starlight", "#eee9dc"], ["Blue", "#5579aa", "14p-blue.png"],
      ["Pink", "#e7a8b9", "14p-pink.png"], ["Red", "#c9272c", "14p-red.png"], ["Green", "#7c9b83", "14p-green.png"]
    ],
  },

  // iPhone 14 Pro Max
  {
    match: ["iphone 14 pro max"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 800 },
      { label: "512GB", increment: 1700 },
    ],
    colors: [
      ["Midnight", "#1d2024", "14pm-mid.png"], ["Starlight", "#eee9dc"], ["Blue", "#5579aa", "14pm-blue.png"],
      ["Pink", "#e7a8b9", "14pm-pink.png"], ["Red", "#c9272c", "14pm-red.png"], ["Green", "#7c9b83", "14pm-green.png"]
    ],
  },

  // iPhone 15 / 15 Plus
  {
    match: ["iphone 15"],
    exclude: ["pro"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 800 },
      { label: "512GB", increment: 1800 },
    ],
    colors: [
      ["Black", "#171717", "15-black.png"], ["Blue", "#9ab7d8", "15-blue.png"], ["Green", "#a8c9b0", "15-green.png"],
      ["Yellow", "#f0d77b"], ["Pink", "#e7a8bb", "15-pink.png"]
    ],
  },

  // iPhone 15 Pro Max
  {
    match: ["iphone 15 pro max"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1100 },
      { label: "1TB", increment: 2800 },
    ],
    colors: [
      ["Black Titanium", "#292929", "15pm-black.png"], ["White Titanium", "#e9e9e7", "15pm-white.png"],
      ["Blue Titanium", "#4e6178", "15pm-blue.png"], ["Natural Titanium", "#9b958b"]
    ],
  },

  // iPhone 15 Pro
  {
    match: ["iphone 15 pro"],
    exclude: ["max"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 900 },
      { label: "512GB", increment: 1900 },
      { label: "1TB", increment: 3200 },
    ],
    colors: [
      ["Black Titanium", "#292929"], ["White Titanium", "#e9e9e7", "15p-white.png"],
      ["Blue Titanium", "#4e6178", "15p-blue.png"], ["Natural Titanium", "#9b958b", "15p-natural.png"]
    ],
  },

  // iPhone 16 / 16 Plus
  {
    match: ["iphone 16"],
    exclude: ["pro"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 900 },
      { label: "512GB", increment: 1900 },
    ],
    colors: [
      ["Black", "#171717", "16-black.png"], ["White", "#f3f3f3", "16-whitel.png"], ["Pink", "#e7a8b9"],
      ["Teal", "#70aaa7", "16-teal.png"], ["Ultramarine", "#4d66a6", "16-ultra.png"]
    ],
  },

  // iPhone 16 Pro
  {
    match: ["iphone 16 pro"],
    exclude: ["max"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 900 },
      { label: "512GB", increment: 1900 },
      { label: "1TB", increment: 3200 },
    ],
    colors: [
      ["Black Titanium", "#292929"], ["White Titanium", "#e9e9e7", "16p-white.png"],
      ["Desert Titanium", "#a88972", "16p-desert.png"], ["Natural Titanium", "#9b958b", "16p-natural.png"]
    ],
  },

  // iPhone 16 Pro Max
  {
    match: ["iphone 16 pro max"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1100 },
      { label: "1TB", increment: 2800 },
    ],
    colors: [
      ["Black Titanium", "#292929", "16pm-black.png"], ["White Titanium", "#e9e9e7", "16pm-white.png"],
      ["Desert Titanium", "#a88972"], ["Natural Titanium", "#9b958b", "16pm-natural.png"]
    ],
  },

  // iPhone 17
  {
    match: ["iphone 17"],
    exclude: ["pro", "air"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1100 },
    ],
    colors: [
      ["Black", "#171717", "17-black.png"], ["White", "#f3f3f3", "17-white.png"], ["Mist Blue", "#a9c1d4", "17-blue.png"],
      ["Lavender", "#b8a6c7", "17-lavender.png"], ["Sage", "#9eae99"]
    ],
  },

  // iPhone 17 Pro Max
  {
    match: ["iphone 17 pro max"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1200 },
      { label: "1TB", increment: 3000 },
    ],
    colors: [
      ["Cosmic Orange", "#c87535"], ["Deep Blue", "#304d76", "17pm-blue.png"],
      ["Silver", "#c8c8c8", "17pm-silver.png"]
    ],
  },

  // iPhone 17 Pro
  {
    match: ["iphone 17 pro"],
    exclude: ["max"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1200 },
      { label: "1TB", increment: 3000 },
    ],
    colors: [
      ["Cosmic Orange", "#c87535", "17p-orange.png"], ["Deep Blue", "#304d76", "17p-blue.png"],
      ["Silver", "#c8c8c8"]
    ],
  },

  // Samsung Galaxy S / Ultra family
  {
    match: ["samsung galaxy s22", "samsung galaxy s23",
      "samsung galaxy s24", "samsung galaxy s25",
      "samsung galaxy s26"],
    exclude: ["ultra"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 800 },
      { label: "512GB", increment: 1800 },
    ],
    colors: [
      ["Black", "#171717"], ["Silver", "#c6c8ca"], ["Blue", "#587ca8"],
      ["Green", "#78987d"], ["Violet", "#9c87b9"]
    ],
  },

  // Samsung Galaxy S Ultra — larger storage range
  {
    match: ["samsung galaxy s22 ultra", "samsung galaxy s23 ultra",
      "samsung galaxy s24 ultra", "samsung galaxy s25 ultra",
      "samsung galaxy s26 ultra"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1200 },
      { label: "1TB", increment: 3000 },
    ],
    colors: [
      ["Black", "#171717"], ["Silver", "#c6c8ca"], ["Blue", "#526f98"],
      ["Green", "#708c77"], ["Violet", "#8e78a7"]
    ],
  },

  // Samsung Galaxy A series
  {
    match: ["samsung galaxy a"],
    storage: [
      { label: "128GB", increment: 0 },
      { label: "256GB", increment: 700 },
    ],
    colors: [
      ["Black", "#171717"], ["Silver", "#c6c8ca"],
      ["Blue", "#5b83b5"], ["Green", "#7c9b83"]
    ],
  },

  // Samsung Galaxy Z Fold
  {
    match: ["samsung galaxy zfold", "samsung galaxy z fold"],
    storage: [
      { label: "256GB", increment: 0 },
      { label: "512GB", increment: 1300 },
    ],
    colors: [
      ["Black", "#171717"], ["Silver", "#c6c8ca"],
      ["Blue", "#536f9a"], ["Green", "#78947d"]
    ],
  },
];

function getProductVariantConfig(product) {
  const name = String(product?.name || "").toLowerCase().trim();

  for (const config of PRODUCT_VARIANT_CONFIG) {
    const matches = config.match.some((term) => name.includes(term));
    const excluded = (config.exclude || []).some((term) => name.includes(term));

    if (matches && !excluded) {
      return config;
    }
  }

  return null;
}

function hasProductVariants(product) {
  const config = getProductVariantConfig(product);
  return !!config && ((config.storage?.length || 0) > 0 || (config.colors?.length || 0) > 0);
}

function getVariantPrice(product, storageLabel) {
  const config = getProductVariantConfig(product);
  const basePrice = Number(product?.price) || 0;

  if (!config || !storageLabel) return basePrice;

  const storage = config.storage?.find(
    (item) => item.label.toLowerCase() === String(storageLabel).toLowerCase()
  );

  return basePrice + Number(storage?.increment || 0);
}

function getVariantLabel(storage, color) {
  return [storage, color].filter(Boolean).join(" • ");
}

window.PRODUCT_VARIANT_CONFIG = PRODUCT_VARIANT_CONFIG;
window.getProductVariantConfig = getProductVariantConfig;
window.hasProductVariants = hasProductVariants;
window.getVariantPrice = getVariantPrice;
window.getVariantLabel = getVariantLabel;

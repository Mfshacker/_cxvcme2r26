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
      ["Black", "#171717"], ["White", "#f3f3f3"], ["Green", "#8fa88c"],
      ["Yellow", "#f2cf4a"], ["Purple", "#a78bca"], ["Red", "#e53935"]
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
      ["Black", "#171717"], ["White", "#f3f3f3"], ["Blue", "#4c78c2"],
      ["Green", "#7fa58b"], ["Purple", "#a889c6"], ["Red", "#e53935"]
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
      ["Midnight", "#1d2024"], ["Starlight", "#eee9dc"], ["Blue", "#5579aa"],
      ["Pink", "#e7a8b9"], ["Red", "#c9272c"], ["Green", "#7c9b83"]
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
      ["Midnight", "#1d2024"], ["Starlight", "#eee9dc"], ["Blue", "#6b8fc0"],
      ["Purple", "#b9a1d1"], ["Yellow", "#f2cf4a"], ["Red", "#c9272c"]
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
      ["Black", "#171717"], ["Blue", "#9ab7d8"], ["Green", "#a8c9b0"],
      ["Yellow", "#f0d77b"], ["Pink", "#e7a8bb"]
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
      ["Black Titanium", "#292929"], ["White Titanium", "#e9e9e7"],
      ["Blue Titanium", "#4e6178"], ["Natural Titanium", "#9b958b"]
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
      ["Black Titanium", "#292929"], ["White Titanium", "#e9e9e7"],
      ["Blue Titanium", "#4e6178"], ["Natural Titanium", "#9b958b"]
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
      ["Black", "#171717"], ["White", "#f3f3f3"], ["Pink", "#e7a8b9"],
      ["Teal", "#70aaa7"], ["Ultramarine", "#4d66a6"]
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
      ["Black Titanium", "#292929",], ["White Titanium", "#e9e9e7", "16p-white.png"],
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
      ["Black", "#171717"], ["White", "#f3f3f3"], ["Mist Blue", "#a9c1d4"],
      ["Lavender", "#b8a6c7"], ["Sage", "#9eae99"]
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
      ["Cosmic Orange", "#c87535"], ["Deep Blue", "#304d76"],
      ["Silver", "#c8c8c8"]
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
      ["Cosmic Orange", "#c87535"], ["Deep Blue", "#304d76"],
      ["Silver", "#c8c8c8"]
    ],
  },

  // Samsung Galaxy S / Ultra family
  {
    match: ["samsung galaxy s"],
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

// ============================================================
// AFRIGADGETS PRODUCT PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", async function () {
  await window.productsReady;

  loadProductPage();
});


// ============================================================
// PRODUCT VARIANT HELPERS
// Storage + colour controls intentionally live on the detail
// page only, never on the product cards.
// ============================================================

function formatVariantZAR(value) {
  return Number(value || 0).toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getInitialVariantState(product) {
  const config = typeof getProductVariantConfig === "function"
    ? getProductVariantConfig(product)
    : null;

  return {
    productId: Number(product.id),
    storage: config?.storage?.[0]?.label || "",
    color: (() => {
      const firstAvailable = (config?.colors || []).find((color) =>
        typeof isVariantColorAvailable !== "function" || isVariantColorAvailable(color)
      );
      return firstAvailable?.[0] || "";
    })(),
    label: getVariantLabel(
      config?.storage?.[0]?.label || "",
      (() => {
        const firstAvailable = (config?.colors || []).find((color) =>
          typeof isVariantColorAvailable !== "function" || isVariantColorAvailable(color)
        );
        return firstAvailable?.[0] || "";
      })()
    ),
  };
}

function buildProductVariantControls(product) {
  const config = typeof getProductVariantConfig === "function"
    ? getProductVariantConfig(product)
    : null;

  if (!config) {
    return "";
  }

  const storageHTML = config.storage?.length
    ? `
      <div class="product-variant-group">
        <div class="product-variant-heading">
          <span>Storage</span>
          <strong id="selectedStorageLabel">${escapeHtml(config.storage[0].label)}</strong>
        </div>
        <div class="product-storage-options" role="group" aria-label="Storage options">
          ${config.storage.map((option, index) => `
            <button
              type="button"
              class="storage-option ${index === 0 ? "is-selected" : ""}"
              data-storage="${escapeHtml(option.label)}"
              onclick="selectProductStorage('${escapeHtml(option.label)}')"
            >
              ${escapeHtml(option.label)}
              ${option.increment ? `<small>+R${formatVariantZAR(option.increment)}</small>` : "<small>Base</small>"}
            </button>
          `).join("")}
        </div>
      </div>
    `
    : "";

  const colorHTML = config.colors?.length
    ? `
      <div class="product-variant-group">
        <div class="product-variant-heading">
          <span>Colour</span>
          <strong id="selectedColorLabel">${escapeHtml(config.colors[0][0])}</strong>
        </div>
        <div class="product-color-options" role="group" aria-label="Colour options">
          ${config.colors.map((color) => {
            const available = typeof isVariantColorAvailable !== "function" || isVariantColorAvailable(color);
            return `
            <button
              type="button"
              class="product-color-option ${available ? "" : "is-unavailable"}"
              data-color="${escapeHtml(color[0])}"
              data-color-image="${escapeHtml(color[2] || "")}"
              data-color-available="${available ? "true" : "false"}"
              onclick="selectProductColor('${escapeHtml(color[0])}')"
              title="${escapeHtml(color[0])}${available ? "" : " — Unavailable"}"
              aria-label="${escapeHtml(color[0])}${available ? "" : " — Unavailable"}"
              aria-disabled="${available ? "false" : "true"}"
              ${available ? "" : "disabled"}
              style="--variant-swatch:${color[1]};"
            >
              <span></span>
            </button>`;
          }).join("")}
        </div>
      </div>
    `
    : "";

  return `
    <div class="product-variants" id="productVariants">
      <div class="product-variants-title">
        <i class="fa-solid fa-sliders"></i>
        <span>Choose your options</span>
      </div>
      ${storageHTML}
      ${colorHTML}
      <div class="product-selected-variant" id="selectedVariantSummary">
        Selected: <strong>${escapeHtml(getVariantLabel(config.storage?.[0]?.label || "", config.colors?.[0]?.[0] || ""))}</strong>
      </div>
    </div>
  `;
}

function getCurrentVariantState() {
  return window.currentProductVariantState || {
    productId: 0,
    storage: "",
    color: "",
    label: "",
  };
}

function getCurrentVariantPrice(product) {
  const state = getCurrentVariantState();
  if (!state.productId || Number(state.productId) !== Number(product.id)) {
    return Number(product.price) || 0;
  }

  return typeof getVariantPrice === "function"
    ? getVariantPrice(product, state.storage)
    : Number(product.price) || 0;
}

function renderVariantInstallmentButton(product, price, label) {
  const wrap = document.getElementById("variantInstallmentWrap");
  if (!wrap) return;

  if (
    typeof isInstallmentEligible !== "function" ||
    typeof installmentButtonHTML !== "function"
  ) {
    wrap.innerHTML = "";
    return;
  }

  const pricingProduct = { ...product, price };
  if (!isInstallmentEligible(pricingProduct)) {
    wrap.innerHTML = "";
    return;
  }

  wrap.innerHTML = `
    <button
      type="button"
      class="installment-button product-variant-installment"
      onclick="openInstallmentModal(${product.id}, ${Number(price)}, '${String(label).replace(/'/g, "\\'")}')"
    >
      <i class="fa-solid fa-calendar-days"></i>
      From R${formatVariantZAR((Number(price) - 2000) / 24)}/month
    </button>
  `;
}

function resolveVariantImage(imageValue) {
  const value = String(imageValue || "").trim();
  if (!value) return "";

  // Absolute URL/data URL is allowed for advanced use.
  if (/^(https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  // Local variant images live in images/products/variants/.
  return `../images/products/variants/${value.replace(/^[/\\]+/, "")}`;
}

function getSelectedVariantImage() {
  const state = getCurrentVariantState();
  const buttons = document.querySelectorAll(".product-color-option");

  for (const button of buttons) {
    if (button.dataset.color === state.color) {
      // IMPORTANT: an empty data-color-image means that this colour
      // does NOT have its own picture yet. In that case we return an
      // empty string so the normal product image is always preserved.
      const configuredImage = String(button.dataset.colorImage || "").trim();
      if (!configuredImage) return "";
      return resolveVariantImage(configuredImage);
    }
  }

  return "";
}

function updateProductVariantImage() {
  const image = document.querySelector(".product-detail-image img");
  if (!image) return;

  const baseImage = image.dataset.baseImage || image.getAttribute("src") || "";
  const variantImage = getSelectedVariantImage();

  // No colour-specific picture configured: keep the normal product image.
  if (!variantImage) {
    if (image.src !== new URL(baseImage, window.location.href).href) {
      image.src = baseImage;
    }
    image.dataset.activeVariantImage = "";
    return;
  }

  image.dataset.activeVariantImage = variantImage;

  // If the colour-specific file is missing, broken, or cannot be loaded,
  // immediately restore the ORIGINAL product image. This is deliberately
  // tied to this exact product image element, so another model's picture
  // can never be used as a fallback.
  image.onerror = function () {
    this.onerror = null;
    this.dataset.activeVariantImage = "";
    this.src = baseImage;
  };

  image.src = variantImage;
}

function updateProductVariantUI() {
  const product = window.currentProductForVariants;
  if (!product) return;

  const state = getCurrentVariantState();
  const price = getCurrentVariantPrice(product);
  const label = typeof getVariantLabel === "function"
    ? getVariantLabel(state.storage, state.color)
    : [state.storage, state.color].filter(Boolean).join(" • ");

  state.label = label;
  window.currentProductVariantState = state;

  const priceElement = document.getElementById("productVariantPrice");
  if (priceElement) {
    priceElement.textContent = `R${formatVariantZAR(price)}`;
  }

  const storageLabel = document.getElementById("selectedStorageLabel");
  if (storageLabel) {
    storageLabel.textContent = state.storage || "—";
  }

  const colorLabel = document.getElementById("selectedColorLabel");
  if (colorLabel) {
    colorLabel.textContent = state.color || "—";
  }

  const summary = document.getElementById("selectedVariantSummary");
  if (summary) {
    summary.innerHTML = label
      ? `Selected: <strong>${escapeHtml(label)}</strong>`
      : "No variant selected";
  }

  document.querySelectorAll(".storage-option").forEach((button) => {
    button.classList.toggle(
      "is-selected",
      button.dataset.storage === state.storage
    );
  });

  document.querySelectorAll(".product-color-option").forEach((button) => {
    button.classList.toggle(
      "is-selected",
      button.dataset.color === state.color && button.dataset.colorAvailable !== "false"
    );
  });

  renderVariantInstallmentButton(product, price, label);
  updateProductVariantImage();
}

function selectProductStorage(storage) {
  const product = window.currentProductForVariants;
  if (!product) return;

  window.currentProductVariantState = {
    ...getCurrentVariantState(),
    storage: String(storage || ""),
  };

  updateProductVariantUI();
}

function selectProductColor(color) {
  const product = window.currentProductForVariants;
  if (!product) return;

  const selectedButton = Array.from(document.querySelectorAll(".product-color-option"))
    .find((button) => button.dataset.color === String(color || ""));

  // Never allow an unavailable colour to be selected, even if a script
  // or old cached markup tries to trigger the function directly.
  if (selectedButton?.dataset.colorAvailable === "false") return;

  window.currentProductVariantState = {
    ...getCurrentVariantState(),
    color: String(color || ""),
  };

  updateProductVariantUI();
}

window.selectProductStorage = selectProductStorage;
window.selectProductColor = selectProductColor;

// ============================================================
// LOAD PRODUCT
// ============================================================

function loadProductPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = getProductById(productId);
  const container = document.getElementById("productDetails");

  if (!container) {
    return;
  }

  if (!product) {
    container.innerHTML = `
      <div class="product-not-found">
        <i class="fa-solid fa-box-open"></i>
        <h2>Product not found</h2>
        <p>The product you're looking for could not be found.</p>
        <a href="/shop" class="btn btn-primary">Back to Shop</a>
      </div>
    `;
    return;
  }

  // UPDATE PAGE TITLE
  document.title = `${product.name} | AfriGadgets`;

  // Meta Pixel: ViewContent must use the exact catalog product ID.
  afriMetaTrack("ViewContent", {
    content_ids: [afriMetaProductId(product)],
    content_type: "product",
    content_name: product.name,
    value: Number(product.price) || 0,
    currency: "ZAR"
  });

  // UPDATE BREADCRUMB
  const breadcrumb = document.getElementById("breadcrumbProduct");

  if (breadcrumb) {
    breadcrumb.textContent = product.name;
  }

  // PRODUCT IMAGE
  const imageHTML = product.image
    ? `
      <img
        src="../images/products/${product.image}"
        data-base-image="../images/products/${product.image}"
        alt="${escapeHtml(product.name)}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      >
      <div class="product-placeholder" style="display:none;">
        <i class="fa-solid ${escapeHtml(product.icon || "fa-box-open")}"></i>
      </div>
    `
    : `
      <div class="product-placeholder">
        <i class="fa-solid ${escapeHtml(product.icon || "fa-box-open")}"></i>
      </div>
    `;

  const variantConfig =
    typeof getProductVariantConfig === "function"
      ? getProductVariantConfig(product)
      : null;

  window.currentProductForVariants = product;
  window.currentProductVariantState = getInitialVariantState(product);

  const initialVariantPrice = getCurrentVariantPrice(product);
  const formattedPrice = Number(initialVariantPrice).toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // STOCK
  const hasStockValue =
    product.stock !== null &&
    product.stock !== undefined &&
    product.stock !== "" &&
    !Number.isNaN(Number(product.stock));

  const stockCount = hasStockValue ? Number(product.stock) : null;
  const inStock = stockCount === null || stockCount > 0;

  const stockHTML = inStock
    ? `
      <div class="product-stock">
        <i class="fa-solid fa-circle-check"></i>
        <span>
          ${stockCount === null ? "In stock" : `${stockCount} available`}
        </span>
      </div>
    `
    : `
      <div class="product-stock" style="color:#dc2626;">
        <i class="fa-solid fa-circle-xmark"></i>
        <span>Currently out of stock</span>
      </div>
    `;

  // PRODUCT DETAILS
  container.innerHTML = `
    <div class="product-detail-image">
      ${imageHTML}
    </div>

    <div class="product-detail-info">
      <span class="product-category">
        ${escapeHtml(product.category)}
      </span>

      <h1>${escapeHtml(product.name)}</h1>

      <div class="product-detail-price" id="productVariantPrice">
        R${formattedPrice}
      </div>

      ${variantConfig ? buildProductVariantControls(product) : ""}

      <p class="product-detail-description">
        ${escapeHtml(product.description)}
      </p>

      ${stockHTML}

      <div class="product-quantity">
        <label for="productQuantity">Quantity</label>

        <div class="quantity-control">
          <button
            type="button"
            aria-label="Decrease quantity"
            onclick="changeProductQuantity(-1)"
          >
            −
          </button>

          <input
            type="number"
            id="productQuantity"
            value="1"
            min="1"
            ${stockCount !== null ? `max="${Math.max(1, stockCount)}"` : ""}
            aria-label="Product quantity"
          >

          <button
            type="button"
            aria-label="Increase quantity"
            onclick="changeProductQuantity(1)"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-primary product-add-button"
        onclick="addCurrentProductToCart(${product.id})"
        ${inStock ? "" : "disabled"}
      >
        <i class="fa-solid fa-cart-plus"></i>
        ${inStock ? "Add to Cart" : "Out of Stock"}
      </button>

      <div id="variantInstallmentWrap"></div>

      <div class="product-trust">
        <div>
          <i class="fa-solid fa-truck-fast"></i>
          <span>Nationwide Delivery</span>
        </div>

        <div>
          <i class="fa-solid fa-shield-halved"></i>
          <span>Secure Shopping</span>
        </div>

        <div>
          <i class="fa-solid fa-headset"></i>
          <span>Customer Support</span>
        </div>
      </div>
    </div>
  `;

  if (variantConfig) {
    updateProductVariantUI();
  }

  loadRelatedProducts(product);
}

// ============================================================
// RELATED PRODUCTS
// ============================================================

function loadRelatedProducts(product) {
  const container = document.getElementById("relatedProducts");

  if (!container) {
    return;
  }

  let related = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id,
  );

  related = related.slice(0, 8);

  renderProducts("relatedProducts", related);
}

// ============================================================
// QUANTITY
// ============================================================

function changeProductQuantity(change) {
  const input = document.getElementById("productQuantity");

  if (!input) {
    return;
  }

  let quantity = Number(input.value) || 1;
  quantity += change;

  const min = Number(input.min) || 1;
  const max = input.max ? Number(input.max) : Infinity;

  quantity = Math.max(min, Math.min(quantity, max));

  input.value = quantity;
}

// ============================================================
// ADD CURRENT PRODUCT
// ============================================================

function addCurrentProductToCart(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  const quantityInput = document.getElementById("productQuantity");
  const quantity = Math.max(1, Number(quantityInput?.value) || 1);

  const state = getCurrentVariantState();
  const hasVariant = Number(state.productId) === Number(productId) && !!(state.storage || state.color);
  const selectedPrice = hasVariant
    ? getCurrentVariantPrice(product)
    : Number(product.price) || 0;
  const variantLabel = hasVariant
    ? (state.label || [state.storage, state.color].filter(Boolean).join(" • "))
    : "";
  const cartKey = `${product.id}::${state.storage || ""}::${state.color || ""}`;

  const selectedColorButton = Array.from(document.querySelectorAll(".product-color-option"))
    .find((button) => button.dataset.color === String(state.color || ""));
  const variantImage = selectedColorButton?.dataset.colorImage || "";

  const cart = getCart();
  const existing = cart.find(
    (item) => String(item.variantKey || item.id) === cartKey
  );

  if (existing) {
    // Keep the currently selected colour image/variant details on the cart line.
    existing.variantImage = variantImage;
    existing.variantStorage = state.storage || "";
    existing.variantColor = state.color || "";
    existing.variantLabel = variantLabel;
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      baseName: product.name,
      category: product.category,
      price: selectedPrice,
      image: resolveProductImage(product),
      variantImage: variantImage,
      quantity: quantity,
      variantKey: cartKey,
      variantStorage: state.storage || "",
      variantColor: state.color || "",
      variantLabel,
    });
  }

  saveCart(cart);
  updateCartCount();

  // Meta Pixel: use the base catalog product ID even when a colour/storage
  // variant is selected. The variant details remain in the cart separately.
  afriMetaTrack("AddToCart", {
    content_ids: [afriMetaProductId(product)],
    content_type: "product",
    content_name: product.name,
    value: Number(selectedPrice) || 0,
    currency: "ZAR",
    contents: [{
      id: afriMetaProductId(product),
      quantity: quantity,
      item_price: Number(selectedPrice) || 0
    }]
  });

  showCartMessage(
    variantLabel
      ? `${escapeHtml(product.name)} (${escapeHtml(variantLabel)}) added to cart`
      : `${escapeHtml(product.name)} added to cart`
  );
}

// ============================================================
// EXPOSE FUNCTIONS
// ============================================================

window.changeProductQuantity = changeProductQuantity;
window.addCurrentProductToCart = addCurrentProductToCart;



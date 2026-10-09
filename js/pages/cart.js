let DELIVERY_FEE = 99;

async function loadDeliveryFee() {
  try {
    if (typeof supabase === "undefined") {
      console.warn("Supabase client not available. Using fallback delivery fee.");
      return;
    }

    const { data, error } = await supabase
      .from("store_settings")
      .select("delivery_fee")
      .eq("id", true)
      .single();

    if (error) {
      console.error("Could not load delivery fee:", error);
      return;
    }

    if (data && data.delivery_fee !== null && data.delivery_fee !== undefined) {
      DELIVERY_FEE = Number(data.delivery_fee);
    }
  } catch (error) {
    console.error("Delivery fee loading error:", error);
  }
}

function getCart() {
  return JSON.parse(localStorage.getItem("afrigadgets-cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("afrigadgets-cart", JSON.stringify(cart));
}

async function renderCart() {
  // Always get the latest delivery fee from Admin/Supabase
  await loadDeliveryFee();

  const cart = getCart();

  const cartContent = document.getElementById("cartContent");
  const emptyCart = document.getElementById("emptyCart");
  const cartItems = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartContent.style.display = "none";
    emptyCart.style.display = "block";
    updateCartCount();
    return;
  }

  cartContent.style.display = "grid";
  emptyCart.style.display = "none";
  cartItems.innerHTML = "";

  let subtotal = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    subtotal += Number(item.price) * item.quantity;
    totalItems += item.quantity;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    // Resolve the selected colour image separately from the product's normal image.
    // Variant images are stored under images/products/variants/. If the selected
    // variant image is missing, the cart falls back to THIS product's normal image.
    function resolveCartAsset(value, isVariant = false) {
      const raw = String(value || "").trim();
      if (!raw) return "";
      if (/^(https?:|data:|blob:)/i.test(raw)) return raw;

      const clean = raw
        .replace(/^\.\//, "")
        .replace(/^\.\.\//, "")
        .replace(/^\//, "");

      let asset;
      if (clean.startsWith("images/products/variants/")) {
        asset = clean;
      } else if (clean.startsWith("images/products/")) {
        asset = clean;
      } else {
        asset = isVariant
          ? `images/products/variants/${clean}`
          : `images/products/${clean}`;
      }

      return typeof getStoreAssetUrl === "function"
        ? getStoreAssetUrl(asset)
        : `../${asset}`;
    }

    const normalImage = item.image ||
      (typeof resolveProductImage === "function" ? resolveProductImage(item) : "");
    const normalImageUrl = resolveCartAsset(normalImage, false);
    const variantImageUrl = resolveCartAsset(item.variantImage, true);
    const cartImageUrl = variantImageUrl || normalImageUrl;
    const safeIcon = item.icon || "fa-mobile-screen";

    // If a variant image 404s, immediately restore the original product image.
    const imageHtml = cartImageUrl
      ? `<img src="${cartImageUrl}"
          data-normal-image="${normalImageUrl.replace(/"/g, '&quot;')}"
          data-variant-image="${variantImageUrl.replace(/"/g, '&quot;')}"
          alt="${escapeHtml(item.name)}"
          style="width:100%; height:100%; object-fit:contain;"
          onerror="if(this.dataset.variantImage && this.src === this.dataset.variantImage){this.onerror=null; this.src=this.dataset.normalImage;}else{this.parentElement.innerHTML='<i class=\'fa-solid ${safeIcon}\'></i>';}">`
      : `<i class="fa-solid ${safeIcon}"></i>`;

    itemElement.innerHTML = `
      <div class="cart-product-image"
        style="width:80px; height:80px; background:#fff; border-radius:10px; overflow:hidden; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        ${imageHtml}
      </div>

      <div class="cart-product-info">
        <span class="product-category">
          ${escapeHtml(item.category || "PRODUCT")}
        </span>

        <a href="/product?id=${item.id}" class="cart-product-name">
          ${escapeHtml(item.name)}
        </a>

        ${item.variantLabel ? `
          <div class="cart-product-variant">
            ${escapeHtml(item.variantLabel)}
          </div>
        ` : ""}

        <div class="cart-price">
          ${formatPrice(item.price)}
        </div>
      </div>

      <div class="cart-quantity">
        <button onclick="changeCartQuantity('${String(item.variantKey || item.id)}', -1)">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeCartQuantity('${String(item.variantKey || item.id)}', 1)">+</button>
      </div>

      <div class="cart-item-total">
        ${formatPrice(Number(item.price) * item.quantity)}
      </div>

      <button
        class="remove-cart-item"
        onclick="removeCartItem('${String(item.variantKey || item.id)}')"
        title="Remove item">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    cartItems.appendChild(itemElement);
  });

  document.getElementById("cartItemCount").textContent =
    `${totalItems} item${totalItems !== 1 ? "s" : ""}`;

  document.getElementById("cartSubtotal").textContent =
    formatPrice(subtotal);

  // Use the delivery price set by Admin
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;

  document.getElementById("cartDelivery").textContent =
    formatPrice(delivery);

  document.getElementById("cartTotal").textContent =
    formatPrice(subtotal + delivery);

  updateCartCount();
}

function changeCartQuantity(cartKey, amount) {
  const cart = getCart();

  const key = String(cartKey);
  const item = cart.find(
    (item) => String(item.variantKey || item.id) === key
  );
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    const confirmed = confirm("Remove this product from your cart?");

    if (confirmed) {
      removeCartItem(key);
      return;
    }

    item.quantity = 1;
  }

  saveCart(cart);
  renderCart();
}


function clearCart() {
  const cart = getCart();

  if (!Array.isArray(cart) || cart.length === 0) return;

  const modal = document.getElementById("clearCartModal");
  if (!modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const cancelButton = modal.querySelector(".clear-cart-cancel");
  if (cancelButton) cancelButton.focus();
}

function closeClearCartModal() {
  const modal = document.getElementById("clearCartModal");
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function confirmClearCart() {
  const cart = getCart();

  if (!Array.isArray(cart) || cart.length === 0) {
    closeClearCartModal();
    return;
  }

  saveCart([]);
  closeClearCartModal();

  renderCart();
  updateCartCount();

  if (typeof showToast === "function") {
    showToast("Your cart has been cleared.");
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeClearCartModal();
  }
});


function removeCartItem(cartKey) {
  let cart = getCart();

  const key = String(cartKey);
  cart = cart.filter(
    (item) => String(item.variantKey || item.id) !== key
  );

  saveCart(cart);
  renderCart();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadDeliveryFee();
  await renderCart();
  updateCartCount();
});
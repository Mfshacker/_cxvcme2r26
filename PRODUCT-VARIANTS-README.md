# AfriGadgets — Product Variant Update

Implemented on the product-detail ("View Details") page only.

## Added
- Storage choices for qualifying phones, especially iPhones.
- Model-specific colour choices.
- Higher storage automatically adds the configured increment to the displayed price.
- Selected storage/colour appears in the cart.
- Variant price is carried into checkout.
- Installment display on the product detail page updates to the selected variant price.
- Product cards remain unchanged: no storage/colour selectors are shown on the physical cards.

## Configuration
Variant definitions are in:
`js/shared/product-variants.js`

Edit the `storage` increments and `colors` arrays there if you want to change availability or pricing.

## Important backend note
The existing Supabase `create_order()` function in this project currently recalculates order prices from the base `products.price` column. The frontend now sends `unit_price` and variant metadata with the order request, but the existing RPC will ignore those extra fields until its SQL function is updated.

This update intentionally does not alter the existing database function automatically, so the current Supabase order system is not silently replaced.


## Colour-specific product pictures

Colour choices can now change the main product image on the product details page. Product cards remain unchanged.

### Add a picture
1. Put the colour image in `images/products/variants/`.
2. Open `js/shared/product-variants.js`.
3. Add the image filename as the third value in the colour entry.

Example:

```js
colors: [
  ["Black", "#171717", "iphone17-black.png"],
  ["White", "#f3f3f3", "iphone17-white.png"],
  ["Red", "#e53935", "iphone17-red.png"]
]
```

The first value is the colour name, the second is the swatch colour, and the third is the picture filename. When the customer selects Black, the main product picture changes to `iphone17-black.png`. If no picture is supplied, the normal product picture stays visible. If a configured file is missing, the page automatically falls back to the normal picture.

You can also use a full HTTPS image URL as the third value if required.

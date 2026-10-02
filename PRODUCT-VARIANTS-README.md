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

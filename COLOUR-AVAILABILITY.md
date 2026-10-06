# AfriGadgets colour availability

Colour options use this format:

```js
["Black", "#171717", "iphone-black.png"]
```

A colour is available by default.

To mark a colour as **unavailable** for a specific model, add `false` as the fourth value:

```js
["Gold", "#d4af37", "", false]
```

The site will then:
- show the colour swatch with a red diagonal dash;
- disable the button so it cannot be selected;
- show `Unavailable` in the tooltip/accessibility label;
- never change the product image or price to that colour.

An available colour can have no image yet:

```js
["Blue", "#4d66a6"]
```

It remains clickable, and the normal product image is used until a colour-specific image is added.

# Taqueria Ibarra web logo assets

Extracted from the provided image and exported for web development.

## Included

- `logo-transparent.png` — tightly cropped transparent PNG
- `logo-transparent@2x.png` — enlarged transparent PNG
- `logo-wide-300.png`, `logo-wide-600.png`, `logo-wide-900.png`, `logo-wide-1200.png`
- `.webp` wide logo exports
- `favicon.ico` — multi-size ICO
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `site.webmanifest`
- `source-original.jpg`

## Drop-in HTML

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

## Next.js app router example

Place these files in `/public`.

```tsx
<img
  src="/logo-transparent.png"
  alt="Taqueria Ibarra"
  className="h-auto w-[220px]"
/>
```

Note: the source image is low-resolution, so these are optimized web assets, not a true vector redraw.

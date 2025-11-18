// src/utils/loadAllProductImages.ts

export function loadAllProductImages() {
  // Import ALL IMAGES recursively from product-listings folder
  const modules = import.meta.glob(
    '@/assets/product-listings/**/*.{png,jpg,jpeg,JPG,JPEG,webp,WEBP}',
    { eager: true, import: 'default' }
  );

  // structure: { Rings: { Ring1: [..images], Ring2: [...] }, Earrings: {...}, ... }
  const structured: Record<string, Record<string, string[]>> = {};

  for (const path in modules) {
    const parts = path.split('/');

    // Example path:
    // "/src/assets/product-listings/Rings/Ring1/Image-1.JPG"
    //
    // parts:
    // ["", "src", "assets", "product-listings", "Rings", "Ring1", "Image-1.JPG"]

    const category = parts[4];       // "Rings"
    const productFolder = parts[5];  // "Ring1"

    if (!structured[category]) {
      structured[category] = {};
    }

    if (!structured[category][productFolder]) {
      structured[category][productFolder] = [];
    }

    structured[category][productFolder].push(modules[path] as string);
  }

  // Sort images inside each product folder
  for (const category in structured) {
    for (const productFolder in structured[category]) {
      structured[category][productFolder].sort();
    }
  }

  return structured;
}

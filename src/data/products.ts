import { loadAllProductImages } from '@/utils/loadAllProductImages';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: 'rings' | 'earrings' | 'necklaces' | 'bracelets';
  images: string[];
  details: string[];
  heroImage: string;
}

// Load all folder images
const productImages = loadAllProductImages();

console.log(productImages);

/**
 * Helper to fetch images safely
 */
const img = (category: string, folder: string): string[] => {
  return productImages?.[category]?.[folder] ?? [];
};

// Now keep your EXACT product data, but map images dynamically
export const productsData: Record<string, Product[]> = {
  rings: [
    { 
      id: 1, 
      name: 'Ethereal Band', 
      heroImage: img('Rings', 'Ring1')[0],
      description: 'A delicate band featuring a subtle rosegold finish, perfect for everyday elegance.',
      category: 'rings',
      images: img('Rings', 'Ring1'),
      details: ['18K Rosegold', '2mm width', 'Handcrafted', 'Nickel-free', 'Hypoallergenic']
    },
    { 
      id: 2, 
      name: 'Signature Solitaire', 
      heroImage: img('Rings', 'Ring2')[0],
      description: 'A timeless solitaire ring featuring a brilliant cut stone set in warm rosegold.',
      category: 'rings',
      images: img('Rings', 'Ring2'),
      details: ['18K Rosegold', '4mm center stone', 'Handcrafted', 'Conflict-free', 'Lifetime guarantee']
    },
    { 
      id: 3, 
      name: 'Radiant Halo', 
      heroImage: img('Rings', 'Ring3')[0],
      description: 'A radiant halo design that enhances the brilliance of the central gemstone.',
      category: 'rings',
      images: img('Rings', 'Ring3'),
      details: ['White Sapphire', '18K Rosegold', 'Halo setting', 'Handcrafted', 'Gift box included']
    },
    { 
      id: 4, 
      name: 'Vintage Twist', 
      heroImage: img('Rings', 'Ring4')[0],
      description: 'An intricately twisted band that combines vintage charm with modern grace.',
      category: 'rings',
      images: img('Rings', 'Ring4'),
      details: ['18K Yellow Gold', '3mm width', 'Handcrafted', 'Polished finish', 'Nickel-free']
    },
    { 
      id: 5, 
      name: 'Signature Solitaire', 
      heroImage: img('Rings', 'Ring5')[0],
      description: 'A timeless solitaire ring featuring a brilliant cut stone set in warm rosegold.',
      category: 'rings',
      images: img('Rings', 'Ring5'),
      details: ['18K Rosegold', '4mm center stone', 'Handcrafted', 'Conflict-free', 'Lifetime guarantee']
    },
    { 
      id: 6, 
      name: 'Signature Solitaire', 
      heroImage: img('Rings', 'Ring6')[0],
      description: 'A timeless solitaire ring featuring a brilliant cut stone set in warm rosegold.',
      category: 'rings',
      images: img('Rings', 'Ring6'),
      details: ['18K Rosegold', '4mm center stone', 'Handcrafted', 'Conflict-free', 'Lifetime guarantee']
    },
  ],

  // Keep your earrings section, just map images
  earrings: [
    { 
      id: 5, 
      name: 'Pearl Drop', 
      heroImage: img('Earrings', 'Earring1')[0],
      description: 'Elegant pearl drop earrings that add sophistication to any look.',
      category: 'earrings',
      images: img('Earrings', 'Earring1'),
      details: ['Freshwater pearls', '18K Rosegold', 'French wire', 'Hypoallergenic', 'Gift box included']
    },
    { 
      id: 6, 
      name: 'Radiant Hoops', 
      heroImage: img('Earrings', 'Earring2')[0],
      description: 'Classic hoop earrings featuring a polished gold finish for a timeless appeal.',
      category: 'earrings',
      images: img('Earrings', 'Earring2'),
      details: ['18K Yellow Gold', '30mm diameter', 'Snap clasp', 'Lightweight', 'Handcrafted']
    },
  ],

  // Same approach for necklaces + bracelets...
  necklaces: [
    {
      id: 9,
      name: 'Infinity Chain',
      heroImage: img('Necklaces', 'Necklace1')[0],
      description: 'A minimalist infinity pendant on a sleek chain, symbolizing endless elegance.',
      category: 'necklaces',
      images: img('Necklaces', 'Necklace1'),
      details: ['18K Rosegold', 'Adjustable 16–18 inch chain', 'Polished finish', 'Handcrafted', 'Gift box included']
    }
  ],

  bracelets: [
    {
      id: 13,
      name: 'Classic Chain Bracelet',
      heroImage: img('Bracelets', 'Bracelet1')[0],
      description: 'A sleek gold chain bracelet that pairs effortlessly with any outfit.',
      category: 'bracelets',
      images: img('Bracelets', 'Bracelet1'),
      details: ['18K Gold-plated', '7-inch length', 'Lobster clasp', 'Nickel-free', 'Gift box included']
    }
  ]
};

// Helper functions remain unchanged
export const findProduct = (category: string, productId: number): Product | undefined => {
  const products = productsData[category];
  if (!products) return undefined;
  return products.find(p => p.id === productId);
};

export const getAllProducts = (): Product[] => {
  return Object.values(productsData).flat();
};

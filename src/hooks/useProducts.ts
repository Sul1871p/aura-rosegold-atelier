import { useState, useEffect, useCallback } from 'react';
import * as prismic from '@prismicio/client';
import { prismicClient } from '@/lib/prismic';

export const useProducts = (collectionId: string | undefined) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [count, setCount] = useState(8); // number currently shown

  const fetchProducts = useCallback(async () => {
    if (!collectionId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch ALL products from the collection
      const response = await prismicClient.getByType("product_details", {
        filters: [
          prismic.filter.at("my.product_details.category", collectionId)
        ],
        pageSize: 100,
      });

      const all = response.results;

      setAllProducts(all);
      setVisibleProducts(all.slice(0, 8));
      setCount(8);     // IMPORTANT: reset count when collection changes
      setError(null);

    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load products"));
      setAllProducts([]);
      setVisibleProducts([]);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  // Load more products (visible +8 each time)
  const loadMore = useCallback(() => {
    setCount(prev => {
      const next = prev + 8;

      // Prevent overshooting
      if (next > allProducts.length) {
        setVisibleProducts(allProducts);
        return allProducts.length;
      }

      setVisibleProducts(allProducts.slice(0, next));
      return next;
    });
  }, [allProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: visibleProducts,
    loadMore,
    hasMore: visibleProducts.length < allProducts.length,
    loading,
    error,
  };
};

export default useProducts;

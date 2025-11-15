"use client";

import { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Array<{
    product: Product;
    score?: number;
  }>;
  isLoading: boolean;
  isSearching: boolean;
}

export default function ProductGrid({
  products,
  isLoading,
  isSearching,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '256px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '48px',
                  height: '48px',
                  border: '2px solid #e5e7eb',
                  borderTopColor: '#000000',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
            <p style={{ marginTop: '16px', color: '#4b5563' }}>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '256px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              <div
                style={{
                  display: 'inline-block',
                  width: '48px',
                  height: '48px',
                  border: '2px solid #e5e7eb',
                  borderTopColor: '#000000',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
            <p style={{ marginTop: '16px', color: '#000000', fontWeight: '500' }}>Analyzing image...</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '8px' }}>
              This may take a few seconds on first load
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '256px' }}>
          <div style={{ textAlign: 'center', color: '#6b7280' }}>
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>No products found</p>
            <p style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Try adjusting your filters or upload a different image
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {products.map(({ product, score }) => (
          <ProductCard
            key={product.id}
            product={product}
            similarityScore={score}
          />
        ))}
      </div>
      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.75rem', color: '#d1d5db' }}>
        Showing up to {products.length} results
      </div>
    </div>
  );
}

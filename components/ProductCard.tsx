"use client";

import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  similarityScore?: number;
}

export default function ProductCard({
  product,
  similarityScore,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "bg-green-100 text-green-800";
    if (score >= 0.6) return "bg-yellow-100 text-yellow-800";
    return "bg-orange-100 text-orange-800";
  };

  const getSimilarityPercentage = (score: number) => {
    return Math.round(score * 100);
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Product Image */}
      <div
        style={{
          position: 'relative',
          height: '224px',
          width: '100%',
          background: '#f3f4f6',
          overflow: 'hidden',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {similarityScore !== undefined && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#ffffff',
              background: '#000000',
              border: '1px solid rgba(0,0,0,0.2)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            {getSimilarityPercentage(similarityScore)}% Match
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '16px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontWeight: '700',
                color: '#000000',
                fontSize: '14px',
                lineHeight: '1.5',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                margin: 0,
              }}
            >
              {product.name}
            </h3>
            <p style={{ fontSize: '12px', fontWeight: '600', marginTop: '4px', color: '#6b7280', margin: 0 }}>
              {product.category}
            </p>
          </div>
        </div>

        <p
          style={{
            fontSize: '12px',
            color: '#4b5563',
            marginBottom: '12px',
            lineHeight: '1.6',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            margin: 0,
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#000000',
            }}
          >
            {formatPrice(product.price)}
          </span>
          <button
            style={{
              fontSize: '12px',
              padding: '6px 16px',
              background: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#374151';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

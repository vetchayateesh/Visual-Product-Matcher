"use client";

import Image from "next/image";
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
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
        />
        {similarityScore !== undefined && (
          <div
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${getScoreColor(
              similarityScore
            )}`}
          >
            {getSimilarityPercentage(similarityScore)}% Match
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{product.category}</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import ImageUpload from "@/components/ImageUpload";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/lib/products";
import {
  extractFeaturesFromFile,
  extractFeaturesFromUrl,
} from "@/lib/imageProcessor";
import {
  rankSimilarProducts,
  normalizeSimilarityScore,
} from "@/lib/similarity";

interface ProductWithScore {
  product: Product;
  score: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [similarityThreshold, setSimilarityThreshold] = useState(50);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ProductWithScore[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const productFeaturesRef = useRef<Map<string, tf.Tensor1D>>(
    new Map()
  );
  const userFeaturesRef = useRef<tf.Tensor1D | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);

          const uniqueCategories = Array.from(
            new Set(data.data.map((p: Product) => p.category))
          ).sort() as string[];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const preloadProductFeatures = async () => {
      if (products.length === 0) return;

      try {
        for (const product of products) {
          try {
            const features = await extractFeaturesFromUrl(product.imageUrl);
            productFeaturesRef.current.set(product.id, features);
          } catch (error) {
            console.warn(
              `Failed to extract features for product ${product.id}:`,
              error
            );
          }
        }
      } catch (error) {
        console.error("Error preloading product features:", error);
      }
    };

    preloadProductFeatures();
  }, [products]);

  const handleImageUpload = async (file: File | null, preview: string) => {
    setUploadedImage(preview);
    setIsSearching(true);
    userFeaturesRef.current = null;
    setSearchResults([]);

    try {
      let features: tf.Tensor1D;

      if (file) {
        features = await extractFeaturesFromFile(file);
      } else {
        features = await extractFeaturesFromUrl(preview);
      }

      userFeaturesRef.current = features;

      const similarities = rankSimilarProducts(
        features,
        productFeaturesRef.current,
        -1
      );

      const resultsWithProducts = similarities
        .map((sim) => {
          const product = products.find((p) => p.id === sim.productId);
          if (!product) return null;

          return {
            product,
            score: normalizeSimilarityScore(sim.score),
          };
        })
        .filter((item): item is ProductWithScore => item !== null);

      setSearchResults(resultsWithProducts);
    } catch (error) {
      console.error("Error processing image:", error);
      alert(
        "Error processing image. Please try another image or check the URL."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const filteredResults = searchResults
    .filter((item) => item.score >= similarityThreshold / 100)
    .filter(
      (item) =>
        selectedCategory === "" || item.product.category === selectedCategory
    );

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Visual Product Matcher
            </h1>
            <p className="text-gray-600 mt-2">
              Find visually similar products by uploading an image or providing
              an image URL
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12">
          <ImageUpload
            onImageUpload={handleImageUpload}
            isLoading={isSearching}
          />
        </section>

        {uploadedImage && (
          <section className="space-y-6">
            <FilterBar
              similarityThreshold={similarityThreshold}
              onThresholdChange={setSimilarityThreshold}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              resultCount={filteredResults.length}
            />

            <ProductGrid
              products={filteredResults}
              isLoading={isLoading}
              isSearching={isSearching}
            />
          </section>
        )}

        {!uploadedImage && !isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get Started
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Upload an image or provide a URL to find visually similar products
              in our catalog
            </p>
          </div>
        )}
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>
            Powered by TensorFlow.js MobileNet for visual similarity detection
          </p>
        </div>
      </footer>
    </main>
  );
}

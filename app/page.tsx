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
    <main style={{background: '#ffffff', minHeight: '100vh', color: '#000000', margin: 0, padding: 0}}>
      {/* Hero Section */}
      <div style={{background: '#ffffff', borderBottom: '1px solid #e5e7eb', paddingBottom: '3rem', paddingTop: '2rem'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem'}}>
          {/* Badge */}
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '9999px', padding: '0.5rem 1rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#374151', fontWeight: '600'}}>
            <span style={{display: 'inline-block', width: '0.5rem', height: '0.5rem', backgroundColor: '#000000', borderRadius: '50%'}}></span>
            INSTANT VISUAL DISCOVERY
          </div>

          {/* Main Content */}
          <div style={{maxWidth: '900px'}}>
            <h1 style={{fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.2', marginBottom: '1.5rem', color: '#000000', margin: 0}}>
              Drop an image.<br/>
              Discover matching<br/>
              products in seconds.
            </h1>
            
            <p style={{fontSize: '1.125rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1.5rem', maxWidth: '650px', margin: 0}}>
              Compare any product shot against a curated catalogue of 52 real items. Our visual similarity matching helps you surface related recommendations instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{maxWidth: '1280px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '2rem', paddingBottom: '2rem'}}>
        {/* Two Column Layout */}
        <div style={{display: 'grid', gridTemplateColumns: uploadedImage ? 'repeat(2, 1fr)' : '1fr', gap: '2rem', marginBottom: '2rem'}}>
          {/* Left: Upload Section */}
          <div>
            <ImageUpload
              onImageUpload={handleImageUpload}
              isLoading={isSearching}
            />
          </div>

          {/* Right: Controls (shown if image uploaded) */}
          {uploadedImage && (
            <div>
              <FilterBar
                similarityThreshold={similarityThreshold}
                onThresholdChange={setSimilarityThreshold}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                resultCount={filteredResults.length}
              />
            </div>
          )}
        </div>

        {/* Products Grid */}
        {uploadedImage && (
          <section>
            <ProductGrid
              products={filteredResults}
              isLoading={isLoading}
              isSearching={isSearching}
            />
          </section>
        )}

        {/* Empty State */}
        {!uploadedImage && !isLoading && (
          <div style={{textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem'}}>
            <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', backgroundColor: '#f3f4f6', borderRadius: '50%', marginBottom: '1rem'}}>
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{color: '#000000'}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#000000'}}>
              Get Started
            </h3>
            <p style={{color: '#6b7280', maxWidth: '28rem', margin: '0 auto'}}>
              Upload an image or provide a URL to find visually similar products in our catalog
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{marginTop: '5rem', position: 'relative', zIndex: 10, borderTop: '1px solid #e5e7eb', background: '#ffffff', padding: '1rem'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', fontSize: '0.875rem', color: '#4b5563'}}>
          <span>© 2025 Visual Product Matcher. All rights reserved.</span>
          <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
            <a
              href="https://github.com/vetchayateesh"
              target="_blank"
              rel="noopener noreferrer"
              style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s', cursor: 'pointer'}}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yateesh-vetcha-536a97281/"
              target="_blank"
              rel="noopener noreferrer"
              style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s', cursor: 'pointer'}}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.428-.66 1.19-1.6 2.894-1.6 2.114 0 3.696 1.38 3.696 4.349v5.604zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.971-1.715 1.2 0 1.912.76 1.938 1.715 0 .953-.738 1.715-1.994 1.715zm1.582 11.597H3.635V9.724h3.284v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

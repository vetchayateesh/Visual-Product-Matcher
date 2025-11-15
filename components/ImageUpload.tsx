"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (file: File | null, preview: string) => void;
  isLoading: boolean;
}

export default function ImageUpload({
  onImageUpload,
  isLoading,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageUpload(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = async () => {
    setError("");

    if (!urlInput.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const response = await fetch(urlInput);
      if (!response.ok) {
        throw new Error("Failed to load image from URL");
      }

      setPreview(urlInput);
      onImageUpload(null, urlInput);
    } catch {
      setError("Failed to load image from URL. Please check the URL and try again.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        onImageUpload(file, result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please drop a valid image file");
    }
  };

  return (
    <div style={{width: '100%', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '1rem', padding: '2rem'}}>
      {/* Tabs */}
      <div style={{display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem'}}>
        <button
          onClick={() => setActiveTab("upload")}
          style={{
            padding: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s',
            borderBottom: activeTab === "upload" ? '2px solid #000000' : '2px solid transparent',
            color: activeTab === "upload" ? '#000000' : '#9ca3af',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Upload Image
        </button>
        <button
          onClick={() => setActiveTab("url")}
          style={{
            padding: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s',
            borderBottom: activeTab === "url" ? '2px solid #000000' : '2px solid transparent',
            color: activeTab === "url" ? '#000000' : '#9ca3af',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Image URL
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <div>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: '2px dashed #d1d5db',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: '#ffffff',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = '#9ca3af';
              (e.target as HTMLElement).style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = '#d1d5db';
              (e.target as HTMLElement).style.backgroundColor = '#ffffff';
            }}
          >
            <div style={{marginBottom: '1rem', color: '#374151', fontSize: '1rem'}}>
              Drop your product photo here
            </div>
            <button
              disabled={isLoading}
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.6 : 1
              }}
            >
              Browse files
            </button>
            <div style={{marginTop: '1rem', fontSize: '0.875rem', color: '#9ca3af'}}>
              PNG, JPG, GIF up to 10MB
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{display: 'none'}}
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      {/* URL Tab */}
      {activeTab === "url" && (
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
              color: '#000000',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#000000')}
            onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
          />
          <button
            onClick={handleUrlSubmit}
            disabled={isLoading || !urlInput.trim()}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontWeight: '600',
              cursor: (isLoading || !urlInput.trim()) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !urlInput.trim()) ? 0.6 : 1,
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? "Loading..." : "Load"}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#991b1b', fontSize: '0.875rem'}}>
          {error}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div style={{marginTop: '1.5rem'}}>
          <div style={{fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem'}}>
            Uploaded Image Preview
          </div>
          <div style={{position: 'relative', width: '100%', height: '200px', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e7eb', backgroundColor: '#f3f4f6'}}>
            <Image
              src={preview}
              alt="Preview"
              fill
              style={{objectFit: 'cover'}}
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}

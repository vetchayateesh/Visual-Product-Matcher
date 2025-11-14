# Visual Product Matcher

A modern web application that helps users find visually similar products using AI-powered image recognition powered by TensorFlow.js and MobileNet.

## 🎯 Project Overview

Visual Product Matcher uses machine learning to analyze uploaded images and find similar products from a curated catalog of 50+ items across multiple categories including Electronics, Fashion, Home, Sports, Books, and Toys.

## ✨ Key Features

- **Image Upload**: Support for both file uploads and image URL inputs
- **Visual Search**: Uses TensorFlow.js MobileNet for feature extraction
- **Smart Filtering**: Filter results by similarity score (0-100%) and product category
- **Real-time Results**: Instant similarity calculations with visual match percentages
- **Mobile Responsive**: Fully responsive design optimized for all devices
- **Fast Performance**: Client-side processing ensures quick results
- **Error Handling**: Comprehensive error messages and fallback states

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ML Engine**: TensorFlow.js with MobileNet
- **Backend**: Next.js API Routes
- **Deployment**: Vercel

## 📦 Project Structure

# Visual Product Matcher

A modern web application that helps users find visually similar products using AI-powered image recognition powered by TensorFlow.js and MobileNet.

## 🎯 Project Overview

Visual Product Matcher uses machine learning to analyze uploaded images and find similar products from a curated catalog of 50+ items across multiple categories including Electronics, Fashion, Home, Sports, Books, and Toys.

## ✨ Key Features

- **Image Upload**: Support for both file uploads and image URL inputs
- **Visual Search**: Uses TensorFlow.js MobileNet for feature extraction
- **Smart Filtering**: Filter results by similarity score (0-100%) and product category
- **Real-time Results**: Instant similarity calculations with visual match percentages
- **Mobile Responsive**: Fully responsive design optimized for all devices
- **Fast Performance**: Client-side processing ensures quick results
- **Error Handling**: Comprehensive error messages and fallback states

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ML Engine**: TensorFlow.js with MobileNet
- **Backend**: Next.js API Routes
- **Deployment**: Vercel

## 📦 Project Structure

```
├── app/
│   ├── api/
│   │   └── products/route.ts     # API endpoint
│   ├── page.tsx                  # Main search page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ImageUpload.tsx           # Upload interface
│   ├── FilterBar.tsx             # Filtering
│   ├── ProductCard.tsx           # Product display
│   └── ProductGrid.tsx           # Grid layout
├── lib/
│   ├── products.ts               # Product database (52 items)
│   ├── imageProcessor.ts         # TensorFlow utilities
│   └── similarity.ts             # Similarity calculation
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🚀 Getting Started

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
npm run build
npm start
```

## 🧠 How It Works

### Image Processing Pipeline

1. User uploads image or provides URL
2. TensorFlow.js loads MobileNet model
3. Image converted to 1000-dimensional feature vector
4. Cosine similarity computed with product images
5. Results ranked and filtered by user preferences
6. Matching products displayed with match percentages

### Feature Extraction

- MobileNet v2 with 224x224 input
- 1000-dimensional feature vectors
- Semantic image representation
- Enables visual similarity comparison

### Similarity Scoring

- **Algorithm**: Cosine Similarity
- **Range**: 0-100%
- **Filtering**: User-adjustable threshold

## 📊 Product Database

52 curated products across 6 categories:

- **Electronics** (11): Cameras, headphones, speakers
- **Fashion** (9): Clothing, shoes, accessories
- **Home** (10): Furniture, kitchen, décor
- **Sports** (10): Equipment, gear, fitness
- **Books** (5): Various genres
- **Toys** (5): Games, puzzles, collectibles

## 🎨 UI Components

**ImageUpload**: Drag-drop, tab interface, preview, validation

**FilterBar**: Similarity slider, category buttons, result counter

**ProductGrid**: Responsive layout, loading states, error handling

**ProductCard**: Image, name, category, price, match percentage

## 🚀 Deploy on Vercel

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Then connect to https://vercel.com/new and deploy.

## 📱 Responsive Design

- 1-3 column grid based on screen size
- Touch-friendly controls
- Optimized image sizing
- Mobile-first approach

## 🔐 Privacy

- Client-side processing only
- No data storage
- No tracking
- Open-source

## 📈 Performance

- Model load: 3-5 seconds (first use)
- Feature extraction: 1-2 seconds
- Similarity calculation: <100ms
- Total search: 2-3 seconds

## 🌐 Browser Support

Chrome, Firefox, Safari, Mobile browsers ✅

## 🎓 Key Decisions

- **TensorFlow.js**: Free, privacy-focused
- **MobileNet**: Lightweight, fast
- **Cosine Similarity**: Standard metric for vectors
- **Next.js**: Full-stack, TypeScript, Vercel integration

## 📝 Code Quality

- TypeScript type safety
- ESLint configured
- Clean semantic code
- Comprehensive error handling

---

Built with ❤️ using Next.js, React, and TensorFlow.js


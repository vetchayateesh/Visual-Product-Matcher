# Deployment Guide - Visual Product Matcher

## Overview

Visual Product Matcher is ready for production deployment. This guide covers deploying to Vercel (recommended) and includes setup instructions.

## Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - For hosting the repository
2. **Vercel Account** - Free tier available at https://vercel.com
3. **Node.js & npm** - For local development (v16+)

## Local Development

### Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

The app will be available at `http://localhost:3000`

## Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Visual Product Matcher"

# Create a new repository on GitHub
# https://github.com/new

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/visual-product-matcher.git
git branch -M main
git push -u origin main
```

**Checklist:**
- ✅ Repository is public (not private)
- ✅ All code files included
- ✅ node_modules excluded (in .gitignore)
- ✅ .env files excluded
- ✅ .next/ build directory excluded
- ✅ Branch is named `main`
- ✅ Repository is downloadable

### Step 2: Deploy to Vercel

#### Option A: One-Click Deploy (Recommended)

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Paste your GitHub repository URL
4. Click "Import"
5. Vercel will auto-configure Next.js settings
6. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option C: Manual Setup

1. Create Vercel account at https://vercel.com
2. Connect your GitHub account
3. Select the visual-product-matcher repository
4. Configure project settings:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Step 3: Verify Deployment

After deployment completes:

1. Visit your Vercel dashboard
2. Click on your project
3. Get the production URL (format: `https://your-project-name.vercel.app`)
4. Test the application:
   - Upload an image
   - Verify feature extraction works
   - Check filtering functionality
   - Test on mobile device

## Project Structure for Submission

Ensure your GitHub repository contains:

```
visual-product-matcher/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ImageUpload.tsx
│   ├── FilterBar.tsx
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── lib/
│   ├── products.ts
│   ├── imageProcessor.ts
│   └── similarity.ts
├── public/
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── README.md
├── DEPLOYMENT.md (this file)
└── APPROACH.md (technical approach document)
```

**CRITICAL - Do NOT include:**
- ❌ node_modules/
- ❌ .next/
- ❌ .env.local
- ❌ .vscode/
- ❌ .idea/
- ❌ dist/
- ❌ out/
- ❌ .env*

## Submission Information

When submitting to the company:

### 1. GitHub Repository Link

Format: `https://github.com/YOUR_USERNAME/visual-product-matcher`

Ensure:
- ✅ Repository is public
- ✅ Branch is `main`
- ✅ README.md is present
- ✅ All source files included
- ✅ No unnecessary files

### 2. Live Application URL

Format: `https://your-project-name.vercel.app`

Test before submitting:
- ✅ App loads without errors
- ✅ Image upload works
- ✅ Image URL input works
- ✅ Similarity filtering works
- ✅ Category filtering works
- ✅ Mobile responsive design works

### 3. Technical Approach Document

See APPROACH.md for detailed explanation of:
- Architecture decisions
- Technology choices
- Implementation details
- ML approach explanation

## Troubleshooting Deployment

### Build Fails

**Error**: "Module not found"
- Solution: Ensure all imports use `@/` alias correctly
- Check TypeScript errors: `npm run build`

**Error**: "ENOSPC: no space left on device"
- Solution: Clean cache: `rm -rf .next node_modules`
- Reinstall: `npm install`

### Application Not Working After Deploy

**Issue**: Features not loading
- Check browser console for errors (F12)
- Verify images are loading (check CORS)
- Check Network tab for API requests

**Issue**: Slow performance
- TensorFlow.js model downloads on first use
- First image processing takes 3-5 seconds
- Subsequent searches are faster

### API Route Issues

If `/api/products` returns 404:
- Verify file path: `app/api/products/route.ts`
- Check file is named `route.ts` (not `route.js`)
- Restart dev server if modified

## Performance Optimization

The application is already optimized for production:

1. **Client-Side Processing**: No backend ML inference
2. **Image Optimization**: Next.js Image component
3. **Code Splitting**: Automatic with Next.js
4. **Caching**: TensorFlow model cached in browser
5. **Lazy Loading**: Components load on demand

## Security Considerations

✅ **Already Implemented:**
- No API keys exposed
- No sensitive data stored
- User images not persisted
- CORS headers configured
- Input validation in place
- Error boundaries for crashes

## Environment Variables

This project requires **NO environment variables** for basic functionality.

Optional (for future enhancement):
- Analytics tracking
- Error reporting
- Database connection strings

## Monitoring

After deployment, monitor:

1. **Vercel Analytics Dashboard**
   - Performance metrics
   - Error rates
   - Region analytics

2. **Browser Console**
   - JavaScript errors
   - Network issues
   - Deprecation warnings

## Support & Debugging

### Enable Debug Logging

In browser console:
```javascript
localStorage.setItem('DEBUG', 'true');
```

### Check Deployment Logs

In Vercel dashboard:
1. Select your project
2. Go to "Deployments"
3. Click deployment
4. View "Build Logs" and "Function Logs"

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Vercel
3. ✅ Test application thoroughly
4. ✅ Submit links to company:
   - GitHub repository URL
   - Live application URL
   - Technical approach document

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **TensorFlow.js**: https://www.tensorflow.org/js
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Questions or Issues?** Check GitHub Issues or refer to the README.md for more information.

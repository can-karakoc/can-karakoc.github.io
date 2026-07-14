import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Recommended: Deploy to Vercel for optimal Next.js features
  // Vercel provides: automatic optimization, edge functions, image optimization, ISR

  // For GitHub Pages static deployment (if needed), uncomment:
  // output: 'export',
  // images: { unoptimized: true },

  // Image domains (if using external images)
  images: {
    domains: [],
  },
};

export default nextConfig;

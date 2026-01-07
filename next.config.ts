import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable i18n routing
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    localeDetection: false, // Middleware handles detection
  },

  // Image optimization for S3 images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'emtelaak-property-images.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;

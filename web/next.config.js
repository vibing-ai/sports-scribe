const path = require('path');

// Filter out deprecated NextUI warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('@nextui-org/')) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Configure images
  images: {
    domains: [],
  },
  
  // Configure webpack
  webpack: (config, { isServer, dev }) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add fallback for Node.js modules
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: false,
      os: false,
    };

    // Add additional fallbacks for client-side only
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        dgram: false,
        cluster: false,
      };
    }
    
    // Handle NextUI theme resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      // Force resolution of tailwindcss/plugin
      'tailwindcss/plugin': path.resolve(__dirname, 'node_modules/tailwindcss/plugin.js'),
      // Ensure consistent NextUI resolution
      '@nextui-org/theme': path.resolve(__dirname, 'node_modules/@nextui-org/theme/dist/index.js'),
    };

    return config;
  },
  
  // Enable experimental features
  experimental: {
    // Enable CSS optimizations
    optimizeCss: true,
    // Enable package imports optimization
    optimizePackageImports: ['@nextui-org/react'],
    // Enable server actions
    serverActions: {
      allowedOrigins: ['localhost:3000', 'sports-scribe.vercel.app']
    },
  },
  // Transpile @nextui-org/react
  transpilePackages: ['@nextui-org/react'],
  
  // Compiler options
  compiler: {
    // Enable styled-components support
    styledComponents: true,
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Linting and type checking
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Output standalone for better compatibility with Vercel
  output: 'standalone',
  
  // Enable CSS modules
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  
  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
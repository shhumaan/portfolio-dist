/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Fixed experimental options according to Next.js 15.2.3 requirements
    // Remove turbo and turbotrace options that are causing errors
  },
  webpack: (config) => {
    // Simplify chunk splitting to avoid HMR issues
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        default: false,
        vendors: false,
        // Very important: create a separate chunk for node_modules
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          priority: 30,
          minChunks: 2,
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
        shared: {
          name: 'shared',
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    };
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['unpkg.com'],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;

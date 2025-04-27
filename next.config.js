/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Default platform if not specified elsewhere
    NEXT_PLATFORM: process.env.NEXT_PLATFORM || 'agrisense'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist']
};

module.exports = nextConfig;

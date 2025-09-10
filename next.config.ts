import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '103.186.20.114',
        pathname: '/uploads/rooms/**',  // Adjust this pattern if needed
      },
    ],
  },
};

export default nextConfig;

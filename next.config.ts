import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', '103.186.20.114'],
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

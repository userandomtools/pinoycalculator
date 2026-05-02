import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: false,

  images: {
    formats: ['image/webp'],
  },

  async redirects() {
    return [
      {
        source: '/calculators/:slug',
        destination: '/:slug',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

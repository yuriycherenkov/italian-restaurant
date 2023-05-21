/** @type {import('next').NextConfig} */

const imagesDomains = ['diploma-italian-restaurant.s3.eu-central-1.amazonaws.com'];

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: imagesDomains,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/menu',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.torastudio.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      // Redirect www to non-www (or vice versa)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.torastudio.vn' }],
        destination: 'https://torastudio.vn/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
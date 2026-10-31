/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['next-blogpanel'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  env: {
    BLOGPANEL_MONGODB_URI: process.env.BLOGPANEL_MONGODB_URI || 'mongodb://127.0.0.1:27017/nidaa_cms_fallback',
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/blog',
        permanent: false,
      },
      {
        source: '/admin/',
        destination: '/admin/blog',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

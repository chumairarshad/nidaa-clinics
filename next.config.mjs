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
    BLOGPANEL_MONGODB_URI: process.env.BLOGPANEL_MONGODB_URI || 'mongodb://127.0.0.1:27017/nidaaclinic',
    BLOGPANEL_API_KEY: process.env.BLOGPANEL_API_KEY || 'nidaaclinic_secure_master_key_32chars_min_secret',
    BLOGPANEL_SITE_URL: process.env.BLOGPANEL_SITE_URL || 'https://www.nidaclinic.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nidaclinic.com',
    BLOGPANEL_SITE_NAME: 'NiDAA Clinic Blog',
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET || 'c265b99480509cc04867857d2f2fe6b94736b3ba4fc669bd1a1412271dfbe297',
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

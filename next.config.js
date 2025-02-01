const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://wificard.redreamality.com' 
      : 'http://localhost:3000'
  },
  // basePath: process.env.NODE_ENV === 'production' ? '' : '',
};

module.exports = withNextIntl(nextConfig); 
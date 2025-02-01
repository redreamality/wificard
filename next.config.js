const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // basePath: process.env.NODE_ENV === 'production' ? '' : '',
};

module.exports = withNextIntl(nextConfig); 
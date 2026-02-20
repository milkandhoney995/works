/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  sassOptions: {
    includePaths: ['./styles'],
  }
}

module.exports = withNextIntl(nextConfig)

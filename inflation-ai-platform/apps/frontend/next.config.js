/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@inflation-ai/types', '@inflation-ai/config'],
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig

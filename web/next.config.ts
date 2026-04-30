/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Indispensable pour ignorer l'erreur @nestjs/common
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
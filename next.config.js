/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API_URL : process.env.BACKEND_API_URL,
    SOCKET_URL: process.env.SOCKET_URL
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
    ],
  }
}

module.exports = nextConfig

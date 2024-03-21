/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage']
    },
};


module.exports = {
    images: {
      remotePatterns: ['firebasestorage.googleapis.com'],
    },
  }




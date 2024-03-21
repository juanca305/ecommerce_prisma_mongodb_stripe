/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com']
    },
};

module.exports = nextConfig;


module.exports = {
    images: {
      remotePatterns: ['firebasestorage.googleapis.com'],
    },
  }

module.exports = nextConfig

//module.exports = { eslint: { ignoreDuringBuilds: true } }


// module.exports = {
//     // time in seconds of no pages generating during static
//     // generation before timing out
//     staticPageGenerationTimeout: 1000,
//   }



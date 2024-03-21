/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com']
    },

    // eslint: {
    //     ignoreDuringBuilds: true,
    // }
};

module.exports = nextConfig;

// module.exports = {
//     typescript: {
//       // !! WARN !!
//       // Dangerously allow production builds to successfully complete even if
//       // your project has type errors.
//       // !! WARN !!
//       ignoreBuildErrors: true,
//     },
//   }


module.exports = {
    images: {
      remotePatterns: ['firebasestorage.googleapis.com'],
    },
  }

module.exports = nextConfig

//module.exports = { eslint: { ignoreDuringBuilds: true } }



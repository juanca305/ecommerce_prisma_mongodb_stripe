/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com","m.media-amazon.com"]
    },

    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = {
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  }


module.exports = nextConfig

//module.exports = { eslint: { ignoreDuringBuilds: true } }



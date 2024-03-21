// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['firebasestorage']
//     },
// };


// module.exports = {
//     images: {
//       remotePatterns: ['firebasestorage.googleapis.com'],
//     },
//   }

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["firebasestorage.googleapis.com", "lh3.googleusercontent.com"],
    },
  };
  
  module.exports = nextConfig;




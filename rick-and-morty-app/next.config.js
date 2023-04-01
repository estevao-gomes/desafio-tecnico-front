/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // env: {
  //   API_URL: "https://rickandmortyapi.com/api/character",
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
}

module.exports = nextConfig

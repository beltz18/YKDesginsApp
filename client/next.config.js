const runtimeCaching = require("next-pwa/cache")
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable:process.env.NODE_ENV === 'development'
})
const nextConfig = withPWA({})

module.exports = nextConfig
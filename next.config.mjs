let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/a1aa/image/**',
      },
    ],
    // Optimize image loading with smaller sizes
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64, 96],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable production optimizations
  reactStrictMode: true,
  // Increase page caching
  onDemandEntries: {
    // Increase buffer time to 30 seconds
    maxInactiveAge: 30 * 1000,
    // Increase buffer size
    pagesBufferLength: 6,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  // Optimize for performance
  experimental: {
    largePageDataBytes: 128 * 1000,
    optimizeCss: true, // Enable CSS optimization
    scrollRestoration: true, // Better scroll handling
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev overlay can be accessed from the local network during demos.
  // Keep production behavior unchanged.
  allowedDevOrigins: ['localhost', '127.0.0.1'],
}

export default nextConfig

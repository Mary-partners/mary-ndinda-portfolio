/** @type {import('next').NextConfig} */
const PLATFORM_ORIGIN = "https://capability-platform-eta.vercel.app";

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting runs in CI / locally via `npm run lint`. Don't let a lint
    // hiccup fail the production build on the hosting platform.
    ignoreDuringBuilds: true,
  },
  // Serve the Capability Platform under /platform on this same domain
  // (it is a separate deployment, proxied transparently).
  async rewrites() {
    return [
      { source: "/platform", destination: `${PLATFORM_ORIGIN}/platform` },
      { source: "/platform/:path*", destination: `${PLATFORM_ORIGIN}/platform/:path*` },
    ];
  },
};

export default nextConfig;

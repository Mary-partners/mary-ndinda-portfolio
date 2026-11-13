/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // Served under managementcapitallab.com/platform (proxied from the main site).
  basePath: "/platform",
  experimental: {
    serverActions: {
      // Required because the app is reached through the main site's domain.
      allowedOrigins: ["managementcapitallab.com", "www.managementcapitallab.com", "capability-platform-eta.vercel.app"],
    },
  },
};
export default nextConfig;

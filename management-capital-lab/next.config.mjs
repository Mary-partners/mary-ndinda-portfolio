/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Linting runs in CI / locally via `npm run lint`. Don't let a lint
    // hiccup fail the production build on the hosting platform.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

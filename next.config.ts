import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// Initialize next-pwa with destination set to `public`.
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages
  output: "export",
  trailingSlash: true,
};

export default withPWA(nextConfig);

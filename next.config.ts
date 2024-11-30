import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  reactStrictMode: true,
  experimental: {
    reactRoot: false,
  },
};

export default nextConfig;

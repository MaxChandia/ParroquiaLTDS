import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagenes-parroquia.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
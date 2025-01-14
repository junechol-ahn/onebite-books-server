import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
      // allowedForwardedHosts: ["localhost:3000"],
      // ^ You might have to use this property depending on your exact version.
    }
  }
};

export default nextConfig;

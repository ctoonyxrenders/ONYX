import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    domains: ['cdn.sanity.io', 'res.cloudinary.com'],
  },
};

export default nextConfig;

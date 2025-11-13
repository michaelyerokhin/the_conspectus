import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["shared"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@shared": path.resolve(__dirname, "../../packages/shared/src"),
    };
    // Handle @shared/* pattern
    if (!config.resolve.alias) {
      config.resolve.alias = {};
    }
    config.resolve.alias["@shared"] = path.resolve(__dirname, "../../packages/shared/src");
    return config;
  },
};

export default nextConfig;


import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    const projectRoot = path.resolve(__dirname);
    config.context = projectRoot;
    config.resolve = config.resolve ?? {};
    config.resolve.modules = [
      path.join(projectRoot, "node_modules"),
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"]),
    ];
    return config;
  },
};

export default nextConfig;

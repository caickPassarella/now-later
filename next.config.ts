import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.devtool = "eval-source-map";
    }

    return config;
  },
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  serverExternalPackages: ["@appsignal/nodejs"],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;

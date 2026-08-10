import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.devtool = "eval-source-map";
    }

    return config;
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  serverExternalPackages: ["@appsignal/nodejs"],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;

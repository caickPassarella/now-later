import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      // "eval-source-map" never emits a .js.map file, so Node's
      // --enable-source-maps has nothing to resolve server stack traces
      // against in production. Use a file-based map there instead.
      config.devtool = dev ? "eval-source-map" : "source-map";
    }

    return config;
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  reactCompiler: false,
  productionBrowserSourceMaps: true,
  serverExternalPackages: ["@appsignal/nodejs"],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;

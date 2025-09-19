import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // Kích hoạt ở production nếu cần
  devtool: false, // Vô hiệu hóa ở development
};

export default withBundleAnalyzer(nextConfig);

import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true, // Kích hoạt ở production nếu cần
  images: {
    domains: [
      "i.pravatar.cc",
      // Thêm các domain khác nếu có
    ],
  },
  // Thêm experimental để enable Webpack Build Worker (tối ưu memory bằng cách chạy compilation ở separate process)
  experimental: {
    webpackBuildWorker: true,
  },

  // Config webpack để xử lý devtool và cache đúng cách
  webpack: (config, { dev }) => {
    // Disable devtool ở dev mode để tiết kiệm RAM (source maps nặng)
    if (dev) {
      config.devtool = false; // Hoặc 'eval' nếu bạn cần source maps nhẹ để debug
    }

    // Config cache sang filesystem để giảm memory usage (offload sang disk thay vì RAM)
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename], // Invalidate cache khi file config này thay đổi
      },
    };

    return config;
  },

  // Nếu muốn thử Turbopack (thay thế Webpack, nhanh hơn nhưng experimental), uncomment phần này:
  // experimental: {
  //   turbopack: true,
  // },
};

export default withBundleAnalyzer(nextConfig);

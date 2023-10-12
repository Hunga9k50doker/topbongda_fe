require("dotenv").config();
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const configImages = {
  images: {
    domains: [
      "media.topbongda.com",
      "static.topbongda.com",
      "topbongda.com",
      "tbd.vietdev.work",
      "tbd-media.vietdev.work",
    ],
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    spaceID: process.env.spaceID,
    accessTokenDelivery: process.env.accessTokenDelivery,
  },
  productionBrowserSourceMaps: true,
  distDir: "build",
  trailingSlash: true,
  assetPrefix: isProd ? "https://cdn-mobile.topbongda.com/" : undefined,
  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
    },
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    return config;
  },
};

const plugins = [];

module.exports = () => {
  return plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
    ...configImages,
  });
};

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["chriscross.in", "images.jdmagicbox.com", "mir-s3-cdn-cf.behance.net", "encrypted-tbn0.gstatic.com"],
  },
  // reactStrictMode: false,
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
};

export default nextConfig;

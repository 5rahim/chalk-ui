const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
}

module.exports = withContentlayer(nextConfig)

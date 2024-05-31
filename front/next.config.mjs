/** @type {import('next').NextConfig} */

const nextConfig = {
  images: { domains: ['images.pexels.com'],
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "platform-lookaside.fbsbx.com",
      },
    ],
  },
};
export default nextConfig;

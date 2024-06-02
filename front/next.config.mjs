/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.pexels.com"],
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

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'platform-lookaside.fbsbx.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.pexels.com',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;
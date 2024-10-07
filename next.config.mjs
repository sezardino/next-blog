/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sacukcalyrmvgujhcknk.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;

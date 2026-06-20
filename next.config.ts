import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lxmbetmjyfagmmuoragm.supabase.co",
        pathname: "/storage/v1/object/public/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

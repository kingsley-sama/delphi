import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only permits qualities on this allowlist; anything else silently
    // falls back to 75. 92 is for photographs whose source is small enough that
    // a second lossy pass is visible.
    qualities: [75, 92],
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

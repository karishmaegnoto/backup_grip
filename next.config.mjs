// Import the `next-pwa` package using ES module syntax
import withPWA from "next-pwa";
// import { i18n } from "./next-i18next.config.mjs";

// Create the PWA configuration
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  scope: "/src",
  sw: "sw.js",
  //...
});

// Define your Next.js configuration
const nextConfig = {
  // i18n,
  reactStrictMode: false,
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Replace with a valid hostname
        port: "", // Optional: leave empty or specify if needed
        pathname: "/images/*", // Path where images are located
      },
      {
        protocol: "https",
        hostname: "uploads.example.com", // Replace with a valid hostname
        port: "", // Optional: leave empty or specify if needed
        pathname: "/uploads/*", // Path where uploads are located
      },
    ],
  },
};

// Export the combined configuration
export default { ...pwaConfig, ...nextConfig };
// Export the combined configuration

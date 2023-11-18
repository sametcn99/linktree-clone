import { MetadataRoute } from "next";

// Function to generate the manifest for the Linktree Backend Clone
export default function manifest(): MetadataRoute.Manifest {
  return {
    // Name of the application
    name: "Linktree Backend Clone",
    // Short name for the application
    short_name: "Linktree Clone",
    // Description of the application
    description: "A simple Linktree Backend Clone created with Next.js.",
    // Categories associated with the application
    categories: ["clone", "web app", "linktree", "linktree clone", "next.js"],
    // Theme color for the application
    theme_color: "#2196f3",
    // Background color for the application
    background_color: "#2196f3",
    // Display mode for the application
    display: "minimal-ui",
    // Scope for the service worker
    scope: "/",
    // Start URL for the application
    start_url: "/",
    // Orientation of the application
    orientation: "portrait",
    // Icons for different sizes and purposes
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

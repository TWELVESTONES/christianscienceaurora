import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "Christian Science Aurora", short_name: "CSA", description: "A place for spiritual discovery, healing, and hope.", start_url: "/", display: "standalone", background_color: "#FCFBF7", theme_color: "#167C80" }; }

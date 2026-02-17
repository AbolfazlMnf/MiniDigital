import { MetadataRoute } from "next";
import React from "react";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: "http://localhost3000/sitemap.xml",
  };
}

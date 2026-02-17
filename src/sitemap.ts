import { MetadataRoute } from "next";
import { GetProducts } from "./modules/products/services/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const product = await GetProducts();
  if (product.length < 1) return [];
  const sitemapLink = product.map((items) => {
    return {
      url: `http://localhost300/products/${items.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.05,
    };
  });
  return sitemapLink;
}

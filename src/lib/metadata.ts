import { Image } from "@/generated/prisma/client";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

interface IMetadata {
  title?: string;
  description?: string | null;
  keywords?: string[];
  images?: Image[];
}
export default function customMetadataGenerator({
  title = "digital shop",
  description = "a sigital shop for ....",
  keywords = ["shop", "digital", "mobile"],
  images = undefined,
}: IMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      images,
      type: "website",
      url: `http://localhost:3000/products/${title}`,
    } as OpenGraph,
  };
}

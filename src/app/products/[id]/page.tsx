import customMetadataGenerator from "@/lib/metadata";
import ProductDetailCard from "@/modules/products/components/ProductDetailCard";
import { GetProductById } from "@/modules/products/services/server";
import { ProductWithImage } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await params;
  const { id } = data;
  const product = (await GetProductById(id)) as ProductWithImage;
  if (!product) {
    return customMetadataGenerator({ title: "not-found" });
  }
  return customMetadataGenerator({
    title: product.name,
    description: product.description,
    images: product.images,
  });
}
async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const data = await params;
  const { id } = data;
  const product = (await GetProductById(id)) as ProductWithImage;

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.length && product.images[0].image,
    description: product.description,
  };
  return (
    <section>
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailCard {...product} />
    </section>
  );
}

export default ProductDetail;

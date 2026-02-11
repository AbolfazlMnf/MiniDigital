import ProductDetailCard from "@/modules/products/components/ProductDetailCard";
import { GetProductById } from "@/modules/products/services/server";
import { ProductWithImage } from "@/types";

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const data = await params;
  const { id } = data;
  const product = (await GetProductById(id)) as ProductWithImage;
  return (
    <div>
      <ProductDetailCard {...product} />
    </div>
  );
}

export default ProductDetail;

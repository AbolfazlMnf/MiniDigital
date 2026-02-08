import ProductDetailCard from "@/modules/products/components/ProductDetailCard";
import { ProductData } from "@/modules/products/mock/Product";
import React from "react";

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const product = ProductData[0];

  return (
    <div>
      <ProductDetailCard {...product} />
    </div>
  );
}

export default ProductDetail;

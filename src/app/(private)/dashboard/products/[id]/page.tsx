import ProductDetailView from "@/modules/products/views/ProductDetailView";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const data = await params;
  const { id } = data;
  return (
    <div className="pb-20">
      <ProductDetailView id={id} />
    </div>
  );
}

export default page;

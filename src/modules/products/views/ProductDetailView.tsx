import React from "react";
import ProductForm from "../components/ProductForm";
import { GetProductById } from "../services/server";

async function ProductDetailView(props: { id: string }) {
  const { id } = props;
  const product = await GetProductById(id);
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

export default ProductDetailView;

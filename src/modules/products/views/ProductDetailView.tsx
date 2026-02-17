import React from "react";
import { GetProductById } from "../services/server";
import ProductForm from "../components/ProductFormWithAction";

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

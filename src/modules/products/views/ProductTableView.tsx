import React from "react";
import ProductsTable from "../components/ProductsTable";
import { GetProducts } from "../services/server";

async function ProductTableView() {
  const products = await GetProducts();
  return (
    <div>
      <ProductsTable products={products} />
    </div>
  );
}

export default ProductTableView;

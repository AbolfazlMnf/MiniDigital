"use client";
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { ProductWithImage } from "@/types";
import { GetProductApi } from "../services/client";

function ProductListView() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const getProductData = async () => {
    const result = await GetProductApi();
    setProducts(result.data);
  };
  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductListView;

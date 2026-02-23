"use client";
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { ProductWithImage } from "@/types";
import { GetProductApi } from "../services/client";
import { useQuery } from "@tanstack/react-query";
export type ProductApiResponse = {
  data: ProductWithImage[];
};
function ProductListView() {
  const { data, isPending } = useQuery<ProductApiResponse>({
    queryKey: ["PRODUCTS"],
    queryFn: async () => await GetProductApi(),
  });
  return (
    <div className="pb-5 px-5 lg:px-0">
      <ProductList products={data?.data ?? []} isPending={isPending} />
    </div>
  );
}

export default ProductListView;

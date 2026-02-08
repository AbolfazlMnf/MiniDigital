import React from "react";
import { ProductData } from "../mock/Product";
import ProductItem from "./ProductItem";

function ProductList() {
  return (
    <div className="w-full my-10 flex flex-wrap justify-between items-center ">
      {ProductData.map((items, i) => (
        <ProductItem key={i} product={items} />
      ))}
    </div>
  );
}

export default ProductList;

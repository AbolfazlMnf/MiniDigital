import ProductItem from "./ProductItem";
import { ProductWithImage } from "@/types";

function ProductList(props: { products: ProductWithImage[] }) {
  const { products } = props;

  return (
    <div className="w-full my-10 flex flex-wrap justify-between items-center ">
      {products.map((items, i) => (
        <ProductItem key={i} product={items} />
      ))}
    </div>
  );
}

export default ProductList;

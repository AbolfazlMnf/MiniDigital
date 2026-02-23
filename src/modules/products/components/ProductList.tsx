import ProductItem from "./ProductItem";
import { ProductWithImage } from "@/types";
import { ProductItemSkeleton } from "./ProductItemSkeleton";

function ProductList(props: {
  products: ProductWithImage[];
  isPending: boolean;
}) {
  const { products, isPending } = props;

  return (
    <div className="w-full my-10 flex flex-col gap-4 lg:gap-0 lg:flex-row  lg:flex-wrap lg:justify-between items-center ">
      {isPending
        ? Array.from({ length: 3 }, (_, i) => <ProductItemSkeleton key={i} />)
        : products.map((items, i) => <ProductItem key={i} product={items} />)}
    </div>
  );
}

export default ProductList;

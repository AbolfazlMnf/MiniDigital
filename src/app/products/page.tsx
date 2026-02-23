import ProductListView from "@/modules/products/views/ProductListView";

async function products() {
  return (
    <div className="px-20">
      <ProductListView />
    </div>
  );
}

export default products;

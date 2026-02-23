import CatalogList from "@/components/catalog/List";
import CatalogSelector from "@/components/catalog/Selector";
import React from "react";

function InterceptedCatalog() {
  return (
    <div className="flex flex-col my-4 mx-auto">
      <CatalogList />
      {/* <CatalogSelector /> */}
    </div>
  );
}

export default InterceptedCatalog;

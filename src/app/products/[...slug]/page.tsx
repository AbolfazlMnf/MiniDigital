import React from "react";

async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const data = await params;
  console.log(data);

  return <div>{data.slug[1]}</div>;
}

export default ProductDetails;

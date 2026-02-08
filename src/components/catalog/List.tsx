"use client";
import { ProductData } from "@/modules/products/mock/Product";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { useSearchParams } from "next/navigation";

function CatalogList() {
  //   const params = useSearchParams();
  //   const id = params.get("id");
  //   console.log("id : ", id);
  const images = ProductData[0].images;
  return (
    <div className="flex flex-wrap justify-center mb-4">
      {images?.map((imgs: any, i) => (
        <div className="p-1" key={i}>
          <Card>
            <CardContent className="flex items-center justify-center p-6 w-[400px] h-[400px] ">
              <Image
                alt="gallery"
                src={imgs?.image}
                width={400}
                height={400}
                className="hover:scale-105 transform transition-transform duration-300"
              />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CatalogList;

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseCart } from "@/hooks/useCart";
import { ProductWithImage } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductDetailCard(product: ProductWithImage) {
  const { addToCartMutation } = UseCart();
  return (
    <div className=" container mx-auto py-10 ">
      <Card className="max-w-3xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6 ">
            <div className="space-y-3">
              {product?.images.length > 0 ? (
                <Image
                  alt={product.name}
                  src={product?.images[0].image}
                  width={500}
                  height={400}
                  quality={50}
                  property="1"
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg ">
                  No Image Available
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <p className="text-xl font-semibold">
                  {product?.price?.toFixed(2)}$
                </p>
                <p className="text-gray-700">quantity : {product?.quantity}</p>
                <p className="mt-2 text-sm">Category : {product?.category}</p>
                <p className="text-gray-600 line-clamp">
                  {product?.description || "No description available"}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  className="mt-6"
                  onClick={() => addToCartMutation.mutate(product?.id)}
                >
                  add to Cart
                  <ShoppingCart />
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/products">Back to Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetailCard;

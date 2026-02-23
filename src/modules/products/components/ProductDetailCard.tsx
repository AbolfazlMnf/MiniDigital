"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseCart } from "@/hooks/useCart";
import { ProductWithImage } from "@/types";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductDetailCard(product: ProductWithImage) {
  const { addToCartMutation } = UseCart();

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <Card className="max-w-5xl mx-auto shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 px-6 py-4">
          <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
            {product?.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-md h-[350px] relative rounded-xl overflow-hidden shadow-md">
                {product?.images.length > 0 ? (
                  <Image
                    alt={product.name}
                    src={product.images[0].image}
                    fill
                    quality={80}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                    No Image Available
                  </div>
                )}
              </div>
            </div>

            {/* جزئیات محصول */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-2xl font-bold text-gray-900">
                  {product?.price?.toFixed(2)}$
                </p>
                <p className="text-gray-700 font-medium">
                  Quantity: {product?.quantity}
                </p>
                <p className="text-gray-500 text-sm">
                  Category: {product?.category}
                </p>
                <p className="text-gray-600 mt-2 line-clamp-6">
                  {product?.description || "No description available"}
                </p>
              </div>

              {/* دکمه‌ها */}
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button
                  className="flex items-center justify-center gap-2 w-full md:w-auto"
                  onClick={() => addToCartMutation.mutate(product?.id)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full md:w-auto"
                  asChild
                >
                  <Link href="/products">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                  </Link>
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

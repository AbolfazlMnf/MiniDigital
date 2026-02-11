"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/generated/prisma/client";
import { ProductCategory } from "@/generated/prisma/enums";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UpsertProduct } from "../services/server";

function ProductForm(props: { product: Product | null }) {
  const { product } = props;
  const { register, handleSubmit, setValue } = useForm<Product>();
  useEffect(() => {
    if (product?.id) {
      setValue("id", product.id);
    }
  }, [product, setValue]);
  const onSubmitForm = (data: Product) => {
    console.log(data);
    const _product = {
      ...data,
      price: parseFloat(data?.price?.toString() || "0"),
      quantity: parseInt(data?.quantity?.toString() || "0"),
      category: data?.category || product?.category,
    };
    UpsertProduct(_product);
  };
  return (
    <Card className="w-[500px] mx-auto mt-10 ">
      <form className="max-w-lg" onSubmit={handleSubmit(onSubmitForm)}>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>Create new product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" mt-4 mb-2 flex flex-col gap-2 ">
            <Label htmlFor="name">Product Name</Label>
            <Input
              {...register("name")}
              id="name"
              required
              defaultValue={product?.name || ""}
            />
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(val) =>
                setValue("category", val as ProductCategory)
              }
              required
              defaultValue={product?.category || ProductCategory.Others}
            >
              <SelectTrigger>
                <SelectValue placeholder="select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProductCategory).map((cat, i) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              defaultValue={product?.description || ""}
            />
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              {...register("price")}
              type="number"
              step="0.01"
              defaultValue={product?.price || ""}
            />
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              {...register("quantity")}
              type="number"
              defaultValue={product?.quantity || ""}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {product?.id ? "Update Product" : "Add Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default ProductForm;

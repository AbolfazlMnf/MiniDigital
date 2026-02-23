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
import UploadImage from "./UploadImage";
import { useActionState, useEffect, useState } from "react";
import { UpsertProduct } from "../action";
import { toast } from "sonner";
function ProductForm(props: { product: Product | null }) {
  const { product } = props;
  const [state, action, isPending] = useActionState<
    {
      data: Product | null;
      error: Record<string, string | null> | null;
    },
    FormData
  >(UpsertProduct, {
    data: product ?? null,
    error: null,
  });
  const { data, error } = state;
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (formData: FormData) => {
    setSubmitted(true);
    action(formData);
  };
  useEffect(() => {
    if (!submitted) return;
    if (error) {
      toast.error("failed");
    } else if (data) {
      toast.success("success");
    }
  }, [state]);
  return (
    <Card className="w-[500px] mx-auto mt-10 ">
      <form className="max-w-lg" action={handleSubmit}>
        <Input type="hidden" name="id" value={data?.id || ""} />
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>
            {data ? "update" : "Create new"} product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" mt-4 mb-2 flex flex-col gap-2 ">
            <Label htmlFor="name">Product Name</Label>
            <Input name="name" id="name" defaultValue={data?.name || ""} />
            {error?.name && (
              <h2 className="text-red-600 mt-1 ml-2">{error.name}</h2>
            )}
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              defaultValue={data?.category || ProductCategory.Others}
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
              name="description"
              defaultValue={data?.description || ""}
            />
            {error?.description && (
              <h2 className="text-red-600 mt-1 ml-2">{error.description}</h2>
            )}
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              id="price"
              type="number"
              step="0.01"
              defaultValue={data?.price || ""}
            />
            {error?.price && (
              <h2 className="text-red-600 mt-1 ml-2">{error.price}</h2>
            )}
          </div>
          <div className="my-2 flex flex-col gap-2 ">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              name="quantity"
              id="quantity"
              type="number"
              defaultValue={data?.quantity || ""}
            />
            {error?.quantity && (
              <h2 className="text-red-600 mt-1 ml-2">{error.quantity}</h2>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Back</Link>
          </Button>
          <Button type="submit">
            {isPending
              ? "loading ...."
              : product?.id
                ? "Update Product"
                : "Add Product"}
          </Button>
        </CardFooter>
      </form>
      {product?.id && (
        <CardFooter>
          <UploadImage productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
}

export default ProductForm;

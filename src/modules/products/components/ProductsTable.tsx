"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteProduct, GetProducts } from "../services/server";
import { Product } from "@/generated/prisma/client";

function ProductsTable(props: {
  products: Awaited<ReturnType<typeof GetProducts>>;
}) {
  const { products } = props;
  const onDeleteProduct = (id: string) => {
    DeleteProduct(id);
  };
  return (
    <div className="border border-gray-200 rounded-lg mt-4 shadow-md ">
      <div className="flex justify-between items-center p-4 bg-gray ">
        <h1 className="text-xl font-semibold">Products</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">Add new product </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, i) => (
            <TableRow key={i}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">
                <Image
                  src={product.images[0]?.image || "/images/NoImage.png"}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="mx-auto"
                />
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button
                    onClick={() => onDeleteProduct(product.id)}
                    variant="ghost"
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="flex gap-4 items-center w-full">
            <TableCell>total</TableCell>
            <TableCell>{products.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default ProductsTable;

"use server";
import { Product } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export const GetProducts = async () => {
  const result = await prisma.product.findMany({ include: { images: true } });
  console.log(result);
  return result;
};

export const GetProductById = async (id: string) => {
  const result = await prisma.product.findUnique({
    where: { id: id },
    include: { images: true },
  });
  if (!result) return null;
  console.log(result);
  return result;
};
export const UpsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: { id: id },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }
  return result;
};
export const DeleteProduct = async (id: string) => {
  await prisma.product.delete({ where: { id } });
};

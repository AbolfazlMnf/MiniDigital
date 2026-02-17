"use server";
import { Product, ProductCategory } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { z } from "zod";

const upsertValidation = (data: Record<string, any>) => {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name is too long"),

    category: z.enum(Object.values(ProductCategory) as string[]),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),

    price: z.number().min(0.01, "Price must be greater than 0"),

    quantity: z
      .number()
      .int("Quantity must be an integer")
      .min(0, "Quantity cannot be negative"),
  });
  const result = formSchema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, any> = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });
    return errors;
  }
  return null;
};

export const UpsertProduct = async (
  prevData: {
    data: Product | null;
    error: Record<string, string | null> | null;
  },
  formData: FormData,
) => {
  const id = formData.get("id") as string | null;
  const productData = {
    name: formData.get("name"),
    category: formData.get("category"),
    price: parseInt(formData.get("price") as string),
    description: formData.get("description"),
    quantity: parseInt(formData.get("quantity") as string),
  } as Product;

  //validation
  const error = upsertValidation(productData);
  if (error) {
    return { data: prevData.data, error };
  }

  try {
    let result;
    if (id) {
      result = await prisma.product.update({
        where: { id: id },
        data: productData,
      });
    } else {
      result = await prisma.product.create({
        data: productData,
      });
    }
    return { data: result, error: null };
  } catch (e) {
    return { data: prevData.data, error: { general: "upsert failed" } };
  }
};

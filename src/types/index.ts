import {
  cartItemGetPayload,
  ProductGetPayload,
} from "@/generated/prisma/models";

export type ProductWithImage = ProductGetPayload<{ include: { images: true } }>;
export type CartWithProduct = cartItemGetPayload<{
  include: { product: true; Images: true };
}>;

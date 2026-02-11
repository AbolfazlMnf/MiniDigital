import { ProductGetPayload } from "@/generated/prisma/models";

export type ProductWithImage = ProductGetPayload<{ include: { images: true } }>;

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (userId) {
    const cartItem = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });
    return NextResponse.json(cartItem);
  }
  return NextResponse.json([]);
}
export async function POST(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { productId } = await req.json();
  const exitedItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (exitedItem) {
    const UpdetedItem = await prisma.cartItem.update({
      where: { id: exitedItem.id },
      data: { quantity: exitedItem.quantity + 1 },
    });
    return NextResponse.json(UpdetedItem);
  }
  const newItem = await prisma.cartItem.create({
    data: { userId, productId, quantity: 1 },
  });
  return NextResponse.json(newItem);
}
export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { productId } = await req.json();
  const exitedItem = await prisma.cartItem.findFirst({
    where: { productId, userId },
  });
  if (!exitedItem) {
    return NextResponse.json(
      { error: "cart item does not existed" },
      { status: 400 },
    );
  }
  if (exitedItem) {
    const deletedItem = await prisma.cartItem.delete({
      where: { id: exitedItem.id },
    });
    return NextResponse.json(deletedItem);
  }
}

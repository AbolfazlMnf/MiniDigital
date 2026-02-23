import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);

  const result = await prisma.product.findMany({
    include: { images: true },
  });

  return NextResponse.json({ data: result });
}

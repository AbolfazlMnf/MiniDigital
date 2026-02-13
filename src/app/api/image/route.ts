import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const productId = formData.get("productId") as string;
  if (!file || !productId) {
    return NextResponse.json(
      {
        error: "Missing file or product",
      },
      {
        status: 400,
      },
    );
  } else {
    // save image to anywhere local/cloud/DB

    // read the file data as a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ensure the directory insist
    const uploadDir = path.join(process.cwd(), "public/assets", productId);
    await mkdir(uploadDir, { recursive: true });
    // define the  file path
    const filePath = path.join(uploadDir, file.name);
    // write file to disk
    await writeFile(filePath, buffer);
    // constract the public url
    const fileUrl = `/assets/${productId}/${file.name}`;

    // save to DB
    const updatedData = await prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          create: { image: fileUrl },
        },
      },
      include: { images: true },
    });
    return NextResponse.json({
      message: "image Uploaded successfully",
      data: updatedData?.images,
    });
  }
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = await searchParams.get("productId");
  if (!productId) {
    return NextResponse.json(
      {
        error: "missing product id",
      },
      {
        status: 400,
      },
    );
  } else {
    const images = await prisma.image.findMany({
      where: { productId },
    });
    return NextResponse.json({ images });
  }
}
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("imageId");
  if (!imageId) {
    return NextResponse.json(
      {
        error: "missing image id",
      },
      {
        status: 400,
      },
    );
  }
  const image = await prisma.image.findUnique({
    where: { id: imageId },
    include: { Product: true },
  });
  if (!image) {
    return NextResponse.json(
      {
        error: "invalid image",
      },
      {
        status: 400,
      },
    );
  }
  // construct file path from stored url
  const imagePath = path.join(process.cwd(), "public", image.image);
  // remove the image file from the file system
  try {
    await unlink(imagePath);
    console.log(`deleted file : ${imagePath}`);
  } catch (fileError) {
    console.log(fileError);
    return NextResponse.json(
      {
        error: "deletion failed",
      },
      {
        status: 500,
      },
    );
  }

  await prisma.image.delete({
    where: { id: imageId },
  });
  return NextResponse.json(
    {
      message: "deleted successfully",
      data: image.productId,
    },
    {
      status: 200,
    },
  );
}

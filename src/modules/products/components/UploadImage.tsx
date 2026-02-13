"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prismaType } from "@/lib/prisma";
import { CircleX } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { DeleteImage, fetchImage, UploadImageApi } from "../services/image";

const UploadImage: FC<{ productId: string }> = ({ productId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<prismaType.Image[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };
  const getImages = async () => {
    const data = await fetchImage(productId);
    setImages(data?.images);
  };
  const handleUpload = async () => {
    if (!file || !productId) {
      alert("please select a valid file");
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", productId);
      const { data } = await UploadImageApi(formData);
      setImages(data?.images);
      setFile(null);
    }
  };
  useEffect(() => {
    getImages();
  }, [productId]);
  const UpdateImageList = (imageId: string) => {
    setImages((prev) => prev?.filter((img) => img.id !== imageId) || null);
  };
  const handleDelete = async (imageId: string) => {
    await DeleteImage(imageId);
    UpdateImageList(imageId);
  };
  return (
    <div className="w-full mt-4 ">
      <Label htmlFor="picture">Product Image</Label>
      <div className=" w-full flex justify-between gap-2 mt-2 ">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button onClick={handleUpload}>Upload Image</Button>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
        {images?.map((item, i) => (
          <div className="relative group" key={i}>
            <CircleX
              onClick={() => handleDelete(item.id)}
              className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100
            transition-opacity cursor-pointer "
            />
            <Image
              src={item.image}
              alt="product Image"
              width={100}
              height={100}
              className="mt-4 mx-auto rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;

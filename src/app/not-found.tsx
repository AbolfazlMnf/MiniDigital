"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center   ">
      <h2 className="text-8xl font-bold animate-bounce text-black mt-30 ">
        404
      </h2>
      <p className="my-4 text-gray-600 text-xl">
        Oops! The page you are looking for does not exist.
      </p>
      <Button onClick={() => router.push("/")}>Go Home</Button>
    </div>
  );
}

export default NotFoundPage;

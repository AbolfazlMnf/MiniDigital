import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

function Ads() {
  return (
    <Card>
      <div className=" w-full h-full flex justify-between items-center ">
        <div className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>On sale products</CardTitle>
            <CardDescription>
              Buy outDated products by 50% discount
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Buy now</Button>
          </CardFooter>
        </div>
        <Image
          src="/images/banner1.jpg"
          width={300}
          height={200}
          alt="ads"
          className="rounded-tr-lg rounded-br-lg "
        />
      </div>
    </Card>
  );
}

export default Ads;

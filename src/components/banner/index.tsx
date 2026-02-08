import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
function Banner() {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {["/images/baner1.jpg", "/images/baner2.jpg"].map((images, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative aspect-square h-[400px] flex items-center justify-center p-6 w-full ">
                  <Image
                    src={images}
                    alt="banner"
                    fill
                    className="object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default Banner;

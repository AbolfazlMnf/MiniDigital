import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ProductWithImage } from "@/types";
import { GalleryThumbnails, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProductItem(props: { product: ProductWithImage }) {
  const { product } = props;
  return (
    <Card className="w-[400px] transform transition-transform duration-200 hover:scale-105 ">
      <CardHeader>
        <div className="w-full h-[300px] relative ">
          <Image
            src={product?.images[0]?.image || "/images/NoImage.png"}
            alt={product?.name}
            fill
            className="object-cover rounded-t-lg "
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product?.name}</h2>
        <p className="text-gray-500">{product?.category}</p>
        <div className="flex justify-between items-center">
          <p className=" mt-4 font-semibold text-lg">
            $ {product?.price?.toLocaleString()}
          </p>
          <div className=" mt-4 flex items-center  gap-2 ">
            <Link href={`products/catalog?id=${product.id}`}>
              <GalleryThumbnails />
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/products/${product.id}`}>More Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;

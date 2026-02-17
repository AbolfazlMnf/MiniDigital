"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { UseCart } from "@/hooks/useCart";
import { CartWithProduct } from "@/types";

function DropDownCart() {
  //   const cart = [{ product: { name: "iphone", price: 1300 }, quantity: 2 }];
  const { cart, isPending, error, removeCartMutation } = UseCart();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative" size="sm">
          <ShoppingCart size={24} />
          {cart && cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ">
              {cart?.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4">
        <h4 className="text-lg font-semibold mb-2">Cart Items</h4>
        {isPending ? (
          <p>loading....</p>
        ) : !cart || cart?.length === 0 ? (
          <p>your cart is empty</p>
        ) : (
          <div className="space-y-3">
            {cart?.map((item: CartWithProduct) => (
              <div
                key={item.product.id}
                className=" flex items-center justify-between border-b-2 pb-2 "
              >
                <div>
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    Price : ${item?.product?.price?.toFixed(2) ?? "0.00"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Quantity : {item.quantity}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={removeCartMutation.isPending}
                    onClick={() => removeCartMutation.mutate(item?.product.id)}
                  >
                    x
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownCart;

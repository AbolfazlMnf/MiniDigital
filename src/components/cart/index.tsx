"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { UseCart } from "@/hooks/useCart";
import { CartWithProduct } from "@/types";
import Image from "next/image";

export default function DropDownCart() {
  const { cart, isPending, removeCartMutation } = UseCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative" size="sm">
          <ShoppingCart size={24} />
          {cart && cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-4 bg-white shadow-lg rounded-lg max-h-[400px] overflow-y-auto">
        <h4 className="text-lg font-semibold mb-3 border-b pb-2">Cart Items</h4>

        {isPending ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : !cart || cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item: CartWithProduct) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      Price: ${item.product.price?.toFixed(2) ?? "0.00"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="icon"
                  disabled={removeCartMutation.isPending}
                  onClick={() => removeCartMutation.mutate(item.product.id)}
                  className="p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

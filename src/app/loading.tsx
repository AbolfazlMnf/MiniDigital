import { ShoppingCart } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <span className="font-bold text-xl">In progress ...</span>
      <ShoppingCart size={20} className="relative" />
    </div>
  );
}

export default Loading;

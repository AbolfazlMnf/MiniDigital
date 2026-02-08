import { MonitorSmartphone } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center my-4">
      <span>Welcom to</span>
      <div className="flex items-center gap-3">
        <MonitorSmartphone />
        <h1 className="font-bold text-2xl text-gray-800 ">Digital Shop</h1>
      </div>
      <Button asChild className="mt-6">
        <Link href="/products">go to products</Link>
      </Button>
    </div>
  );
}

export default Welcome;

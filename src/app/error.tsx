"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className=" flex flex-col items-center justify-center mt-20 ">
      <h2 className="text-xl">{error.message}</h2>
      <div className="flex justify-center items-center gap-6 mt-6 ">
        <Button variant="secondary" onClick={() => reset()}>
          try again
        </Button>
        <Button onClick={() => router.push("/")}>Home</Button>
      </div>
    </div>
  );
}

export default ErrorPage;

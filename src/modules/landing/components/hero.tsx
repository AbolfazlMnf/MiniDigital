import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-36 pb-55 w-full overflow-hidden">
      <div className="px-4">
        <div className="text-center relative">
          <h1
            className="text-5xl md:text-6xl mb-6 font-extrabold text-gray-900 
                     opacity-0 translate-y-10 animate-fadeInUp delay-200"
          >
            Welcome to MiniDigital
          </h1>

          <p className="text-xl text-gray-600 mb-8 opacity-0 translate-y-10 animate-fadeInUp delay-400">
            Discover the latest tech gadgets and digital accessories at amazing
            prices. Quality products delivered right to your door.
          </p>

          <div className="flex gap-4 justify-center opacity-0 animate-fadeInUp delay-600">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 mt-8"
            >
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 animate-bounce-slow"></div>
      <div className="absolute bottom-30 right-10 w-48 h-48 bg-pink-200 rounded-full opacity-30 animate-bounce-slow delay-300"></div>
    </section>
  );
}

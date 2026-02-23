import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductItemSkeleton() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <Skeleton className="w-full h-[300px] rounded-t-lg" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded" />
      </CardFooter>
    </Card>
  );
}

import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="flex flex-col gap-2 max-w-screen-lg mx-auto">
        <Skeleton className="w-full h-[32px]" />
        <Skeleton className="w-full h-[24px]" />
        <Skeleton className="w-full h-[524px]" />

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <div className="col-span-4 ">
            <Skeleton className="w-full h-[524px]" />
          </div>

          <div className="order-first md:order-last md:col-span-3">
            <Skeleton className="w-full h-[524px]" />
          </div>
        </div>
      </div>
    </Container>
  );
}

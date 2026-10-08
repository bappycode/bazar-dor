import AllProducts from "@/components/allProducts";
import Hero from "@/components/hero";
import PriceDecreasedToday from "@/components/priceDecreasedToday";
import PriceIncreasedToday from "@/components/priceIncresedToday";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div className="mx-auto h-64 max-w-7xl animate-pulse rounded-xl bg-white" />}>
        <PriceIncreasedToday />
      </Suspense>
      <Suspense fallback={<div className="mx-auto h-64 max-w-7xl animate-pulse rounded-xl bg-white" />}>
        <PriceDecreasedToday />
      </Suspense>
      <Suspense fallback={<div className="mx-auto h-96 max-w-7xl animate-pulse rounded-xl bg-white" />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}

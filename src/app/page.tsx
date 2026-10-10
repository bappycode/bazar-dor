import AllProducts from "@/components/allProducts";
import Hero from "@/components/hero";
import PriceDecreasedToday from "@/components/priceDecreasedToday";
import PriceIncreasedToday from "@/components/priceIncresedToday";
import { Suspense } from "react";

function PriceSectionSkeleton({ title }: { title: string }) {
  return (
    <section
      className="mx-auto max-w-7xl rounded-xl bg-white px-4 py-6 shadow-sm"
      aria-label={`${title} লোড হচ্ছে`}
      aria-busy="true"
    >
      <div className="mb-5 flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-neutral-100" />
        <div className="h-6 w-36 max-w-full animate-pulse rounded bg-neutral-100" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-neutral-100" />
              <div className="flex-1">
                <div className="h-4 w-28 max-w-full animate-pulse rounded bg-neutral-100" />
                <div className="mt-2 h-3 w-16 animate-pulse rounded bg-neutral-100" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-100" />
                <div className="mt-2 h-5 w-24 animate-pulse rounded bg-neutral-100" />
              </div>
              <div className="h-5 w-12 animate-pulse rounded-full bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AllProductsSkeleton() {
  return (
    <section
      className="mx-auto max-w-7xl rounded-xl bg-white px-4 py-6 shadow-sm"
      aria-label="সব পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="mb-5">
        <div className="h-6 w-28 animate-pulse rounded bg-neutral-100" />
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-neutral-100" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-neutral-100" />
              <div>
                <div className="h-4 w-28 animate-pulse rounded bg-neutral-100" />
                <div className="mt-2 h-3 w-16 animate-pulse rounded bg-neutral-100" />
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-100" />
                <div className="mt-2 h-5 w-24 animate-pulse rounded bg-neutral-100" />
              </div>
              <div className="h-5 w-12 animate-pulse rounded-full bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<PriceSectionSkeleton title="আজ দাম বেড়েছে" />}>
        <PriceIncreasedToday />
      </Suspense>
      <Suspense fallback={<PriceSectionSkeleton title="আজ দাম কমেছে" />}>
        <PriceDecreasedToday />
      </Suspense>
      <Suspense fallback={<AllProductsSkeleton />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}

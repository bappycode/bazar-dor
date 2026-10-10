import { Suspense } from "react";
import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";
import ProductSort from "@/components/ProductSort";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

const CategoryContent = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  let products: Product[];

  try {
    products = await fetchApiJson<Product[]>(
      `${API_BASE_URL}/api/bazardor/products?category=${categoryId}`,
      {
        cache: "force-cache",
      },
    );
  } catch (error) {
    if (!(error instanceof ApiResponseError)) {
      throw error;
    }

    return (
      <p
        className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-neutral-500"
        role="status"
      >
        বিভাগের পণ্যের তথ্য এখন লোড করা যাচ্ছে না।
      </p>
    );
  }
 
  const category = products[0];
   if (!category) {
    return (
      notFound()
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      {/* Category Header */}
      <section className="rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-sm sm:px-6">
        <div className="flex items-center gap-4">
          {/* Category Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
            {category.categoryIcon}
          </div>

          {/* Category Info */}
          <div>
            <h1 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
              {category.categoryNameBn}
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      {/* Sorting + Products */}
      <ProductSort products={products} />
    </main>
  );
};

const CategoryPage = (props: CategoryPageProps) => (
  <Suspense
    fallback={
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {/* Header Skeleton */}
        <div className="h-24 animate-pulse rounded-2xl bg-neutral-100" />

        {/* Toolbar Skeleton */}
        <div className="mt-6 flex items-center justify-between">
          <div className="h-5 w-32 animate-pulse rounded bg-neutral-100" />

          <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-100" />
        </div>

        {/* Product Skeleton */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-[170px] animate-pulse rounded-2xl bg-neutral-100"
            />
          ))}
        </div>
      </main>
    }
  >
    <CategoryContent params={props.params} />
  </Suspense>
);

export default CategoryPage;
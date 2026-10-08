import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

interface PropsType {
  params: Promise<{ productId: string }>;
}

interface Product {
  slug: string;
  nameBn: string;
  today: number;
  yesterday: number;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
  unit: string;
  image: string
}

const ProductContent = async ({ params }: PropsType) => {
  const { productId } = await params;

  let products: Product[];
  try {
    products = await fetchApiJson<Product[]>(
      `${API_BASE_URL}/api/bazardor/products`,
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
        পণ্যের তথ্য এখন লোড করা যাচ্ছে না।
      </p>
    );
  }

  const product = products.find(({ slug }) => slug === productId);

  if (!product) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-neutral-500">
        এই পণ্যটি পাওয়া যায়নি।
      </p>
    );
  }
  console.log(product);
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex gap-2 text-sm text-neutral-600"
      >
        <Link href="/" className="transition-colors hover:text-green-600">
          হোম
        </Link>

        <span aria-hidden="true" className="text-neutral-400">
          ›
        </span>

        <Link
          href={`/category/${product.category}`}
          className="transition-colors hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>

        <span aria-hidden="true" className="text-neutral-400">
          ›
        </span>

        <span aria-current="page" className="font-medium text-neutral-800">
          {product.nameBn}
        </span>
      </nav>
      <section className="rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-sm sm:px-6">
        <div className="flex gap-4">
          {/* Category Icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
            {product.image}
          </div>

          {/* Category Info */}
          <div>
            <h1 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
              {product.nameBn}
            </h1>
            <p>
              প্রতি{" "}
              <p>
                {{
                  dozen: "ডজন",
                  kg: "কেজি",
                  litre: "লিটার",
                  piece: "পিস",
                }[product.unit] ?? product.unit}
              </p>{" "}
              · {product.nameBn}
            </p>
            <span>
              গতকালের তুলনায় আজ দাম{" "}
              {product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}{" "}
              {product.change.pct}%
            </span>
            <div>
              <h2 className="card-title">আজকের দাম</h2>
              <span>{product.today}</span>
              <p>
                টাকা /
                <p>
                  {{
                    dozen: "ডজন",
                    kg: "কেজি",
                    litre: "লিটার",
                    piece: "পিস",
                  }[product.unit] ?? product.unit}
                </p>
              </p>
              <div>
                {product.change.dir === "up" ? (
                  <span className="text-red-700">▲</span>
                ) : (
                  <span className="text-green-700">▼</span>
                )}
                <span>{product.change.pct}%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ProductDetails = (props: PropsType) => (
  <Suspense
    fallback={
      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="h-5 w-64 animate-pulse rounded bg-neutral-100" />
      </main>
    }
  >
    <ProductContent params={props.params} />
  </Suspense>
);

export default ProductDetails;

import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  image: string;
  markets: {
    division: string;
    market: string;
    max: number;
    min: number;
  }[];
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
      notFound()
    );
  }
 
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:py-8">
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

      <section className="rounded-2xl border border-neutral-200 bg-white px-5 py-5 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Product Information */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold leading-tight text-neutral-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-neutral-600">
                প্রতি{" "}
                {{
                  dozen: "ডজন",
                  kg: "কেজি",
                  litre: "লিটার",
                  piece: "পিস",
                }[product.unit] ?? product.unit}
                {" · "}
                {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-neutral-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span>
                  {product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}{" "}
                  {product.change.pct}%
                </span>
              </p>
            </div>
          </div>

          {/* Today's Price Card */}
          <div className="w-full shrink-0 rounded-2xl bg-[#F0F6F1] px-6 py-4 text-center sm:w-32">
            <h2 className="text-sm font-medium text-neutral-600">আজকের দাম</h2>

            <p className="mt-1 text-3xl font-bold leading-tight text-neutral-900">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="mt-1 text-sm text-neutral-600">
              টাকা /{" "}
              {{
                dozen: "ডজন",
                kg: "কেজি",
                litre: "লিটার",
                piece: "পিস",
              }[product.unit] ?? product.unit}
            </p>

            <p
              className={`mt-1 text-sm font-medium ${
                product.change.dir === "up" ? "text-red-600" : "text-green-600"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"} {product.change.pct.toLocaleString("bn-BD")}%
            </p>
          </div>
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-bold text-2xl text-black">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 w-full min-w-0 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">সর্বনিম্ন দাম</h2>
              <p>
                {product.markets.length > 0
                  ? product.markets
                      .reduce((lowest, market) =>
                        market.min < lowest.min ? market : lowest,
                      )
                      .min.toLocaleString("bn-BD")
                  : "—"}{" "}
                টাকা
              </p>
              <p>সবচেয়ে কম দামের বাজার</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full min-w-0 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">সর্বাধিক দাম</h2>
              <p>
                {product.markets.length > 0
                  ? product.markets
                      .reduce((highest, market) =>
                        market.max > highest.max ? market : highest,
                      )
                      .max.toLocaleString("bn-BD")
                  : "—"}{" "}
                টাকা
              </p>
              <p>সবচেয়ে বেশি দামের বাজার</p>
            </div>
          </div>
          <div className="card bg-base-100 w-full min-w-0 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">গড় দাম</h2>
              <p>
                {product.markets.length > 0
                  ? Math.round(
                      product.markets.reduce(
                        (total, market) => total + market.max,
                        0,
                      ) / product.markets.length,
                    ).toLocaleString("bn-BD")
                  : "—"}
              </p>
              <p>
                প্রতি{" "}
                {{
                  dozen: "ডজন",
                  kg: "কেজি",
                  litre: "লিটার",
                  piece: "পিস",
                }[product.unit] ?? product.unit}
                -এর হিসাবে
              </p>
            </div>
          </div>
        </div>
        <h2 className="mt-8 mb-4 text-xl font-bold text-neutral-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-neutral-50">
              <tr className="border-b border-neutral-200">
                <th className="px-4 py-3 text-left font-semibold text-neutral-800">
                  বাজার
                </th>
                <th className="px-4 py-3 text-left font-semibold text-neutral-800">
                  বিভাগ
                </th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-800">
                  সর্বনিম্ন
                </th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-800">
                  সর্বাধিক
                </th>
                <th className="px-4 py-3 text-right font-semibold text-neutral-800">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody>
              {product.markets.length > 0 ? (
                product.markets.map((market, index) => {
                  const average = Math.round((market.min + market.max) / 2);

                  return (
                    <tr
                      key={`${market.division}-${market.market}-${index}`}
                      className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50"
                    >
                      <td className="px-4 py-3 font-semibold text-neutral-800">
                        {market.market}
                      </td>

                      <td className="px-4 py-3 text-neutral-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap text-neutral-700">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap text-neutral-700">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap font-semibold text-neutral-900">
                        {average.toLocaleString("bn-BD", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        টাকা
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-neutral-500"
                  >
                    কোনো বাজারের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default function ProductDetails(props: PropsType) {
  return <ProductContent params={props.params} />;
}

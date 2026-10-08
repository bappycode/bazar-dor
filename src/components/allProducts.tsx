import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";

interface Product {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const AllProducts = async () => {
  let data: Product[];
  try {
    data = await fetchApiJson<Product[]>(
      `${API_BASE_URL}/api/bazardor/products`
    );
  } catch (error) {
    if (!(error instanceof ApiResponseError)) {
      throw error;
    }
    return (
      <section
        className="mx-auto max-w-7xl rounded-xl bg-white px-4 py-6 shadow-sm"
        id="সব পণ্য"
        role="status"
      >
        <h2 className="text-lg font-bold text-neutral-800">সব পণ্য</h2>
        <p className="mt-2 text-sm text-neutral-500">
          পণ্যের তথ্য এখন লোড করা যাচ্ছে না।
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl rounded-xl bg-white px-4 py-6 shadow-sm" id="সব পণ্য">
      {/* Title */}
      <div className="mb-5 items-center gap-2">
        <h2 className="text-lg font-bold text-neutral-800">
          সব পণ্য
        </h2>
        <span>মোট {data.length}টি পণ্য দেখানো হচ্ছে</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
          >
            {/* Product */}
            <div className="flex items-center gap-3">
              {/* Emoji icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-2xl">
                {product.image}
              </div>

              {/* Name */}
              <div>
                <h3 className="text-sm font-bold text-neutral-800">
                  {product.nameBn}
                </h3>

                <p className="text-xs text-neutral-500">
                  প্রতি {product.unit}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-neutral-500">
                  আজকের দাম
                </p>

                <p className="mt-0.5 text-base font-bold text-neutral-800">
                  {product.today} টাকা
                </p>
              </div>

              {/* Change */}
              <span className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-medium text-red-600">
                ▲ {product.change.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
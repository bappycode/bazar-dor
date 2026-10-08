"use client";

import { useState } from "react";

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

interface ProductSortProps {
  products: Product[];
}

const ProductSort = ({ products }: ProductSortProps) => {
  const [sort, setSort] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  const sortLabel = {
    default: "ডিফল্ট",
    low: "দাম: কম থেকে বেশি",
    high: "দাম: বেশি থেকে কম",
  }[sort];

  return (
    <>
      {/* Sort + Products */}
      <div className="mt-5">
        {/* Toolbar */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            মোট{" "}
            <span className="font-semibold text-neutral-800">
              {products.length}টি
            </span>{" "}
            পণ্য দেখানো হচ্ছে
          </p>

          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-neutral-500 sm:block">
              সাজান
            </span>

            <details
              className="dropdown dropdown-end"
              open={isOpen}
              onToggle={(event) => setIsOpen(event.currentTarget.open)}
            >
              <summary className="btn btn-sm h-9 min-h-9 border border-neutral-200 bg-white px-3 font-normal text-neutral-700 shadow-none hover:border-neutral-300 hover:bg-neutral-50">
                {sortLabel}
              </summary>

              <ul className="menu dropdown-content z-20 mt-2 w-52 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
                <li>
                  <button
                    onClick={() => {
                      setSort("default");
                      setIsOpen(false);
                    }}
                  >
                    ডিফল্ট
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setSort("low");
                      setIsOpen(false);
                    }}
                  >
                    দাম: কম থেকে বেশি
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setSort("high");
                      setIsOpen(false);
                    }}
                  >
                    দাম: বেশি থেকে কম
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <article
                key={product.id}
                className="flex min-h-[170px] flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-50 text-2xl">
                    {product.image}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-base font-bold text-neutral-800">
                      {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-xs text-neutral-500">
                      প্রতি {product.unit}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-neutral-100" />

                {/* Price */}
                <div className="mt-auto flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs text-neutral-500">আজকের দাম</p>

                    <p className="mt-1 text-xl font-bold tracking-tight text-neutral-900">
                      {product.today}{" "}
                      <span className="text-sm font-normal text-neutral-600">
                        টাকা
                      </span>
                    </p>
                  </div>

                  {/* Change */}
                  {product.change.dir === "flat" ? (
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                      — {product.change.pct}%
                    </span>
                  ) : (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isUp
                          ? "bg-red-50 text-red-600"
                          : isDown
                            ? "bg-green-50 text-green-600"
                            : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {isUp ? "▲" : "▼"} {product.change.pct}%
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductSort;

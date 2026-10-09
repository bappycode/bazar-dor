import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f1f6f1] px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-[#e2f0e5] sm:h-44 sm:w-44">
          <span className="text-7xl sm:text-8xl" role="img" aria-label="Shopping basket">
            🛒
          </span>

          <span className="absolute -right-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#f1f6f1] bg-red-100 text-xl font-bold text-red-600 sm:h-14 sm:w-14">
            !
          </span>
        </div>

        {/* Error Code */}
        <p className="text-7xl font-extrabold tracking-tight text-[#07883f] sm:text-8xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-3 text-2xl font-bold text-[#253129] sm:text-3xl">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#748078] sm:text-base">
          দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা হয়েছে,
          ঠিকানা পরিবর্তন হয়েছে অথবা পৃষ্ঠাটি আর উপলব্ধ নেই।
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#07883f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067535] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m3 10 9-7 9 7" />
              <path d="M5 9v11h14V9" />
              <path d="M9 20v-7h6v7" />
            </svg>
            হোম পেজে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-6 py-3 text-sm font-semibold text-[#344239] transition hover:bg-[#f7faf7] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M5 12h14" />
            </svg>
            আগের পৃষ্ঠায় ফিরে যান
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-10 border-t border-[#dfe8df] pt-5">
          <p className="text-sm text-[#879188]">
            <span className="mr-1">🛍️</span>
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;